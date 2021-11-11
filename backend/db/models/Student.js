const mongoose = require('../connect_mongo');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  birth: {
    type: Date,
    required: true
  },
  favoriteColor: {
    type: String,
    enum: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  },
  score: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  favoriteCourse: {
    type: String,
    default: 'DASW'
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, { collection: 'students'});

const Student = mongoose.model('students', studentSchema);

module.exports = Student;