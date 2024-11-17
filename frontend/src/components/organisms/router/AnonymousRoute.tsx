import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import type { RootState } from '@/redux';

const AnonymousRoute = () => {
    const { loggedIn } = useSelector((state: RootState) => state.auth);

    return loggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default AnonymousRoute;
