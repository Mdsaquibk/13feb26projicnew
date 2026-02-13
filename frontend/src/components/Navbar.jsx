// // import React, { useState, useContext } from 'react'
// // import { Link, useNavigate } from 'react-router-dom'
// // import { AuthContext } from '../context/AuthContext'
// // import { ThemeContext } from '../context/ThemeContext'
// // import { FaHome, FaInfoCircle, FaCogs, FaEnvelope, FaQuestion, FaSignInAlt, FaStar, FaBars, FaTimes } from 'react-icons/fa'
// // import { BsMoon, BsSun } from 'react-icons/bs'

// // export default function Navbar() {
// //   const { user, logout } = useContext(AuthContext)
// //   const { isDark, toggle } = useContext(ThemeContext)
// //   const navigate = useNavigate()
// //   const [mobileOpen, setMobileOpen] = useState(false)

// //   const handleLogout = () => {
// //     logout()
// //     window.location.href = '/'
// //   }

// //   return (
// //     <nav className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gradient-to-r from-blue-600 to-blue-700'} border-b shadow-lg text-white sticky top-0 z-50`}>
// //       <div className="container mx-auto px-4">
// //         <div className="flex justify-between items-center py-4">
// //           {/* Logo with Star Icon */}
// //           <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:text-yellow-300 transition">
// //             <FaStar className="text-yellow-400" />
// //             <span>InterCracker</span>
// //           </Link>

// //           {/* Desktop Menu */}
// //           <div className="hidden md:flex items-center gap-6">
// //             {/* Navigation Links */}
// //             <NavLink to="/" icon={<FaHome />} label="Home" />
// //             <NavLink to="/about" icon={<FaInfoCircle />} label="About" />
// //             <NavLink to="/services" icon={<FaCogs />} label="Services" />
// //             <NavLink to="/contact" icon={<FaEnvelope />} label="Contact" />
// //             <NavLink to="/faq" icon={<FaQuestion />} label="FAQ" />

// //             {/* User Section */}
// //             {user ? (
// //               <div className="flex items-center gap-4 ml-4 border-l pl-4 border-gray-400">
// //                 <div className="w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">
// //                   {user.username?.[0]?.toUpperCase()}
// //                 </div>
// //                 <span className="text-sm">{user.username}</span>
// //                 {user.role === 'admin' && (
// //                   <Link to="/admin/dashboard" className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition">
// //                     Admin
// //                   </Link>
// //                 )}
// //                 {user.role === 'superadmin' && (
// //                   <Link to="/superadmin/panel" className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition">
// //                     SuperAdmin
// //                   </Link>
// //                 )}
// //                 <button 
// //                   onClick={handleLogout}
// //                   className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-semibold"
// //                 >
// //                   Logout
// //                 </button>
// //               </div>
// //             ) : (
// //               <Link to="/login" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2 transition font-semibold">
// //                 <FaSignInAlt /> Login
// //               </Link>
// //             )}

// //             {/* Dark Mode Toggle */}
// //             <button 
// //               onClick={toggle}
// //               className={`${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'} p-2 rounded-lg transition text-xl`}
// //             >
// //               {isDark ? <BsSun /> : <BsMoon />}
// //             </button>
// //           </div>

// //           {/* Mobile Menu Buttons */}
// //           <div className="md:hidden flex items-center gap-4">
// //             <button 
// //               onClick={toggle}
// //               className={`${isDark ? 'bg-gray-700' : 'bg-blue-500'} p-2 rounded-lg text-xl`}
// //             >
// //               {isDark ? <BsSun /> : <BsMoon />}
// //             </button>
// //             <button 
// //               onClick={() => setMobileOpen(!mobileOpen)}
// //               className="p-2 text-2xl"
// //             >
// //               {mobileOpen ? <FaTimes /> : <FaBars />}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Mobile Menu */}
// //         {mobileOpen && (
// //           <div className={`${isDark ? 'bg-gray-800' : 'bg-blue-700'} md:hidden pb-4 space-y-3`}>
// //             <MobileNavLink to="/" icon={<FaHome />} label="Home" onClick={() => setMobileOpen(false)} />
// //             <MobileNavLink to="/about" icon={<FaInfoCircle />} label="About" onClick={() => setMobileOpen(false)} />
// //             <MobileNavLink to="/services" icon={<FaCogs />} label="Services" onClick={() => setMobileOpen(false)} />
// //             <MobileNavLink to="/contact" icon={<FaEnvelope />} label="Contact" onClick={() => setMobileOpen(false)} />
// //             <MobileNavLink to="/faq" icon={<FaQuestion />} label="FAQ" onClick={() => setMobileOpen(false)} />

