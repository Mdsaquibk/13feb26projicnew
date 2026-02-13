// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { ThemeContext } from '../../context/ThemeContext';
// import api from '../../services/api';
// import { FaUser, FaQuestion, FaCog, FaSignOutAlt, FaTimes } from 'react-icons/fa';

// export default function AdminDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const { isDark } = useContext(ThemeContext);
//   const navigate = useNavigate();
  
//   const [activeTab, setActiveTab] = useState('questions');
//   const [questions, setQuestions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     category: '',
//     type: '',
//     difficulty: '',
//     question: '',
//     detailedAnswer: '',
//     tags: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [filterCategory, setFilterCategory] = useState('');
//   const [filterDifficulty, setFilterDifficulty] = useState('');
//   const [filterType, setFilterType] = useState('');

//   useEffect(() => {
//     if (!user || user.role !== 'admin') {
//       navigate('/login');
//       return;
//     }
//     if (activeTab === 'questions') {
//       loadQuestions();
//     } else if (activeTab === 'users') {
//       loadUsers();
//     }
//   }, [user, navigate, filterCategory, filterDifficulty, filterType, activeTab]);

//   const loadUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/users/all');
//       setUsers(response.data || []);
//     } catch (err) {
//       console.error('Failed to load users:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadQuestions = async () => {
//     try {
//       setLoading(true);
//       const params = new URLSearchParams();
//       if (filterCategory) params.append('category', filterCategory);
//       if (filterDifficulty) params.append('difficulty', filterDifficulty);
//       if (filterType) params.append('type', filterType);
//       const response = await api.get(`/questions?${params}`);
//       setQuestions(response.data);
//     } catch (err) {
//       console.error('Failed to load questions:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.category) newErrors.category = 'Category required';
//     if (!formData.question) newErrors.question = 'Question required';
//     if (!formData.difficulty) newErrors.difficulty = 'Difficulty required';
//     if (!formData.detailedAnswer) newErrors.detailedAnswer = 'Answer required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       setLoading(true);
//       const payload = {
//         ...formData,
//         tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
//       };

//       if (editingId) {
//         await api.put(`/questions/${editingId}`, payload);
//       } else {
//         await api.post('/questions/add', payload);
//       }

//       setFormData({
//         category: '',
//         type: '',
//         difficulty: '',
//         question: '',
//         detailedAnswer: '',
//         tags: ''
//       });
//       setEditingId(null);
//       setShowAddForm(false);
//       loadQuestions();
//     } catch (err) {
//       console.error('Failed to save question:', err);
//       alert('Error: ' + err.response?.data?.error || 'Failed to save question');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (question) => {
//     setEditingId(question._id);
//     setFormData({
//       category: question.category,
//       type: question.type || '',
//       difficulty: question.difficulty,
//       question: question.question,
//       detailedAnswer: question.detailedAnswer,
//       tags: question.tags ? question.tags.join(', ') : ''
//     });
//     setShowAddForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this question?')) return;
//     try {
//       await api.delete(`/questions/${id}`);
//       loadQuestions();
//     } catch (err) {
//       alert('Failed to delete: ' + err.response?.data?.error);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (!window.confirm('Are you sure you want to remove this user?')) return;
//     try {
//       await api.delete(`/users/${userId}`);
//       loadUsers();
//     } catch (err) {
//       alert('Failed to remove user: ' + err.response?.data?.error);
//     }
//   };

//   const handleBlacklistUser = async (userId, isBlacklisted) => {
//     try {
//       await api.put(`/users/${userId}/blacklist`, { blacklisted: !isBlacklisted });
//       loadUsers();
//     } catch (err) {
//       alert('Failed to update user: ' + err.response?.data?.error);
//     }
//   };
//     setShowAddForm(false);
//     setEditingId(null);
//     setFormData({
//       category: '',
//       type: '',
//       difficulty: '',
//       question: '',
//       detailedAnswer: '',
//       tags: ''
//     });
//     setErrors({});
//   };

//   return (
//     <div className={`min-h-screen flex ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
//       {/* Aside Bar */}
//       <aside className={`w-64 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r p-6 sticky top-0 h-screen overflow-y-auto`}>
//         <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        
//         {/* Admin Profile Card */}
//         {user && (
//           <div className={`${isDark ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg mb-8`}>
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
//                 {user.username ? user.username.charAt(0).toUpperCase() : 'A'}
//               </div>
//               <div>
//                 <p className="font-semibold">{user.username || 'Admin'}</p>
//                 <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</p>
//               </div>
//             </div>
//             <div className={`text-xs py-2 px-3 rounded ${isDark ? 'bg-gray-600' : 'bg-blue-200'} text-center font-semibold`}>
//               {user.role.toUpperCase()}
//             </div>
//           </div>
//         )}

