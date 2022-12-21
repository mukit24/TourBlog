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

export const updateBlog = createAsyncThunk(
    'blogOperation/update',
    async ({ id, title, description }, { rejectWithValue, getState }) => {
        try {
            const { user: { userInfo } } = getState();

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }

            const { data } = await axios.put(`http://127.0.0.1:8000/api/posts/${id}/update_delete/`,
                { 'title': title, 'content': description },
                config)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
        }
    }
)

export const deleteBlog = createAsyncThunk(
    'blogOperation/delete',
    async (id, { rejectWithValue, getState }) => {
        try {
            const { user: { userInfo } } = getState();

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }

            const { data } = await axios.delete(`http://127.0.0.1:8000/api/posts/${id}/update_delete/`, config)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
        }
    }
)

export const reactBlog = createAsyncThunk(
    'blogOperation/react',
    async (id, { rejectWithValue, getState }) => {
        try {
            const { user: { userInfo } } = getState();
            console.log(userInfo)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }

            const { data } = await axios.post(`http://127.0.0.1:8000/api/posts/${id}/love_react/`, {} ,config)
            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.msg)
        }
    }
)

export const createComment = createAsyncThunk(
    'blogOperation/createComment',
    async ({ id, comment }, { rejectWithValue, getState }) => {
        try {
            const { user: { userInfo } } = getState();

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }

            const { data } = await axios.post(`http://127.0.0.1:8000/api/comment/${id}/create/`,
                { 'content': comment},
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
            state.success = false
            state.react_error = false
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
        [updateBlog.pending]: (state) => {
            state.loading = true
        },
        [updateBlog.fulfilled]: (state) => {
            state.loading = false
            state.success = true
        },
        [updateBlog.rejected]: (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
        },
        [deleteBlog.pending]: (state) => {
            state.loading = true
            state.success = false
        },
        [deleteBlog.fulfilled]: (state) => {
            state.loading = false
            state.success = true
        },
        [deleteBlog.rejected]: (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
        },
        [reactBlog.pending]: (state) => {
            state.loading = true
            state.react_success = false
        },
        [reactBlog.fulfilled]: (state) => {
            state.loading = false
            state.react_success = true
        },
        [reactBlog.rejected]: (state, action) => {
            state.loading = false
            state.success = false
            state.react_error = action.payload
        },
        [createComment.pending]: (state) => {
            state.loading = true
        },
        [createComment.fulfilled]: (state) => {
            state.loading = false
            state.success = true
        },
        [createComment.rejected]: (state) => {
            state.loading = false
            state.success = false
        },
    },

})

export const {resetOp} = blogOperationSlice.actions
export const blogOperationReducer = blogOperationSlice.reducer