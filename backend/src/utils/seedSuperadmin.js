const connectDB = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

const run = async () => {
  await connectDB();
  const email = process.env.SUPERADMIN_EMAIL || process.env.EMAIL_USER || 'superadmin@example.com';
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Superadmin already exists:', email);
    process.exit(0);
  }
  const password = process.env.SUPERADMIN_PASS || 'SuperAdmin123!';
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username: 'superadmin', email, password: hash, role: 'superadmin', isApproved: true });
  console.log('Created superadmin:', user.email, 'with password from env or default');
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
