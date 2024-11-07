import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import { store, RootState } from '@/redux';

import { useLogoutMutation } from '@/redux/auth/authApiSlice';
import { adjustUsedToken, logoutUser } from '@/redux/auth/authSlice';

const Header = () => {
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const { loggedIn } = useSelector((state: RootState) => state.auth);

    const navigate = useNavigate();

    // @TODO Refactor
    const doLogout = async () => {
        try {
            const authState = (store.getState() as RootState).auth;

            dispatch(adjustUsedToken(authState.refreshToken));

            await logout().unwrap();

            dispatch(logoutUser());

            toast.success("You've been logged out!");

            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header className="flex justify-between items-center w-full h-16 p-4">
            <Link
                to="/"
                className="flex items-center gap-2 hover:text-gray-600"
            >
                <CheckCircleIcon className="size-6" />
                <h1 className="font-bold text-2xl">Local Announcements</h1>
            </Link>

            <div className="flex gap-2">
                <Link
                    to="/demo"
                    className="flex items-center gap-2 hover:text-gray-600"
                >
                    Demo
                </Link>

                {loggedIn ? (
                    <button
                        className="hover:text-gray-600"
                        onClick={async () => doLogout()}
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="login" className="hover:text-gray-600">
                            Login
                        </Link>
                        <Link to="register" className="hover:text-gray-600">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
