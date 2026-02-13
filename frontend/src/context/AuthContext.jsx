// import React, { createContext, useState, useEffect } from 'react'
// import api from '../services/api'

// export const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     const raw = localStorage.getItem('auth')
//     if (raw) setUser(JSON.parse(raw))
//   }, [])

//   const login = async (credentials) => {
//     const res = await api.post('/auth/login', credentials)
//     const { user, token } = res.data
//     localStorage.setItem('auth', JSON.stringify({ user, token }))
//     setUser({ user, token })
//     return res
//   }

//   const logout = () => {
//     localStorage.removeItem('auth')
//     setUser(null)
//   }

//   return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
// }


import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('auth')
    if (raw) {
      const parsed = JSON.parse(raw)
      setUser(parsed.user)
      setToken(parsed.token)
    }
  }, [])

  const login = async (credentials) => {
    const res = await api.post('/auth/login', credentials)
    const { user, token } = res.data
    localStorage.setItem('auth', JSON.stringify({ user, token }))
    setUser(user)
    setToken(token)
    return res
  }

  const logout = () => {
    localStorage.removeItem('auth')
    setUser(null)
    setToken(null)
  }

  // Check if user has one of the allowed roles (e.g. ['admin', 'superadmin'])
  const hasRole = (allowedRoles = []) => {
    if (!user || !user.role) return false
    return allowedRoles.includes(user.role)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}
