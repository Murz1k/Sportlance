using System.Threading.Tasks;
using Amazon.S3;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Sportlance.WebAPI.Admin
{
    [Produces("application/json")]
    [Route("api/Admin")]
    public class AdminController : Controller
    {
        private IHostingEnvironment _currentEnvironment;
        private IConfiguration _configuration;
        private IAmazonS3 _amazon;

        public AdminController(IConfiguration configuration, 
            IHostingEnvironment currentEnvironment,
            IAmazonS3 amazon,)
        {
            _currentEnvironment = currentEnvironment;
            _configuration = configuration;
            _amazon = amazon;
        }
        // GET: api/Admin
        [HttpGet]
        public Task<IActionResult> Get()
        {
            return null;
        }

        [HttpGet("config")]
        public IActionResult GetConfig()
        {
            return Ok(_configuration.AsEnumerable());
        }
    }
}