import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'


export const fetchItems = createAsyncThunk('items/fetch', async ({ page = 1, pageSize = 10 } = {}) => {
const resp = await api.get('/items', { params: { page, pageSize } })
return resp.data
})


export const createItem = createAsyncThunk('items/create', async (payload) => {
const resp = await api.post('/items', payload)
return resp.data
})


export const deleteItem = createAsyncThunk('items/delete', async (id) => {
await api.delete(`/items/${id}`)
return id
})


const slice = createSlice({
name: 'items',
initialState: { list: [], total: 0, status: 'idle', error: null },
reducers: {},
extraReducers: (builder) => {
builder
.addCase(fetchItems.fulfilled, (state, action) => {
state.list = action.payload.items
state.total = action.payload.total
state.status = 'succeeded'
})
.addCase(fetchItems.pending, (state) => { state.status = 'loading' })
.addCase(fetchItems.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message })
.addCase(createItem.fulfilled, (state, action) => { state.list.unshift(action.payload); state.total += 1 })
.addCase(deleteItem.fulfilled, (state, action) => { state.list = state.list.filter(i => i.id !== action.payload); state.total -= 1 })
}
})


export default slice.reducer