import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ITokensResponse } from '@/types/api/auth';

const initialState = {
    loggedIn: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<ITokensResponse>) => {
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            state.loggedIn = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logoutUser: state => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.loggedIn = false;
            state.accessToken = null;
            state.refreshToken = null;
        }
    }
});

export const { setCredentials, logoutUser } = authSlice.actions;

export default authSlice.reducer;
