namespace Sportlance.WebAPI.Errors
{
    public class FieldError
    {
        public string ErrorCode { get; }

        public FieldError(ValidationErrorCode errorCode)
        {
            ErrorCode = errorCode.ToString();
        }
    }
}
