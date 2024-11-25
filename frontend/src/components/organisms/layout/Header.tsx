import {
    HomeIcon,
    StarIcon,
    UserIcon,
    PlusCircleIcon,
    RectangleGroupIcon,
    MagnifyingGlassIcon,
    ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StatusCodes as HTTP } from 'http-status-codes';

import { store, RootState } from '@/redux';
import { logoutUser } from '@/redux/auth/authSlice';
import { useLogoutMutation } from '@/redux/auth/authApiSlice';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

// @TODO Remove all demo related stuff - not necessary anymore
// @TODO Add AuthUserOptions and AnonymousOptions
const Header = () => {
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();
    const { loggedIn } = useSelector((state: RootState) => state.auth);

    // @TODO Implement
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
        <header className="flex justify-between items-center w-full h-16 px-4 py-3 bg-primary-500">
            <div className="flex gap-2.5">
                <Link
                    to="/"
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200"
                >
                    <HomeIcon className="h-5 w-5 text-slate-700" />
                </Link>

                {/*// @TODO Temporary link*/}
                <Link
                    to="demo"
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200"
                >
                    <RectangleGroupIcon className="h-5 w-5 text-slate-700" />
                </Link>

                <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200">
                    <MagnifyingGlassIcon className="h-5 w-5 text-slate-700" />
                </button>
            </div>

            <div className="flex gap-2.5">
                <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200">
                    <StarIcon className="h-5 w-5 text-slate-700" />
                </button>

                <button className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500">
                    <PlusCircleIcon className="h-5 w-5" />
                </button>

                {loggedIn ? (
                    <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200">
                        <UserIcon className="h-5 w-5 text-slate-700" />
                    </button>
                ) : (
                    <Link
                        to="login"
                        className="p-2 rounded-full bg-slate-100 hover:bg-slate-200"
                    >
                        <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-slate-700" />
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
