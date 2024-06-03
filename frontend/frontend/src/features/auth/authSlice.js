import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    message: '',
    isLoading: false,
    token: user ? user.token : null,
    
}

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await authService.register(userData);
        return response.data;
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
}) 

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await authService.login(userData);
        return response.data;
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
}) 

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        await authService.logout();
        return thunkAPI.rejectWithValue('User logged out');
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
}) 




export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.user = null;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
            state.isLoading = false;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
         .addCase(register.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isSuccess = true;
            state.message = 'User registered successfully';
         })
         .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         }) 

         .addCase (login.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isSuccess = true;
            state.message = 'User logged in successfully';
         })
         .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.isSuccess = true;
            state.message = 'User logged out successfully';
         })
    }
})
export const { reset } = authSlice.actions;
export default authSlice.reducer;
