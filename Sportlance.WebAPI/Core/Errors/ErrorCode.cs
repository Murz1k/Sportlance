namespace Sportlance.WebAPI.Errors
{
    public enum ErrorCode
    {
        AuthenticationError,
        IncorrectPassword,
        EmailIsNotConfirmed,
        IncorrectData,
        RegistrationIsAlreadyConfirmed,
        IncorrectValidation,
        ServerError,
        UserNotFound,
        UpdateInProgress,
        TxIsInvalid,
        TeamNotFound,
        UserAlreadyExist
    }
}