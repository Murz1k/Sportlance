using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Sportlance.Common.Extensions;
using Sportlance.WebAPI.Authentication;
using Sportlance.WebAPI.Users;

namespace Sportlance.WebAPI.Core.Filters
{
    public class AuthenticationFilter : IAsyncActionFilter
    {
        private readonly IAuthService _authenticationService;
        private readonly IUserService _userService;

        public AuthenticationFilter(IAuthService authenticationService, IUserService userService)
        {
            _authenticationService = authenticationService;
            _userService = userService;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            await next();

            if (string.IsNullOrEmpty(token))
                return;

            if (_authenticationService.ShouldRefreshToken(token))
            {
                var user = await _userService.GetByIdAsync(context.HttpContext.User.GetUserId());
                context.HttpContext.Response.Headers.Add(Headers.XNewAuthToken,
                    _authenticationService.GenerateAccessToken(user));
            }
        }
    }
}