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
import NotFound from '@/views/pages/NotFound';
import Register from '@/views/pages/Register';
import DefaultLayout from '@/views/layouts/Default';
import { loginAction } from '@/views/actions/loginAction';
import { registerAction } from '@/views/actions/registerAction';

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Index />} />

                <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/" element={<AuthLayout />}>
                <Route path="login" element={<Login />} action={loginAction} />
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
