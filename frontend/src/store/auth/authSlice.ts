import { createSlice, SerializedError } from '@reduxjs/toolkit';

import { login, register } from '@/store/auth/authActions';

import type { IErrorResponse } from '@/types/api/common';

interface InitState {
    error: Pick<IErrorResponse, 'error'> | SerializedError;
}

const initialState: InitState = {
    error: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
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

export default authSlice.reducer;
