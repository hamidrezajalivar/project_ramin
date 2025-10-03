import React from 'react'
import { Card } from 'antd'
import { useSelector } from 'react-redux'


export default function Profile(){
const auth = useSelector(s => s.auth)
return (
<Card title="Profile">
<div>نام: {auth.user?.name}</div>
<div>توکن: {auth.token ? '✔︎' : '—'}</div>
</Card>
)
}