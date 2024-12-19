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
import AddAnnouncement from '@/views/pages/announcement/Add';
import ChangePassword from '@/views/pages/user/ChangePassword';
import { loginAction } from '@/router/actions/auth/loginAction';
import { registerAction } from '@/router/actions/auth/registerAction';
import AnonymousRoute from '@/components/organisms/router/AnonymousRoute';
import ProtectedRoute from '@/components/organisms/router/ProtectedRoute';
import { addEditAnnouncementLoader } from '@/router/loaders/announcement/addEditAnnouncementLoader';

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Index />} />

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="user/change-password"
                        element={<ChangePassword />}
                    />
                    <Route
                        path="announcements/add"
                        loader={addEditAnnouncementLoader}
                        element={<AddAnnouncement />}
                    />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<AnonymousRoute />}>
                <Route path="/" element={<AuthLayout />}>
                    <Route
                        path="login"
                        element={<Login />}
                        action={loginAction}
                    />
                    <Route
                        path="register"
                        element={<Register />}
                        action={registerAction}
                    />
                </Route>
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
