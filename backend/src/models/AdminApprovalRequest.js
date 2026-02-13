const mongoose = require('mongoose');

const adminApprovalSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('AdminApprovalRequest', adminApprovalSchema);
