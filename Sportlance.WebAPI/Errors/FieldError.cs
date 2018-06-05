namespace Sportlance.WebAPI.Errors
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