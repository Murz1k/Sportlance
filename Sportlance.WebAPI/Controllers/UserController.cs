using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sportlance.BLL.Interfaces;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Responses;

namespace Sportlance.WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/user")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpGet, Authorize]
        public async Task<UserResponse> GetAsync()
        {
            var user = await _userService.GetAsync(User.GetUserId());
            return new UserResponse { Email = user.Email, FirstName = user.FirstName, LastName = user.LastName };
        }
    }
}