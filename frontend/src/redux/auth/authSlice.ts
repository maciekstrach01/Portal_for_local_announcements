import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ITokenResponse } from '@/types/api/auth';

const initialState = {
    loggedIn: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    usedToken: localStorage.getItem('accessToken')
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<ITokenResponse>) => {
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            state.loggedIn = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.usedToken = action.payload.accessToken;
        },
        logoutUser: state => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.loggedIn = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.usedToken = null;
        },
        adjustUsedToken: (state, action: PayloadAction<string | null>) => {
            state.usedToken = action.payload;
        }
    }
});

export const { setCredentials, logoutUser, adjustUsedToken } =
    authSlice.actions;

export default authSlice.reducer;
