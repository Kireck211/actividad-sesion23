const mongoose = require('../connect_mongo');
const students = require('../../data/mockedData.json');

class StudentMock {
  constructor(obj) {
    this.obj = obj;
  }

  static find() {
    return Promise.resolve(students);
  }

  static findOne(obj) {
    return new Promise((resolve, reject) => {
      resolve(students.filter(student => student._id === obj._id));
    });
  }

  static findOneAndUpdate(obj, newProperties) {
    return this.findOne(obj);
  }

  static findOneAndDelete(obj) {
    return this.findOne(obj);
  }
  
  save() {
    new Promise((resolve, reject) => {
      students.push(this.obj);
      resolve(students[students.length - 1]);
    });
  }
}
Student = StudentMock;


if (process.env.NODE_ENV !== 'development') {
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
  Student = mongoose.model('students', studentSchema);
}

module.exports = Student;