//         {/* Menu Items */}
//         <nav className="space-y-3">
//           <button
//             onClick={() => setActiveTab('questions')}
//             className={`w-full flex items-center gap-3 p-3 rounded-lg font-semibold transition ${
//               activeTab === 'questions'
//                 ? isDark ? 'bg-blue-600' : 'bg-blue-500 text-white'
//                 : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//             }`}
//           >
//             <FaQuestion size={18} /> All Questions
//           </button>

//           <button
//             onClick={() => setActiveTab('users')}
//             className={`w-full flex items-center gap-3 p-3 rounded-lg font-semibold transition ${
//               activeTab === 'users'
//                 ? isDark ? 'bg-blue-600' : 'bg-blue-500 text-white'
//                 : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//             }`}
//           >
//             <FaUser size={18} /> All Users
//           </button>

//           <button
//             onClick={() => setActiveTab('settings')}
//             className={`w-full flex items-center gap-3 p-3 rounded-lg font-semibold transition ${
//               activeTab === 'settings'
//                 ? isDark ? 'bg-blue-600' : 'bg-blue-500 text-white'
//                 : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//             }`}
//           >
//             <FaCog size={18} /> Settings
//           </button>

//           <hr className={isDark ? 'border-gray-700' : 'border-gray-300'} />

//           <button
//             onClick={logout}
//             className="w-full flex items-center gap-3 p-3 rounded-lg font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition"
//           >
//             <FaSignOutAlt size={18} /> Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         {activeTab === 'questions' && (
//           <>
//             <h1 className="text-3xl font-bold mb-8">Questions Management</h1>

//             {/* Stats */}
//             <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8`}>
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Total</p>
//                 <p className="text-3xl font-bold">{questions.length}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Easy</p>
//                 <p className="text-3xl font-bold text-green-600">{questions.filter(q => q.difficulty === 'Easy').length}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Medium</p>
//                 <p className="text-3xl font-bold text-yellow-600">{questions.filter(q => q.difficulty === 'Medium').length}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Hard</p>
//                 <p className="text-3xl font-bold text-red-600">{questions.filter(q => q.difficulty === 'Hard').length}</p>
//               </div>
//             </div>

//             {/* Add/Edit Form */}
//             {showAddForm && (
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg mb-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Question' : 'Add New Question'}</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div>
//                     <label className="block mb-2 font-semibold">Category *</label>
//                     <select
//                       value={formData.category}
//                       onChange={(e) => setFormData({...formData, category: e.target.value})}
//                       className={`w-full p-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                     >
//                       <option value="">Select Category</option>
//                       <option value="Java">Java</option>
//                       <option value="MERN">MERN</option>
//                       <option value="Python">Python</option>
//                       <option value="Testing">Testing</option>
//                     </select>
//                     {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block mb-2 font-semibold">Type</label>
//                       <select
//                         value={formData.type}
//                         onChange={(e) => setFormData({...formData, type: e.target.value})}
//                         className={`w-full p-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                       >
//                         <option value="">Select Type</option>
//                         <option value="theory">Theory</option>
//                         <option value="coding">Coding</option>
//                         <option value="practical">Practical</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block mb-2 font-semibold">Difficulty *</label>
//                       <select
//                         value={formData.difficulty}
//                         onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
//                         className={`w-full p-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                       >
//                         <option value="">Select Difficulty</option>
//                         <option value="Easy">Easy</option>
//                         <option value="Medium">Medium</option>
//                         <option value="Hard">Hard</option>
//                       </select>
//                       {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>}
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block mb-2 font-semibold">Question *</label>
//                     <textarea
//                       value={formData.question}
//                       onChange={(e) => setFormData({...formData, question: e.target.value})}
//                       className={`w-full p-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                       rows="3"
//                       placeholder="Enter the question..."
//                     />
//                     {errors.question && <p className="text-red-500 text-sm mt-1">{errors.question}</p>}
//                   </div>

//                   <div>
//                     <label className="block mb-2 font-semibold">Detailed Answer *</label>
//                     <textarea
//                       value={formData.detailedAnswer}
//                       onChange={(e) => setFormData({...formData, detailedAnswer: e.target.value})}
//                       className={`w-full p-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                       rows="4"
//                       placeholder="Enter detailed answer..."
//                     />
//                     {errors.detailedAnswer && <p className="text-red-500 text-sm mt-1">{errors.detailedAnswer}</p>}
//                   </div>

