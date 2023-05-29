module.exports = {
	name: "conno",
	description: ["Cấm random", "Forbidden random"],
	aliases: ["norandom", 'nrd'],
	usage: ["{prefix}nrd <add | remove> <id>", "{prefix}nrd <add | remove> <id>"],
	cooldown: 0,
	category: "Utils",
	canuse: "g-admins",
	errorcd: ["{time}", "{time}"],
	run: async (client, message, args) => {
		const { QuickDB } = require("quick.db")
		const db = new QuickDB({table: "DB"})
		if (!message.mentions.members.first()) return message.reply('Bạn phải tag con nợ')
		let member = message.mentions.members.first()

		if (args[0] == "add") {

			await db.set(`${member.id}.${message.guild.id}.norandom`, true)
			await message.reply(`**${member.user.username}** đã bị hạn chế random tại **${message.guild.name}**`)
		}
		else if (args[0] == "remove") {
			await db.delete(`${member.id}.${message.guild.id}.norandom`)
			await message.reply(`**${member.user.username}** đã được gỡ role Con Nợ tại **${message.guild.name}**`)

		} else return message.reply("Lệnh đúng là Yconno add tag")
	}
}