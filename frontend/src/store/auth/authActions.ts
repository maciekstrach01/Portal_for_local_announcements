import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes as HTTP } from 'http-status-codes';

import axios from '@/plugins/axios';

import type { AxiosError } from 'axios';
import type { IErrorResponse } from '@/types/api/common';
import {
    ILoginRequest,
    ILoginResponse,
    IRegisterRequest,
    IRegisterResponse
} from '@/types/api/auth';

export const register = createAsyncThunk(
    'auth/register',
    async (data: IRegisterRequest, { rejectWithValue }): Promise<void> => {
        try {
            const {
                data: { token }
            }: IRegisterResponse = await axios.post('/v1/auth/register', data);

            localStorage.setItem('token', token);

            toast.success("You've been registered successfully!");
        } catch (err) {
            const error = err as AxiosError<IErrorResponse>;

            if (error.response?.status === HTTP.BAD_REQUEST) {
                toast.error('Recheck your form');

                throw rejectWithValue({
                    error: error.response.data.error
                });
            }

            toast.error('Something went wrong...');

            throw err;
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (data: ILoginRequest): Promise<void> => {
        try {
            const {
                data: { token }
            }: ILoginResponse = await axios.post('/v1/auth/login', data);

            localStorage.setItem('token', token);

            toast.success("You've been logged in successfully!");
        } catch (err) {
            const error = err as AxiosError<IErrorResponse>;

            if (error.response?.status === HTTP.UNAUTHORIZED) {
                toast.error('Mismatching credentials');

                throw err;
            }

            if (error.response?.status === HTTP.BAD_REQUEST) {
                toast.error('Recheck your form');

                throw err;
            }

            toast.error('Something went wrong...');

            throw err;
        }
    }
);
