const User = require('../models/User');
const Question = require('../models/Question');

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password').limit(1000);
  res.json(users);
};

exports.getQuestions = async (req, res) => {
  const qs = await Question.find().limit(1000);
  res.json(qs);
};
