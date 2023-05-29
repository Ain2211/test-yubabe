
const { AttachmentBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, ComponentType } = require("discord.js")
module.exports = {
	name: 'kill',
	description: ["Giết thú để nhận tinh hoa sự sống", "Kill animals to get Life Elite"],
	usage: ["{prefix}kill <rank | all>", "{prefix}kill <rank | all>"],
	cooldown: 2000,
	category: "Animals",
	canuse: "everyone",
	errorcd: ["Hãy chờ **{time}**", "Please wait **{time}**"],
	run: async (client, message, args) => {
    return 
		const C = ["🐛", "🪱", "🐞", "🐌", "🦋"]
		const U = ["🐭", "🐰", "🐱", "🐶", "🦊"]
		const R = ["🐓", "🐖", "🐏", "🐄", "🐃"]
		const SR = ["🦎", "🐢", "🦂", "🐍", "🐊"]
		const E = ["🐒", "🦛", "🐆", "🐅", "🐘"]
		const P = [
			"<a:Ybutterfly:911682101005398058>",
      "<a:yl_ngoisao:1109036321927872562> ",
			"<<a:yl_ca_zoo:1109035822893764669>",
			"<:Ykhatrapboi:918082945686851615>",
			"<:be_non:918932737543503912>",
			"<a:Yu_meobaymau:944351775597674558>",
			"<:Yquyxu:941244934797799434>",
			"<a:GG_hongchuyen:911309645681946685>"
		]
		const G = [
			"<:G_naisungtam:974392899536056401>",
			"<:G_kilan:974392813095616542>",
			"<:G_gautruc:974392721106149466>",
			"<:G_cho:974392664445308958>",
			"<:G_chim:974392505317597194>",
			"<:G_caoden:974392590029959188>",
			"<:G_bachtuoc:974392970931470347>"
		]
		const D = [
			"<:D_Chimera:985411852542562344>",
			"<:D_Hydra:985411855927349298>",
			"<:D_Medusa:985411858557202513>",
			"<:D_Minotaur:985411860922761276>",
			"<:D_Pegasus:985411864324358184>"
		]
		const V = [
			"<a:V_Cinderella:988149859745943592>",
			"<a:V_Sonic:988149031291215914>",
			"<a:V_Vanellope:988148591669440615>",
			"<a:V_Belle:988150258066423858>",
			"<a:V_BossBaby:988147327292276756>",
			"<a:V_Mikey:994182093183655966>"
		]
		const animalSchema = require("../../models/animalSchema")
		const errorAnimals = [
			`Loại thú bạn nhập không đúng hoặc không đủ để bán`,
			`You don't have any animals type ${args[0]} to sell.`
		]
		let types = {
			"c": "common",
			"C": "common",
			"common": "common",
			"u": "uncommon",
			"U": "uncommon",
			"uncommon": "uncommon",
			"r": "rare",
			"R": "rare",
			"rare": "rare",
			"s": "superrare",
			"S": "superrare",
			"SR": "superrare",
			"sr": "superrare",
			"Sr": "superrare",
			"superrare": "superrare",
			"e": "epic",
			"E": "epic",
			"epic": "epic",
			"p": "pro",
			"P": "pro",
			"pro": "pro",
			"g": "glory",
			"G": "glory",
			"glory": "glory",
			"d": "devil",
			"D": "devil",
			"devil": "devil",
			"v": "vip",
			"V": "vip",
			"vip": "vip"
		}
		let killtype = types[args[0]]
		const selltype = await animalSchema.find({ id: message.author.id, type: killtype }).sort({ quanlity: -1 })
		if (args[0] == `all`) {
			let wait = [
				`<a:yl_loading:1109041890667544678> | Đợi một chút, tôi đang tính toán...`,
				`<a:yl_loading:1109041890667544678> | Wait a sec, I'm counting your animals...`,
			]
			let a = await client.reply(client, message, wait, null)
			let types = [
				"common",
				"uncommon",
				"rare",
				"superrare",
				"epic",
				"pro",
				"devil",
				"glory",
				"vip"
			]
			let amount = 0
			for (let t in types) {
				const selltype = await animalSchema.find({ id: message.author.id, type: types[t] }).sort({ quanlity: -1 })
				if (selltype[0]) {
					let sltb = 0
					let moneys = 0
					for (let a in selltype) {
						let thuban = selltype[a]
						let price = checkprice(C, U, R, SR, E, P, G, D, V, thuban.name)
						let sl = thuban.quanlity
						sltb += sl
						if (sl >= 1) moneys += price * sl
						if (sl < 1) moneys += 0
						thuban.quanlity = 0
						await thuban.save()
					}
					amount += moneys
				}
			}
			await client.add(message.author.id, amount)
			let soldSuccess = [
				`<:vvv:921536318062862396> | **${message.author.username}**, bạn đã bán tất cả thú và thu được **${parseInt(amount).toLocaleString('En-Us')} ${client.e.coin}`,
				`<:vvv:921536318062862396> | **${message.author.username}**, you sold all animals and received **${parseInt(amount).toLocaleString('En-Us')} ${client.e.coin}**`
			]
			await client.send(client, message, soldSuccess, null)
			await a.delete()
		}
		else if (!selltype[0] || !args[0]) return client.reply(client, message, errorAnimals, null)
		else if (selltype[0]) {
			let sltb = 0
			let moneys = 0
			for (let a in selltype) {
				let thuban = selltype[a]
				let price = checkprice(C, U, R, SR, E, P, G, D, V, thuban.name)
				let sl = thuban.quanlity
				sltb += sl
				if (sl >= 1) moneys += price * sl
				if (sl < 1) moneys += 0
				thuban.quanlity = 0
				await thuban.save()
			}
			await client.add(message.author.id, moneys)
			let soldSuccess = [
				`<:vvv:921536318062862396> | **${message.author.username}**, bạn đã bán **${sltb}** thú loại **${args[0]}** và thu được **${parseInt(moneys).toLocaleString('En-Us')} ${client.e.coin}**`,
				`<:vvv:921536318062862396> | **${message.author.username}**, you sold **${sltb}** type ${args[0]} animals and received **${parseInt(moneys).toLocaleString('En-Us')} ${client.e.coin}**`
			]
			await client.send(client, message, soldSuccess, null)
		}
	}
}

function toSmallNum(count, digits) {
	var result = '';
	var num = count;
	if (count < 0) count = 0;
	for (i = 0; i < digits; i++) {
		var digit = count % 10;
		count = Math.trunc(count / 10);
		result = number.numbers[digit] + result;
	}
	return result;
}

function checkprice(c, u, r, s, e, p, g, d, v, thu) {
	let result = 0
	if (c.includes(thu)) result = 5 //7
	if (u.includes(thu)) result = 7 //14
	if (r.includes(thu)) result = 10 //21
	if (s.includes(thu)) result = 15 // 35
	if (e.includes(thu)) result = 20 //70
	if (p.includes(thu)) result = 10000  //7000
	if (g.includes(thu)) result = 3500 //3150
	if (d.includes(thu)) result = 6500 //7000
	if (v.includes(thu)) result = 15000 //10500
	return result
}
function isInt(value) {
	return !isNaN(value) &&
		parseInt(Number(value)) == value &&
		!isNaN(parseInt(value, 10));
}