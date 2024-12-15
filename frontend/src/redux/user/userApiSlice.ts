import { apiSlice } from '@/redux/apiSlice';

import { IChangePasswordRequest } from '@/types/api/user';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        changePassword: builder.mutation<void, IChangePasswordRequest>({
            query: body => ({
                url: '/v1/user/change-password',
                method: 'POST',
                body
            })
        })
    })
});

export const { useChangePasswordMutation } = userApiSlice;
