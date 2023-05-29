const fishpointSchema = require('../../models/fishpointSchema')
const zoopointSchema = require('../../models/zoopointSchema')
const moneySchema = require('../../models/moneySchema')
const bankSchema = require('../../models/bankSchema')
const marrySchema = require('../../models/marrySchema')
const praySchema = require('../../models/praySchema')
module.exports = {
	name: "leaderboard",
	description: ["Xem bảng xếp hạng!", "See top player!"],
	aliases: ['lb', 'top', 'rank'],
	usage: ["{prefix}top <cash | love | zoo>", "{prefix}top <cash | love | zoo>"],
	cooldown: 30000,
	category: "Rank",
	canuse: "everyone",
	errorcd: ["Đợi **{time}** và check lại nhé!", "Wait for **{time}** and try again later!"],
	error: false,
	run: async (client, message, args) => {
		if (!args[0]) return message.reply(`${client.e.fail} | Bạn muốn check top nào ?`)
		let type = args[0]
		if (type == `money` || type == `cash` || type == `coin` || type == `c` || type == `bal`) {
			let soluong = 10
			if (parseInt(args[1])) soluong = parseInt(args[1])
			if (soluong > 25) soluong = 25
			let find = await moneySchema.find({
				coins: { $gte: 1 }
			}).sort({ coins: -1 })
			let msg = ``
			let ids = []
			let money = []
			for (f in find) {
				let o = find[f]
				if (o.id == "945071381182296144") continue;
				ids[f] = o.id
				money[f] = o.coins
			}
			for (var i = 0; i < soluong; i++) {
				let userid = ids[i]
				console.log(userid)
				let moneys = money[i]
				let members = await client.users.cache.find(user => user.id === userid)
				if (!members) continue;
				msg += `[${i + 1}] **${members.username}** - \`${parseInt(moneys).toLocaleString('En-Us')}\`\n`
			}
			await message.channel.send(`\`TOP ${soluong} CASH YCOIN\`\n` + `\`\`\`\n${msg}\n\`\`\``).catch(e => console.log(e))
		}
		if (type == `bank` || type == `deposit` || type == `b` || type == `dep`) {
			if (message.author.id !== "896739787392819240") return
			let soluong = 10
			if (parseInt(args[1])) soluong = parseInt(args[1])
			if (soluong > 25) soluong = 25
			let find = await bankSchema.find({
				coins: { $gte: 1 }
			}).sort({ coins: -1 })
			let msg = ``
			let ids = []
			let money = []
			for (f in find) {
				let o = find[f]
				if (o.id == "945071381182296144") continue;
				ids[f] = o.id
				money[f] = o.coins
			}
			for (var i = 0; i < soluong; i++) {
				let userid = ids[i]
				console.log(userid)
				let moneys = money[i]
				let members = await client.users.cache.find(user => user.id === userid)
				if (!members) continue;
				msg += `[${i + 1}] **${members.username}** - \`${parseInt(moneys).toLocaleString('En-Us')}\`\n`
			}
			await message.channel.send(`\`TOP ${soluong} BANK YCOIN\`\n` + `\`\`\`\n${msg}\n\`\`\``).catch(e => console.log(e))
		}
		if (type == `pray` || type == `caunguyen` || type == `pr` || type == `dotnhang`) {
			let soluong = 10
			if (parseInt(args[1])) soluong = parseInt(args[1])
			if (soluong > 25) soluong = 25
			let find = await praySchema.find({
				prays: { $gte: 1 }
			}).sort({ prays: -1 })
			let msg = ``
			let ids = []
			let money = []
			for (f in find) {
				let o = find[f]
				if (o.id == "945071381182296144") continue;
				ids[f] = o.id
				money[f] = o.prays
			}
			for (var i = 0; i < soluong; i++) {
				let userid = ids[i]
				let moneys = money[i]
				let members = await client.users.cache.find(user => user.id === userid)
				if (!members) continue;
				msg += `[${i + 1}] **${members.username}** - \`${parseInt(moneys).toLocaleString('En-Us')} Prays\`\n`
			}
			await message.channel.send(`\`TOP ${soluong} PRAY YUBABE\`\n` + `\`\`\`\n${msg}\n\`\`\``).catch(e => console.log(e))
		}
		if (type == `zoo` || type == `z`) {
			let soluong = 10
			if (parseInt(args[1])) soluong = parseInt(args[1])
			if (soluong > 25) soluong = 25
			let find = await zoopointSchema.find({
				quanlity: { $gte: 1 }
			}).sort({ quanlity: -1 })
			let msg = ``
			let ids = []
			let money = []
			for (f in find) {
				let o = find[f]
				if (o.zooid == "945071381182296144") continue;
				ids[f] = o.zooid
				money[f] = o.quanlity
			}
			for (var i = 0; i < soluong; i++) {
				let userid = ids[i]
				let moneys = money[i]
				let members = await client.users.cache.find(user => user.id === userid)
				if (!members) continue;
				msg += `[${i + 1}] **${members.username}** - \`${parseInt(moneys).toLocaleString('En-Us')}\`\n`
			}
			await message.channel.send(`\`TOP ${soluong} ĐIỂM ZOO\`\n` + `\`\`\`\n${msg}\n\`\`\``).catch(e => console.log(e))
		}
		if (type == `tank` || type == `t`) {
			let soluong = 10
			if (parseInt(args[1])) soluong = parseInt(args[1])
			if (soluong > 25) soluong = 25
			let find = await fishpointSchema.find({
				quanlity: { $gte: 1 }
			}).sort({ quanlity: -1 })
			let msg = ``
			let ids = []
			let money = []
			for (f in find) {
				let o = find[f]
				if (o.zooid == "945071381182296144") continue;
				ids[f] = o.zooid
				money[f] = o.quanlity
			}
			for (var i = 0; i < soluong; i++) {
				let userid = ids[i]
				let moneys = money[i]
				let members = await client.users.cache.find(user => user.id === userid)
				if (!members) continue;
				msg += `[${i + 1}] **${members.username}** - \`${parseInt(moneys).toLocaleString('En-Us')}\`\n`
			}
			await message.channel.send(`\`TOP ${soluong} ĐIỂM TANK\`\n` + `\`\`\`\n${msg}\n\`\`\``).catch(e => console.log(e))
		}
	}
}