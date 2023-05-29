const mongoose = require("mongoose");

const werewolfSchema = mongoose.Schema({
	guildid: String,
	daychannel: String,
	nightchannel: String,
	player: Number,
	host: String,
	roles: {
		soi1: {
			id: String,
            dead : Boolean
		},
		soi2: {
			id: String,
            dead : Boolean
		},
		soicon: {
			id: String,
            dead : Boolean
		},
		dan1: {
			id: String,
            dead : Boolean
		},
		bansoi: {
			id: String,
            dead : Boolean
		},
		dan2: {
			id: String,
            dead : Boolean
		},
		phuthuy: {
			id: String,
            dead : Boolean
		},
		xathu: {
			id: String,
            dead : Boolean
		},
		mucsu: {
			id: String,
            dead : Boolean
		},
		baove: {
			id: String,
            dead : Boolean
		},
		thaydong: {
			id: String,
            dead : Boolean
		},
		bacsi: {
			id: String,
            dead : Boolean
		},
		tientri: {
			id: String,
            dead : Boolean
		},
		thamtu: {
			id: String,
            dead : Boolean
		},
		dan3: {
			id: String,
            dead : Boolean
		},
		ngo: {
			id: String,
            dead : Boolean
		},
		satthu: {
			id: String,
            dead : Boolean
		},
		tinhnhan: {
			id: String,
            dead : Boolean
		},
		tinhnhan2: {
			id: String,
            dead : Boolean
		}
	}
});

module.exports = mongoose.model("werewolfSchema", werewolfSchema);
