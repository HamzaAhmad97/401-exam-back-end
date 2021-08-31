const mongoose = require('mongoose');


const cryptoSchema = new mongoose.Schema({
  title: String,
  description: String,
  toUSD: String,
  image_url: String,
  watchers: [String],
})

const cryptoModel = mongoose.model('crypto', cryptoSchema);

const userSchema = new mongoose.Schema({
  email: String,
  yemail: {type: String, default: 'v.salvatore7.gs@gmail.com'},
  watching: [String],
})
const userModel = mongoose.model('user', userSchema);

module.exports = {cryptoModel, userModel};