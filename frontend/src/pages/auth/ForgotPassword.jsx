// import React, { useState ,useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { ThemeContext } from '../../context/ThemeContext';
// import api from '../../services/api';
// import { validateEmail } from '../../utils/validation';

// export default function ForgotPassword() {
//   const navigate = useNavigate();
//   const { isDark } = useContext(ThemeContext);
//   const [email, setEmail] = useState('');
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [step, setStep] = useState(1); // 1: email, 2: reset code, 3: new password

//   const handleSubmitEmail = async (e) => {
//     e.preventDefault();
//     const errs = {};
//     if (!email) errs.email = 'Email is required';
//     else if (!validateEmail(email)) errs.email = 'Invalid email format';
    
//     setErrors(errs);
//     if (Object.keys(errs).length > 0) return;

//     try {
//       setLoading(true);
//       await api.post('/auth/forgot-password', { email });
//       setMessage('Reset code sent to your email');
//       setStep(2);
//     } catch (err) {
//       setErrors({ submit: err.response?.data?.error || 'Failed to send reset code' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-4`}>
//       <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 w-full max-w-md`}>
//         <h1 className="text-3xl font-bold text-center mb-8">Reset Password</h1>

//         {message && (
//           <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
//             {message}
//           </div>
//         )}

//         {errors.submit && (
//           <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
//             {errors.submit}
//           </div>
//         )}

//         {step === 1 && (
//           <form onSubmit={handleSubmitEmail} className="space-y-4">
//             <div>
//               <label className="block mb-2 font-semibold">Email Address</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={`w-full p-3 border rounded-lg ${
//                   isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
//                 } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                 placeholder="Enter your email"
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition"
//             >
//               {loading ? 'Sending...' : 'Send Reset Code'}
//             </button>
//           </form>
//         )}

//         <div className="flex gap-2 text-center mt-6">
//           <Link to="/login" className="text-blue-600 hover:underline">Back to Login</Link>
//           {' | '}
//           <Link to="/register" className="text-blue-600 hover:underline">Create Account</Link>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import api from '../../services/api';
import { validateEmail } from '../../utils/validation';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Send reset code
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!email) errs.email = 'Email is required';
    else if (!validateEmail(email)) errs.email = 'Invalid email format';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      setLoading(true);
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data.message || 'Reset code sent to your email');
      setStep(2);
    } catch (err) {
      setErrors({ submit: err.response?.data?.error || 'Failed to send reset code' });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!otp) errs.otp = 'OTP is required';
    else if (otp.length !== 6) errs.otp = 'OTP must be 6 digits';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      setLoading(true);
      await api.post('/auth/verify-otp', { email, otp });
      setMessage('OTP verified! Please set your new password.');
      setStep(3);
      setErrors({});
    } catch (err) {
      setErrors({ submit: err.response?.data?.error || 'Invalid or expired OTP' });
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!newPassword) errs.newPassword = 'New password is required';
    else if (newPassword.length < 6) errs.newPassword = 'Password must be at least 6 characters';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      setLoading(true);
      await api.post('/auth/reset-password', { email, newPassword });
      setMessage('Password reset successful! You can now login.');
      setStep(1);
      setEmail('');
      setOtp('');
      setNewPassword('');
      setErrors({});
      navigate('/login');
    } catch (err) {
      setErrors({ submit: err.response?.data?.error || 'Failed to reset password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-4`}>
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 w-full max-w-md`}>
        <h1 className="text-3xl font-bold text-center mb-8">Reset Password</h1>

        {message && <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">{message}</div>}
        {errors.submit && <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">{errors.submit}</div>}

        {/* Step 1: Email */}
        {step === 1 && (
          <form onSubmit={handleSubmitEmail} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition">
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="6-digit OTP"
                maxLength={6}
              />
              {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter new password"
              />
              {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition">
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        <div className="flex gap-2 text-center mt-6">
          <Link to="/login" className="text-blue-600 hover:underline">Back to Login</Link>
          {' | '}
          <Link to="/register" className="text-blue-600 hover:underline">Create Account</Link>
        </div>
      </div>
    </div>
  );
}

