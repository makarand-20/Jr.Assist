import {createSlice} from '@reduxjs/toolkit';

// Create a slice to check if the user is logged in or logged out
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        value: null,
        user: null,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            state.value = null;
        },
        updateUserr(state, action) {
            state.value = action.payload;
        }
    }
});

export const {login, logout, updateUserr} = authSlice.actions;
export default authSlice.reducer;