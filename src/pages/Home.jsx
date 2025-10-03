import React from 'react'
import { Card, Row, Col } from 'antd'


export default function Home(){
return (
<div>
<Row gutter={16}>
<Col span={12}>
<Card title="Welcome" style={{ marginBottom: 16 }}>
اپلیکیشن نمونه با React + Antd + Redux Toolkit
</Card>
</Col>
<Col span={12}>
<Card title="Quick Links">
- Items<br />- Profile
</Card>
</Col>
</Row>
</div>
)
}