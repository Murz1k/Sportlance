namespace Sportlance.Common.Errors
{
    public enum ErrorCode
    {
        // Auth
        AuthenticationError,
        IncorrectPassword,
        EmailIsNotConfirmed,
        RegistrationIsAlreadyConfirmed,
        // Team
        TeamNotFound,
        TeamServiceNotFound,
        // Trainer
        TrainerNotFound,
        // User
        UserNotFound,
        UserAlreadyHasRole,
        UserAlreadyExist,
        RoleNotFound,
        UserAccessDenied,
        // Other
        IncorrectData,
        IncorrectValidation,
        ServerError,
        UpdateInProgress,
        TxIsInvalid
    }
}