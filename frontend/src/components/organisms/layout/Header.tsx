import {
    CheckCircleIcon,
    ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="flex justify-between items-center w-full h-16 p-4">
            <Link
                to="/"
                className="flex items-center gap-2 hover:text-gray-600"
            >
                <CheckCircleIcon className="size-6" />
                <h1 className="font-bold text-2xl">Web App</h1>
            </Link>

            <Link to="login" className="hover:text-gray-600">
                <ArrowRightEndOnRectangleIcon className="size-6" />
            </Link>
        </header>
    );
};

export default Header;
