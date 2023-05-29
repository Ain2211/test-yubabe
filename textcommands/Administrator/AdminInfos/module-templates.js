
module.exports = {
	name: "",
	description: ["", ""],
	aliases: [""],
	usage: ["{prefix} <> <> <>", "{prefix}add <> <> <>"],
	cooldown: 0,
	category: "Name",
	canuse: "everyone",
	errorcd: ["{time}", "{time}"],
	run: async (client, message, args) => {
		// Lấy thông tin ngôn ngữ
		const { QuickDB } = require("quick.db")
		const db = new QuickDB({ table: "DB" })
		const lang = await db.get(`${message.guild.id}_languages`)
	}
}