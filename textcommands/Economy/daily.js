const banSchema = require('../../models/BanSchema')
const dailySchema = require("../../models/dailySchema")
const BanSchema = require('../../models/BanSchema')
const luckyicon = `<a:Yngoisaohivong:919968345418268714>`
const vipSchema = require("../../models/vipSchema")
const marrySchema = require('../../models/marrySchema')
const lifeSchema = require('../../models/lifeSchema')
module.exports = {
	name: "daily",
	description: ["Nhận quà mỗi ngày của bạn!", "Claim your daily reward!"],
	aliases: [],
	usage: ["{prefix}daily", "{prefix}daily"],
	cooldown: 10000,
	category: "Eco",
	canuse: "everyone",
	errorcd: ["Xin từ từ thôi! Bạn làm tôi ngợp quá! Thử lại sau : **{time}**", "Please wait **{time}** and try again"],
	run: async (client, message, args) => {
		const { QuickDB } = require('quick.db');
		const db = new QuickDB({ table: "DB" });
		//return message.channel.send(`Lệnh Đang Sửa!`)
		let user = message.author
		let timeout = 3000
		let lastused = await client.cd(message.author.id, `addngoc`)
		let used = client.checkcd(lastused, timeout)
		let cooldown = used.after
		if (!cooldown) {
			const errorSpam = [
				`${client.emo.fail} | **${message.author.username}**, bạn từ từ thôi cho tôi thở phát... **${used.s}s** nữa hãy gõ tiếp!`,
				`${client.emo.fail} | **${message.author.username}**, you're too quick for me, please slow down... wait **${used.s}s** and continue !`
			]
			const delay = await client.send(client, message, errorSpam, null).catch(error => console.log(error))
			await client.sleep(2000)
			await delay.delete()
			return
		}
		else {
			await client.timeout(message.author.id, `addngoc`)
			const profile = await marrySchema.findOne({ authorid: message.author.id })
			let a = await client.cd(message.author.id, `daily8`)
			let day = await client.newday(a)
			let inday = day.withinDay
			let h = day.hours
			let min = day.minutes
			let sec = day.seconds
			let after = day.after
			let vip = false
			let pro = false
			const provip = await vipSchema.findOne({ memberid: message.author.id })
			if (provip) {
				const date = await client.datepassport(message.author.id)
				const status = await client.checkpassport(date)
				let end = status.after
				if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
				if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
			}
			if (!after) {
				await client.timeout(message.author.id, `daily8`)
				let errorDaily = [
					`<:xxx:921536522451316766> | **${user.username}**, bạn đã nhận quà hôm nay rồi, quay lại sau **__${h + `:` + min + `:` + sec}s__** để nhận! \`[Mốc 00:00 Mỗi Ngày]\``,
					`<:xxx:921536522451316766> | **${user.username}**, you've claim your Daily rewards, comeback after **__${h + `:` + min + `:` + sec}s__** to receive more! \`[00:00 AM GMT+7]\``
				]
				await client.send(client, message, errorDaily, null).catch((e) => console.log(e))
			}
			else if (after && inday) {
				await client.timeout(message.author.id, `daily8`)
				const data = await dailySchema.findOne({ id: user.id })
				if (!data) {
					let newdata = new dailySchema({ id: user.id, name: user.name, streak: 1 })
					await newdata.save();
				}
				else {
					data.streak += 1;
					await data.save()
				}
				let streaks = 1
				if (data) streaks = data.streak
				let dailymoney = (Math.floor(Math.random() * 1999) + 500) * streaks;
				if (profile) dailymoney *= 2
				await client.cong(user.id, dailymoney);
				const msg = [
					`<a:Yngoisaohivong:919968345418268714> **| ${user.username}**, bạn nhận được **${parseInt(dailymoney).toLocaleString('En-us')} Ycoin!** Bạn đã điểm danh liên tục : **${streaks}** ngày!`,
					`<a:Yngoisaohivong:919968345418268714> **| ${user.username}**, you received **${parseInt(dailymoney).toLocaleString('En-us')} Ycoin!** Your streak : **${streaks}** days!`
				]
				if (!pro && !vip) {
					let msg1 = []
					let soluong = 1
					if (profile) soluong += 1, msg1[0] = `, và 1 hộp thêm vì đã cưới <@${profile.husbandid}> `, msg1[1] = `, and 1 bonus for married <@${profile.husbandid}> `
					await client.addgem(user.id, `<:GEMBOX:982028743952441355>`, soluong, 0)
					const messageToSend = [
						`${msg[0]}
${luckyicon} | **${user.username}**, bạn đã được tặng ${profile ? soluong - 1 : soluong} <:GEMBOX:982028743952441355>${profile ? msg1[0] : ` `} cho ngày hôm nay!`,
						`${msg[1]}
${luckyicon} | **${user.username}**, you have been awarded ${profile ? soluong - 1 : soluong} <:GEMBOX:982028743952441355>${profile ? msg1[1] : ` `} for today!`
					]
					await client.send(client, message, messageToSend, null).catch((e) => console.log(e))
				}
				else if (pro) {
					let msg1 = []
					let soluong = 1
					if (profile) soluong += 1, msg1[0] = `, và 1 hộp thêm vì đã cưới <@${profile.husbandid}> `, msg1[1] = `, and 1 bonuses for married <@${profile.husbandid}> `
					await client.addgem(user.id, `<:PRO_GEMBOX:982028744057298964>`, 2, 0)
					await client.addgem(user.id, `<:GEMBOX:982028743952441355>`, soluong, 0)
					const messageToSend = [
						`${msg[0]}
<:ProPassport:988093838348410930> | **${user.username}**, bạn đã được tặng ${profile ? soluong - 1 : soluong} <:GEMBOX:982028743952441355>${profile ? msg1[0] : ` `} và được thêm 2 <:PRO_GEMBOX:982028744057298964> cho ngày hôm nay vì đã đăng ký PRO-PASSPORT !`,
						`${msg[1]}
<:ProPassport:988093838348410930> | **${user.username}**, and you've been award ${profile ? soluong - 1 : soluong} <:GEMBOX:982028743952441355>${profile ? msg1[1] : ` `} and bonuses 2 <:PRO_GEMBOX:982028744057298964> for today due to your PRO-PASSPORT Subcription!`
					]
					await client.send(client, message, messageToSend, null).catch((e) => console.log(e))
				}

				else if (vip) {
					let msg1 = []
					let soluong = 1
					if (profile) soluong += 1, msg1[0] = `, và 1 hộp thêm vì đã cưới <@${profile.husbandid}> `, msg1[1] = `, and 1 bonuses for married <@${profile.husbandid}> `
					await client.addgem(user.id, `<:PRO_GEMBOX:982028744057298964>`, 2, 0)
					await client.addgem(user.id, `<:VIP_GEMBOX:982028743889543278>`, 2, 0)
					await client.addgem(user.id, `<:GEMBOX:982028743952441355>`, soluong, 0)
					const messageToSend = [
						`${msg[0]}
<:VIPPassport:988093810955411456> | **${user.username}**, bạn đã được tặng ${profile ? soluong - 1 : soluong} <:GEMBOX:982028743952441355>${profile ? msg1[0] : ` `} và được thêm 2 <:PRO_GEMBOX:982028744057298964>, 2 <:VIP_GEMBOX:982028743889543278> cho ngày hôm nay vì đã đăng ký VIP-PASSPORT !`,
						`${msg[1]}
<:VIPPassport:988093810955411456> | **${user.username}**, and you've been award ${profile ? soluong - 1 : soluong} <:GEMBOX:982028743952441355>${profile ? msg1[1] : ` `} and bonuses 2 <:PRO_GEMBOX:982028744057298964>, 2 <:VIP_GEMBOX:982028743889543278> for today due to your VIP-PASSPORT Subcription!`,
					]
					await client.send(client, message, messageToSend, null).catch((e) => console.log(e))
				}
				let userProfile = await lifeSchema.findOne({ authorid: message.author.id })
				if (!userProfile) {
					let newUserProfile = new lifeSchema({
						authorid: message.author.id,
						stat: {
							health: 50,
							happiness: 50,
							appear: 50,
							iq: 50,
							fitness: 50,
							eq: 50,
						},
						me: {
							name: message.author.username,
							gender: "Nam",
							age: 0,
							birthday: new Date(Date.now()).toLocaleString("vi", { timeZone: "Asia/Ho_Chi_Minh" }),
							country: "Việt Nam",
							locate: "Việt Nam",
							sexual: "Chưa Xác Định"
						},
						bank: {
							doubt: 0,
						},
						CV: "Không có",
						crimes: "Không có",
						health: "Tốt",
						license: {
							A: false,
							B: false,
							C: false
						},
						education: {
							highschool: false,
							college: false,
							university: false,
						},
						degree: {
							kientrucsu: false,
							kinhte: false,
							giaovien: false,
							marketing: false,
							taichinh: false,
							kysu: false,
							luatsu: false,
							anninh: false,
							yte: false,
							amnhac: false,
							vantai: false,
							khoahoc: false,
							nganhang: false,
						},
					})
					return await newUserProfile.save()
				}
				userProfile.stat.health -= 5
				userProfile.stat.happiness -= 5
				userProfile.stat.appear -= 5
				await userProfile.save()
				let age = await client.age(message.author.id, 'cong', 1)
				let yearPassBy = [
					`**Bạn đã trải qua 1 năm trong Yuworld! Bạn hiện tại đã được __${age ? age : 1}__ tuổi**`,
					`**You've pass 1 year in Yuword! You're now __${age ? age : 1}__ ages**`
				]
				await client.reply(client, message, null)
				return
			}
			else if (after && !inday) {
				await client.timeout(message.author.id, `daily8`)
				const data = await dailySchema.findOne({ id: user.id })
				if (!data) {
					let newdata = new dailySchema({ id: user.id, name: user.name, streak: 1 })
					await newdata.save();
				}
				else {
					data.streak = 1;
					await data.save()
				}
				let streaks = 1
				if (data) streaks = data.streak

				let dailymoney = (Math.floor(Math.random() * 99) + 1) * streaks;
				if (profile) dailymoney *= 2
				await client.cong(user.id, dailymoney);

				const msg = [
					`<a:Yngoisaohivong:919968345418268714> **| ${user.username}**, bạn nhận được **${parseInt(dailymoney).toLocaleString('En-us')} Ycoin!** Bạn đã bỏ lỡ điểm danh liên tục, streak hiện tại : **${streaks}** ngày!`,
					`<a:Yngoisaohivong:919968345418268714> **| ${user.username}**, you received **${parseInt(dailymoney).toLocaleString('En-us')} Ycoin!** Your streak : **${streaks}** days!`
				]
				if (!pro && !vip) {
					let msg1 = []
					let soluong = 1
					if (profile) soluong += 1, msg1[0] = `, và 1 hộp thêm vì đã cưới <@${profile.husbandid}> `, msg1[1] = `, and 1 bonus for married <@${profile.husbandid}> `
					await client.addgem(user.id, `<:GEMBOX:982028743952441355>`, soluong, 0)
					const messageToSend = [
						`${msg[0]}
${luckyicon} | **${user.username}**, bạn đã được tặng ${profile ? soluong - 1 : soluong} <:GEMBOX:982028743952441355>${profile ? msg1[0] : ` `} cho ngày hôm nay!`,
						`${msg[1]}
${luckyicon} | **${user.username}**, you've been awarded 1 <:GEMBOX:982028743952441355>${profile ? msg1[1] : ` `} for today!`
					]
					await client.send(client, message, messageToSend, null).catch((e) => console.log(e))
				}
				else if (pro) {
					let msg1 = []
					let soluong = 1
					if (profile) soluong += 1, msg1[0] = `, và 1 hộp thêm vì đã cưới <@${profile.husbandid}> `, msg1[0] = `, and 1 bonuses for married <@${profile.husbandid}> `
					await client.addgem(user.id, `<:PRO_GEMBOX:982028744057298964>`, 2, 0)
					await client.addgem(user.id, `<:GEMBOX:982028743952441355>`, soluong, 0)
					const messageToSend = [
						`${msg[0]}
<:ProPassport:988093838348410930> | **${user.username}**, bạn đã được tặng ${profile ? soluong - 1 : soluong} <:GEMBOX:982028743952441355>${profile ? msg1[0] : ` `} và được thêm 2 <:PRO_GEMBOX:982028744057298964> cho ngày hôm nay vì đã đăng ký PRO-PASSPORT !`,
						`${msg[1]}
<:ProPassport:988093838348410930> | **${user.username}**, you have been awarded ${profile ? soluong - 1 : soluong} <:GEMBOX:982028743952441355>${profile ? msg1[1] : ` `} and bonuses 2 <:PRO_GEMBOX:982028744057298964> for today due to your PRO-PASSPORT Subcription !`
					]
					await client.send(client, message, messageToSend, null).catch((e) => console.log(e))
				}
				else if (vip) {
					await client.addgem(user.id, `<:PRO_GEMBOX:982028744057298964>`, 2, 0)
					await client.addgem(user.id, `<:VIP_GEMBOX:982028743889543278>`, 2, 0)
					let msg1 = []
					let soluong = 1
					if (profile) soluong += 1, msg1[0] = `, và 1 hộp thêm vì đã cưới <@${profile.husbandid}> `, msg1[1] = `, and 1 bonuses for married <@${profile.husbandid}> `
					await client.addgem(user.id, `<:GEMBOX:982028743952441355>`, soluong, 0)
					const messageToSend = [
						`${msg[0]}
<:VIPPassport:988093810955411456> | **${user.username}**, bạn đã được tặng ${profile ? soluong - 1 : soluong} <:GEMBOX:982028743952441355>${profile ? msg1[0] : ` `} và được thêm 2 <:PRO_GEMBOX:982028744057298964>, 2 <:VIP_GEMBOX:982028743889543278> cho ngày hôm nay vì đã đăng ký VIP-PASSPORT !`,
						`${msg[1]}
<:VIPPassport:988093810955411456> | **${user.username}**, you've been awarded ${profile ? soluong - 1 : soluong} <:GEMBOX:982028743952441355>${profile ? msg1[1] : ` `} and bonuses 2 <:PRO_GEMBOX:982028744057298964>, 2 <:VIP_GEMBOX:982028743889543278> for today due to your VIP-PASSPORT Subcription !`
					]
					await client.send(client, message, messageToSend, null).catch((e) => console.log(e))
				}
				let userProfile = await lifeSchema.findOne({ authorid: message.author.id })
				if (!userProfile) {
					let newUserProfile = new lifeSchema({
						authorid: message.author.id,
						stat: {
							health: 50,
							happiness: 50,
							appear: 50,
							iq: 50,
							fitness: 50,
							eq: 50,
						},
						me: {
							name: message.author.username,
							gender: "Nam",
							age: 0,
							birthday: new Date(Date.now()).toLocaleString("vi", { timeZone: "Asia/Ho_Chi_Minh" }),
							country: "Việt Nam",
							locate: "Việt Nam",
							sexual: "Chưa Xác Định"
						},
						bank: {
							doubt: 0,
						},
						CV: "Không có",
						crimes: "Không có",
						health: "Tốt",
						license: {
							A: false,
							B: false,
							C: false
						},
						education: {
							highschool: false,
							college: false,
							university: false,
						},
						degree: {
							kientrucsu: false,
							kinhte: false,
							giaovien: false,
							marketing: false,
							taichinh: false,
							kysu: false,
							luatsu: false,
							anninh: false,
							yte: false,
							amnhac: false,
							vantai: false,
							khoahoc: false,
							nganhang: false,
						},
					})
					return await newUserProfile.save()
				}
				userProfile.stat.health -= 5
				userProfile.stat.happiness -= 5
				userProfile.stat.appear -= 5
				await userProfile.save()
				let age = await client.age(message.author.id, 'cong', 1)
				let yearPassBy = [
					`**Bạn đã trải qua 1 năm trong Yuworld! Bạn hiện tại đã được __${age ? age : 1}__ tuổi**`,
					`**You've pass 1 year in Yuword! You're now __${age ? age : 1}__ ages**`
				]
				await client.reply(client, message, null)
				return
			}
		}
		const votingMSG = [
			`\`VOTE CHO BOT MỖI 12G ĐỂ NHẬN 3 GEMBOX!\``,
			`\`VOTE FOR ME TO RECEIVE 3 GEMBOX EACH TIME!\``
		]
		await client.send(client, message, votingMSG, null).catch((e) => console.log(e))
	}
}

