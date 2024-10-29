import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tasks: {
        items: [],
        status: 'loading'
    }
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducer: {}
});

export const tasksReducer = tasksSlice.reducer;