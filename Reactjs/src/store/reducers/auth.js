import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../api/auth'

const initialState = {
    user: null,
    _token: null,
    error: "",
    loading: false,
}

export const auth = createSlice({
    name: 'auth',
    initialState ,
    extraReducers: (builder) => {
        // Login Api
        builder.
          addCase(login.pending, (state, action) => {
          state.loading = true;
          }).
          addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            localStorage.setItem("_token", action.payload.access_token);
            state.user = action.payload;
          }).
            addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });

        // Register API
        builder.
          addCase(register.pending, (state, action) => {
            state.loading = true;
          }).
          addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            localStorage.setItem("_token", action.payload.access_token);
            state.user = action.payload;
          }).
          addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });
    }
})

export default auth.reducer;