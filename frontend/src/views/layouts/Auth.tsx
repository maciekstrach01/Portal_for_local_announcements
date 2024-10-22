import { Outlet } from 'react-router-dom';

const Auth = () => (
    <div>
        {/*// @TODO Refactor color*/}
        <div className="w-screen h-screen flex items-center justify-center bg-[#4D47C3]">
            <main className="w-full max-w-96 m-4 p-8 bg-white rounded-2xl">
                <Outlet />
            </main>
        </div>
    </div>
);

export default Auth;
