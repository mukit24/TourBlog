import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
    'user/login',
    async ({ username, password }, thunkAPI) => {
        try {
            const config = {
                'Content-type': 'application/json'
            }

            const { data } = await axios.post('http://127.0.0.1:8000/api/user/login/',
                { 'username': username, 'password': password },
                config)
            localStorage.setItem('userInfo', JSON.stringify(data))
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.detail)
        }
    }
)

export const register = createAsyncThunk(
    'user/register',
    async ({ username, email, password }, thunkAPI) => {
        try {
            const config = {
                'Content-type': 'application/json'
            }

            const { data } = await axios.post('http://127.0.0.1:8000/api/user/register/',
                { 'username': username, 'email': email, 'password': password },
                config)
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.detail)
        }
    }
)



const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

export const userSlice = createSlice({
    name: 'user',
    initialState: { userInfo: userInfoFromStorage },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userInfo')
            state.userInfo = null
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false
            state.userInfo = action.payload
        },
        [login.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [register.pending]: (state) => {
            state.loading = true
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false
            state.success_reg = true
        },
        [register.rejected]: (state, action) => {
            state.loading = false
            state.success_reg = false
            state.error = action.payload
        },
    },

})

export const { logout } = userSlice.actions
export const userReducer = userSlice.reducer