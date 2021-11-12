const mongoose = require('../connect_mongo');
const bcrypt = require('bcryptjs');

let Admin = {};

if (process.env.NODE_ENV !== 'development') {
  const adminSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }, { collection: 'admins'});
  
  adminSchema.pre('save', (next) => {
    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
    next();
  })
  Admin = mongoose.model('admins', adminSchema);
}

module.exports = Admin;