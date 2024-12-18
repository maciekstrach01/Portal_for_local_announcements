import { configureStore } from '@reduxjs/toolkit';

import config from '@/config';
import { apiSlice } from '@/redux/apiSlice';
import authReducer from '@/redux/auth/authSlice';
import userReducer from '@/redux/user/userSlice';
import categoryReducer from '@/redux/category/categorySlice';
import announcementReducer from '@/redux/announcement/announcementSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        user: userReducer,
        category: categoryReducer,
        announcement: announcementReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: config.env === 'development'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
