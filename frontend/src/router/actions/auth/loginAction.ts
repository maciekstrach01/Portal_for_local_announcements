import { toast } from 'react-toastify';
import { StatusCodes as HTTP } from 'http-status-codes';
import { redirect, ActionFunctionArgs } from 'react-router-dom';

import { store } from '@/redux';
import { setCredentials } from '@/redux/auth/authSlice';
import { authApiSlice } from '@/redux/auth/authApiSlice';

import type { ILoginRequest } from '@/types/api/auth';

export const loginAction = async ({
    request
}: ActionFunctionArgs<ILoginRequest>): Promise<Response | null> => {
    const formData = await request.formData();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const loginPayload: ILoginRequest = {
        email,
        password
    };

    try {
        const { data, error } = await store.dispatch(
            authApiSlice.endpoints.login.initiate(loginPayload)
        );

        if (error) {
            if ('status' in error && error.status === HTTP.UNAUTHORIZED) {
                toast.error('Mismatching credentials');

                return null;
            }

            throw Error();
        }

        store.dispatch(setCredentials(data));

        toast.success("You've been logged in successfully");

        return redirect('/');
    } catch {
        toast.error('Something went wrong...');

        return null;
    }
};
