﻿namespace Sportlance.Common.Errors
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
        TeamServiceAlreadyDeleted,
        DurationIsRequired,
        PriceMustBeGreaterThanZero,
        // Trainer
        TrainerNotFound,
        // User
        UserNotFound,
        UserAlreadyHasRole,
        UserAlreadyExist,
        RoleNotFound,
        UserAccessDenied,
        // Orders
        OrderNotFound,
        // Common
        NameIsRequired,
        // Other
        IncorrectData,
        IncorrectValidation,
        ServerError,
        UpdateInProgress,
        TxIsInvalid
    }
}