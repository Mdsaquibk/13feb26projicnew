// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { ThemeContext } from '../../context/ThemeContext';
// import api from '../../services/api';
// import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { FaChartLine, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';

// export default function SuperAdminPanel() {
//   const { user, logout } = useContext(AuthContext);
//   const { isDark } = useContext(ThemeContext);
//   const navigate = useNavigate();
  
//   const [activeTab, setActiveTab] = useState('analytics');
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });

//   // Sample analytics data
//   const dailyVisitors = [
//     { day: 'Mon', visitors: 120, users: 40 },
//     { day: 'Tue', visitors: 180, users: 60 },
//     { day: 'Wed', visitors: 150, users: 55 },
//     { day: 'Thu', visitors: 220, users: 80 },
//     { day: 'Fri', visitors: 280, users: 95 },
//     { day: 'Sat', visitors: 210, users: 70 },
//     { day: 'Sun', visitors: 190, users: 65 }
//   ];

//   const courseDistribution = [
//     { name: 'MERN', value: 35, fill: '#3B82F6' },
//     { name: 'Java', value: 25, fill: '#EF4444' },
//     { name: 'Python', value: 23, fill: '#10B981' },
//     { name: 'Testing', value: 17, fill: '#F59E0B' }
//   ];

//   const adminStats = [
//     { name: 'Active', value: 8 },
//     { name: 'Pending', value: 3 },
//     { name: 'Inactive', value: 2 }
//   ];

//   useEffect(() => {
//     if (!user || user.role !== 'superadmin') {
//       navigate('/login');
//       return;
//     }
//     loadPendingRequests();
//   }, [user, navigate]);

//   const loadPendingRequests = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/superadmin/pending-admins');
//       setPendingRequests(response.data || []);
//       const total = (response.data || []).length;
//       const pending = (response.data || []).filter(r => r.status === 'pending').length;
//       const approved = (response.data || []).filter(r => r.status === 'approved').length;
//       const rejected = (response.data || []).filter(r => r.status === 'rejected').length;
//       setStats({ total, pending, approved, rejected });
//     } catch (err) {
//       console.error('Failed to load pending requests:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (requestId) => {
//     try {
//       await api.post(`/superadmin/approve/${requestId}`);
//       loadPendingRequests();
//     } catch (err) {
//       alert('Failed to approve: ' + err.response?.data?.error);
//     }
//   };

//   const handleReject = async (requestId) => {
//     try {
//       await api.post(`/superadmin/reject/${requestId}`);
//       loadPendingRequests();
//     } catch (err) {
//       alert('Failed to reject: ' + err.response?.data?.error);
//     }
//   };

//   return (
//     <div className={`min-h-screen flex ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
//       {/* Aside Bar */}
//       <aside className={`w-64 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r p-6 sticky top-0 h-screen overflow-y-auto`}>
//         <h2 className="text-2xl font-bold mb-8">SuperAdmin</h2>
        
//         {/* Profile Card */}
//         {user && (
//           <div className={`${isDark ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg mb-8`}>
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
//                 {user.username ? user.username.charAt(0).toUpperCase() : 'S'}
//               </div>
//               <div>
//                 <p className="font-semibold">{user.username || 'SuperAdmin'}</p>
//                 <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</p>
//               </div>
//             </div>
//             <div className={`text-xs py-2 px-3 rounded ${isDark ? 'bg-gray-600' : 'bg-purple-200'} text-center font-semibold`}>
//               SUPERADMIN
//             </div>
//           </div>
//         )}

//         {/* Menu Items */}
//         <nav className="space-y-3">
//           <button
//             onClick={() => setActiveTab('analytics')}
//             className={`w-full flex items-center gap-3 p-3 rounded-lg font-semibold transition ${
//               activeTab === 'analytics'
//                 ? isDark ? 'bg-purple-600' : 'bg-purple-500 text-white'
//                 : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//             }`}
//           >
//             <FaChartLine size={18} /> Analytics
//           </button>

//           <button
//             onClick={() => setActiveTab('admins')}
//             className={`w-full flex items-center gap-3 p-3 rounded-lg font-semibold transition ${
//               activeTab === 'admins'
//                 ? isDark ? 'bg-purple-600' : 'bg-purple-500 text-white'
//                 : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//             }`}
//           >
//             <FaUsers size={18} /> Admin Approvals
//           </button>

