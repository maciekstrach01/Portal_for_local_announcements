import { createSlice, SerializedError } from '@reduxjs/toolkit';

import { register } from '@/store/auth/authActions';

import type { IErrorResponse } from '@/types/api/common';

interface InitState {
    loggedIn: boolean;
    error: Pick<IErrorResponse, 'error'> | SerializedError;
}

const initialState: InitState = {
    loggedIn: false,
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
    }
});

export default authSlice.reducer;
