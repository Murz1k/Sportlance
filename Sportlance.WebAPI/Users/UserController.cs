using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Responses;

namespace Sportlance.WebAPI.Users
{
    [Route("user")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Authorize]
        public async Task<UserResponse> GetAsync()
        {
            var user = await _userService.GetByIdAsync(User.GetUserId());
            return new UserResponse {Email = user.Email, FirstName = user.FirstName, LastName = user.LastName};
        }
    }
}