import { createSlice, SerializedError } from '@reduxjs/toolkit';

import { login, register } from '@/store/auth/authActions';

import type { IErrorResponse } from '@/types/api/common';

interface InitState {
    accessToken: string | null;
    refreshToken: string | null;
    error: Pick<IErrorResponse, 'error'> | SerializedError;
}

const initialState: InitState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('accessToken') || null,
    error: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout: state => {
            state.accessToken = null;
            state.refreshToken = null;
        },
        clearError: state => {
            state.error = {};
        }
    },
    extraReducers: builder => {
        builder.addCase(register.fulfilled, state => {
            state.error = {};
        });
        builder.addCase(register.rejected, (state, action) => {
            state.error = action.payload ? action.payload : action.error;
        });
        builder.addCase(login.fulfilled, state => {
            state.error = {};
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload ? action.payload : action.error;
        });
    }
});

export const { setCredentials, logout, clearError } = authSlice.actions;

export default authSlice.reducer;
