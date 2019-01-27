namespace Sportlance.Common.Errors
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
        UserAlreadyExist,
        TeamServiceNotFound,
        TrainerNotFound
    }
}