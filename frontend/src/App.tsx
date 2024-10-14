import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';

import Index from '@/views/pages/Index';
import Login from '@/views/pages/Login';
import DefaultLayout from '@/views/layouts/Default.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Index />} />

            <Route path="login" element={<Login />} />
        </Route>
    )
);

const App = () => <RouterProvider router={router} />;

export default App;
