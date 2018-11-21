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
        UserAlreadyHasRole,
        UpdateInProgress,
        TxIsInvalid,
        TeamNotFound,
        UserAlreadyExist
    }
}