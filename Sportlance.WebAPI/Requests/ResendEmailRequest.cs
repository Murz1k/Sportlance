using Sportlance.WebAPI.Validation;

namespace Sportlance.WebAPI.Requests
{
    public class ResendEmailRequest
    {
        public string Token { get; set; }

        [ValidateCaptcha]
        public string CaptchaCode { get; set; }
    }
}
