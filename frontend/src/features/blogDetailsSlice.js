import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const blogDetails = createAsyncThunk(
    'blogDetails/blogDetails',
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.get(`http://127.0.0.1:8000/api/posts/${id}`)
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

export const blogDetailsSlice = createSlice({
    name: 'blogDetails',
    initialState: { blog: [] },
    reducers: {},
    extraReducers: {
        [blogDetails.pending]: (state) => {
            state.loading = true
        },
        [blogDetails.fulfilled]: (state, action) => {
            state.loading = false
            state.blog = action.payload
        },
        [blogDetails.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },

})

export const blogDetailsReducer = blogDetailsSlice.reducer