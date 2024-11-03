import { createSlice, SerializedError } from '@reduxjs/toolkit';

import { login, register } from '@/store/auth/authActions';

import type { IErrorResponse } from '@/types/api/common';

interface InitState {
    token: string | null;
    error: Pick<IErrorResponse, 'error'> | SerializedError;
}

const initialState: InitState = {
    token: localStorage.getItem('token') || null,
    error: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token;
        },
        logout: state => {
            state.token = null;
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
