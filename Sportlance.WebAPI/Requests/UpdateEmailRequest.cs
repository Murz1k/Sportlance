using System.ComponentModel.DataAnnotations;
using Sportlance.WebAPI.Errors;
using Sportlance.WebAPI.Validation;

namespace Sportlance.WebAPI.Requests
{
    public class UpdateEmailRequest
    {
        [AppRequired]
        [EmailAddress(ErrorMessage = nameof(ValidationErrorCode.IncorrectEmail))]
        [StringLength(100, ErrorMessage = nameof(ValidationErrorCode.IncorrectLength))]
        [UniqueEmail]
        public string NewEmail { get; set; }

        [AppRequired] public string Password { get; set; }
    }
}