export interface IUserAttributes {
    email?: string
    birthdate?: string
    gender?: string
    name?: string
    address?: string
    family_name?: string
    given_name?: string
    locale?: string
    middle_name?: string
    name?: string
    nickname?: string
    phone_number?: string
    picture?: string
    preferred_username?: string
    profile?: string
    updated_at?: string
    website?: string
    zoneinfo?: string
}

export interface ISignInValues {
    username: string
    password: string
}

export interface ILoginResult {
    newPasswordRequired?: boolean
}

enum SignUpErrorName {
    CodeDeliveryFailureException = 'CodeDeliveryFailureException',
    InvalidEmailRoleAccessPolicyException = 'InvalidEmailRoleAccessPolicyException',
    InvalidPasswordException = 'InvalidPasswordException',
    InvalidSmsRoleAccessPolicyException = 'InvalidSmsRoleAccessPolicyException',
    InvalidSmsRoleTrustRelationshipException = 'InvalidSmsRoleTrustRelationshipException',
    UserLambdaValidationException = 'UserLambdaValidationException',
    UsernameExistsException = 'UsernameExistsException',
}

export interface ICongnitoSignUpError extends Error {
    name: keyof typeof SignUpErrorName | keyof typeof CommonErrors
}

enum ConfirmSignUpErrorName {
    AliasExistsException = 'AliasExistsException',
    CodeMismatchException = 'CodeMismatchException',
    ExpiredCodeException = 'ExpiredCodeException',
    LimitExceededException = 'LimitExceededException',
    UserLambdaValidationException = 'UserLambdaValidationException',
    UserNotFoundException = 'UserNotFoundException',
}

export interface ICognitoVerifySignUpError extends Error {
    name: keyof typeof ConfirmSignUpErrorName | keyof typeof CommonErrors
}

enum ForgotPasswordErrorName {
    CodeDeliveryFailureException = 'CodeDeliveryFailureException',
    InvalidEmailRoleAccessPolicyException = 'InvalidEmailRoleAccessPolicyException',
    LimitExceededException = 'LimitExceededException',
    UserLambdaValidationException = 'UserLambdaValidationException',
    UserNotFoundException = 'UserNotFoundException',
}

export interface ICognitoForgotPasswordError extends Error {
    name: keyof typeof ForgotPasswordErrorName | keyof typeof CommonErrors
}

export interface ICognitoSendVerificationCodeError extends Error {
    name: keyof typeof ForgotPasswordErrorName | keyof typeof CommonErrors
}

enum InitiateAuthErrorName {
    InvalidSmsRoleAccessPolicyException = 'InvalidSmsRoleAccessPolicyException',
    InvalidSmsRoleTrustRelationshipException = 'InvalidSmsRoleTrustRelationshipException',
    InvalidUserPoolConfigurationException = 'InvalidUserPoolConfigurationException',
    PasswordResetRequiredException = 'PasswordResetRequiredException',
    UserNotConfirmedException = 'UserNotConfirmedException',
    UserNotFoundException = 'UserNotFoundException',
}

export interface ICognitoInitiateAuthError extends Error {
    name: keyof typeof InitiateAuthErrorName | keyof typeof CommonErrors
}

enum ChangePasswordErrorName {
    InvalidPasswordException = 'InvalidPasswordException',
    LimitExceededException = 'LimitExceededException',
    PasswordResetRequiredException = 'PasswordResetRequiredException',
    UserNotConfirmedException = 'UserNotConfirmedException',
    UserNotFoundException = 'UserNotFoundException',
}

export interface ICognitoChangePasswordError extends Error {
    name: keyof typeof ChangePasswordErrorName | keyof typeof CommonErrors
}

enum CompletePasswordResetError {
    CodeMismatchException = 'CodeMismatchException',
    ExpiredCodeException = 'ExpiredCodeException',
    InvalidPasswordException = 'InvalidPasswordException',
    LimitExceededException = 'LimitExceededException',
    TooManyFailedAttemptsException = 'TooManyFailedAttemptsException',
    UserLambdaValidationException = 'UserLambdaValidationException',
    UserNotConfirmedException = 'UserNotConfirmedException',
    UserNotFoundException = 'UserNotFoundException',
}

export interface ICognitoCompletePasswordResetError extends Error {
    name: keyof typeof CompletePasswordResetError | keyof typeof CommonErrors
}

enum CommonErrors {
    InternalErrorException = 'InternalErrorException',
    InvalidLambdaResponseException = 'InvalidLambdaResponseException',
    InvalidParameterException = 'InvalidParameterException',
    NotAuthorizedException = 'NotAuthorizedException',
    ResourceNotFoundException = 'ResourceNotFoundException',
    TooManyRequestsException = 'TooManyRequestsException',
    UnexpectedLambdaException = 'UnexpectedLambdaException',
}

export interface ICognitoCompletePasswordResetError {
    name: keyof typeof ConfirmSignUpErrorName | keyof typeof CommonErrors
}
