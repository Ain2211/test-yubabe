const ls = require('local-storage');
const { readdirSync } = require('fs');
const path = require('path');
const { PermissionsBitField } = require('discord.js')

module.exports = {
	name: "prefix",
	description: ["Thay đổi prefix bot trong guild của bạn!", "Change thebot's prefix in your guild!"],
	aliases: [""],
	usage: ["{prefix}prefix <new prefix>", "{prefix}prefix <new prefix>"],
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
		if (!args[0]) {
			const missingPrefix = [
				`${client.e.fail} | Bạn phải nhập prefix muốn đổi!`,
				`${client.e.fail} | You must type the prefix want to apply!`
			]
			return await client.send(client, message, missingPrefix, null).catch(e => console.log(e))
		} else {
			let prefix = args[0]
			const errorLength = [
				`Chỉ được đặt tối đa 2 ký tự`,
				`New prefix can only contain 2 characters`
			]
			if (prefix.length > 2) return await client.send(client, message, errorLength, null).catch(e => console.log(e))
			await db.set(`${message.guild.id}_prefix`, prefix)
			const prefixChanged = [
				`${client.e.success} | Đã set prefix thành \`${prefix}\`
*[Prefix Y vẫn hoạt động!]*`,
				`${client.e.success} | Guild Prefix has been set to \`${prefix}\`
*[Prefix Y still works then!]*`
			]
			await client.send(client, message, prefixChanged, null).catch(e => console.log(e))
		}
	}
}
