const mongoose = require('mongoose');

const explvSchema = new mongoose.Schema({
	memberid: String,
	level: Number,

})
module.exports = mongoose.model('explvSchema', explvSchema)