const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://admin:adminPassword786@ds143262.mlab.com:43262/push-notifications', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = db;