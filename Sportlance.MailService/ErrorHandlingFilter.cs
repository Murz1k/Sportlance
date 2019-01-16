using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace Sportlance.MailService
{
    public class ErrorHandlingFilter : ExceptionFilterAttribute
    {
        private ILogger _logger;

        public ErrorHandlingFilter(ILogger logger)
        {
            _logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            //log your exception here

            context.ExceptionHandled = true; //optional

            _logger.LogError(exception.Message);
        }
    }
}