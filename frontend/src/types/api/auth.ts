import type { IResponse } from '@/types/api/common';

type IRegisterRequestFields =
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'password'
    | 'confirmPassword';

interface IRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface IRegisterResponse extends IResponse {
    data: {
        token: string;
    };
}

type ILoginRequestFields = 'email' | 'password';

interface ILoginRequest {
    email: string;
    password: string;
}

interface ILoginResponse extends IResponse {
    data: {
        token: string;
    };
}

export type {
    IRegisterRequestFields,
    IRegisterRequest,
    IRegisterResponse,
    ILoginRequestFields,
    ILoginRequest,
    ILoginResponse
};
