namespace Sportlance.WebAPI.Core.Errors
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
        RoleNotFound,
        UpdateInProgress,
        TxIsInvalid,
        TeamNotFound,
        UserAlreadyExist
    }
}