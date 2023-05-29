const { EmbedBuilder, Collection, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
// const client = require('../bot.js')
const BanSchema = require('../models/BanSchema')
const { QuickDB } = require("quick.db")
const db = new QuickDB({ table: "DB" })
const auth = require("../config/bot-auth.json")
const client = require("../bot.js")
module.exports = {
	name: 'messageCreate',
	async execute(message) {
    
		// if (message.author.id !== "") return
		/* @userlang = lang ≈ "en" / "vi"
		- Cài đặt thông tin ngôn ngữ
		- Setting languages informations
		*/
		let lang = "en"
		if (message.channel.type !== 1) lang = await db.get(`${message.guild.id}_languages`)
		let userlang = await db.get(`${message.author.id}_userlang`)
		if (userlang) lang = userlang
		else userlang = await db.set(`${message.author.id}_userlang`, "en"), lang = "en";
		/* @TypeChannel : DM == 1
		- Logic nhận dms từ users!
		- Logic for taking DMS
		*/
		if (message.channel.type == 1 && !message.author.bot) {
      //Get Guild Object => Resolve Promise Guild Cache == Intents Guild Pressence   
			const Guilds = client.guilds.cache.find(c => c.id === auth.DMSGuild);
			//Kênh logging DMS => Resolve Promise Channel Cache    
			const ChRules = Guilds.channels.cache.find(c => c.id === auth.DMSChannel);

			let embed = new EmbedBuilder()
				.setTitle(message.author.username + " đã DMS")
				.setDescription(message.content)
				.setThumbnail(message.author.avatarURL())
				.addFields({ name: "ID", value: message.author.id })
				.setTimestamp();
			let a = await ChRules.send({
				content: `Dùng Ydm ${message.author.id} để reply mà không hiện tên Mod! 
Ydms ${message.author.id} để reply với tên Mod`, embeds: [embed]
			})
		}
		else {
			/* 
	 Kích hoạt dòng này nếu muốn tắt tất cả lệnh: return
	*/
			let prefix = await db.get(`${message.guildId}_prefix`)
			let defaultprefix = "y"
			if (!prefix) prefix = defaultprefix
			let prefixes = prefix || defaultprefix
			if (message.mentions.users.find(u => u.id == client.user.id) && message.content.match(/prefix/i)) {
				if (message.author.bot) return
				return message.reply({
					embeds: [
						new EmbedBuilder()
							.setAuthor({ name: "Made By YwY", url: "https://discord.gg/yuland", iconUrl: client.user.defaultAvatarURL })
							.setDescription(`Prefix in this Guild : **${prefix.toUpperCase()}**.\n**${defaultprefix.toUpperCase()}** will always available!\n**[INVITE](${`https://discord.com/api/oauth2/authorize?client_id=936872532932440065&permissions=413458103505&scope=applications.commands%20bot`})**`)
							.setFooter({ text: "Type Yhelp for the list of commands" })
					]
				})
			}
			let lastvote = await db.get(`${message.author.id}.voteTimestamp`)
			let remindVote = 43200000
			let voted = await client.checkcd(lastvote, remindVote)
			let canVote = voted.after
			let reminderStatus = await db.get(`${message.author.id}.voteReminder`)
			if (canVote && reminderStatus) {
				let remindYet = await db.get(`${message.author.id}.reminded`)
				if (!remindYet) {
					await message.author.send(`${userlang == "vi"
						? `${message.author.username} ! Đã đến giờ vote bot rồi!`
						: `${message.author.username} ! Time to vote again!`}`)
						.catch(e => {
							return message.reply("Bạn không bật dms, tôi không thể nhắc bạn được")
						})
					await db.set(`${message.author.id}.reminded`, true)
				}
			}
			if (
				!message.content
					.toLowerCase(prefixes)
					.startsWith(prefixes)
				&& !message.content.toLowerCase(defaultprefix).startsWith(defaultprefix)
				|| message.author.bot
			) return;
			let args
			if (message.content.toLowerCase(defaultprefix).startsWith(defaultprefix)) args = message.content.slice(defaultprefix.length).trim().split(/ +/g);
			if (message.content.toLowerCase(prefix).startsWith(prefix)) args = message.content.slice(prefix.length).trim().split(/ +/g);
			const cmd = args.shift().toLowerCase()
			if (cmd.length === 0) return;
			let command =
				client.tcommands.get(cmd) || client.tcommands.find((command) => command.aliases && command.aliases.includes(cmd));
			if (command) {
				const lang = await db.get(`${message.guild.id}_languages`)
				if (!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages))
					return message.author
						.send(lang == "vi"
							? `${client.e.fail} | Tôi không thể gửi tin nhắn trong kênh \`${message.channel.name}\``
							: `${client.e.fail} | I can't send messages in channel: \`${message.channel.name}\``)
						.catch(e => console.log(e))

				let oncaptcha = await db.get(`${message.author.id}_oncaptcha2`);
				if (!client.owner.includes(message.author.id) && oncaptcha == true && lang == "vi") return message.reply(`Bạn không thể sử dụng lệnh khi đang có captcha`)
				if (oncaptcha == true && lang == "en") return message.reply(`You cannot using bot while in captcha!`)
				const softban = await db.get(`${message.author.id}_softban1`);
				if (softban == null) {
					const ban = await BanSchema.findOne({ memberid: message.author.id })
					const policy = new EmbedBuilder()
						.setAuthor({ name: "Policy & Term of Service", url: "https://discord.gg/yuland", iconUrl: client.user.defaultAvatarURL })
						.setTitle("BẰNG VIỆC SỬ DỤNG BOT CỦA CHÚNG TÔI")
						.setDescription(`Bạn Đồng Ý Với Việc:
1. Tuân Thủ Luật và [Chính Sách Người Dùng](${"https://docs.google.com/document/d/1Llz1gBynvTooI-S5jAWlTiuQZqe6Bp9QV-Vhd14080A/edit?usp=drivesdk"}) Tại [Support Server](${"https://discord.gg/yuland"})!
2. Đảm bảo không sử dụng các phần mềm thứ 3 gây ảnh hưởng đến tài nguyên bot.
3. Đảm bảo chịu trách nhiệm về các thông tin chia sẻ công khai tại Discord!`)
						.setFooter({ text: "Để biết thêm thông tin, vui lòng nhấp vào link bên trên" })
					let pp = await message.reply({ embeds: [policy] }).catch((err) => {
						return
					})
					await client.sleep(5000)
					await pp.delete().catch((err) => {
						return
					})
					if (ban) {
						if (ban.memberid == message.author.id) await db.set(`${message.author.id}_softban1`, true)
					}
					else {
						await db.set(`${message.author.id}_softban1`, false)
					}
				}
				else if (softban == true && !client.owner.includes(message.author.id)) return
				else {
					if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.AttachFiles)) return message.reply(`Tôi chưa có quyền gửi Ảnh!`)
					if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.EmbedLinks)) return message.reply(`Tôi chưa có quyền gửi Embed Link!`)
					if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.UseExternalEmojis)) return message.reply(`Tôi chưa có quyền gửi emoji bên ngoài server!`)
					if (!client.owner.includes(message.author.id) && command.canuse == "owners") return;
					else if (!client.admin.includes(message.author.id) && command.canuse == "admins")
						return;
					else if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && command.canuse == "g-admins") return;
					let timeout = command.cooldown
					let lastused = await db.get(`CD${command.name}_${message.author.id}`)
					let used = client.checkcd(lastused, timeout)
					let canUse = used.after
					if (!canUse) {

						let delay1 = `${command.errorcd[0]}`.replaceAll(/{time}/g, `${used.h + `:` + used.m + `:` + used.s}s`);
						let delay2 = `${command.errorcd[1]}`.replaceAll(/{time}/g, `${used.h + `:` + used.m + `:` + used.s}s`);
						let delays = [delay1, delay2]

						const delay = await client.send(client, message, delays, null).catch((e) => console.log(e))
						await client.sleep(timeout - (Date.now() - lastused))
						await delay.delete().catch(e => console.log(e))
					}
					else {
						//let age = await client.age(message.author.id, null, null)
						let a = await db.get(`${message.channel.id}_${command.name}`)
						const success = [
							`:x: | Lệnh đã bị vô hiệu hóa tại ${message.channel.name} ! `,
							`:x: | This commands has been disabled at ${message.channel.name} ! `
						]
						if (a === `false`) return client.reply(client, message, success, null).then(async msg => {
							await client.sleep(4000)
							await msg.delete()
						})
						await db.set(`CD${command.name}_${message.author.id}`, Date.now())
						try {
							await command.run(client, message, args).catch((e) => console.log(e));
						} catch {
							async err => {
								console.err
								const guilds = client.guilds.cache.find(c => c.id === '995424086916350052');
								const ChRules = guilds.channels.cache.find(c => c.id === '995449798054395904')
								ChRules.send(err)
							}
						}

						//await client.expchat(client, message.author.id, message)
						let text2 = `[${(message.author.tag).toUpperCase()} ĐÃ DÙNG LỆNH ${(command.name).toUpperCase()} TẠI ${(message.guild.name).toUpperCase()}]`
						console.log(text2.bold.brightGreen);
						const guilds = client.guilds.cache.find(c => c.id === '995424086916350052');
						const ChRules = guilds.channels.cache.find(c => c.id === '995449798054395904')
						ChRules.send({
							embeds: [
								new EmbedBuilder()
									.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() })
									.setTitle(`Lệnh : ${command.name}`)
									.addFields(
										[
											{ name: `Content: `, value: message.content },
											{ name: `User ID: `, value: message.author.id },
											{ name: "Guild : " + message.guild.name, value: message.guild.id },
											{ name: "Channel : " + message.channel.name, value: message.channel.id },
											{ name: `Thời Gian :`, value: `<t:${Math.floor(Date.now() / 1000)}>` },
										])
							]
						});
					};
				}
			}
		}
	}
}