//           <button
//             onClick={() => setActiveTab('settings')}
//             className={`w-full flex items-center gap-3 p-3 rounded-lg font-semibold transition ${
//               activeTab === 'settings'
//                 ? isDark ? 'bg-purple-600' : 'bg-purple-500 text-white'
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
//         {activeTab === 'analytics' && (
//           <>
//             <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

//             {/* Top Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Total Visitors</p>
//                 <p className="text-3xl font-bold">1,350</p>
//                 <p className="text-green-600 text-sm mt-2">↑ 12% from last week</p>
//               </div>

//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Active Users</p>
//                 <p className="text-3xl font-bold">425</p>
//                 <p className="text-green-600 text-sm mt-2">↑ 8% from last week</p>
//               </div>

//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Total Questions</p>
//                 <p className="text-3xl font-bold">72</p>
//                 <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Across 4 courses</p>
//               </div>

//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Admins</p>
//                 <p className="text-3xl font-bold">8</p>
//                 <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">3 pending approval</p>
//               </div>
//             </div>

//             {/* Charts Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//               {/* Daily Visitors Chart */}
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <h2 className="text-xl font-bold mb-4">Weekly Visitors & Users</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={dailyVisitors}>
//                     <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#444' : '#ccc'} />
//                     <XAxis stroke={isDark ? '#888' : '#666'} />
//                     <YAxis stroke={isDark ? '#888' : '#666'} />
//                     <Tooltip 
//                       contentStyle={{
//                         backgroundColor: isDark ? '#1f2937' : '#fff',
//                         border: isDark ? '1px solid #444' : '1px solid #ccc',
//                         color: isDark ? '#fff' : '#000'
//                       }}
//                     />
//                     <Legend />
//                     <Line type="monotone" dataKey="visitors" stroke="#3B82F6" name="Visitors" />
//                     <Line type="monotone" dataKey="users" stroke="#10B981" name="Users" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Course Distribution Pie Chart */}
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <h2 className="text-xl font-bold mb-4">User Distribution by Course</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={courseDistribution}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, value }) => `${name}: ${value}%`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {courseDistribution.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                       ))}
//                     </Pie>
//                     <Tooltip 
//                       contentStyle={{
//                         backgroundColor: isDark ? '#1f2937' : '#fff',
//                         border: isDark ? '1px solid #444' : '1px solid #ccc',
//                         color: isDark ? '#fff' : '#000'
//                       }}
//                       formatter={(value) => `${value}%`}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Admin Stats Chart */}
//             <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-8`}>
//               <h2 className="text-xl font-bold mb-4">Admin Status Overview</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={adminStats}>
//                   <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#444' : '#ccc'} />
//                   <XAxis stroke={isDark ? '#888' : '#666'} />
//                   <YAxis stroke={isDark ? '#888' : '#666'} />
//                   <Tooltip 
//                     contentStyle={{
//                       backgroundColor: isDark ? '#1f2937' : '#fff',
//                       border: isDark ? '1px solid #444' : '1px solid #ccc',
//                       color: isDark ? '#fff' : '#000'
//                     }}
//                   />
//                   <Bar dataKey="value" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Course Stats */}
//             <div className="grid grid-cols-4 gap-4">
//               {courseDistribution.map((course) => (
//                 <div key={course.name} className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                   <div className="flex items-center gap-3 mb-2">
//                     <div className="w-4 h-4 rounded-full" style={{ backgroundColor: course.fill }}></div>
//                     <span className="font-semibold">{course.name}</span>
//                   </div>
//                   <p className="text-2xl font-bold">{course.value}%</p>
//                   <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                     {Math.round(425 * course.value / 100)} users
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {activeTab === 'admins' && (
//           <>
//             <h1 className="text-3xl font-bold mb-8">Admin Approval Requests</h1>

//             {/* Stats */}
//             <div className="grid grid-cols-4 gap-4 mb-8">
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Total Requests</p>
//                 <p className="text-3xl font-bold">{stats.total}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border-l-4 border-yellow-500`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Pending</p>
//                 <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border-l-4 border-green-500`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Approved</p>
//                 <p className="text-3xl font-bold text-green-500">{stats.approved}</p>
//               </div>
//               <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border-l-4 border-red-500`}>
//                 <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Rejected</p>
//                 <p className="text-3xl font-bold text-red-500">{stats.rejected}</p>
//               </div>
//             </div>

//             {loading ? (
//               <p className="text-center py-8">Loading requests...</p>
//             ) : pendingRequests.length === 0 ? (
//               <p className="text-center py-8 text-gray-500">No pending requests</p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {pendingRequests.map(request => (
//                   <div
//                     key={request._id}
//                     className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
//                   >
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
//                         {request.adminId?.username ? request.adminId.username.charAt(0).toUpperCase() : 'A'}
//                       </div>
//                       <div>
//                         <h3 className="font-semibold">{request.adminId?.username}</h3>
//                         <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{request.adminId?.email}</p>
//                       </div>
//                     </div>

//                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
//                       request.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
//                       request.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
//                       'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//                     }`}>
//                       {request.status.toUpperCase()}
//                     </span>

//                     <div className={`mb-4 p-3 rounded text-sm ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                       <p><strong>Reason:</strong> {request.reason}</p>
//                       <p className="mt-2"><strong>Applied:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
//                     </div>

//                     {request.status === 'pending' && (
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleApprove(request._id)}
//                           className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold"
//                         >
//                           ✓ Approve
//                         </button>
//                         <button
//                           onClick={() => handleReject(request._id)}
//                           className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold"
//                         >
//                           ✕ Reject
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}

