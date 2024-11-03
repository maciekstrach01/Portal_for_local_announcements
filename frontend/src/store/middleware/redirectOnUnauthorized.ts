import { useNavigate } from 'react-router-dom';

import type { RootState, AppDispatch } from '@/store';
import { Middleware } from '@reduxjs/toolkit';

export const redirectOnUnauthorized: Middleware<{}, RootState, AppDispatch> =
    store => next => action => {
        // @TODO Change
        if (action.type !== undefined && action.payload.status === 401) {
            const navigate = useNavigate();

            navigate('/login?message=Session expired'); // Redirect to login page
        }

        return next(action);
    };
