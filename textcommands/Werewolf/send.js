module.exports = {
name: "send",
	description: ["chat", "chat"],
	aliases: ["chat"],
	usage: ["{prefix} <> <> <>", "{prefix}add <> <> <>"],
	cooldown: 0,
	category: "Admins",
	canuse: "admins",
	errorcd: ["{time}", "{time}"],
	run: async (client, message, args) => {
		// Lấy thông tin ngôn ngữ
		const { QuickDB } = require("quick.db")
		const db = new QuickDB({table: "DB"})
        if (args[0] == "set") {
          if (args[1] == "g") await db.set(`masoichatguild`, args[2])
          else if (args[1] == "c") await db.set(`masoichatchannel`, args[2]) 
		message.react("1032637139961270323")
		} else {
		const chatguild = await db.get(`masoichatguild`)
		if (!chatguild) return message.reply(`Chưa Cài Guild`)
        const chatchannel = await db.get(`masoichatchannel`)
		if (!chatchannel) return message.reply(`Chưa Cài Channel`)
		const guild = client.guilds.cache.find(g => g.id === chatguild)
        const channel = guild.channels.cache.find(c => c.id === chatchannel)
		const contents = args.join(" ")
		channel.send(contents).catch(e => console.log(e))
	    message.react("1032637139961270323")
	  }
	}
}