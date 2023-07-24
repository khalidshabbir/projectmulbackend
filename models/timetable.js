const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  subjectname: {
    type: String,
    required: true,
    
  },
  day: {
    type: String,
    required: true,
    
  },
  classs: {
    type: String,
    required: true,
    
  },
  teacher: {
    type: String,
    required: true,
    
  },
  lecture: {
    type: String,
    required: true,
    
  },
  room: {
    type: String,
    required: true,
    
  },
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
