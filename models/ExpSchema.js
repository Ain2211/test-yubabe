const mongoose = require('mongoose');

const expSchema = new mongoose.Schema({
	memberid: String,
	exp: Number,

})
module.exports = mongoose.model('expSchema', expSchema)