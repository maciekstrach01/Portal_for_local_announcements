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

export type { IRegisterRequestFields, IRegisterRequest, IRegisterResponse };
