using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Sportlance.DAL.Repositories;
using Sportlance.WebAPI.Errors;

namespace Sportlance.WebAPI.Validation
{
    public class UniqueEmailAttribute : AsyncValidationAtrribute
    {
        public override async Task<ValidationResult> GetValidationResultAsync(object value,
            ActionExecutingContext context)
        {
            if (value == null) return ValidationResult.Success;
            var email = value.ToString();
            var userRepository =
                context.HttpContext.RequestServices.GetService(typeof(UserRepository)) as UserRepository;
            var emailExists = await userRepository.IsEmailExists(email);

            return emailExists
                ? new ValidationResult(nameof(ValidationErrorCode.EmailNotUnique))
                : ValidationResult.Success;
        }
    }
}