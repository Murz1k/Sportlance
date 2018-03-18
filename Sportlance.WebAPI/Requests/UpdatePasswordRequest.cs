using System.ComponentModel.DataAnnotations;
using Sportlance.WebAPI.Errors;
using Sportlance.WebAPI.Validation;

namespace Sportlance.WebAPI.Requests
{
    public class UpdatePasswordRequest
    {
        public string Token { get; set; }

        public int UserId { get; set; }

        [AppRequired]
        [StringLength(100, ErrorMessage = nameof(ValidationErrorCode.IncorrectLength), MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [AppRequired]
        [DataType(DataType.Password)]
        [Compare(nameof(Password), ErrorMessage = nameof(ValidationErrorCode.NotEqual))]
        public string ConfirmPassword { get; set; }
    }
}
