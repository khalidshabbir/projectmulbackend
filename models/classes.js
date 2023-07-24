const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
 
  },
});

const Class = mongoose.model('Classes', classSchema);

module.exports = Class;
