// import React, { useEffect, useState, useContext } from 'react'
// import { AuthContext } from '../../context/AuthContext'
// import { ThemeContext } from '../../context/ThemeContext'
// import api from '../../services/api'
// import { useNavigate } from 'react-router-dom'
// import { FaUser, FaClock, FaCalendar, FaCode, FaEdit, FaLogout } from 'react-icons/fa'

// export default function Dashboard(){
//   const { user, logout } = useContext(AuthContext)
//   const { isDark } = useContext(ThemeContext)
//   const navigate = useNavigate()
  
//   const [questions, setQuestions] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filters, setFilters] = useState({ category: '', difficulty: '' })
//   const [sessionTime, setSessionTime] = useState(0)
//   const [showProfile, setShowProfile] = useState(false)
//   const [editMode, setEditMode] = useState(false)
//   const [profile, setProfile] = useState({
//     username: user?.username || '',
//     email: user?.email || '',
//     course: user?.course || 'MERN'
//   })

//   // Track session time
//   useEffect(() => {
//     const startTime = localStorage.getItem('sessionStart') || new Date().getTime()
//     if (!localStorage.getItem('sessionStart')) {
//       localStorage.setItem('sessionStart', startTime)
//     }

//     const timer = setInterval(() => {
//       const elapsed = Math.floor((new Date().getTime() - parseInt(startTime)) / 1000)
//       setSessionTime(elapsed)
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [])

//   // Load questions
//   useEffect(()=>{
//     if (!user) {
//       navigate('/login')
//       return
//     }
    
//     const load = async ()=>{
//       try{
//         setLoading(true)
//         const params = new URLSearchParams()
//         if (filters.category) params.append('category', filters.category)
//         if (filters.difficulty) params.append('difficulty', filters.difficulty)
//         const res = await api.get(`/questions?${params}`)
//         setQuestions(res.data)
//       }catch(err){
//         console.error('Error loading questions:', err)
//       }finally{
//         setLoading(false)
//       }
//     }
//     load()
//   }, [filters, user, navigate])

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600)
//     const minutes = Math.floor((seconds % 3600) / 60)
//     const secs = seconds % 60
//     return `${hours}h ${minutes}m ${secs}s`
//   }

//   const handleProfileUpdate = async () => {
//     try {
//       await api.put('/users/profile', profile)
//       setEditMode(false)
//       alert('Profile updated successfully!')
//     } catch (err) {
//       alert('Failed to update profile: ' + err.response?.data?.error)
//     }
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('sessionStart')
//     logout()
//   }

//   return (
//     <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
//       <div className="container mx-auto p-6">
//         {/* Top Bar */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">My Dashboard</h1>
//           <button
//             onClick={() => setShowProfile(!showProfile)}
//             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
//           >
//             <FaUser /> Profile
//           </button>
//         </div>

//         {/* Profile Section */}
//         {showProfile && (
//           <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg mb-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//             <div className="flex items-center gap-6 mb-6">
//               <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
//                 {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold mb-2">{user?.username || 'User'}</h2>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{user?.email}</p>
//                 <p className={`mt-2 px-3 py-1 rounded inline-block ${isDark ? 'bg-blue-600' : 'bg-blue-100'}`}>
//                   {user?.role.toUpperCase()}
//                 </p>
//               </div>
//             </div>

//             {/* Profile Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//               <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'} className="text-sm">Course</p>
//                 <p className="text-lg font-bold">{user?.course || 'MERN'}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'} className="text-sm">Session Time</p>
//                 <p className="text-lg font-bold">{formatTime(sessionTime)}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'} className="text-sm">Joined</p>
//                 <p className="text-lg font-bold">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'} className="text-sm">Questions Solved</p>
//                 <p className="text-lg font-bold">{questions.length}</p>
//               </div>
//             </div>

