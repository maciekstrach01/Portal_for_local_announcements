import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/auth/authSlice';
import demoReducer from '@/store/demo/demoSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        demo: demoReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
