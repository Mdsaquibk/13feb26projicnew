// import React from 'react'
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
// import Navbar from '../components/Navbar'

// // Pages
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Navbar from "../components/Navbar";
import BackToTop from "../components/BackToTop";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import Services from "../pages/Services";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import AdminDashboard from "../pages/admin/AdminDashboard";
import SuperAdminPanel from "../pages/superadmin/SuperAdminPanel";
import Dashboard from "../pages/user/Dashboard";

import { Outlet } from "react-router-dom";

/* 🔥 Global Layout */
function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Navbar Visible Everywhere */}
      <Navbar />

      {/* Page Content */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Back To Top Visible Everywhere */}
      <BackToTop />

    </div>
  );
}

/* 🔥 Create Router */
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Public
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQ /> },
      { path: "services", element: <Services /> },

      // Auth
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },

      // Role Dashboards
      { path: "admin", element: <AdminDashboard /> },
      { path: "superadmin", element: <SuperAdminPanel /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

export default router;
