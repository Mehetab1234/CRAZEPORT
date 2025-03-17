const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(id, { role }, { new: true });
  res.json({ message: 'User role updated successfully', user });
};
