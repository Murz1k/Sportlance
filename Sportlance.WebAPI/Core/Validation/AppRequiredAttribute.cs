using System.ComponentModel.DataAnnotations;
using Sportlance.Common.Errors;

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