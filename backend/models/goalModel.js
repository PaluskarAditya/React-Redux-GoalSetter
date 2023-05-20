const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
  text: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
})

const Goal = mongoose.model('Goals', goalSchema)
module.exports = Goal