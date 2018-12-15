using Sportlance.WebAPI.Core.Errors;

namespace Sportlance.WebAPI.Core
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