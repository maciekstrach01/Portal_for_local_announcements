type ILoginRequestFields = 'email' | 'password';

interface ILoginRequest {
    email: string;
    password: string;
}

type IRegisterRequestFields =
    | ILoginRequestFields
    | 'firstName'
    | 'lastName'
    | 'confirmPassword';

interface IRegisterRequest extends ILoginRequest {
    firstName: string;
    lastName: string;
    confirmPassword: string;
}

interface IRefreshTokenRequest {
    refreshToken: string;
}

interface ITokensResponse {
    accessToken: string;
    refreshToken: string;
}

export type {
    ILoginRequestFields,
    ILoginRequest,
    IRegisterRequestFields,
    IRegisterRequest,
    IRefreshTokenRequest,
    ITokensResponse
};
