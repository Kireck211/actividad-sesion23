const jwt = require('jsonwebtoken');

const { TOKEN_SECRET } = process.env;

const verifyAdmin = (req, res, next) => {
  try {
    const token = req.header('x-auth')
    if (token) {
      jwt.verify(token, TOKEN_SECRET);
      return next();
    }
    throw new Error('Token not found in header request')
  } catch (err) {
    console.log('Error', err);
    res.status(403).send('Forbidden');
  }
}

module.exports = verifyAdmin;