const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['running', 'stopped'], default: 'stopped' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Server', serverSchema);