// //             {user ? (
// //               <>
// //                 <div className={`px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-blue-600'} rounded`}>
// //                   <p className="font-semibold">{user.username}</p>
// //                   <p className="text-xs">{user.role}</p>
// //                 </div>
// //                 {user.role === 'admin' && (
// //                   <MobileNavLink to="/admin/dashboard" icon={<FaCogs />} label="Admin" onClick={() => setMobileOpen(false)} />
// //                 )}
// //                 {user.role === 'superadmin' && (
// //                   <MobileNavLink to="/superadmin/panel" icon={<FaCogs />} label="SuperAdmin" onClick={() => setMobileOpen(false)} />
// //                 )}
// //                 <button 
// //                   onClick={() => { handleLogout(); setMobileOpen(false); }}
// //                   className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold"
// //                 >
// //                   Logout
// //                 </button>
// //               </>
// //             ) : (
// //               <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-semibold">
// //                 Login
// //               </Link>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   )
// // }

// // function NavLink({ to, icon, label }) {
// //   return (
// //     <Link to={to} className="flex items-center gap-2 hover:text-yellow-300 transition text-sm font-medium">
// //       <span className="text-lg">{icon}</span>
// //       <span>{label}</span>
// //     </Link>
// //   )
// // }

// // function MobileNavLink({ to, icon, label, onClick }) {
// //   return (
// //     <Link to={to} onClick={onClick} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-600 rounded transition">
// //       <span className="text-lg">{icon}</span>
// //       <span>{label}</span>
// //     </Link>
// //   )
// // }
// //         </button>
// //       </div>
// //     </nav>
// //   )
// // }
// import React, { useState, useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext'
// import { ThemeContext } from '../context/ThemeContext'
// import { FaHome, FaInfoCircle, FaCogs, FaEnvelope, FaQuestion, FaSignInAlt, FaStar, FaBars, FaTimes } from 'react-icons/fa'
// import { BsMoon, BsSun } from 'react-icons/bs'

// export default function Navbar() {
//   const { user, logout } = useContext(AuthContext)
//   const { isDark, toggle } = useContext(ThemeContext)
//   const navigate = useNavigate()
//   const [mobileOpen, setMobileOpen] = useState(false)

//   const handleLogout = () => {
//     logout()
//     window.location.href = '/'
//   }

//   return (
//     <nav className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gradient-to-r from-blue-600 to-blue-700'} border-b shadow-lg text-white sticky top-0 z-50`}>
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
          
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:text-yellow-300 transition">
//             <FaStar className="text-yellow-400" />
//             <span>InterCracker</span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-6">
//             <NavLink to="/" icon={<FaHome />} label="Home" />
//             <NavLink to="/about" icon={<FaInfoCircle />} label="About" />
//             <NavLink to="/services" icon={<FaCogs />} label="Services" />
//             <NavLink to="/contact" icon={<FaEnvelope />} label="Contact" />
//             <NavLink to="/faq" icon={<FaQuestion />} label="FAQ" />

//             {user ? (
//               <div className="flex items-center gap-4 ml-4 border-l pl-4 border-gray-400">
//                 <div className="w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">
//                   {user.username?.[0]?.toUpperCase()}
//                 </div>

//                 <span className="text-sm">{user.username}</span>

//                 {user.role === 'admin' && (
//                   <Link to="/admin/dashboard" className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition">
//                     Admin
//                   </Link>
//                 )}

//                 {user.role === 'superadmin' && (
//                   <Link to="/superadmin/panel" className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition">
//                     SuperAdmin
//                   </Link>
//                 )}

//                 <button 
//                   onClick={handleLogout}
//                   className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-semibold"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link to="/login" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2 transition font-semibold">
//                 <FaSignInAlt /> Login
//               </Link>
//             )}

//             <button 
//               onClick={toggle}
//               className={`${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'} p-2 rounded-lg transition text-xl`}
//             >
//               {isDark ? <BsSun /> : <BsMoon />}
//             </button>
//           </div>

