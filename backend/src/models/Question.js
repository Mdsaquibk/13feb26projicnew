const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: { type: String, enum: ['Java', 'MERN', 'Python', 'Testing'], required: true },
  type: { type: String, enum: ['theory', 'coding', 'practical'], required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  question: { type: String, required: true },
  detailedAnswer: { type: String },
  tags: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
