import { redirect } from 'react-router-dom';

import { RootState, store } from '@/redux';

export const requireAuth = async (request: Request): Promise<null> => {
    const pathname = new URL(request.url).pathname;
    const authState = (store.getState() as RootState).auth;

    if (!authState.loggedIn) {
        throw redirect(
            `/login?redirectTo=${pathname}&message=You must login first`
        );
    }

    return null;
};
