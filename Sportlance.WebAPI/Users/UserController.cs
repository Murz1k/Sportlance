using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sportlance.Common.Errors;
using Sportlance.Common.Exceptions;
using Sportlance.Common.Extensions;
using Sportlance.WebAPI.Authentication;
using Sportlance.WebAPI.Authentication.Responses;
using Sportlance.WebAPI.Users.Requests;
using Sportlance.WebAPI.Users.Responses;

namespace Sportlance.WebAPI.Users
{
    [Route("users")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;

        public UserController(IUserService userService,
            IAuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }

        [HttpPut("photo")]
        [Authorize]
        public async Task<LoginResponse> UploadPhotoAsync([FromForm] IFormFile photo)
        {
            var user = await _userService.UpdateMainPhotoAsync(User.GetUserId(), photo.ToStorageFile());

            return new LoginResponse
            {
                AccessToken = _authService.GenerateAccessToken(user),
                RefreshToken = _authService.GenerateRefreshToken(user)
            };
        }

        [HttpPost]
        [Route("invite")]
        public async Task<UserResponse> GetUserByInviteLinkAsync([FromBody] GetUserByInviteLinkRequest request)
        {
            var user = await _userService.GetByInviteLinkAsync(request.InviteLink);
            if (user == null) throw new AppErrorException(new AppError(ErrorCode.UserNotFound));

            return new UserResponse
            {
                FirstName = user.FirstName
            };
        }
    }
}