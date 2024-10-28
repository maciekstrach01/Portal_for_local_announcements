import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Header = () => {
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
                <Link to="login" className="hover:text-gray-600">
                    Login
                </Link>
                <Link to="register" className="hover:text-gray-600">
                    Register
                </Link>
            </div>
        </header>
    );
};

export default Header;
