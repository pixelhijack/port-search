const mongoose = require('mongoose');

const PortSchema = new mongoose.Schema({
  port_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  raw_names: { type: [String], default: [] },
});

module.exports = mongoose.model('Port', PortSchema);