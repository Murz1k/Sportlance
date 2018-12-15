namespace Sportlance.WebAPI.Core.Errors
{
    public class FieldError
    {
        public FieldError(ValidationErrorCode errorCode)
        {
            ErrorCode = errorCode.ToString();
        }

        public string ErrorCode { get; }
    }
}