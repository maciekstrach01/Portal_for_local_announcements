import type { IResponse } from '@/types/api/common';

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

export type { IRegisterRequest, IRegisterResponse };
