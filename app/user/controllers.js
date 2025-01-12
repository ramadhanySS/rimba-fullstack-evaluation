const User = require('./models');
const { v4: uuidv4 } = require('uuid');

const index = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ err: 'server error' });
  }
};

const indexById = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const store = async (req, res, next) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ id: uuidv4(), name, email, age });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ err: 'Bad Request', details: err.message });
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const user = await User.findOneAndUpdate({ id }, { name, email, age }, { new: true });
    if (!user) return res.status(404).json({ err: 'User not Found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Bad request', details: err.message });
  }
};

const destroy = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ id: req.params.id });
    if (!user) return res.status(404).json({ err: 'User Not Found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Bad request', details: err.message });
  }
};

module.exports = { index, indexById, store, update, destroy };
