using System.ComponentModel.DataAnnotations;
using Sportlance.Common.Errors;
using Sportlance.WebAPI.Core.Validation;

namespace Sportlance.WebAPI.Authentication.Requests
{
    public class UpdateEmailRequest
    {
        [AppRequired]
        [EmailAddress(ErrorMessage = nameof(ValidationErrorCode.IncorrectEmail))]
        [StringLength(100, ErrorMessage = nameof(ValidationErrorCode.IncorrectLength))]
        public string NewEmail { get; set; }

        [AppRequired] public string Password { get; set; }
    }
}