const mongoose = require('mongoose');

const conn = () => {
  mongoose.connect('mongodb+srv://root:root@mongodb.e65qray.mongodb.net/goalsetter');
  console.log('Mongoose connection established')
}

module.exports = conn