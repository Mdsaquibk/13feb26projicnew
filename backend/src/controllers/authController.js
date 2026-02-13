// const User = require('../models/User');
// const AdminApprovalRequest = require('../models/AdminApprovalRequest');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { sendEmail } = require('../config/email');

// const signToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

// exports.register = async (req, res) => {
//   try {
//     const { username, email, password, role = 'user', course } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ error: 'Email already registered' });
//     const hash = await bcrypt.hash(password, 10);
//     const isApproved = role === 'user';
//     const user = await User.create({ username, email, password: hash, role, course, isApproved });

//     if (role === 'admin') {
//       await AdminApprovalRequest.create({ adminId: user._id, status: 'pending' });
//       // notify superadmin via console / email if configured
//       await sendEmail(process.env.EMAIL_FROM || process.env.EMAIL_USER, 'New admin request', `Admin request from ${email}`);
//     }

//     const token = signToken(user);
//     res.status(201).json({ user, token });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
//     if (user.role === 'admin' && !user.isApproved) return res.status(403).json({ error: 'Admin pending approval' });
//     const token = signToken(user);
//     res.json({ user, token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // exports.forgotPassword = async (req, res) => {
// //   try {
// //     const { email } = req.body;
// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(404).json({ error: 'User not found' });
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     user.resetOTP = otp;
// //     user.resetOTPExpires = Date.now() + 15 * 60 * 1000;
// //     await user.save();
// //     await sendEmail(email, 'Your OTP', `OTP: ${otp}`, `<p>OTP: ${otp}</p>`);
// //     res.json({ ok: true });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };




// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ error: 'Email is required' });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: 'User not found with this email' });

//     // Generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Save OTP and expiry (e.g. 15 minutes)
//     user.resetOTP = otp;
//     user.resetOTPExpires = Date.now() + 15 * 60 * 1000;
//     user.resetVerified = false;
//     await user.save();

//     // Email content
//     const subject = 'Your Password Reset Code';
//     const text = `Your password reset code is: ${otp}`;
//     const html = `<p>Your password reset code is: <strong>${otp}</strong></p><p>This code expires in 15 minutes.</p>`;

//     await sendEmail(email, subject, text, html);

//     res.json({ message: 'Reset code sent to your email' });
//   } catch (err) {
//     console.error('Forgot password error:', err);
//     res.status(500).json({ error: 'Failed to send reset code' });
//   }
// };


 
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     if (user.resetOTP !== otp || user.resetOTPExpires < Date.now()) return res.status(400).json({ error: 'Invalid or expired OTP' });
//     user.resetVerified = true;
//     await user.save();
//     res.json({ ok: true });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !user.resetVerified) return res.status(400).json({ error: 'Not verified' });
//     user.password = await bcrypt.hash(newPassword, 10);
//     user.resetOTP = undefined; user.resetOTPExpires = undefined; user.resetVerified = false;
//     await user.save();
//     res.json({ ok: true });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.changePassword = async (req, res) => {
//   try {
//     const userId = req.user && req.user.id;
//     const { oldPassword, newPassword } = req.body;
//     if (!userId) return res.status(401).json({ error: 'Unauthorized' });
//     const user = await User.findById(userId);
//     const ok = await bcrypt.compare(oldPassword, user.password);
//     if (!ok) return res.status(400).json({ error: 'Old password incorrect' });
//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();
//     res.json({ ok: true });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };




const User = require('../models/User');
const AdminApprovalRequest = require('../models/AdminApprovalRequest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../config/email');

const signToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {
    const { username, email, password, role = 'user', course } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isApproved = role === 'user';

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      course,
      isApproved
    });

    if (role === 'admin') {
      await AdminApprovalRequest.create({
        adminId: user._id,
        status: 'pending'
      });

      await sendEmail(
        process.env.EMAIL_FROM || process.env.EMAIL_USER,
        'New Admin Approval Request',
        `Admin request from ${email}`
      );
    }

    const token = signToken(user);

    res.status(201).json({ user, token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    if (user.role === 'admin' && !user.isApproved) {
      return res.status(403).json({ error: 'Admin pending approval' });
    }

    const token = signToken(user);

    res.json({ user, token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= FORGOT PASSWORD ================= */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: 'User not found with this email' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOTP = otp;
    user.resetOTPExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    user.resetVerified = false;

    await user.save();

    await sendEmail(
      email,
      'Password Reset Code',
      `Your OTP is: ${otp}`,
      `<h3>Your OTP is: <b>${otp}</b></h3><p>This code expires in 15 minutes.</p>`
    );

    res.json({ message: 'Reset code sent to your email' });

  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Failed to send reset code' });
  }
};

/* ================= VERIFY OTP ================= */
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ error: 'User not found' });

    if (
      user.resetOTP !== otp ||
      user.resetOTPExpires < Date.now()
    ) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    user.resetVerified = true;
    await user.save();

    res.json({ message: 'OTP verified successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= RESET PASSWORD ================= */
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters'
      });
    }

    const user = await User.findOne({ email });

    if (!user || !user.resetVerified) {
      return res.status(400).json({ error: 'OTP not verified' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOTP = undefined;
    user.resetOTPExpires = undefined;
    user.resetVerified = false;

    await user.save();

    res.json({ message: 'Password reset successful' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= CHANGE PASSWORD ================= */
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { oldPassword, newPassword } = req.body;

    if (!userId)
      return res.status(401).json({ error: 'Unauthorized' });

    const user = await User.findById(userId);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ error: 'Old password incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password changed successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
