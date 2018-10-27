using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Sportlance.WebAPI.Errors;
using UserService = Sportlance.WebAPI.Services.UserService;

namespace Sportlance.WebAPI.Validation
{
    public class UniqueEmailAttribute : AsyncValidationAtrribute
    {
        public override async Task<ValidationResult> GetValidationResultAsync(object value,
            ActionExecutingContext context)
        {
            if (value == null) return ValidationResult.Success;
            var email = value.ToString();
            var userService =
                context.HttpContext.RequestServices.GetService(typeof(UserService)) as UserService;
            var emailExists = await userService.IsEmailExists(email);

            return emailExists
                ? new ValidationResult(nameof(ValidationErrorCode.EmailNotUnique))
                : ValidationResult.Success;
        }
    }
}