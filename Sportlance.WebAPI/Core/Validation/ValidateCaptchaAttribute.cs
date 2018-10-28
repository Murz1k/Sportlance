using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Sportlance.WebAPI.Authentication;
using Sportlance.WebAPI.Errors;

namespace Sportlance.WebAPI.Validation
{
    public class ValidateCaptchaAttribute : AsyncValidationAtrribute
    {
        public override async Task<ValidationResult> GetValidationResultAsync(object value,
            ActionExecutingContext context)
        {
            if (value == null) return new ValidationResult(nameof(ValidationErrorCode.CaptchaIsInvalid));

            var token = value.ToString();

            if (string.IsNullOrEmpty(token)) return new ValidationResult(nameof(ValidationErrorCode.CaptchaIsInvalid));

            var capthcaService =
                context.HttpContext.RequestServices.GetService(typeof(CaptchaService)) as CaptchaService;

            var isValid = await capthcaService.IsCaptchaCodeValidAsync(token);

            if (!isValid) return new ValidationResult(nameof(ValidationErrorCode.CaptchaIsInvalid));

            return ValidationResult.Success;
        }
    }
}