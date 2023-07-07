import {createSlice} from '@reduxjs/toolkit';

// Create a slice to check if the user is logged in or logged out
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
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
        }
    }
});

export const {login, logout, updateUser} = authSlice.actions;
export default authSlice.reducer;