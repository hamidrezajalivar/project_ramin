import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import HeaderBar from './components/HeaderBar'
import FooterBar from './components/FooterBar'
import Login from './pages/Login'
import Home from './pages/Home'
import Items from './pages/Items'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'


const { Content } = Layout


export default function App(){
return (
<Layout style={{ minHeight: '100vh' }}>
<HeaderBar />
<Content style={{ padding: '24px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
<Routes>
<Route path="/login" element={<Login />} />

<Route path="/items" element={<Items />} />
<Route path="/profile" element={<Profile />} />
<Route path="/"  element={<Home />} />
</Routes>
</Content>
<FooterBar />
</Layout>
)
}