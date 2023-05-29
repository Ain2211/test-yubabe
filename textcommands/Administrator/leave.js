module.exports = {
	name: "leave",
	description: ["Rời khỏi server!.", "Guild destroy command."],
	aliases: [],
	usage: ["{prefix}leave <guildId>", "{prefix}leave <guildId>"],
	cooldown: 10000,
	category: "Admins",
	canuse: "owners",
	errorcd: ["Vẫn còn {time} cooldown, hãy kiên nhẫn!", "CD: **{time}** !"],
	run: async (client, message, args) => {
		var guildID = client.guilds.cache.get(args[0])
		let name = guildID.name
		guildID.leave()
		await message.reply(`Đã rời khỏi **${name}**`).catch(e => console.log(e))
	}
}