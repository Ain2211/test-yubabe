const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
	authorid: String,
  name: String,
  icon: String,
	coins: Number,
})
module.exports = mongoose.model('cryptoSchema', cryptoSchema)