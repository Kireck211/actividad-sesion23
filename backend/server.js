const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')
require('dotenv').config();

const { PORT } = process.env;

const adminRouter = require('./routes/admin');
const studentRouter = require('./routes/students');
const verifyAdmin = require('./middlewares/verifyAdmin');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

require('./db/connect_mongo');

app.get('/', (req, res) => {
  res.redirect('/views/home.html');
});

app.get('/test', (req, res) => {
  res.send('Ok');
})

app.use('/admin', adminRouter);
app.use('/students', verifyAdmin, studentRouter);

app.use(express.static(path.resolve(__dirname, '../frontend')));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));