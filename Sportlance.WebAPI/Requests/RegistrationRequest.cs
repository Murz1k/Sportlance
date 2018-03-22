using System.ComponentModel.DataAnnotations;
using Sportlance.WebAPI.Errors;
using Sportlance.WebAPI.Validation;

namespace Sportlance.WebAPI.Requests
{
    public class RegistrationRequest
    {
        //[AppRequired]
        //[EmailAddress(ErrorMessage = nameof(ValidationErrorCode.IncorrectEmail))]
        //[StringLength(100, ErrorMessage = nameof(ValidationErrorCode.IncorrectLength))]
        //[UniqueEmail]
        public string Email { get; set; }

        //[AppRequired]
        //[StringLength(100, ErrorMessage = nameof(ValidationErrorCode.IncorrectLength), MinimumLength = 6)]
        //[DataType(DataType.Password)]
        public string Password { get; set; }

        //[ValidateCaptcha]
        public string CaptchaCode { get; set; }
    }
}
