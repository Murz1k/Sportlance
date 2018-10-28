using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Sportlance.WebAPI.Validation
{
    public abstract class AsyncValidationAtrribute : Attribute
    {
        public abstract Task<ValidationResult> GetValidationResultAsync(object value, ActionExecutingContext context);
    }
}