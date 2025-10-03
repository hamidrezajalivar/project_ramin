import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'


const { Header } = Layout


export default function HeaderBar() {
const auth = useSelector(s => s.auth)
const dispatch = useDispatch()
const nav = useNavigate()


const doLogout = () => {
dispatch(logout())
nav('/login')
}


return (
<Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
<div style={{ color: 'white', fontWeight: 'bold' }}>MyApp</div>
<Menu theme="dark" mode="horizontal" selectable={false} style={{ flex: 1 }}>
<Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
<Menu.Item key="items"><Link to="/items">Items</Link></Menu.Item>
<Menu.Item key="profile"><Link to="/profile">Profile</Link></Menu.Item>
</Menu>
<div>
{auth.user ? (
<>
<span style={{ color: 'white', marginRight: 12 }}>{auth.user.name}</span>
<Button onClick={doLogout}>Logout</Button>
</>
) : (
<Button onClick={() => nav('/login')}>Login</Button>
)}
</div>
</Header>
)
}