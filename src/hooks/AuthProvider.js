import { useContext, createContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../configs/api'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const navigate = useNavigate()
  const loginAction = async (data) => {
    try {
      const response = await axios.post(API_URL+'login', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const res = response.data
      if (res.data) {
        setUser(res.data.user)
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        if (res.data.user.role === 'ADMIN') {
          return navigate('/')
        } else {
          return navigate('/my-profile')
        }
      }
      throw new Error(res.message)
    } catch (err) {
      console.error(err)
    }
  }

  const logOut = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider

export const useAuth = () => {
  return useContext(AuthContext)
}