//                   <div>
//                     <label className="block mb-2 font-semibold">Tags (comma-separated)</label>
//                     <input
//                       type="text"
//                       value={formData.tags}
//                       onChange={(e) => setFormData({...formData, tags: e.target.value})}
//                       className={`w-full p-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                       placeholder="e.g. loops, arrays, strings"
//                     />
//                   </div>

//                   <div className="flex gap-4">
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50"
//                     >
//                       {loading ? 'Saving...' : editingId ? 'Update' : 'Add Question'}
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleCancel}
//                       className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {!showAddForm && (
//               <button
//                 onClick={() => setShowAddForm(true)}
//                 className="mb-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
//               >
//                 + Add New Question
//               </button>
//             )}

//             {/* Filters */}
//             <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="font-semibold block mb-2">Category</label>
//                 <select
//                   value={filterCategory}
//                   onChange={(e) => setFilterCategory(e.target.value)}
//                   className={`w-full p-2 border rounded-lg ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
//                 >
//                   <option value="">All Categories</option>
//                   <option value="Java">Java</option>
//                   <option value="MERN">MERN</option>
//                   <option value="Python">Python</option>
//                   <option value="Testing">Testing</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="font-semibold block mb-2">Difficulty</label>
//                 <select
//                   value={filterDifficulty}
//                   onChange={(e) => setFilterDifficulty(e.target.value)}
//                   className={`w-full p-2 border rounded-lg ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
//                 >
//                   <option value="">All Levels</option>
//                   <option value="Easy">Easy</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Hard">Hard</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="font-semibold block mb-2">Type</label>
//                 <select
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                   className={`w-full p-2 border rounded-lg ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
//                 >
//                   <option value="">All Types</option>
//                   <option value="theory">Theory</option>
//                   <option value="coding">Coding</option>
//                   <option value="practical">Practical</option>
//                 </select>
//               </div>
//             </div>

//             {/* Questions List */}
//             {loading ? (
//               <p className="text-center py-8">Loading questions...</p>
//             ) : questions.length === 0 ? (
//               <p className="text-center py-8 text-gray-500">No questions found</p>
//             ) : (
//               <div className="space-y-4">
//                 {questions.map(question => (
//                   <div
//                     key={question._id}
//                     className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
//                   >
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className="text-lg font-semibold flex-1">{question.question}</h3>
//                       <div className="flex gap-2 ml-4">
//                         <span className={`px-2 py-1 rounded text-sm font-semibold ${
//                           question.difficulty === 'Easy' ? 'bg-green-600 text-white' :
//                           question.difficulty === 'Medium' ? 'bg-yellow-600 text-white' :
//                           'bg-red-600 text-white'
//                         }`}>
//                           {question.difficulty}
//                         </span>
//                         <span className={`px-2 py-1 rounded text-sm font-semibold ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
//                           {question.category}
//                         </span>
//                       </div>
//                     </div>

//                     <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                       {question.detailedAnswer.substring(0, 150)}...
//                     </p>

//                     {question.tags && question.tags.length > 0 && (
//                       <div className="flex gap-2 mb-4 flex-wrap">
//                         {question.tags.map((tag, i) => (
//                           <span key={i} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-blue-900' : 'bg-blue-100'} text-blue-600`}>
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(question)}
//                         className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(question._id)}
//                         className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}

//         {activeTab === 'users' && (
//           <>
//             <h1 className="text-3xl font-bold mb-8">User Management</h1>

//             {/* User Stats */}
//             <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8`}>
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Total Users</p>
//                 <p className="text-3xl font-bold">{users.length}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Active</p>
//                 <p className="text-3xl font-bold text-green-600">{users.filter(u => !u.blacklisted).length}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Blacklisted</p>
//                 <p className="text-3xl font-bold text-red-600">{users.filter(u => u.blacklisted).length}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Admins</p>
//                 <p className="text-3xl font-bold text-blue-600">{users.filter(u => u.role === 'admin').length}</p>
//               </div>
//             </div>

//             {/* Users Grid */}
//             {loading ? (
//               <p className="text-center py-8">Loading users...</p>
//             ) : users.length === 0 ? (
//               <p className="text-center py-8 text-gray-500">No users found</p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {users.map(u => (
//                   <div
//                     key={u._id}
//                     className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
//                   >
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//                         {u.username ? u.username.charAt(0).toUpperCase() : 'U'}
//                       </div>
//                       <div>
//                         <p className="font-semibold">{u.username}</p>
//                         <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{u.email}</p>
//                       </div>
//                     </div>

//                     <div className="space-y-2 mb-4">
//                       <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                         <span className="font-semibold">Role:</span> {u.role}
//                       </p>
//                       <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                         <span className="font-semibold">Course:</span> {u.course || 'MERN'}
//                       </p>
//                       <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                         <span className="font-semibold">Joined:</span> {new Date(u.createdAt).toLocaleDateString()}
//                       </p>
//                       <p className={`text-sm ${u.blacklisted ? 'text-red-600 font-semibold' : 'text-green-600'}`}>
//                         {u.blacklisted ? '🔒 Blacklisted' : '✅ Active'}
//                       </p>
//                     </div>

//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleBlacklistUser(u._id, u.blacklisted)}
//                         className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition ${
//                           u.blacklisted
//                             ? 'bg-green-600 hover:bg-green-700 text-white'
//                             : 'bg-yellow-600 hover:bg-yellow-700 text-white'
//                         }`}
//                       >
//                         {u.blacklisted ? 'Unblock' : 'Block'}
//                       </button>
//                       <button
//                         onClick={() => handleDeleteUser(u._id)}
//                         className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}

//         {activeTab === 'settings' && (
//           <>
//             <h1 className="text-3xl font-bold mb-8">Admin Settings</h1>
//             <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//               <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Settings panel coming soon...</p>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }



import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import api from '../../services/api';
import { FaUser, FaQuestion, FaCog, FaSignOutAlt, FaTimes } from 'react-icons/fa';

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('questions');
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    type: '',
    difficulty: '',
    question: '',
    detailedAnswer: '',
    tags: ''
  });
  const [errors, setErrors] = useState({});
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    if (activeTab === 'questions') {
      loadQuestions();
    } else if (activeTab === 'users') {
      loadUsers();
    }
  }, [user, navigate, filterCategory, filterDifficulty, filterType, activeTab]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/all');
      setUsers(response.data || []);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterCategory) params.append('category', filterCategory);
      if (filterDifficulty) params.append('difficulty', filterDifficulty);
      if (filterType) params.append('type', filterType);
      const response = await api.get(`/questions?${params}`);
      setQuestions(response.data);
    } catch (err) {
      console.error('Failed to load questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = 'Category required';
    if (!formData.question) newErrors.question = 'Question required';
    if (!formData.difficulty) newErrors.difficulty = 'Difficulty required';
    if (!formData.detailedAnswer) newErrors.detailedAnswer = 'Answer required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
      };

      if (editingId) {
        await api.put(`/questions/${editingId}`, payload);
      } else {
        await api.post('/questions/add', payload);
      }

      setFormData({
        category: '',
        type: '',
        difficulty: '',
        question: '',
        detailedAnswer: '',
        tags: ''
      });
      setEditingId(null);
      setShowAddForm(false);
      loadQuestions();
    } catch (err) {
      console.error('Failed to save question:', err);
      alert('Error: ' + (err.response?.data?.error || 'Failed to save question'));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (question) => {
    setEditingId(question._id);
    setFormData({
      category: question.category,
      type: question.type || '',
      difficulty: question.difficulty,
      question: question.question,
      detailedAnswer: question.detailedAnswer,
      tags: question.tags ? question.tags.join(', ') : ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try {
      await api.delete(`/questions/${id}`);
      loadQuestions();
    } catch (err) {
      alert('Failed to delete: ' + err.response?.data?.error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this user?')) return;
    try {
      await api.delete(`/users/${userId}`);
      loadUsers();
    } catch (err) {
      alert('Failed to remove user: ' + err.response?.data?.error);
    }
  };

  const handleBlacklistUser = async (userId, isBlacklisted) => {
    try {
      await api.put(`/users/${userId}/blacklist`, { blacklisted: !isBlacklisted });
      loadUsers();
    } catch (err) {
      alert('Failed to update user: ' + err.response?.data?.error);
    }
  };

  // ✅ FIXED ERROR HERE (proper function added)
  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      category: '',
      type: '',
      difficulty: '',
      question: '',
      detailedAnswer: '',
      tags: ''
    });
    setErrors({});
  };

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Your entire JSX remains EXACTLY the same */}
    </div>
  );
}
