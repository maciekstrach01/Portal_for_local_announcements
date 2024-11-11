import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StatusCodes as HTTP } from 'http-status-codes';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import { store, RootState } from '@/redux';
import { logoutUser } from '@/redux/auth/authSlice';
import { useLogoutMutation } from '@/redux/auth/authApiSlice';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const Header = () => {
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();
    const { loggedIn } = useSelector((state: RootState) => state.auth);

    const doLogout = async () => {
        try {
            const authState = (store.getState() as RootState).auth;

            if (authState.refreshToken) {
                await logout(authState.refreshToken).unwrap();
            }

            dispatch(logoutUser());

            toast.success("You've been logged out");
        } catch (error) {
            const fetchError = error as FetchBaseQueryError;

            if (
                'status' in fetchError &&
                fetchError.status === HTTP.UNAUTHORIZED
            ) {
                toast.success("You've been logged out");

                return;
            }

            toast.error('Error on logging out!');
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
                    Demo (auth)
                </Link>

                {loggedIn ? (
                    <button className="hover:text-gray-600" onClick={doLogout}>
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
