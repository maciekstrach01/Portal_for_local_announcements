import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Demo from '@/views/pages/Demo';
import Index from '@/views/pages/Index';
import Login from '@/views/pages/Login';
import AuthLayout from '@/views/layouts/Auth';
import NotFound from '@/views/pages/NotFound';
import Register from '@/views/pages/Register';
// import { requireAuth } from '@/utils/requireAuth'; // @TODO
import DefaultLayout from '@/views/layouts/Default';
import { demoLoader } from '@/utils/loaders/demoLoader';
import { loginAction } from '@/utils/actions/loginAction';
import { registerAction } from '@/utils/actions/registerAction';

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Index />} />

                {/*<Route loader={requireAuth}>*/}
                <Route path="/demo" element={<Demo />} loader={demoLoader} />
                {/*</Route>*/}

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