//             {/* Edit Profile */}
//             {editMode ? (
//               <div className="space-y-4">
//                 <div>
//                   <label className="block font-semibold mb-2">Username</label>
//                   <input
//                     type="text"
//                     value={profile.username}
//                     onChange={(e) => setProfile({...profile, username: e.target.value})}
//                     className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-2">Course</label>
//                   <select
//                     value={profile.course}
//                     onChange={(e) => setProfile({...profile, course: e.target.value})}
//                     className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
//                   >
//                     <option value="MERN">MERN Stack</option>
//                     <option value="Java">Java</option>
//                     <option value="Python">Python</option>
//                     <option value="Testing">Testing</option>
//                   </select>
//                 </div>
//                 <div className="flex gap-4">
//                   <button
//                     onClick={handleProfileUpdate}
//                     className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
//                   >
//                     Save Changes
//                   </button>
//                   <button
//                     onClick={() => setEditMode(false)}
//                     className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex gap-4">
//                 <button
//                   onClick={() => setEditMode(true)}
//                   className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2"
//                 >
//                   <FaEdit /> Edit Profile
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2"
//                 >
//                   <FaLogout /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Questions Section */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Practice Questions</h2>
          
//           {/* Filters */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <select 
//               value={filters.category} 
//               onChange={e=>setFilters({...filters, category: e.target.value})}
//               className={`border p-3 rounded-lg ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
//             >
//               <option value="">All Categories</option>
//               <option value="Java">Java</option>
//               <option value="MERN">MERN</option>
//               <option value="Python">Python</option>
//               <option value="Testing">Testing</option>
//             </select>

//             <select 
//               value={filters.difficulty} 
//               onChange={e=>setFilters({...filters, difficulty: e.target.value})}
//               className={`border p-3 rounded-lg ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
//             >
//               <option value="">All Difficulties</option>
//               <option value="Easy">Easy</option>
//               <option value="Medium">Medium</option>
//               <option value="Hard">Hard</option>
//             </select>
//           </div>

//           {loading && <p>Loading questions...</p>}

//           {/* Questions Grid */}
//           <div className="space-y-4">
//             {questions.map(q => (
//               <div key={q._id} className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <div className="flex justify-between items-start mb-3">
//                   <h3 className="text-lg font-semibold flex-1">{q.question}</h3>
//                   <span className={`px-3 py-1 rounded text-sm font-semibold text-white ${
//                     q.difficulty === 'Easy' ? 'bg-green-600' :
//                     q.difficulty === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
//                   }`}>
//                     {q.difficulty}
//                   </span>
//                 </div>

//                 <div className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                   <span className="font-semibold">Category:</span> {q.category} | <span className="font-semibold">Type:</span> {q.type || 'N/A'}
//                 </div>

//                 <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                   {q.detailedAnswer.substring(0, 300)}...
//                 </p>

//                 {q.tags && <div className="flex gap-2 flex-wrap mb-4">
//                   {q.tags.map(tag => (
//                     <span key={tag} className={`text-xs px-3 py-1 rounded ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>}

//                 <div className="flex gap-2">
//                   <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold">
//                     💙 Helpful
//                   </button>
//                   <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold">
//                     💬 Comment
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {!loading && questions.length === 0 && (
//             <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No questions found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

//// dashboard with profile and session tracking


// import { useEffect, useState, useContext } from 'react'
// import { AuthContext } from '../../context/AuthContext'
// import { ThemeContext } from '../../context/ThemeContext'
// import api from '../../services/api'
// import { useNavigate } from 'react-router-dom'
// import { FaUser, FaClock, FaCalendar, FaCode, FaEdit, FaSignOutAlt } from 'react-icons/fa' // <-- fixed here

// export default function Dashboard(){
//   const { user, logout } = useContext(AuthContext)
//   const { isDark } = useContext(ThemeContext)
//   const navigate = useNavigate()
  
//   const [questions, setQuestions] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filters, setFilters] = useState({ category: '', difficulty: '' })
//   const [sessionTime, setSessionTime] = useState(0)
//   const [showProfile, setShowProfile] = useState(false)
//   const [editMode, setEditMode] = useState(false)
//   const [profile, setProfile] = useState({
//     username: user?.username || '',
//     email: user?.email || '',
//     course: user?.course || 'MERN'
//   })

//   // Track session time
//   useEffect(() => {
//     const startTime = localStorage.getItem('sessionStart') || new Date().getTime()
//     if (!localStorage.getItem('sessionStart')) {
//       localStorage.setItem('sessionStart', startTime)
//     }

//     const timer = setInterval(() => {
//       const elapsed = Math.floor((new Date().getTime() - parseInt(startTime)) / 1000)
//       setSessionTime(elapsed)
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [])

//   // Load questions
//   useEffect(()=>{
//     if (!user) {
//       navigate('/login')
//       return
//     }
    
//     const load = async ()=>{
//       try{
//         setLoading(true)
//         const params = new URLSearchParams()
//         if (filters.category) params.append('category', filters.category)
//         if (filters.difficulty) params.append('difficulty', filters.difficulty)
//         const res = await api.get(`/questions?${params}`)
//         setQuestions(res.data)
//       }catch(err){
//         console.error('Error loading questions:', err)
//       }finally{
//         setLoading(false)
//       }
//     }
//     load()
//   }, [filters, user, navigate])

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600)
//     const minutes = Math.floor((seconds % 3600) / 60)
//     const secs = seconds % 60
//     return `${hours}h ${minutes}m ${secs}s`
//   }

