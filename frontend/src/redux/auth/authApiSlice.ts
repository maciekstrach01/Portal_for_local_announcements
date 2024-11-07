import { apiSlice } from '@/redux/apiSlice';

import type {
    ILoginRequest,
    ITokenResponse,
    IRegisterRequest
} from '@/types/api/auth';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation<ITokenResponse, IRegisterRequest>({
            query: payload => ({
                url: '/v1/auth/register',
                method: 'POST',
                body: payload
            })
        }),
        login: builder.mutation<ITokenResponse, ILoginRequest>({
            query: payload => ({
                url: '/v1/auth/authenticate',
                method: 'POST',
                body: payload
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/v1/auth/logout',
                method: 'POST'
            })
        })
    })
});

export const { useLogoutMutation } = authApiSlice;
