using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Core.Errors;
using Sportlance.WebAPI.Errors;
using Sportlance.WebAPI.Exceptions;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Responses;
using Sportlance.WebAPI.Users;

namespace Sportlance.WebAPI.Controllers
{
    [Route("[controller]")]
    public class ProfileController : Controller
    {
        private readonly IUserService _userService;

        public ProfileController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("current")]
        [Authorize]
        public async Task<CheckUserResponse> GetCurrentAsync()
        {
            var user = await _userService.GetByIdAsync(User.GetUserId());
            if (user == null) throw new AppErrorException(new AppError(ErrorCode.UserNotFound));

            if (!user.IsEmailConfirm) throw new AppErrorException(new AppError(ErrorCode.EmailIsNotConfirmed));

            return new CheckUserResponse
            {
                Email = user.Email
            };
        }
    }
}