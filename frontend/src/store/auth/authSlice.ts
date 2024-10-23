import { createSlice } from '@reduxjs/toolkit'

interface InitState {
    loggedIn: boolean;
}

const initialState: InitState = {
    loggedIn: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
})

export default authSlice.reducer