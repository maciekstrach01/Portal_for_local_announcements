import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const Header = () => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        !!localStorage.getItem('token')
    );

    const doLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);

        toast.success("You've been logged out!");

        navigate('/');
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

            <Link
                to="/demo"
                className="flex items-center gap-2 hover:text-gray-600"
            >
                Demo
            </Link>

            <div className="flex gap-2">
                {isLoggedIn ? (
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
