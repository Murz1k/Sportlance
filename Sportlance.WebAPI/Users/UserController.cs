using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Authentication;
using Sportlance.WebAPI.Authentication.Responses;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Responses;

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

        [HttpGet]
        [Authorize]
        public async Task<UserResponse> GetAsync()
        {
            var user = await _userService.GetByIdAsync(User.GetUserId());
            return new UserResponse {Email = user.Email, FirstName = user.FirstName, LastName = user.LastName};
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