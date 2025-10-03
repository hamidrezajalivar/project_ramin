import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import store from './store'
import App from './App'


// start MSW in dev
if (import.meta.env.DEV) {
const { worker } = await import('./mocks/browser')
worker.start()
}


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<Provider store={store}>
<BrowserRouter>
<ConfigProvider>
<App />
</ConfigProvider>
</BrowserRouter>
</Provider>
</React.StrictMode>
)