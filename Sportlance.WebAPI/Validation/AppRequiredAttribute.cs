using System.ComponentModel.DataAnnotations;
using Sportlance.WebAPI.Errors;

namespace Sportlance.WebAPI.Validation
{
    public class AppRequiredAttribute : RequiredAttribute
    {
        public AppRequiredAttribute()
        {
            ErrorMessage = nameof(ValidationErrorCode.RequiredField);
        }
    }
}