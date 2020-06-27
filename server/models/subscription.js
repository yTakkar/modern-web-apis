const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
  subscription: {
    type: String,
    required: true,
    unique: true,
  }
})

const subscriptionModel = mongoose.model('subscriptions', subscriptionSchema)

module.exports = subscriptionModel;