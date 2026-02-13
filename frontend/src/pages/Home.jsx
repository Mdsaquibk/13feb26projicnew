// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext'
// import { ThemeContext } from '../context/ThemeContext'

// export default function Home(){
//   const { user } = useContext(AuthContext)
//   const { isDark } = useContext(ThemeContext)

//   return (
//     <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
//       <div className="container mx-auto p-8">
//         {/* Hero Section */}
//         <div className="text-center mb-16 pt-8">
//           <h1 className="text-5xl font-bold mb-4">Interview Crackers</h1>
//           <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
//             Ace Your Tech Interviews with Our Comprehensive Question Bank
//           </p>
//           {!user && (
//             <div className="flex gap-4 justify-center">
//               <Link to="/login" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
//                 Login
//               </Link>
//               <Link to="/register" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">
//                 Register
//               </Link>
//             </div>
//           )}
//           {user && (
//             <div className="text-lg">
//               <p className="mb-4">Welcome back, <strong>{user.username}</strong>!</p>
//               {user.role === 'user' && (
//                 <Link to="/dashboard" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
//                   Go to Dashboard
//                 </Link>
//               )}
//               {user.role === 'admin' && (
//                 <div className="space-x-4">
//                   <Link to="/admin/dashboard" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold">
//                     Admin Dashboard
//                   </Link>
//                   <Link to="/dashboard" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
//                     View Questions
//                   </Link>
//                 </div>
//               )}
//               {user.role === 'superadmin' && (
//                 <div className="space-x-4">
//                   <Link to="/superadmin/panel" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold">
//                     SuperAdmin Panel
//                   </Link>
//                   <Link to="/admin/dashboard" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold">
//                     Manage Questions
//                   </Link>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Features Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//           <div className={`p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
//             <h3 className="text-xl font-bold mb-4">📚 72+ Questions</h3>
//             <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
//               Carefully curated questions across Java, MERN, Python, and Testing categories
//             </p>
//           </div>

//           <div className={`p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
//             <h3 className="text-xl font-bold mb-4">🎯 Difficulty Levels</h3>
//             <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
//               Questions ranging from Easy to Hard, with detailed solutions and explanations
//             </p>
//           </div>

//           <div className={`p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
//             <h3 className="text-xl font-bold mb-4">🔧 Admin Tools</h3>
//             <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
//               Add, edit, and manage questions with our intuitive admin dashboard
//             </p>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className={`p-12 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center mb-16`}>
//           <h2 className="text-3xl font-bold mb-8">Platform Stats</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <p className="text-4xl font-bold text-blue-600">72</p>
//               <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Questions</p>
//             </div>
//             <div>
//               <p className="text-4xl font-bold text-green-600">4</p>
//               <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Categories</p>
//             </div>
//             <div>
//               <p className="text-4xl font-bold text-purple-600">3</p>
//               <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Difficulty Levels</p>
//             </div>
//             <div>
//               <p className="text-4xl font-bold text-red-600">♾️</p>
//               <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Scalable</p>
//             </div>
//           </div>
//         </div>

//         {/* Categories Section */}
//         {!user && (
//           <div className={`p-12 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
//             <h2 className="text-3xl font-bold mb-8">Available Categories</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <h4 className="text-xl font-bold mb-2">☕ Java</h4>
//                 <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>20 questions covering core concepts, OOP, and advanced topics</p>
//               </div>
//               <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <h4 className="text-xl font-bold mb-2">⚛️ MERN Stack</h4>
//                 <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>20 questions on MongoDB, Express, React, and Node.js</p>
//               </div>
//               <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <h4 className="text-xl font-bold mb-2">🐍 Python</h4>
//                 <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>20 questions on Python fundamentals and advanced programming</p>
//               </div>
//               <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <h4 className="text-xl font-bold mb-2">🧪 Testing</h4>
//                 <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>12 questions on QA, testing strategies, and best practices</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'

export default function Home() {
  const { user } = useContext(AuthContext)
  const { isDark } = useContext(ThemeContext)
  const navigate = useNavigate()

  const previewQuestions = {
    Java: [
      "What is JVM?",
      "Explain OOP principles."
    ],
    MERN: [
      "What is MongoDB?",
      "Explain React Hooks."
    ],
    Python: [
      "What is list comprehension?",
      "Explain decorators."
    ],
    Testing: [
      "What is unit testing?",
      "Difference between QA and QC?"
    ]
  }

  const handleSeeMore = () => {
    navigate('/login')
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-8">

        {/* Hero Section */}
        <div className="text-center mb-16 pt-8">
          <h1 className="text-5xl font-bold mb-4">Interview Crackers</h1>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
            Ace Your Tech Interviews with Our Comprehensive Question Bank
          </p>

          {/* If NOT logged in */}
          {!user && (
            <Link
              to="/login"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg"
            >
              Get Started
            </Link>
          )}

          {/* If logged in */}
          {user && (
            <div className="text-lg">
              <p className="mb-4 text-2xl">
                Welcome, <strong>{user.username}</strong> 👋
              </p>

              {user.role === 'user' && (
                <Link
                  to="/dashboard"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Go to Dashboard
                </Link>
              )}

              {user.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
                >
                  Admin Dashboard
                </Link>
              )}

              {user.role === 'superadmin' && (
                <Link
                  to="/superadmin/panel"
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
                >
                  SuperAdmin Panel
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Question Preview Section */}
        {(!user || user.role === 'admin') && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Sample Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {Object.keys(previewQuestions).map((category, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg shadow-lg ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-4">{category}</h3>

                  <ul className="mb-4 space-y-2">
                    {previewQuestions[category].map((q, i) => (
                      <li
                        key={i}
                        className={isDark ? 'text-gray-400' : 'text-gray-600'}
                      >
                        • {q}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={handleSeeMore}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    See More →
                  </button>
                </div>
              ))}

            </div>
          </div>
        )}

      </div>
    </div>
  )
}
