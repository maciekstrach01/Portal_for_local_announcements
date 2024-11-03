import { Link, Outlet } from 'react-router-dom';

const Auth = () => (
    <div>
        <div className="w-screen h-screen flex items-center justify-center bg-primary-500">
            <main className="w-full max-w-128 m-4 p-8 bg-white rounded-2xl text-sm sm:text-base">
                <div className="text-center">
                    <Link
                        to="/"
                        className="text-xl font-bold text-primary-500 hover:text-primary-600 sm:text-2xl"
                    >
                        Local Announcements
                    </Link>
                </div>

                <Outlet />
            </main>
        </div>
    </div>
);

export default Auth;
