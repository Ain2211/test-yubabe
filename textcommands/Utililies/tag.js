module.exports = {
	name: "tag",
	description: ["Tạo ghi chú của bạn", "Create your notice"],
	aliases: ["note", "howto"],
	usage: ["{prefix}tag <>", "{prefix}tag <>"],
	cooldown: 0,
	category: "Utils",
	canuse: "everyone",
	errorcd: ["{time}", "{time}"],
	run: async (client, message, args) => {
		const { QuickDB } = require("quick.db")
		const db = new QuickDB({table: "DB"})

		if (args[0] == "new") {
			await client.set(`${message.guild.id}.${args[1]}`, args.slice(2).join(" "))
			await message.react("❤️")
		} else {
			let tag = args[0]
			let tág = await client.get(`${message.guild.id}.${tag}`)
			if (!tág) return message.react("❓")
			await message.reply(tág)
		}
	}
}