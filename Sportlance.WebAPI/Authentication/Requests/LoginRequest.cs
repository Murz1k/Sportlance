using Sportlance.WebAPI.Core.Validation;

namespace Sportlance.WebAPI.Authentication.Requests
{
    public class LoginRequest
    {
        [AppRequired] public string Email { get; set; }

        [AppRequired] public string Password { get; set; }

        public bool RememberMe { get; set; }

        //[ValidateCaptcha]
        //public string CaptchaCode { get; set; }
    }
}