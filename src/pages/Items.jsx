import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import axios from 'axios'

export default function Items() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products")
        setResult(data)
      } catch (err) {
        console.error("خطا در گرفتن دیتا:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const cols = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Description', dataIndex: 'description' },
  ]

  if (loading) return <span>در حال بارگذاری...</span>

  return (
    <div>
      <Table
        columns={cols}
        rowKey="id"
        dataSource={result}
        pagination={{ pageSize: 5 }}
      />
    </div>
  )
}
