using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Authentication;
using Sportlance.WebAPI.Authentication.Responses;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Core.Extensions;

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
            var user = await _userService.UpdateMainPhotoAsync(User.GetUserId(), photo.ToAzureFile());

            return new LoginResponse
            {
                AccessToken = _authService.GenerateAccessToken(user),
                RefreshToken = _authService.GenerateRefreshToken(user)
            };
        }
    }
}