import { useState } from 'react';
import {
    HomeIcon,
    UserIcon,
    PlusCircleIcon,
    ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Menu from './Menu';
import { RootState } from '@/redux';

// @TODO Remove all demo related stuff - not necessary anymore
// @TODO Close menu on item click
// @TODO Close menu on click outside

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { loggedIn } = useSelector((state: RootState) => state.auth);

    const toggleMenu = () => {
        setIsMenuOpen(oldValue => !oldValue);
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
            </div>

            <div className="flex gap-2.5">
                {/*// @TODO Temporary link*/}
                <Link
                    to="demo"
                    className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500"
                >
                    <PlusCircleIcon className="h-5 w-5" />
                </Link>

                {loggedIn ? (
                    <div className="relative">
                        <button
                            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200"
                            onClick={toggleMenu}
                        >
                            <UserIcon className="h-5 w-5 text-slate-700" />
                        </button>

                        {isMenuOpen && <Menu />}
                    </div>
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
