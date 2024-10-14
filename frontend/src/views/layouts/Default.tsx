import { Outlet } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Default = () => (
    <div>
        <Header />

        <main className="w-full min-h-[calc(100vh-96px)] p-4">
            <Outlet />
        </main>

        <Footer />
    </div>
);

export default Default;
