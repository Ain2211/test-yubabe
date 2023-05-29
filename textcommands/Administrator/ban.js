const banSchema = require('../../models/BanSchema')
const { PermissionsBitField } = require(`discord.js`)

const userReg = RegExp(/<@!?(\d+)>/)
module.exports = {
	name: "banbot",
	description: ["Hạn chế người dùng khỏi việc dùng bot!", "Prevent users from using the bot!"],
	aliases: ["thanhtrung"],
	usage: ["{prefix}thanhtrung", "{prefix}banbot"],
	cooldown: 0,
	category: "Admins",
	canuse: "admins",
	errorcd: ["No CD!", "No CD!"],
	run: async (client, message, args) => {
		const { QuickDB } = require("quick.db")
		const db = new QuickDB({ table: "DB" })
		let reason = args.slice(1).join(' ')
		if (!reason) reason = `Lợi dụng bugs và khai thác tài nguyên trái phép!`
		const mentionedUser = message.mentions.members.first() || client.users.cache.find(u => u.id == args[0])
		if (!mentionedUser) return message.reply(`${client.e.fail} | Bạn phải mentions hoặc cung cấp ID người dùng cần banbot`)
		let username = mentionedUser.username || mentionedUser.user.username
		const banned = new banSchema({ memberid: mentionedUser.id, guildid: message.guild.id })
		await banned.save()
		await db.set(`${mentionedUser.id}_softban1`, true);
		await message.channel.send(`${client.e.success} | Đã ban **${username}**`)
		const yukii = client.users.cache.find(u => u.id == `896739787392819240`)
		let language = await db.get(`${message.guild.id}_languages`)
		const region = message.guild.preferredLocale
		if (!language) {
			if (region == "vi") await db.set(`${message.guild.id}_languages`, "vi")
			else await db.set(`${message.guild.id}_languages`, "en")
			await yukii.send(`${message.guild.name} đã được set Region **${message.guild.preferredLocale}**`)
		}
		else if (language == "vi") {
			let messagess = `Xin chào **${username}**, bạn đã bị ban từ MOD **${message.author.username}** vì lý do :
\`\`\`${reason}\`\`\``;
			await mentionedUser
				.send(messagess)
				.catch(e => console.log(e))
			await message.react("😠")
		}
		else if (language == "en") {
			if (!reason) reason = `Taking advantage of bugs and illegally exploiting resources!`
			let messagess = `**${username}**, you have been banned from MOD **${message.author.username}** for the reason :
\`\`\`${reason}\`\`\``;
			await mentionedUser
				.send(messagess)
				.catch(e => console.log(e))
			await message.react("😠")
		}
	}
}