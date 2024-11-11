import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { RootState } from '@/redux';

const GuestRoute = () => {
    const { loggedIn } = useSelector((state: RootState) => state.auth);

    if (loggedIn) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default GuestRoute;
