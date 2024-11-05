import { toast } from 'react-toastify';
import { redirect, ActionFunctionArgs } from 'react-router-dom';

import { store } from '@/redux';
import { setCredentials } from '@/redux/auth/authSlice';
import { authApiSlice } from '@/redux/auth/authApiSlice';

import type { IRegisterRequest } from '@/types/api/auth';

export const registerAction = async ({
    request
}: ActionFunctionArgs<IRegisterRequest>): Promise<Response | null> => {
    const formData = await request.formData();

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    const data: IRegisterRequest = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    };

    try {
        const response = await store.dispatch(
            authApiSlice.endpoints.register.initiate(data)
        );

        if ('error' in response) {
            // @TODO
            toast.error('Error response!');

            return null;
        }

        store.dispatch(setCredentials(response.data));

        toast.success("You've been registered successfully!");

        return redirect('/');
    } catch {
        // @TODO
        toast.error('Something went wrong...');

        return null;
    }
};