//         {activeTab === 'settings' && (
//           <>
//             <h1 className="text-3xl font-bold mb-8">SuperAdmin Settings</h1>
//             <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//               <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Settings panel coming soon...</p>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }




import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SuperAdminPanel() {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("dashboard");

  const courseData = [
    { name: "Java", value: 40 },
    { name: "Python", value: 25 },
    { name: "MERN", value: 20 },
    { name: "Testing", value: 15 },
  ];

  const trafficData = [
    { day: "Mon", visitors: 120 },
    { day: "Tue", visitors: 150 },
    { day: "Wed", visitors: 200 },
    { day: "Thu", visitors: 170 },
    { day: "Fri", visitors: 220 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className={`w-64 p-6 ${
        isDark ? "bg-gray-900 text-white" : "bg-white shadow-md"
      }`}>
        <h2 className="text-2xl font-bold mb-6">Super Admin</h2>

        {["dashboard", "admins", "requests", "users", "analytics"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`block w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}

        <button
          onClick={logout}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-8">

        {/* Dashboard Overview */}
        {activeTab === "dashboard" && (
          <>
            <div className={`p-6 rounded-xl shadow mb-8 ${
              isDark ? "bg-gray-800 text-white" : "bg-white"
            }`}>
              <h3 className="text-xl font-bold">Welcome, {user?.username}</h3>
              <p>Email: {user?.email}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow">
                <h4>Total Users</h4>
                <p className="text-2xl font-bold">150</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-6 rounded-xl shadow">
                <h4>Total Admins</h4>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-xl shadow">
                <h4>Daily Visitors</h4>
                <p className="text-2xl font-bold">220</p>
              </div>
            </div>
          </>
        )}

        {/* All Admins */}
        {activeTab === "admins" && (
          <div className="grid md:grid-cols-2 gap-6">
            {[1,2].map(a => (
              <div key={a} className={`p-6 rounded-xl shadow ${
                isDark ? "bg-gray-800 text-white" : "bg-white"
              }`}>
                <h4 className="font-bold mb-2">Admin {a}</h4>
                <p>Email: admin{a}@mail.com</p>
                <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg">
                  Revoke Admin
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Admin Requests */}
        {activeTab === "requests" && (
          <div className="grid md:grid-cols-2 gap-6">
            {[1,2].map(r => (
              <div key={r} className={`p-6 rounded-xl shadow ${
                isDark ? "bg-gray-800 text-white" : "bg-white"
              }`}>
                <h4>User {r}</h4>
                <p>Requested Admin Access</p>
                <div className="flex gap-3 mt-3">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                    Approve
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics */}
        {activeTab === "analytics" && (
          <>
            <h3 className="text-xl font-bold mb-6">Traffic Analytics</h3>

            <div className="grid md:grid-cols-2 gap-8">

              {/* Pie Chart */}
              <div className={`p-6 rounded-xl shadow ${
                isDark ? "bg-gray-800 text-white" : "bg-white"
              }`}>
                <h4 className="mb-4 font-bold">Course Popularity</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={courseData}
                      dataKey="value"
                      outerRadius={100}
                      label
                    >
                      {courseData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className={`p-6 rounded-xl shadow ${
                isDark ? "bg-gray-800 text-white" : "bg-white"
              }`}>
                <h4 className="mb-4 font-bold">Daily Visitors</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visitors" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
          </>
        )}

      </main>
    </div>
  );
}
