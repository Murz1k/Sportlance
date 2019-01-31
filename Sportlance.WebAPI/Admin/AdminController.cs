using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Sportlance.WebAPI.Admin
{
    [Produces("application/json")]
    [Route("api/Admin")]
    public class OrdersController : Controller
    {
        private readonly IHostingEnvironment _currentEnvironment;
        private readonly IConfiguration _configuration;

        public OrdersController(IConfiguration configuration, 
            IHostingEnvironment currentEnvironment)
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