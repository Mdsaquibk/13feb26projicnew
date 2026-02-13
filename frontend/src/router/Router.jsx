// import React from 'react'
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
// import Navbar from '../components/Navbar'

// // Pages
// import Home from '../pages/Home'
// import About from '../pages/About'
// import Services from '../pages/Services'
// import Contact from '../pages/Contact'
// import FAQ from '../pages/FAQ'
// import Login from '../pages/auth/Login'
// import Register from '../pages/auth/Register'
// import ForgotPassword from '../pages/auth/ForgotPassword'
// import Dashboard from '../pages/user/Dashboard'
// import AdminDashboard from '../pages/admin/AdminDashboard'
// import SuperAdminPanel from '../pages/superadmin/SuperAdminPanel'

// // Root layout with Navbar
// const RootLayout = () => (
//   <>
//     <Navbar />
//     <Outlet /> {/* renders child routes */}
//   </>
// )

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout />,
//     children: [
//       { path: '/', element: <Home /> },
//       { path: '/about', element: <About /> },
//       { path: '/services', element: <Services /> },
//       { path: '/contact', element: <Contact /> },
//       { path: '/faq', element: <FAQ /> },
//       { path: '/dashboard', element: <Dashboard /> },
//       { path: '/admin/dashboard', element: <AdminDashboard /> },
//       { path: '/superadmin/panel', element: <SuperAdminPanel /> },
//     ],
//   },
//   { path: '/login', element: <Login /> },
//   { path: '/register', element: <Register /> },
//   { path: '/forgot-password', element: <ForgotPassword /> },
// ])

// export default function Router() {
//   return <RouterProvider router={router} />
// }
import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

// Pages
import Home from '../pages/Home'
import About from '../pages/About'
import Services from '../pages/Services'
import Contact from '../pages/Contact'
import FAQ from '../pages/FAQ'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import Dashboard from '../pages/user/Dashboard'
import AdminDashboard from '../pages/admin/AdminDashboard'
import SuperAdminPanel from '../pages/superadmin/SuperAdminPanel'

/* Layout with Navbar */
const RootLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },

      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'contact', element: <Contact /> },
      { path: 'faq', element: <FAQ /> },

      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },

      { path: 'dashboard', element: <Dashboard /> },
      { path: 'admin/dashboard', element: <AdminDashboard /> },
      { path: 'superadmin/panel', element: <SuperAdminPanel /> },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
