using Sportlance.WebAPI.Validation;

namespace Sportlance.WebAPI.Requests
{
    public class LoginRequest
    {
        [AppRequired]
        public string Email { get; set; }

        [AppRequired]
        public string Password { get; set; }

        //[ValidateCaptcha]
        //public string CaptchaCode { get; set; }
    }
}
