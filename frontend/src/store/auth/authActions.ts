import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from '@/plugins/axios';

// @TODO Finish
export const regster = createAsyncThunk('auth/register', async () => {
    try {
        await axios.post('/auth/regster');

        alert('Registered');
    } catch (err) {
        alert('Error on register!');

        throw err;
    }
});