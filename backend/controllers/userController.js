const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const genToken = (id) => {
  return jwt.sign(id, "goal123")
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    if (!user) {
      res.status(404).json({ err: "user not found" })
    } 
    const verify = await bcrypt.compare(password.toString(), user.password)
    if (verify) {
      const token = genToken(user.id)
      // console.log(verify, password, user.password, token)
      res.status(200).json({ user, token })
    } else if (verify===false) {
      console.log(verify, password, user.password)
      res.status(401).json({err: 'User data invalid'})
    }
  } catch (error) {
    console.log(error.message)
  }
}

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
      res.status(404).json({ err: "Invalid user data" })
    }
    const user = await User.findOne({ username })
    if (user) {
      res.status(401).json({ err: "user already exists" })
    } else {
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(password, salt)
      const user = await User.create({
        username,
        email,
        password: hashed
      })
      user.save()
      if (user) {
        res.status(200).json({ user, token: genToken(user.id)  })
      } else {
        res.status(500).json({ err: "internal server error" })
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  login,
  register,
}