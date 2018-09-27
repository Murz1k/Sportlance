namespace Sportlance.WebAPI.Errors
{
    public class AppError
    {
        public AppError(
            ErrorCode errorCode,
            string message = null)
        {
            Code = errorCode.ToString();
            Message = message;
        }

        public string Code { get; }

        public string Message { get; }
    }
}