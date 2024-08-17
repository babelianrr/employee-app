import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'

const AdminRoute = () => {
  const auth = useAuth()
  if (!auth.token) return <Navigate to='/login' />
  if (auth?.user?.role !== 'USER') return <Navigate to='/' />
  return <Outlet />
}

export default AdminRoute