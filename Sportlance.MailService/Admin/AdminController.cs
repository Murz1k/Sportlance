using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Sportlance.MailService.Admin
{
    [Produces("application/json")]
    [Route("api/Admin")]
    public class AdminController : Controller
    {
        private readonly IHostingEnvironment _currentEnvironment;
        private readonly IConfiguration _configuration;

        public AdminController(IConfiguration configuration,
            IHostingEnvironment currentEnvironment
            )
        {
            _currentEnvironment = currentEnvironment;
            _configuration = configuration;
        }

        [HttpGet("env")]
        public IActionResult Get()
        {
            return Ok(_currentEnvironment.EnvironmentName);
        }

        [HttpGet("config")]
        public IActionResult GetConfig()
        {
            return Ok(_configuration.AsEnumerable());
        }
    }
}