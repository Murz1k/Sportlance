using System.ComponentModel.DataAnnotations;
using Sportlance.WebAPI.Core.Errors;

namespace Sportlance.WebAPI.Core.Validation
{
    public class AppRequiredAttribute : RequiredAttribute
    {
        public AppRequiredAttribute()
        {
            ErrorMessage = nameof(ValidationErrorCode.RequiredField);
        }
    }
}