import { createSlice } from '@reduxjs/toolkit';

import { demo } from '@/store/demo/demoActions';

const initialState = {};

export const demoSlice = createSlice({
    name: 'demo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(demo.fulfilled, () => {});

        builder.addCase(demo.rejected, () => {});
    }
});

export default demoSlice.reducer;
