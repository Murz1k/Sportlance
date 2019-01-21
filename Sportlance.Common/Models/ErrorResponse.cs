using Sportlance.Common.Errors;

namespace Sportlance.Common.Models
{
    public class ErrorResponse
    {
        public ErrorResponse(AppError error)
        {
            Error = error;
        }

        public AppError Error { get; }
    }
}