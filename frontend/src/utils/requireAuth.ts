import { redirect } from 'react-router-dom';

export const requireAuth = async (): Promise<null> => {
    console.log('requireAuth');

    const token = localStorage.getItem('token');

    if (!token) {
        throw redirect('/login?message=You must login first');
    }

    return null;
};
