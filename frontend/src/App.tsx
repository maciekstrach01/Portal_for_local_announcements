import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';

import Index from '@/views/pages/Index';
import Login from '@/views/pages/Login';
import Register from '@/views/pages/Register';
import AuthLayout from '@/views/layouts/Auth';
import DefaultLayout from '@/views/layouts/Default';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Index />} />
            </Route>

            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </>
    )
);

const App = () => <RouterProvider router={router} />;

export default App;
