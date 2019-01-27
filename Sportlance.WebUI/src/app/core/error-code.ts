export enum ErrorCode {
  // Auth
  AuthenticationError = 'AuthenticationError',
  IncorrectPassword = 'IncorrectPassword',
  EmailIsNotConfirmed = 'EmailIsNotConfirmed',
  RegistrationIsAlreadyConfirmed = 'RegistrationIsAlreadyConfirmed',
  // Team
  TeamNotFound = 'TeamNotFound',
  TeamServiceNotFound = 'TeamServiceNotFound',
  // Trainer
  TrainerNotFound = 'TrainerNotFound',
  // User
  UserNotFound = 'UserNotFound',
  UserAlreadyHasRole = 'UserAlreadyHasRole',
  UserAlreadyExist = 'UserAlreadyExist',
  RoleNotFound = 'RoleNotFound',
  UserAccessDenied = 'UserAccessDenied',
  // Other
  IncorrectData = 'IncorrectData',
  IncorrectValidation = 'IncorrectValidation',
  ServerError = 'ServerError',
  UpdateInProgress = 'UpdateInProgress',
  TxIsInvalid = 'TxIsInvalid'
}

