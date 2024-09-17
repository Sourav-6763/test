import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlide = createSlice({
    name: 'auth',
    initialState: { user: "", isLoggedIn: false },  // Capitalize 'S' in 'initialState'
    reducers: {
        login(state){
            state.isLoggedIn=true;
        },
        logout(state){
            state.isLoggedIn=false;
        }
    },  // Empty reducer object
});

export const authActions = authSlide.actions;

export const store = configureStore({
    reducer:authSlide.reducer,  // Wrap the slice reducer in an object
});
