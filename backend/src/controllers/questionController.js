const Question = require('../models/Question');

exports.list = async (req, res) => {
  try {
    const { category, difficulty, type } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (type) filter.type = type;
    const qs = await Question.find(filter).limit(100);
    res.json(qs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.add = async (req, res) => {
  try {
    const { category, type, difficulty, question, detailedAnswer, tags } = req.body;
    if (!category || !question) return res.status(400).json({ error: 'category and question required' });
    const q = await Question.create({ category, type, difficulty, question, detailedAnswer, tags, createdBy: req.user && req.user.id });
    res.status(201).json(q);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const q = await Question.findById(req.params.id);
    if (!q) return res.status(404).json({ error: 'Not found' });
    res.json(q);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const q = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(q);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
