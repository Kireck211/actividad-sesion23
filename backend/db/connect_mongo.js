const mongoose = require('mongoose');

const { DB_URL } = process.env;

mongoose.connect(DB_URL)
  .then(() => console.log('Connected to database'))
  .catch(() => {
    console.log('Could not connect to database');
    process.exit(1);
  });

module.exports = mongoose;