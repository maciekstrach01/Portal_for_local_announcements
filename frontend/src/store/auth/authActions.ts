import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from '@/plugins/axios';

import type { IRegisterRequest, IRegisterResponse } from '@/types/api/auth';

export const register = createAsyncThunk(
    'auth/register',
    async (data: IRegisterRequest, thunkApi): Promise<void> => {
        try {
            const {
                data: { token }
            }: IRegisterResponse = await axios.post('/v1/auth/register', data);

            localStorage.setItem('token', token);

            // @TODO Toast
            alert('Registered successfully');
        } catch (err) {
            // @TODO Extend
            console.error(err);

            // @TODO Toast
            alert('Error on register!');

            throw thunkApi.rejectWithValue({
                error: 'Something went wrong on register'
            });
        }
    }
);
