const ls = require('local-storage');
const { readdirSync } = require('fs');
const path = require('path');
const { PermissionsBitField } = require('discord.js')
module.exports = {
	name: "languages",
	description: ["Thay đổi ngôn ngữ của bot (vi - en)", "Change the bot language (vi-en)"],
	aliases: ["lang", "language"],
	usage: ["{prefix}lang <set> <vi|en> ", "{prefix}lang <set> <vi|en> "],
	cooldown: 0,
	category: "Configs",
	canuse: "g-admins",
	errorcd: ["{time}", "{time}"],
	run: async (client, message, args) => {
		const { QuickDB } = require("quick.db")
		const db = new QuickDB({ table: "DB" })
		const errorPerm = [
			`${client.e.fail} | Bạn phải có quyền \`ADMINISTRATOR\` để cài đặt lệnh trong guild này!`,
			`${client.e.fail} | You have to get \`ADMINISTRATOR\` Permission to Configure Commands!`
		]
		if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await client.send(client, message, errorPerm, null).catch(e => console.log(e))
		const yukii = client.users.cache.find(u => u.id == `896739787392819240`)
		const region = message.guild.preferredLocale
		let regiondb = await db.get(`${message.guild.id}_languages`)
		if (!regiondb) {
			if (region == "vi") await db.set(`${message.guild.id}_languages`, "vi")
			else await db.set(`${message.guild.id}_languages`, "en")

			await yukii.send(`${message.guild.name} đã được set Region **${message.guild.preferredLocale}**`)
		}
		if (!args[0]) {
			await message.reply(`${message.guild.name} is now preferred Locale by: **${message.guild.preferredLocale}**`)
		}
		else if (args[0] == "set") {
			let languageToSet = args[1]
			if (languageToSet !== "en" && languageToSet !== "vi") return message.reply("Bạn phải nhập en hoặc vi || You have to enter en or vi!")
			if (languageToSet == "vi") {
				await db.set(`${message.guild.id}_languages`, 'vi')
				await message.reply(`${client.e.success} |Đã set ngôn ngữ thành Tiếng Việt!`)
				await yukii.send(`${message.guild.name} đã set ngôn ngữ thành Tiếng Việt!`)
			}
			else if (languageToSet == "en") {
				await db.set(`${message.guild.id}_languages`, 'en')
				await message.reply(`${client.e.success} | Successfully set your Server languages to English!`)
				await yukii.send(`${message.guild.name} đã set ngôn ngữ thành Tiếng Anh!`)
			}
		}
		else return message.reply("`Ylang set vi/en`")
	}
}