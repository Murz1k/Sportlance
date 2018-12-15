namespace Sportlance.WebAPI.Core.Errors
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