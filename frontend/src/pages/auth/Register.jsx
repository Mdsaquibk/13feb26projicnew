// import React, { useState, useContext } from 'react'
// import api from '../../services/api'
// import { useNavigate } from 'react-router-dom'
// import { validateForm } from '../../utils/validation'
// import { ThemeContext } from '../../context/ThemeContext'
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { FaSpinner } from 'react-icons/fa'

// export default function Register(){
//   const { isDark } = useContext(ThemeContext)
//   const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user', course: 'MERN' })
//   const [errors, setErrors] = useState({})
//   const [loading, setLoading] = useState(false)
//   const nav = useNavigate()

//   const submit = async (e) => {
//     e.preventDefault()
//     const errs = validateForm('register', form)
//     setErrors(errs)
//     if (Object.keys(errs).length > 0) return

//     setLoading(true)
//     try{
//       await api.post('/auth/register', form)
//       toast.success('✅ Registration Successful!', { autoClose: 2000 })
//       setTimeout(() => nav('/login'), 2000)
//     }catch(err){
//       toast.error(err.response?.data?.error || 'Registration failed')
//       setErrors({ submit: err.response?.data?.error || 'Registration failed' })
//     }finally{
//       setLoading(false)
//     }
//   }

//   return (
//     <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-gray-100'} flex items-center justify-center p-4`}>
//       <ToastContainer theme={isDark ? 'dark' : 'light'} autoClose={3000} />
//       <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl p-8 w-full max-w-md`}>
//         <h2 className="text-3xl font-bold mb-2 text-center">Create Account</h2>
//         <p className={`text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Join our community of learners</p>
        
//         <form onSubmit={submit}>
//           <div className="mb-4">
//             <label className="block mb-2 font-semibold">Username</label>
//             <input 
//               placeholder="Choose a username" 
//               value={form.username} 
//               onChange={e=>setForm({...form, username: e.target.value})} 
//               className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
//             />
//             {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-semibold">Email</label>
//             <input 
//               placeholder="your@email.com" 
//               value={form.email} 
//               onChange={e=>setForm({...form, email: e.target.value})} 
//               className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-semibold">Password</label>
//             <input 
//               type="password"
//               placeholder="At least 6 characters" 
//               value={form.password} 
//               onChange={e=>setForm({...form, password: e.target.value})} 
//               className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
//             />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-semibold">Role</label>
//             <select 
//               value={form.role} 
//               onChange={e=>setForm({...form, role: e.target.value})} 
//               className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin (needs approval)</option>
//             </select>
//           </div>

//           <div className="mb-6">
//             <label className="block mb-2 font-semibold">Course (for users)</label>
//             <select 
//               value={form.course} 
//               onChange={e=>setForm({...form, course: e.target.value})} 
//               className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
//             >
//               <option value="MERN">MERN Stack</option>
//               <option value="Java">Java</option>
//               <option value="Python">Python</option>
//               <option value="Testing">Testing</option>
//             </select>
//           </div>

//           {errors.submit && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded">{errors.submit}</p>}

//           <button 
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-bold transition flex items-center justify-center gap-2"
//           >
//             {loading ? <><FaSpinner className="animate-spin" /> Creating Account...</> : 'Register'}
//           </button>
//         </form>

//         <div className="mt-6 text-sm text-center">
//           <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
//             Already have an account? <a href="/login" className="text-green-600 hover:underline font-semibold">Login</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// -----------------------



// import React, { useState, useContext } from 'react'
// import api from '../../services/api'
// import { useNavigate } from 'react-router-dom'
// import { validateForm } from '../../utils/validation'
// import { ThemeContext } from '../../context/ThemeContext'
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { FaSpinner } from 'react-icons/fa'

// export default function Register() {
//   const { isDark } = useContext(ThemeContext)
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'user',
//     course: '',
//     yop: '',
//   })
//   const [errors, setErrors] = useState({})
//   const [loading, setLoading] = useState(false)
//   const nav = useNavigate()

//   const submit = async (e) => {
//     e.preventDefault()
//     const errs = validateForm('register', form)
//     setErrors(errs)
//     if (Object.keys(errs).length > 0) return

//     setLoading(true)
//     try {
//       await api.post('/auth/register', form)
//       toast.success('✅ Registration Successful!', { autoClose: 2000 })
//       setTimeout(() => nav('/login'), 2000)
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Registration failed')
//       setErrors({ submit: err.response?.data?.error || 'Registration failed' })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-gray-100'} flex items-center justify-center p-4`}>
//       <ToastContainer theme={isDark ? 'dark' : 'light'} autoClose={3000} />
//       <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl p-8 w-full max-w-md`}>
//         <h2 className="text-3xl font-bold mb-2 text-center">Create Account</h2>
//         <p className={`text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Join our community</p>

