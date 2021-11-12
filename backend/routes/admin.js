const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../db/models/Admin');
const {TOKEN_SECRET} = process.env;
// path: /admin

router.post('/login', async (req, res) => {
  try {
  const {email, password} = req.body;
  const admin = await Admin.findOne({email: email});
  const equal = await bcrypt.compare(password, admin.password);
  if (equal === false) {
    throw new Error('Wrong email or password');
  }
  const token = jwt.sign({id: admin.id}, TOKEN_SECRET, {expiresIn: 60 * 60});
  res.send({token});
  } catch (err) {
    console.log('Error', err);
    res.status(403).send('Wrong email or password')
  }
});

router.post('/register', async (req, res) => {
  try {
    const admin = new Admin(req.body);
    const user = await admin.save();
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send('Ooops algo salió mal');
  }
})

module.exports = router;