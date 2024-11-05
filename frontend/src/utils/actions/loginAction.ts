import { toast } from 'react-toastify';
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

    const data: ILoginRequest = {
        email,
        password
    };

    try {
        const response = await store.dispatch(
            authApiSlice.endpoints.login.initiate(data)
        );

        if ('error' in response) {
            // @TODO
            toast.error('Error response!');

            return null;
        }

        store.dispatch(setCredentials(response.data));

        toast.success("You've been logged in successfully!");

        return redirect('/');
    } catch {
        // @TODO
        toast.error('Something went wrong...');

        return null;
    }
};
