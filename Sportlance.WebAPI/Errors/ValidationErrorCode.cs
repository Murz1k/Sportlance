namespace Sportlance.WebAPI.Errors
{
    public enum ValidationErrorCode
    {
        IncorrectLength,
        IncorrectEmail,
        RequiredField,
        NotEqual,
        EmailNotUnique,
        CaptchaIsInvalid,
        IncorrectPassword
    }
}