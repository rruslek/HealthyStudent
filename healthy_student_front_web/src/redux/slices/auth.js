import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../../axios';

export const fetchUserData = createAsyncThunk('auth/fetchUseData', async (params) => {
    const { data } = await instance.post('/api/v1/auth/authenticate', params);
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchUserData.pending, state => {
            state.status = 'loading';
            state.data = null;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        })
        .addCase(fetchUserData.rejected, state => {
            state.status = 'error';
            state.data = null;
        })
    }
})

export const selectIsAuth = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions;