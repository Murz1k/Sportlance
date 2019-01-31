export enum ErrorCode {
  // Auth
  AuthenticationError = 'AuthenticationError',
  IncorrectPassword = 'IncorrectPassword',
  EmailIsNotConfirmed = 'EmailIsNotConfirmed',
  RegistrationIsAlreadyConfirmed = 'RegistrationIsAlreadyConfirmed',
  // Team
  TeamNotFound = 'TeamNotFound',
  TeamServiceNotFound = 'TeamServiceNotFound',
  DurationIsRequired = 'DurationIsRequired',
  PriceMustBeGreaterThanZero = 'PriceMustBeGreaterThanZero',
  // Trainer
  TrainerNotFound = 'TrainerNotFound',
  // User
  UserNotFound = 'UserNotFound',
  UserAlreadyHasRole = 'UserAlreadyHasRole',
  UserAlreadyExist = 'UserAlreadyExist',
  RoleNotFound = 'RoleNotFound',
  UserAccessDenied = 'UserAccessDenied',
  // Common
  NameIsRequired = 'NameIsRequired',
  // Other
  IncorrectData = 'IncorrectData',
  IncorrectValidation = 'IncorrectValidation',
  ServerError = 'ServerError',
  UpdateInProgress = 'UpdateInProgress',
  TxIsInvalid = 'TxIsInvalid'
}

