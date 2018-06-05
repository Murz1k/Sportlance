using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Sportlance.WebAPI.Authentication;
using Sportlance.WebAPI.Core;

namespace Sportlance.WebAPI.Filters
{
    public class AuthenticationFilter : IAsyncActionFilter
    {
        private readonly AuthService _authenticationService;

        public AuthenticationFilter(AuthService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            await next();

            if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(context.HttpContext.User.Identity.Name))
                return;

            if (_authenticationService.ShouldRefreshToken(token))
            {
                var identity = await _authenticationService.RefreshAccessToken();

                context.HttpContext.Response.Headers.Add(Headers.XNewAuthToken, identity.Token);
            }
        }
    }
}