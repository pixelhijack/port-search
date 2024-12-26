const mongoose = require('mongoose');

const CruiseSchema = new mongoose.Schema({
  cruise_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  stops: { type: [String], required: true }, // Array of port names or IDs
});

module.exports = mongoose.model('Cruise', CruiseSchema);