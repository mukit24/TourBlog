import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const blogList = createAsyncThunk(
    'blog/blogList',
    async (thunkAPI) => {
        const {data} = await axios.get('http://127.0.0.1:8000/api/posts/')
        return data
    }
)

export const blogSlice = createSlice({
    name: 'blog',
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
        [blogList.rejected]: (state) =>{

        },
    },

})

export const blogReducer = blogSlice.reducer