//           {/* Mobile Buttons */}
//           <div className="md:hidden flex items-center gap-4">
//             <button 
//               onClick={toggle}
//               className={`${isDark ? 'bg-gray-700' : 'bg-blue-500'} p-2 rounded-lg text-xl`}
//             >
//               {isDark ? <BsSun /> : <BsMoon />}
//             </button>

//             <button 
//               onClick={() => setMobileOpen(!mobileOpen)}
//               className="p-2 text-2xl"
//             >
//               {mobileOpen ? <FaTimes /> : <FaBars />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileOpen && (
//           <div className={`${isDark ? 'bg-gray-800' : 'bg-blue-700'} md:hidden pb-4 space-y-3`}>
//             <MobileNavLink to="/" icon={<FaHome />} label="Home" onClick={() => setMobileOpen(false)} />
//             <MobileNavLink to="/about" icon={<FaInfoCircle />} label="About" onClick={() => setMobileOpen(false)} />
//             <MobileNavLink to="/services" icon={<FaCogs />} label="Services" onClick={() => setMobileOpen(false)} />
//             <MobileNavLink to="/contact" icon={<FaEnvelope />} label="Contact" onClick={() => setMobileOpen(false)} />
//             <MobileNavLink to="/faq" icon={<FaQuestion />} label="FAQ" onClick={() => setMobileOpen(false)} />

//             {user ? (
//               <>
//                 <div className={`px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-blue-600'} rounded`}>
//                   <p className="font-semibold">{user.username}</p>
//                   <p className="text-xs">{user.role}</p>
//                 </div>

//                 {user.role === 'admin' && (
//                   <MobileNavLink to="/admin/dashboard" icon={<FaCogs />} label="Admin" onClick={() => setMobileOpen(false)} />
//                 )}

//                 {user.role === 'superadmin' && (
//                   <MobileNavLink to="/superadmin/panel" icon={<FaCogs />} label="SuperAdmin" onClick={() => setMobileOpen(false)} />
//                 )}

//                 <button 
//                   onClick={() => { handleLogout(); setMobileOpen(false); }}
//                   className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link 
//                 to="/login" 
//                 onClick={() => setMobileOpen(false)} 
//                 className="block px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-semibold"
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }

// function NavLink({ to, icon, label }) {
//   return (
//     <Link to={to} className="flex items-center gap-2 hover:text-yellow-300 transition text-sm font-medium">
//       <span className="text-lg">{icon}</span>
//       <span>{label}</span>
//     </Link>
//   )
// }

// function MobileNavLink({ to, icon, label, onClick }) {
//   return (
//     <Link to={to} onClick={onClick} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-600 rounded transition">
//       <span className="text-lg">{icon}</span>
//       <span>{label}</span>
//     </Link>
//   )
// }





import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'
import { FaHome, FaInfoCircle, FaCogs, FaEnvelope, FaQuestion, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa'
import { BsMoon, BsSun } from 'react-icons/bs'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const { isDark, toggle } = useContext(ThemeContext)
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/') // safe redirect
  }

  const links = [
    { label: 'Home', to: '/', icon: <FaHome /> },
    { label: 'About', to: '/about', icon: <FaInfoCircle /> },
    { label: 'Services', to: '/services', icon: <FaCogs /> },
    { label: 'Contact', to: '/contact', icon: <FaEnvelope /> },
    { label: 'FAQ', to: '/faq', icon: <FaQuestion /> },
  ]

  return (
    <nav className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-orange-300 to-orange-600 text-white'} shadow-lg sticky top-0 z-50`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-yellow-300 transition">
            InC
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="flex items-center gap-1 hover:text-yellow-300 transition">
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* User Circle & Logout */}
            {user ? (
              <div className="flex items-center gap-3 ml-4 border-l pl-4 border-gray-400">
                <div className="w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center font-bold">
                  {user.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <span>{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded flex items-center gap-1 transition">
                <FaSignInAlt /> Login
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition text-xl"
            >
              {isDark ? <BsSun /> : <BsMoon />}
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggle} className="p-2 rounded bg-gray-700 text-xl">
              {isDark ? <BsSun /> : <BsMoon />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-2xl p-2">
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className={`${isDark ? 'bg-gray-800' : 'bg-blue-700'} md:hidden pb-4 space-y-2`}>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 hover:bg-gray-600 rounded transition"
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="px-4 py-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-xs">
                    {user.username?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span>{user.username}</span>
                </div>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded transition"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
