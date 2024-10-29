import { ActionFunctionArgs, redirect } from 'react-router-dom';

import { store } from '@/store';
import { register } from '@/store/auth/authActions';

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

    const response = await store.dispatch(register(data));

    return response.meta.requestStatus === 'fulfilled' ? redirect('/') : null;
};
