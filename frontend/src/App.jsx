import React from 'react'
import Router from './router/Router'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import BackToTop from './components/BackToTop'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
        <BackToTop />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </ThemeProvider>
    </AuthProvider>
  )
}
