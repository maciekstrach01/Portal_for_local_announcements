import { toast } from 'react-toastify';
import { ActionFunctionArgs } from 'react-router-dom';
import { StatusCodes as HTTP } from 'http-status-codes';

import { store } from '@/redux';
import { userApiSlice } from '@/redux/user/userApiSlice';

import type { IErrorResponse } from '@/types/api/common';
import type { IChangePasswordRequest } from '@/types/api/user';

export const changePasswordAction = async ({
    request
}: ActionFunctionArgs<IChangePasswordRequest>): Promise<string | null> => {
    const formData = await request.formData();

    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmNewPassword = formData.get('confirmNewPassword') as string;

    const payload: IChangePasswordRequest = {
        currentPassword,
        newPassword,
        confirmNewPassword
    };

    try {
        const { error } = await store.dispatch(
            userApiSlice.endpoints.changePassword.initiate(payload)
        );

        if (error) {
            if ('status' in error && error.status === HTTP.BAD_REQUEST) {
                const apiErrorResponse = error.data as IErrorResponse;

                return apiErrorResponse.error;
            }

            throw Error();
        }

        toast.success('Password changed successfully');
    } catch {
        toast.error('Something went wrong...');
    }

    return null;
};
