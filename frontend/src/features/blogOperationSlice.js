import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const create = createAsyncThunk(
    'blogOperation/create',
    async ({ title, description }, { rejectWithValue, getState }) => {
        try {
            const { user: { userInfo } } = getState();

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }

            const { data } = await axios.post('http://127.0.0.1:8000/api/posts/create/',
                { 'title': title, 'content': description },
                config)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
        }
    }
)


export const blogOperationSlice = createSlice({
    name: 'blogOperation',
    initialState: {},
    reducers: {
        resetOp: (state) => {
            state = { }
        }
    },
    extraReducers: {
        [create.pending]: (state) => {
            state.loading = true
        },
        [create.fulfilled]: (state) => {
            state.loading = false
            state.success = true
        },
        [create.rejected]: (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
        },
    },

})

export const {resetOp} = blogOperationSlice.actions
export const blogOperationReducer = blogOperationSlice.reducer