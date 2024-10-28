import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Index from '@/views/pages/Index';
import Login from '@/views/pages/Login';
import AuthLayout from '@/views/layouts/Auth';
import Register from '@/views/pages/Register';
import DefaultLayout from '@/views/layouts/Default';
import { action as registerAction } from '@/views/actions/register.action';

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Index />} />
            </Route>

            <Route path="/" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route
                    path="register"
                    element={<Register />}
                    action={registerAction}
                />
            </Route>
        </>
    )
);

const App = () => (
    <>
        <RouterProvider router={router} />

        <ToastContainer position="bottom-center" theme="colored" />
    </>
);

export default App;
