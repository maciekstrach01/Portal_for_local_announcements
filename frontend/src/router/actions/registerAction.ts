import { toast } from 'react-toastify';
import { StatusCodes as HTTP } from 'http-status-codes';
import { redirect, ActionFunctionArgs } from 'react-router-dom';

import { store } from '@/redux';
import { setCredentials } from '@/redux/auth/authSlice';
import { authApiSlice } from '@/redux/auth/authApiSlice';

import type { IErrorResponse } from '@/types/api/common';
import type { IRegisterRequest } from '@/types/api/auth';

export const registerAction = async ({
    request
}: ActionFunctionArgs<IRegisterRequest>): Promise<Response | string | null> => {
    const formData = await request.formData();

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    const registerPayload: IRegisterRequest = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    };

    try {
        const { data, error } = await store.dispatch(
            authApiSlice.endpoints.register.initiate(registerPayload)
        );

        if (error) {
            if ('status' in error) {
                const apiErrorResponse = error.data as IErrorResponse;

                if (apiErrorResponse.status === HTTP.BAD_REQUEST) {
                    return apiErrorResponse.error;
                }
            }

            throw Error();
        }

        store.dispatch(setCredentials(data));

        toast.success("You've been registered successfully");

        return redirect('/');
    } catch {
        toast.error('Something went wrong...');

        return null;
    }
};
