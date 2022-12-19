import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const blogList = createAsyncThunk(
    'blogList/blogList',
    async (thunkAPI) => {
        const {data} = await axios.get('http://127.0.0.1:8000/api/posts/')
        return data
    }
)

export const blogListSlice = createSlice({
    name: 'blogList',
    initialState: { blogs: [] },
    reducers: {},
    extraReducers: {
        [blogList.pending]: (state) => {
            state.loading = true
        },
        [blogList.fulfilled]: (state, action) => {
            state.loading = false
            state.blogs = action.payload
        },
        [blogList.rejected]: (state, action) =>{
            state.loading = false
            state.error = action.error.message
        },
    },

})

export const blogListReducer = blogListSlice.reducer