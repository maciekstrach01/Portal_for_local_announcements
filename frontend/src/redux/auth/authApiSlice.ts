import { apiSlice } from '@/redux/apiSlice';

import type { ILoginRequest, IRegisterRequest } from '@/types/api/auth';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: (data: IRegisterRequest) => ({
                url: '/v1/auth/register',
                method: 'POST',
                body: { ...data }
            })
        }),
        login: builder.mutation({
            query: (data: ILoginRequest) => ({
                url: '/v1/auth/authenticate',
                method: 'POST',
                body: { ...data }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/v1/auth/logout',
                method: 'POST'
            })
        })
    })
});

export const { useLogoutMutation } = authApiSlice;
