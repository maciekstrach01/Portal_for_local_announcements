import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import type { RootState } from '@/redux';

const ProtectedRoute = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const { loggedIn } = useSelector((state: RootState) => state.auth);

    if (!loggedIn) {
        return (
            <Navigate
                to={`/login?redirectTo=${pathname}&message=You must login first`}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
