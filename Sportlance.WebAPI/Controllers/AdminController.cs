using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Sportlance.WebAPI.Authentication;

namespace Sportlance.WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/Admin")]
    public class AdminController : Controller
    {
        private IHostingEnvironment _currentEnvironment;
        private IConfiguration _configuration;
        private MailService _mailService;

        public AdminController(IConfiguration configuration, 
            IHostingEnvironment currentEnvironment,
            MailService mailService)
        {
            _currentEnvironment = currentEnvironment;
            _configuration = configuration;
            _mailService = mailService;
        }
        // GET: api/Admin
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            await _mailService.SendConfirmRegistration(1, "max89701@gmail.com");
            return Ok("");
        }

        [HttpGet("config")]
        public IActionResult GetConfig()
        {
            return Ok(_configuration.AsEnumerable());
        }
    }
}