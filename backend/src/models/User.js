// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String },
//   role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' },
//   isApproved: { type: Boolean, default: false },
//   course: { type: String, default: 'MERN' },
//   profilePicture: { type: String, default: 'https://via.placeholder.com/150' },
//   blacklisted: { type: Boolean, default: false },
//   resetOTP: { type: String },
//   resetOTPExpires: { type: Date },
//   resetVerified: { type: Boolean, default: false },
//   loggedInAt: { type: Date },
//   notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },

    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user'
    },

    isApproved: { type: Boolean, default: false },
    course: { type: String, default: 'MERN' },

    profilePicture: {
      type: String,
      default: 'https://via.placeholder.com/150'
    },

    blacklisted: { type: Boolean, default: false },

    resetOTP: { type: String },
    resetOTPExpires: { type: Date },
    resetVerified: { type: Boolean, default: false }

  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
