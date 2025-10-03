
import { http, HttpResponse } from 'msw'

let items = Array.from({ length: 34 }).map((_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description: `Description ${i + 1}`,
}))

export const handlers = [
  // login
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = await request.json()
    if (username === 'admin' && password === 'password') {
      return HttpResponse.json({
        token: 'fake-jwt-token',
        user: { id: 1, name: 'Admin' },
      })
    }
    return new HttpResponse(
      JSON.stringify({ message: 'Invalid credentials' }),
      { status: 401 }
    )
  }),

  // get items with pagination
  http.get('/api/items', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)
    const start = (page - 1) * pageSize
    const paged = items.slice(start, start + pageSize)

    return HttpResponse.json({
      items: paged,
      total: items.length,
    })
  }),

  // create item
  http.post('/api/items', async ({ request }) => {
    const body = await request.json()
    const newItem = { id: items.length + 1, ...body }
    items.unshift(newItem)
    return new HttpResponse(JSON.stringify(newItem), { status: 201 })
  }),

  // delete item
  http.delete('/api/items/:id', ({ params }) => {
    const { id } = params
    items = items.filter((i) => String(i.id) !== String(id))
    return HttpResponse.json({ id })
  }),
]
