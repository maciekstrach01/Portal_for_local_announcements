import { createSlice, SerializedError } from '@reduxjs/toolkit';

import type { IErrorResponse } from '@/types/api/common';

interface InitState {
    loggedIn: boolean;
    usedToken: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    error: Pick<IErrorResponse, 'error'> | SerializedError;
}

const initialState: InitState = {
    loggedIn: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    usedToken: localStorage.getItem('accessToken'),
    // @TODO Do I still need it?
    error: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
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
        adjustUsedToken: (state, action) => {
            state.usedToken = action.payload;
        },
        // @TODO Do I still need it?
        clearError: state => {
            state.error = {};
        }
    }
});

export const { setCredentials, logoutUser, adjustUsedToken, clearError } =
    authSlice.actions;

export default authSlice.reducer;