//   const handleProfileUpdate = async () => {
//     try {
//       await api.put('/users/profile', profile)
//       setEditMode(false)
//       alert('Profile updated successfully!')
//     } catch (err) {
//       alert('Failed to update profile: ' + err.response?.data?.error)
//     }
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('sessionStart')
//     logout()
//   }

//   return (
//     <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
//       <div className="container mx-auto p-6">
//         {/* Top Bar */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">My Dashboard</h1>
//           <button
//             onClick={() => setShowProfile(!showProfile)}
//             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
//           >
//             <FaUser /> Profile
//           </button>
//         </div>

//         {/* Profile Section */}
//         {showProfile && (
//           <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg mb-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//             <div className="flex items-center gap-6 mb-6">
//               <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
//                 {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold mb-2">{user?.username || 'User'}</h2>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{user?.email}</p>
//                 <p className={`mt-2 px-3 py-1 rounded inline-block ${isDark ? 'bg-blue-600' : 'bg-blue-100'}`}>
//                   {user?.role.toUpperCase()}
//                 </p>
//               </div>
//             </div>

//             {/* Profile Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//               <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'} className="text-sm">Course</p>
//                 <p className="text-lg font-bold">{user?.course || 'MERN'}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'} className="text-sm">Session Time</p>
//                 <p className="text-lg font-bold">{formatTime(sessionTime)}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'} className="text-sm">Joined</p>
//                 <p className="text-lg font-bold">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'} className="text-sm">Questions Solved</p>
//                 <p className="text-lg font-bold">{questions.length}</p>
//               </div>
//             </div>

//             {/* Edit Profile */}
//             {editMode ? (
//               <div className="space-y-4">
//                 <div>
//                   <label className="block font-semibold mb-2">Username</label>
//                   <input
//                     type="text"
//                     value={profile.username}
//                     onChange={(e) => setProfile({...profile, username: e.target.value})}
//                     className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-2">Course</label>
//                   <select
//                     value={profile.course}
//                     onChange={(e) => setProfile({...profile, course: e.target.value})}
//                     className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
//                   >
//                     <option value="MERN">MERN Stack</option>
//                     <option value="Java">Java</option>
//                     <option value="Python">Python</option>
//                     <option value="Testing">Testing</option>
//                   </select>
//                 </div>
//                 <div className="flex gap-4">
//                   <button
//                     onClick={handleProfileUpdate}
//                     className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
//                   >
//                     Save Changes
//                   </button>
//                   <button
//                     onClick={() => setEditMode(false)}
//                     className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex gap-4">
//                 <button
//                   onClick={() => setEditMode(true)}
//                   className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2"
//                 >
//                   <FaEdit /> Edit Profile
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2"
//                 >
//                   <FaSignOutAlt /> Logout {/* <-- fixed here */}
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Questions Section */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Practice Questions</h2>
          
//           {/* Filters */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <select 
//               value={filters.category} 
//               onChange={e=>setFilters({...filters, category: e.target.value})}
//               className={`border p-3 rounded-lg ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
//             >
//               <option value="">All Categories</option>
//               <option value="Java">Java</option>
//               <option value="MERN">MERN</option>
//               <option value="Python">Python</option>
//               <option value="Testing">Testing</option>
//             </select>

//             <select 
//               value={filters.difficulty} 
//               onChange={e=>setFilters({...filters, difficulty: e.target.value})}
//               className={`border p-3 rounded-lg ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
//             >
//               <option value="">All Difficulties</option>
//               <option value="Easy">Easy</option>
//               <option value="Medium">Medium</option>
//               <option value="Hard">Hard</option>
//             </select>
//           </div>

