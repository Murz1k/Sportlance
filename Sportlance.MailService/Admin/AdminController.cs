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
        private readonly MailQueueProvider _mailProvider;

        public AdminController(IConfiguration configuration,
            IHostingEnvironment currentEnvironment
            ,MailQueueProvider mailProvider
            )
        {
            _currentEnvironment = currentEnvironment;
            _configuration = configuration;
            _mailProvider = mailProvider;
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

        [HttpGet("queueUrl")]
        public IActionResult GetQueueUrl()
        {
            return Ok(_mailProvider.QueueUrl);
        }

        [HttpGet("mails")]
        public async Task<IActionResult> GetMails()
        {
            var messages = await _mailProvider.ReceiveMessagesAsync();
            return Ok(messages.Select(message => message.Body));
        }
    }
}