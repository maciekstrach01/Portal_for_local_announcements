import { apiSlice } from '@/redux/apiSlice';

import type {
    ILoginRequest,
    ITokensResponse,
    IRegisterRequest
} from '@/types/api/auth';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation<ITokensResponse, IRegisterRequest>({
            query: body => ({
                url: '/v1/auth/register',
                method: 'POST',
                body
            })
        }),
        login: builder.mutation<ITokensResponse, ILoginRequest>({
            query: body => ({
                url: '/v1/auth/authenticate',
                method: 'POST',
                body
            })
        }),
        logout: builder.mutation<void, string>({
            query: refreshToken => ({
                url: '/v1/auth/logout',
                method: 'POST',
                body: {
                    refreshToken
                }
            })
        })
    }),
    overrideExisting: 'throw'
});

export const { useLogoutMutation } = authApiSlice;
