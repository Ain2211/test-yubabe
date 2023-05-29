const { EmbedBuilder } = require('discord.js')

module.exports = {
	name: "random",
	description: ["Random cùng bạn bè", "Get a random number"],
	aliases: ["rd"],
	usage: ["{prefix}rd <number>", "{prefix}rd <number>"],
	cooldown: 0,
	category: "Fun",
	canuse: "everyone",
	errorcd: ["{time}", "{time}"],
	run: async (client, message, args) => {
    
		if (message.guild.id == "928646972326436864") return
		const { QuickDB } = require("quick.db")
		const db = new QuickDB({table: "DB"});
    
    await db.set(`${message.author.id}_lastRandom`,`${message.guild.id}`)
    let lastGuild = await db.get(`${message.author.id}_lastRandom`)
    let xaso = false
    if (message.guild.id == "896744428100804688") {
      if (lastGuild && message.guild.id !== lastGuild) {
        xaso = true
      }
    }   
		let conno = await db.get(`${message.author.id}.${message.guild.id}.norandom`)
		if (conno) return message.reply(`**Bạn đang thiếu nợ tại ${message.guild.name}, bạn không thể random!**
    Liên hệ Admin server để gỡ role nếu bạn đã trả note!
    Lệnh gỡ role : \`Yconno remove @tag\``)
		if (!parseInt(args[0])) return message.reply("Số không hợp lệ")
		let number = Math.floor(Math.random() * parseInt(args[0]))

		let timeString = `${new Date(Date.now()).toLocaleString("vi", { timeZone: "Asia/Ho_Chi_Minh" })}`

		const customSchema = require("../../models/randomSchema")
		const custom = await customSchema.findOne({ authorid: message.author.id })
		const guild = client.guilds.cache.find(g => g.id === "896744428100804688")
		const channel = guild.channels.cache.find(c => c.id === "942015852310577162")
		await channel.send({embeds:
			[
				new EmbedBuilder()
				.setAuthor({name:message.author.username, iconURL: message.author.avatarURL()})
				.setDescription(`Tin nhắn random : \`${message.content}\`\n
Số random : **__${number}__**
CHANNEL : **__${message.channel.name}__**
Guild : **__${message.guild.name}__**
 `)
			]
						   })
		if (!custom) {
			if (xaso) {
return await message.reply(`Số của bạn là : **__${number}__**
\`Người chơi này vừa xả số ở Guild khác\``).catch(e => console.log(e))
      } 
      else {
      return await message.reply(`Số của bạn là : **__${number}__**`).catch(e => console.log(e))
      }
		}
		else if (custom.embed == true) {
			let des =
				`${custom.description}`.replace(/{author}/i, `${message.author.username}`)
					.replace(/{number}/i, `${number}`)
					.replace(/\\n/i, "\n")
					.replace(/{tag}/i, `<@${message.author.id}>`)
					.replace(/\\</i, "<")
					.replace(/{timeString}/i, `${timeString}`)
					.replace(/{avatar}/i, `${message.author.avatarURL()}`)
			let dess = des
			let embed = new EmbedBuilder()
				.setDescription(dess)
			if (custom.title) {
				let title = `${custom.title}`
					.replace(/{author}/i, `${message.author.username}`)
					.replace(/{number}/i, `${number}`)
					.replace(/\\n/i, "\n")
					.replace(/{tag}/i, `<@${message.author.id}>`)
					.replace(/\\</i, "<")
					.replace(/{timeString}/i, `${timeString}`)
				embed.setTitle(title)
			}
			if (custom.author) {
				let title = `${custom.author}`
					.replace(/{author}/i, `${message.author.username}`)
					.replace(/{number}/i, `${number}`)
					.replace(/\\n/i, "\n")
					.replace(/{tag}/i, `<@${message.author.id}>`)
					.replace(/\\</i, "<")
					.replace(/{timeString}/i, `${timeString}`)
				embed.setAuthor({ name: title })
			}
			if (custom.authorURL) {
				let title = `${custom.author}`
					.replace(/{author}/i, `${message.author.username}`)
					.replace(/{number}/i, `${number}`)
					.replace(/\\n/i, "\n")
					.replace(/{tag}/i, `<@${message.author.id}>`)
					.replace(/\\</i, "<")
					.replace(/{timeString}/i, `${timeString}`)
					.replace(/{avatar}/i, `${message.author.avatarURL()}`)
				embed.setAuthor({ name: title, iconURL: custom.authorURL })
			}
			if (custom.color) embed.setColor(custom.color)
			if (custom.thumbnail) {
				let title = `${custom.thumbnail}`
					.replace(/{author}/i, `${message.author.username}`)
					.replace(/{number}/i, `${number}`)
					.replace(/\\n/i, "\n")
					.replace(/{tag}/i, `<@${message.author.id}>`)
					.replace(/\\</i, "<")
					.replace(/{timeString}/i, `${timeString}`)
					.replace(/{avatar}/i, `${message.author.avatarURL()}`)
				embed.setThumbnail(title)
			}
			if (custom.image) embed.setImage(custom.image)
			if (custom.footer) {
				let title = `${custom.footer}`
					.replace(/{author}/i, `${message.author.username}`)
					.replace(/{number}/i, `${number}`)
					.replace(/\\n/i, "\n")
					.replace(/{tag}/i, `<@${message.author.id}>`)
					.replace(/\\</i, "<")
					.replace(/{timeString}/i, `${timeString}`)
					.replace(/{avatar}/i, `${message.author.avatarURL()}`)
				embed.setFooter({ text: title })
				if (custom.footerURL) embed.setFooter({ text: title, iconURL: custom.footerURL })
			}
			if (custom.content) await message.reply({ content: custom.content, embeds: [embed] }).catch(e => message.reply(`:x: | Hãy liên lạc với DEV bot, custom của bạn đã bị lỗi!`))
			else await message.reply({ embeds: [embed] }).catch(e => message.reply(`:x: | Hãy liên lạc với DEV bot, custom của bạn đã bị lỗi!`))
		}
		else if (custom.embed == false) {
			let des = `${custom.content}`
				.replace(/{author}/i, `${message.author.username}`)
				.replace(/{number}/i, `${number}`)
				.replace(/\\n/i, "\n")
				.replace(/{tag}/i, `<@${message.author.id}>`)
				.replace(/\\</i, "<")
				.replace(/{timeString}/i, `${timeString}`)
				.replace(/{avatar}/i, `${message.author.avatarURL()}`)
			
      return await message.reply(des).catch(e => console.log(e))
		}
		
	}
}