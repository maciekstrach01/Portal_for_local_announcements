import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '@/redux/apiSlice';
import authReducer from '@/redux/auth/authSlice';
import demoReducer from '@/redux/demo/demoSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        demo: demoReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true // @TODO Remove on Prod
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
