const mongoose = require('mongoose');

const classLecture = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
 
  },
});

const Lectues = mongoose.model('Lectue', classLecture);

module.exports = Lectues;
