using Sportlance.WebAPI.Errors;

namespace Sportlance.WebAPI.Responses
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