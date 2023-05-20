const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const auth = async (req, res, next) => {
  try {
    if (!req.header('token')) {
      res.status(404).json({ error: "token not found"})
    }
    const decoded = jwt.verify(JSON.parse(req.header('token')), "goal123")
    if (decoded) {
      const user = await User.findById(decoded)
      if (user) {
        req.user = user
      } else {
        res.status(401).json({ error: "invalid token"})
      }
    }
    next()
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = auth