//           {loading && <p>Loading questions...</p>}

//           {/* Questions Grid */}
//           <div className="space-y-4">
//             {questions.map(q => (
//               <div key={q._id} className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <div className="flex justify-between items-start mb-3">
//                   <h3 className="text-lg font-semibold flex-1">{q.question}</h3>
//                   <span className={`px-3 py-1 rounded text-sm font-semibold text-white ${
//                     q.difficulty === 'Easy' ? 'bg-green-600' :
//                     q.difficulty === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
//                   }`}>
//                     {q.difficulty}
//                   </span>
//                 </div>

//                 <div className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                   <span className="font-semibold">Category:</span> {q.category} | <span className="font-semibold">Type:</span> {q.type || 'N/A'}
//                 </div>

//                 <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                   {q.detailedAnswer.substring(0, 300)}...
//                 </p>

//                 {q.tags && <div className="flex gap-2 flex-wrap mb-4">
//                   {q.tags.map(tag => (
//                     <span key={tag} className={`text-xs px-3 py-1 rounded ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>}

//                 <div className="flex gap-2">
//                   <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold">
//                     💙 Helpful
//                   </button>
//                   <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold">
//                     💬 Comment
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {!loading && questions.length === 0 && (
//             <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No questions found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }






import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [sessionTime, setSessionTime] = useState(0);
  const [course, setCourse] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  const courses = ["Java", "Python", "MERN", "Testing"];
  const difficulties = ["Easy", "Medium", "Hard"];
  const types = ["Coding", "Theory"];

  /* 🔥 Session Timer */
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className={`w-64 p-6 ${
        isDark ? "bg-gray-900 text-white" : "bg-white shadow-md"
      }`}>
        <h2 className="text-2xl font-bold mb-6">User Panel</h2>

        {["dashboard", "profile", "password"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`block w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}

        <button
          className="block w-full text-left px-4 py-2 rounded-lg mb-2 bg-red-600 text-white"
        >
          Delete Account
        </button>

        <button
          onClick={logout}
          className="mt-4 w-full bg-red-700 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-8">

        {/* Dashboard Overview */}
        {activeTab === "dashboard" && (
          <>
            {/* Profile Card */}
            <div className={`p-6 rounded-xl shadow mb-8 ${
              isDark ? "bg-gray-800 text-white" : "bg-white"
            }`}>
              <h3 className="text-xl font-bold mb-2">Profile Details</h3>
              <p><strong>Name:</strong> {user?.username}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Registered Since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
              <p><strong>Session Time:</strong> {formatTime(sessionTime)}</p>
            </div>

            {/* Filter Sliders */}
            <div className="mb-6">
              <h3 className="font-bold mb-3">Filters</h3>

              <div className="flex gap-4 overflow-x-auto mb-4">
                {courses.map(c => (
                  <button
                    key={c}
                    onClick={() => setCourse(c)}
                    className={`px-4 py-2 rounded-full ${
                      course === c ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 overflow-x-auto mb-4">
                {difficulties.map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-4 py-2 rounded-full ${
                      difficulty === d ? "bg-purple-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 overflow-x-auto">
                {types.map(t => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-4 py-2 rounded-full ${
                      type === t ? "bg-green-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {[1,2,3].map((q) => (
                <div key={q} className={`p-6 rounded-xl shadow hover:scale-105 transition ${
                  isDark ? "bg-gray-800 text-white" : "bg-white"
                }`}>
                  <h4 className="font-bold mb-2">Sample Question {q}</h4>
                  <p className="text-sm mb-4">Course: MERN | Medium | Coding</p>

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    See More
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Profile Section */}
        {activeTab === "profile" && (
          <div className={`p-6 rounded-xl shadow ${
            isDark ? "bg-gray-800 text-white" : "bg-white"
          }`}>
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-3">
              Update Profile
            </button>
          </div>
        )}

        {/* Change Password Section */}
        {activeTab === "password" && (
          <div className={`p-6 rounded-xl shadow ${
            isDark ? "bg-gray-800 text-white" : "bg-white"
          }`}>
            <h3 className="text-xl font-bold mb-4">Change Password</h3>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              Change Password
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
