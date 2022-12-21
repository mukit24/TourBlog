import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseUrl } from './constants';

export const blogList = createAsyncThunk(
    'blogList/blogList',
    async (thunkAPI) => {
        const {data} = await axios.get(`${BaseUrl}/api/posts/`)
        return data
    }
)

export const blogListTrending = createAsyncThunk(
    'blogList/blogListTrending',
    async (thunkAPI) => {
        const {data} = await axios.get(`${BaseUrl}/api/posts_trending/`)
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
        [blogListTrending.pending]: (state) => {
            state.loading = true
        },
        [blogListTrending.fulfilled]: (state, action) => {
            state.loading = false
            state.blogs = action.payload
        },
        [blogListTrending.rejected]: (state, action) =>{
            state.loading = false
            state.error = action.error.message
        },
    },

})

export const blogListReducer = blogListSlice.reducer