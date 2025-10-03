import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'


export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
const resp = await api.post('/auth/login', { username, password })
return resp.data
})


const authSlice = createSlice({
name: 'auth',
initialState: { user: null, token: null, status: 'idle', error: null },
reducers: {
logout(state) {
state.user = null
state.token = null
},
},
extraReducers: (builder) => {
builder
.addCase(login.pending, (state) => { state.status = 'loading' })
.addCase(login.fulfilled, (state, action) => {
state.status = 'succeeded'
state.user = action.payload.user
state.token = action.payload.token
})
.addCase(login.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message
})
}
})


export const { logout } = authSlice.actions
export default authSlice.reducer