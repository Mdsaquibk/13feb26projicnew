const AdminApprovalRequest = require('../models/AdminApprovalRequest');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.showLogin = (req, res) => {
  res.render('superadmin/login', { error: null });
};

exports.handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.role !== 'superadmin') return res.render('superadmin/login', { error: 'Invalid email or not superadmin' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.render('superadmin/login', { error: 'Invalid password' });
    res.redirect('/superadmin/dashboard');
  } catch (err) {
    res.render('superadmin/login', { error: err.message });
  }
};

exports.dashboard = async (req, res) => {
  const pending = await AdminApprovalRequest.find({ status: 'pending' }).populate('adminId');
  res.render('superadmin/dashboard', { pending });
};

exports.pendingAdmins = async (req, res) => {
  const pending = await AdminApprovalRequest.find({ status: 'pending' }).populate('adminId');
  res.render('superadmin/pendingAdmins', { pending });
};

exports.approve = async (req, res) => {
  const reqId = req.params.id;
  const reqDoc = await AdminApprovalRequest.findById(reqId);
  if (!reqDoc) return res.status(404).send('Not found');
  reqDoc.status = 'approved';
  await reqDoc.save();
  await User.findByIdAndUpdate(reqDoc.adminId, { isApproved: true, role: 'admin' });
  res.redirect('/superadmin/dashboard');
};

exports.reject = async (req, res) => {
  const reqId = req.params.id;
  const reqDoc = await AdminApprovalRequest.findById(reqId);
  if (!reqDoc) return res.status(404).send('Not found');
  reqDoc.status = 'rejected';
  await reqDoc.save();
  res.redirect('/superadmin/dashboard');
};
