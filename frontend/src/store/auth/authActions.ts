import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes as HTTP } from 'http-status-codes';

import axios from '@/plugins/axios';

import type { AxiosError } from 'axios';
import type { IErrorResponse } from '@/types/api/common';
import type { IRegisterRequest, IRegisterResponse } from '@/types/api/auth';

export const register = createAsyncThunk(
    'auth/register',
    async (data: IRegisterRequest, { rejectWithValue }): Promise<void> => {
        try {
            const {
                data: { token }
            }: IRegisterResponse = await axios.post('/v1/auth/register', data);

            localStorage.setItem('token', token);
        } catch (err) {
            const error = err as AxiosError<IErrorResponse>;

            if (error.response?.status === HTTP.BAD_REQUEST) {
                throw rejectWithValue({
                    error: error.response.data.error
                });
            }

            throw err;
        }
    }
);
