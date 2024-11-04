import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes as HTTP } from 'http-status-codes';

import axios from '@/plugins/axios';

import type { AxiosError } from 'axios';
import type { IErrorResponse } from '@/types/api/common';

export const demo = createAsyncThunk('demo/demo', async (): Promise<string> => {
    try {
        const accessToken = localStorage.getItem('accessToken') || '';

        const { data }: { data: string } = await axios.get('/v1/demo', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        console.log('action', data);

        return data;
    } catch (err) {
        console.log(err);

        const error = err as AxiosError<IErrorResponse>;

        if (error.response?.status === HTTP.UNAUTHORIZED) {
            toast.error('Unauthorized');

            throw err;
        }

        throw err;
    }
});
