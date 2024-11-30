import {
    HomeIcon,
    UserIcon,
    PlusCircleIcon,
    ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOnClickOutside } from 'usehooks-ts';

import Menu from './Menu';
import { RootState } from '@/redux';

// @TODO Show labes on Desktop
// @TODO Remove all demo related stuff - not necessary anymore
const Header = () => {
    const profileRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { loggedIn } = useSelector((state: RootState) => state.auth);

    const openMenu = () => {
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useOnClickOutside(profileRef, closeMenu);

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
                    <div ref={profileRef} className="relative">
                        <button
                            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200"
                            onClick={openMenu}
                        >
                            <UserIcon className="h-5 w-5 text-slate-700" />
                        </button>

                        {isMenuOpen && <Menu closeMenu={closeMenu} />}
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
