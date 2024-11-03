import { ActionFunctionArgs, redirect } from 'react-router-dom';

import { store } from '@/store';
import { login } from '@/store/auth/authActions';

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

    const response = await store.dispatch(login(data));

    return response.meta.requestStatus === 'fulfilled' ? redirect('/') : null;
};
