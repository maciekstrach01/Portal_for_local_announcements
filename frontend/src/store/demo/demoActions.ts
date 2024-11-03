import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes as HTTP } from 'http-status-codes';

import axios from '@/plugins/axios';

import type { AxiosError } from 'axios';
import type { IErrorResponse } from '@/types/api/common';

export const demo = createAsyncThunk('demo/demo', async (): Promise<string> => {
    try {
        const token = localStorage.getItem('token') || '';

        const { data }: { data: string } = await axios.get('/v1/demo', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        console.log('action', data);

        return data;
    } catch (err) {
        const error = err as AxiosError<IErrorResponse>;

        if (error.response?.status === HTTP.UNAUTHORIZED) {
            toast.error('Unauthorized');

            throw err;
        }

        throw err;
    }
});
