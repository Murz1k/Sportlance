using System.ComponentModel.DataAnnotations;
using Sportlance.WebAPI.Core.Errors;

namespace Sportlance.WebAPI.Core.Validation
{
    public class SendChangePasswordRequest
    {
        [AppRequired]
        [EmailAddress(ErrorMessage = nameof(ValidationErrorCode.IncorrectEmail))]
        public string Email { get; set; }
    }
}