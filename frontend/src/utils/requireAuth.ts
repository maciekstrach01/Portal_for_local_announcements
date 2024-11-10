import { redirect } from 'react-router-dom';

import { RootState, store } from '@/redux';

export const requireAuth = async (): Promise<null> => {
    const authState = (store.getState() as RootState).auth;

    // @TODO You must login first
    if (!authState.loggedIn) {
        throw redirect('/login');
    }

    return null;
};
