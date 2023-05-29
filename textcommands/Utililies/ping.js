module.exports = {
	name: "ping",
	description: ["Check bot pings ", "Check bot pings"],
	aliases: ["ping", "pong", "uptime"],
	usage: ["{prefix}ping", "{prefix}ping"],
	cooldown: 10000,
	category: "Utils",
	canuse: "everyone",
	errorcd: ["Ping bot vẫn còn hiện bên trên, xin hãy chờ **{time}** để sử dụng lệnh tiếp!", "Relax, I'm still here, please wait for **{time}** then use this command again !"],
	run: async (client, message, args) => {
		const ms = require("ms")
		const { QuickDB } = require("quick.db")
		const db = new QuickDB({ table: "DB" })
		const lang = await db.get(`${message.guild.id}_languages`)
		/*
    var shard
		const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
			client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
		];
		Promise.all(promises)
			.then(results => {
				const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
				shard = `Server count: ${totalGuilds}\nMember count: ${totalMembers}`;
			})
			.catch(console.error);
    */
		const uptime = message.createdTimestamp - client.readyTimestamp
		if (lang == "vi") {
			const Help = require("../../handlers/helperHandlers.js")
			//let a = await Help("ping")
			const dt = new Date(message.createdTimestamp);
			const { EmbedBuilder } = require("discord.js")
			const mss = await message.channel.send({
				embeds: [
					new EmbedBuilder()
						.setDescription(`🏓 Pong\n⏲️ Thời gian phản hồi: \`${new Date() - dt}ms\`\n👾 WebSocket Shards : \`${client.ws.ping}ms\`
			 [Bấm Vào Đây Để Vote Cho Tôi Nhé!](https://top.gg/bot/936872532932440065/vote)`)
						.addFields({ name: "Uptime", value: ms(uptime)
              .replace(/s/i, " giây ")
              .replace(/m/i, " phút ")
              .replace(/h/i, " giờ ")
              .replace(/d/i, " ngày ") 
                       })
						.setFooter({ text: "Cảm ơn bạn đã chọn Yubabe" })
						.setTimestamp()
				]
			}).catch(e => console.log(e))
			setTimeout(() => mss.delete(), 10000);
		}
		else if (lang == "en") {
			const dt = new Date(message.createdTimestamp);
			const { EmbedBuilder } = require("discord.js")
			const mss = await message.channel.send({
				embeds: [
					new EmbedBuilder()
						.setDescription(`🏓 Pong\n⏲️ Response Delay: \`${new Date() - dt}ms\`\n👾 WebSocket Shards : \`${client.ws.ping}ms\`
			 [Click here to vote <3!](https://top.gg/bot/936872532932440065/vote)`)
						.addFields({ name: "Uptime", value: ms(uptime).replace(/s/i, " seconds") })
						.setFooter({ text: "Thank for chosing YUBABE" })
						.setTimestamp()
				]
			}).catch(e => console.log(e))
			setTimeout(() => mss.delete(), 10000);
		}

	}
}