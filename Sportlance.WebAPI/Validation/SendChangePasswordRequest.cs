using System.ComponentModel.DataAnnotations;
using Sportlance.WebAPI.Errors;

namespace Sportlance.WebAPI.Validation
{
    public class SendChangePasswordRequest
    {
        [AppRequired]
        [EmailAddress(ErrorMessage = nameof(ValidationErrorCode.IncorrectEmail))]
        public string Email { get; set; }
    }
}
