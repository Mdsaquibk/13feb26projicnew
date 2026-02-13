// import React, { useState, useContext } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { AuthContext } from '../../context/AuthContext'
// import { ThemeContext } from '../../context/ThemeContext'
// import { validateForm } from '../../utils/validation'
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { FaSpinner } from 'react-icons/fa'

// export default function Login(){
//   const [form, setForm] = useState({ email: '', password: '' })
//   const [errors, setErrors] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [roleType, setRoleType] = useState('user')
//   const { login } = useContext(AuthContext)
//   const { isDark } = useContext(ThemeContext)
//   const nav = useNavigate()

//   const submit = async (e) => {
//     e.preventDefault()
//     const errs = validateForm('login', form)
//     setErrors(errs)
//     if (Object.keys(errs).length > 0) return

//     setLoading(true)
//     try{
//       await login(form)
//       toast.success('Login successful!', { autoClose: 1500 })
//       setTimeout(() => nav('/dashboard'), 1500)
//     }catch(err){
//       toast.error(err.response?.data?.error || 'Login failed')
//       setErrors({ submit: err.response?.data?.error || 'Login failed' })
//     }finally{
//       setLoading(false)
//     }
//   }

//   return (
//     <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-gray-100'} flex items-center justify-center p-4`}>
//       <ToastContainer theme={isDark ? 'dark' : 'light'} autoClose={3000} />
//       <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl p-8 w-full max-w-md`}>
//         <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back</h2>
//         <p className={`text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Sign in to your account</p>

//         {/* Role Type Selector */}
//         <div className="mb-6">
//           <label className="block mb-3 font-semibold text-sm">Login as:</label>
//           <div className="flex gap-2 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
//             {['user', 'admin', 'superadmin'].map(role => (
//               <button 
//                 key={role}
//                 type="button"
//                 onClick={() => setRoleType(role)}
//                 className={`flex-1 py-2 px-3 rounded transition text-sm font-semibold ${
//                   roleType === role 
//                     ? 'bg-blue-600 text-white' 
//                     : `${isDark ? 'bg-gray-700 text-gray-300' : 'bg-transparent'}`
//                 }`}
//               >
//                 {role.charAt(0).toUpperCase() + role.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>

//         <form onSubmit={submit}>
//           <div className="mb-4">
//             <label className="block mb-2 font-semibold">Email</label>
//             <input 
//               placeholder="Enter your email" 
//               value={form.email} 
//               onChange={e=>setForm({...form, email: e.target.value})} 
//               className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           <div className="mb-6">
//             <label className="block mb-2 font-semibold">Password</label>
//             <input 
//               type="password"
//               placeholder="Enter your password"
//               value={form.password} 
//               onChange={e=>setForm({...form, password: e.target.value})} 
//               className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           {errors.submit && <p className="text-red-500 text-sm mb-4 text-center">{errors.submit}</p>}

//           <button 
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-bold transition flex items-center justify-center gap-2"
//           >
//             {loading ? <><FaSpinner className="animate-spin" /> Logging in...</> : 'Login'}
//           </button>
//         </form>

//         <div className="mt-6 space-y-2 text-sm text-center">
//           <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
//             Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-semibold">Register</Link>
//           </p>
//           <p>
//             <Link to="/forgot-password" className="text-blue-600 hover:underline font-semibold">Forgot Password?</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }



import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ThemeContext } from '../../context/ThemeContext'
import { validateForm } from '../../utils/validation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaSpinner } from 'react-icons/fa'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const { isDark } = useContext(ThemeContext)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    const errs = validateForm('login', form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try {
      await login(form)
      toast.success('Login successful!', { autoClose: 1500 })
      setTimeout(() => nav('/dashboard'), 1500)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed')
      setErrors({ submit: err.response?.data?.error || 'Login failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-gray-100'} flex items-center justify-center p-4`}>
      <ToastContainer theme={isDark ? 'dark' : 'light'} autoClose={3000} />
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl p-8 w-full max-w-md`}>
        <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className={`text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Sign in to your account</p>

        <form onSubmit={submit}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Email</label>
            <input 
              placeholder="Enter your email" 
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })} 
              className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold">Password</label>
            <input 
              type="password"
              placeholder="Enter your password"
              value={form.password} 
              onChange={e => setForm({ ...form, password: e.target.value })} 
              className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {errors.submit && <p className="text-red-500 text-sm mb-4 text-center">{errors.submit}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-bold transition flex items-center justify-center gap-2"
          >
            {loading ? <><FaSpinner className="animate-spin" /> Logging in...</> : 'Login'}
          </button>
        </form>

        <div className="mt-6 space-y-2 text-sm text-center">
          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-semibold">Register</Link>
          </p>
          <p>
            <Link to="/forgot-password" className="text-blue-600 hover:underline font-semibold">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