//         {/* Role Slider */}
//         <div className="mb-6">
//           <label className="block mb-3 font-semibold text-sm">Register as:</label>
//           <div className="flex gap-2 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
//             {['user', 'admin'].map((role) => (
//               <button
//                 key={role}
//                 type="button"
//                 onClick={() => setForm({ ...form, role })}
//                 className={`flex-1 py-2 px-3 rounded transition text-sm font-semibold ${
//                   form.role === role
//                     ? 'bg-green-600 text-white'
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
//             <label className="block mb-2 font-semibold">Username</label>
//             <input
//               placeholder="Choose a username"
//               value={form.username}
//               onChange={(e) => setForm({ ...form, username: e.target.value })}
//               className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
//             />
//             {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-semibold">Email</label>
//             <input
//               placeholder="your@email.com"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-semibold">Password</label>
//             <input
//               type="password"
//               placeholder="At least 6 characters"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
//             />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           {/* Only show Course & YOP for user */}
//           {form.role === 'user' && (
//             <>
//               <div className="mb-4">
//                 <label className="block mb-2 font-semibold">Course</label>
//                 <select
//                   value={form.course}
//                   onChange={(e) => setForm({ ...form, course: e.target.value })}
//                   className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
//                 >
//                   <option value="">Select course</option>
//                   <option value="MERN">MERN Stack</option>
//                   <option value="Java">Java</option>
//                   <option value="Python">Python</option>
//                   <option value="Testing">Testing</option>
//                 </select>
//                 {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
//               </div>

//               <div className="mb-6">
//                 <label className="block mb-2 font-semibold">Year of Passing (YOP)</label>
//                 <input
//                   type="number"
//                   placeholder="YYYY"
//                   value={form.yop}
//                   onChange={(e) => setForm({ ...form, yop: e.target.value })}
//                   className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
//                 />
//                 {errors.yop && <p className="text-red-500 text-sm mt-1">{errors.yop}</p>}
//               </div>
//             </>
//           )}

//           {errors.submit && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded">{errors.submit}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-bold transition flex items-center justify-center gap-2"
//           >
//             {loading ? <><FaSpinner className="animate-spin" /> Creating Account...</> : 'Register'}
//           </button>
//         </form>

//         <div className="mt-6 text-sm text-center">
//           <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
//             Already have an account? <Link to="/login" className="text-green-600 hover:underline font-semibold">Login</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }


import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import { validateForm } from '../../utils/validation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaSpinner } from 'react-icons/fa'
import api from '../../services/api'

export default function Register(){
  const { isDark } = useContext(ThemeContext)
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user', course: 'MERN', yop: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [roleType, setRoleType] = useState('user')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    const errs = validateForm('register', form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try{
      await api.post('/auth/register', form)
      toast.success('✅ Registration Successful!', { autoClose: 2000 })
      setTimeout(() => nav('/login'), 2000)
    }catch(err){
      toast.error(err.response?.data?.error || 'Registration failed')
      setErrors({ submit: err.response?.data?.error || 'Registration failed' })
    }finally{
      setLoading(false)
    }
  }

  const handleRoleChange = (role) => {
    setRoleType(role)
    setForm({...form, role})
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-gray-100'} flex items-center justify-center p-4`}>
      <ToastContainer theme={isDark ? 'dark' : 'light'} autoClose={3000} />
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl p-8 w-full max-w-md`}>
        <h2 className="text-3xl font-bold mb-2 text-center">Create Account</h2>
        <p className={`text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Join our community of learners</p>
        
        {/* Role Slider */}
        <div className="mb-6">
          <label className="block mb-3 font-semibold text-sm"><b>Role : </b></label>
          <div className="flex gap-2 bg-gray-200 dark:bg-sky-300 p-1 rounded-lg">
            {['user','admin'].map(role => (
              <button 
                key={role}
                type="button"
                onClick={() => handleRoleChange(role)}
                className={`flex-1 py-2 px-3 rounded transition text-sm font-semibold ${
                  roleType === role 
                    ? 'bg-green-400 text-white' 
                    : `${isDark ? 'bg-gray-700 text-gray-300' : 'bg-transparent'}`
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={submit}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Username</label>
            <input 
              placeholder="Choose a username" 
              value={form.username} 
              onChange={e=>setForm({...form, username: e.target.value})} 
              className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Email</label>
            <input 
              placeholder="your@email.com" 
              value={form.email} 
              onChange={e=>setForm({...form, email: e.target.value})} 
              className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Password</label>
            <input 
              type="password"
              placeholder="At least 6 characters" 
              value={form.password} 
              onChange={e=>setForm({...form, password: e.target.value})} 
              className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Show Course & YOP only for User */}
          {roleType === 'user' && (
            <>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Course</label>
                <select 
                  value={form.course} 
                  onChange={e=>setForm({...form, course: e.target.value})} 
                  className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  <option value="MERN">MERN</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="Testing">Testing</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-semibold">Year of Passing (YOP)</label>
                <input 
                  type="text"
                  placeholder="e.g. 2026"
                  value={form.yop} 
                  onChange={e=>setForm({...form, yop: e.target.value})} 
                  className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {errors.yop && <p className="text-red-500 text-sm mt-1">{errors.yop}</p>}
              </div>
            </>
          )}

          {errors.submit && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded">{errors.submit}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-bold transition flex items-center justify-center gap-2"
          >
            {loading ? <><FaSpinner className="animate-spin" /> Creating Account...</> : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-sm text-center">
          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
            Already have an account? <a href="/login" className="text-green-600 hover:underline font-semibold">Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}
