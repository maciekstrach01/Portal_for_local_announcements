import { Outlet } from 'react-router-dom';

import Header from '@/components/organisms/layout/Header';

const Default = () => (
    <div>
        <Header />

        <main className="w-full md:max-w-250 mx-auto min-h-[calc(100vh-64px)] p-4">
            <Outlet />
        </main>
    </div>
);

export default Default;
