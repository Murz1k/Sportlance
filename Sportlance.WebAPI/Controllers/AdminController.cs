using System.Threading.Tasks;
using Amazon.S3;
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
        private IMailService _mailService;
        private IAmazonS3 _amazon;

        public AdminController(IConfiguration configuration, 
            IHostingEnvironment currentEnvironment,
            IAmazonS3 amazon,
            IMailService mailService)
        {
            _currentEnvironment = currentEnvironment;
            _configuration = configuration;
            _mailService = mailService;
            _amazon = amazon;
        }
        // GET: api/Admin
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //await _mailService.SendConfirmRegistration(1, "max89701@gmail.com");
            return Ok();
        }

        [HttpGet("config")]
        public IActionResult GetConfig()
        {
            return Ok(_configuration.AsEnumerable());
        }
    }
}