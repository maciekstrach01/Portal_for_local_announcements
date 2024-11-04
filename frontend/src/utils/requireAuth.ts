import { redirect } from 'react-router-dom';

export const requireAuth = async (): Promise<null> => {
    console.log('requireAuth');

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        throw redirect('/login?message=You must login first');
    }

    return null;
};
