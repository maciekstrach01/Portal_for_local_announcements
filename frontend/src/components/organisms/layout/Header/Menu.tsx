import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StatusCodes as HTTP } from 'http-status-codes';

import { RootState, store } from '@/redux';
import { logoutUser } from '@/redux/auth/authSlice';
import { useLogoutMutation } from '@/redux/auth/authApiSlice';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

interface MenuProps {
    closeMenu: () => void;
}

const Menu = ({ closeMenu }: MenuProps) => {
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

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
        } finally {
            closeMenu();
        }
    };

    return (
        <div className="absolute right-0 flex flex-col items-center gap-2 p-3 mt-2 w-72 bg-white rounded-b-2xl shadow-lg">
            <Link
                to="user/change-password"
                className="w-48 p-2 bg-gray-200 text-center rounded-2xl hover:bg-gray-300"
                onClick={closeMenu}
            >
                Change Password
            </Link>
            <button
                className="w-48 p-2 bg-gray-200 rounded-2xl hover:bg-gray-300"
                onClick={doLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default Menu;
