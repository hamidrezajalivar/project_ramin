import React from 'react'
import { Form, Input, Button, Card, notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'


export default function Login(){
const dispatch = useDispatch()
const auth = useSelector(s => s.auth)
const nav = useNavigate()


const onFinish = async (values) => {
try {
const res = await dispatch(login(values)).unwrap()
notification.success({ message: 'ورود موفق', description: `خوش آمدید ${res.user.name}` })
nav('/')
} catch (err) {
notification.error({ message: 'خطا', description: 'نام کاربری یا رمز عبور اشتباه است' })
}
}


return (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
<Card style={{ width: 420 }}>
<h2 style={{ textAlign: 'center' }}>ورود</h2>
<Form layout="vertical" onFinish={onFinish}>
<Form.Item name="username" label="نام کاربری" rules={[{ required: true }]}>
<Input />
</Form.Item>
<Form.Item name="password" label="رمز عبور" rules={[{ required: true }]}>
<Input.Password />
</Form.Item>
<Form.Item>
<Button type="primary" htmlType="submit" block loading={auth.status === 'loading'}>ورود</Button>
</Form.Item>
</Form>
<div style={{ fontSize: 12, color: '#666' }}>برای تست: username: <b>admin</b> / password: <b>password</b></div>
</Card>
</div>
)
}