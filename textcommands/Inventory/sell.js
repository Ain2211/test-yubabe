const invSchema = require('../../models/invSchema')
const thu = require('../../config/animal.json')
const animalSchema = require('../../models/animalSchema')
const farmSchema = require('../../models/farmSchema')
module.exports = {
  name: "sell",
  description: ["Ysell <ID> <Số lượng | All>", "Ysell <ID> <Amount | All>"],
  aliases: ["s"],
  usage: ["{prefix}sell <ID> <Số lượng | All>", "{prefix}sell <ID> <Amount | All>"],
  cooldown: 3000,
  category: "Inven",
  canuse: "everyone",
  errorcd: ["Hãy đợi **{time}** và thử lại!", "Try again after **{time}**"],
  run: async (client, message, args) => {
    const { QuickDB } = require('quick.db');
    const db = new QuickDB({ table: "DB" });
    const lang = await db.get(`${message.guild.id}_languages`)
    const nsprice = [
      "<:FoodElite:1029360819286331422>",
      "<:LifeElite:1029361004167037090>",
      "<:PlantElite:1029360913863671839>"
    ]
    const object = args[0]
    let soluong = args[1]

    let nhanname = {
      '001': '<:Yu_nhanco:951133679546159214>',
      '002': '<:Yu_nhanbac:941435162728730675>',
      '003': '<:Yu_nhanvang:941435163181727824>',
      '004': '<:Yu_nhankimcuong:941435160883265556>',
      '005': '<:Yu_nhanvangkc:951586992897024060>'
    }
    const tennhan = nhanname[object]
    let arr = {
      'plant': `<:PlantElite:1029360913863671839>`,
      'life': `<:LifeElite:1029361004167037090>`,
      'food': `<:FoodElite:1029360819286331422>`,
      'p': `<:PlantElite:1029360913863671839>`,
      'l': `<:LifeElite:1029361004167037090>`,
      'f': `<:FoodElite:1029360819286331422>`,
      '1': `<:PlantElite:1029360913863671839>`,
      '2': `<:LifeElite:1029361004167037090>`,
      '3': `<:FoodElite:1029360819286331422>`,
    }
    let name = arr[object]

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
    
    if (tennhan) {
      const nhan = await invSchema.findOne({ memberid: message.author.id, name: tennhan })
      const errorNhan = [
        `${client.e.fail} | **${message.author.username}**, bạn nhập sai ID nhẫn hoặc bạn không có nhẫn này!`,
        `${client.e.fail} | **${message.author.username}**, you don't have ring of this ID or your ring ID does not exist, please check again!`
      ]
      if (!nhan) return await client.send(client, message, errorNhan, null)
      let user = message.author
      let a = await client.cd(message.author.id, `sellnhan1`)
      let day = await client.newday(a)
      let inday = day.withinDay
      let h = day.hours
      let min = day.minutes
      let sec = day.seconds
      let after = day.after
      if (!after) {
        const DelayTwo = [
          `<:Yu_fail:941589021761634306> | **${user.username}**, bạn phải chờ : \`${h}:${min}:${sec}s\` để sell nhẫn tiếp!`,
          `<:Yu_fail:941589021761634306> | **${user.username}**, you have to wait : \`${h}:${min}:${sec}s\` for next selling!`
        ]
        const delay = await client.send(client, message, DelayTwo, null)
        await client.sleep(5000)
        await delay.delete()
      }
      else {
        const QuanlityWrong = [
          `${client.e.fail} | **${message.author.username}**, bạn không đủ nhẫn để bán!`,
          `${client.e.fail} | **${message.author.username}**, you don't have this ring to sell!`
        ]
        if (nhan.quanlity < 1) return await client.send(client, message, QuanlityWrong, null)
        await client.timeout(message.author.id, `sellnhan1`)
        let money = nhan.price
        await invSchema.deleteOne({ memberid: message.author.id, name: tennhan })
        await client.cong(message.author.id, money)
        const successEndPointNhan = [
          `<:vvv:921536318062862396> | **${message.author.username}**, bạn đã bán thành công ${nhan.name} và nhận được **${parseInt(money).toLocaleString('En-Us')} Ycoin**`,
          `<:vvv:921536318062862396> | **${message.author.username}**, you've successfully sold ${nhan.name} and received **${parseInt(money).toLocaleString('En-Us')} Ycoin**`
        ]
        await client.send(client, message, successEndPointNhan, null)
      }
    }
    else if (name) {
      const hatgiong = await client.grow(message.author.id, name)
      let errorAmount = [
        `${client.e.fail} | **${message.author.username}** số lượng không hợp lệ !`,
        `${client.e.fail} | **${message.author.username}** invalid amount!`
      ]
      if (args[1] == "all") soluong = hatgiong
      if (soluong > hatgiong || soluong < 0 || isNaN(soluong)) return await client.send(client, message, errorAmount, null)
      let a = checktienhg(nsprice, name)
      let money = parseInt(soluong) * a
      let realmoney = parseInt(money)
      await client.trugrow(message.author.id, name, parseInt(soluong), 'elite')
      await client.cong(message.author.id, realmoney)
      const successEndpoint = [
        `${client.e.done} | **${message.author.username}**, bạn đã bán **${parseInt(soluong)}** ${name} và thu được **${parseInt(realmoney).toLocaleString('En-Us')} Ycoin**`,
        `${client.e.done} | **${message.author.username}**, you've sold **${parseInt(soluong)}** ${name} and received **${parseInt(realmoney).toLocaleString('En-Us')} Ycoin**`
      ]
      await client.send(client, message, successEndpoint, null)
    }
    else if(killtype || args[0] == "all") {

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
			await client.cong(message.author.id, amount)
			let soldSuccess = [
				`<:vvv:921536318062862396> | **${message.author.username}**, bạn đã bán tất cả thú và thu được **${parseInt(amount).toLocaleString('En-Us')} ${client.e.coin}**`,
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
			await client.cong(message.author.id, moneys)
			let soldSuccess = [
				`<:vvv:921536318062862396> | **${message.author.username}**, bạn đã bán **${sltb}** thú loại **${args[0]}** và thu được **${parseInt(moneys).toLocaleString('En-Us')} ${client.e.coin}**`,
				`<:vvv:921536318062862396> | **${message.author.username}**, you sold **${sltb}** type ${args[0]} animals and received **${parseInt(moneys).toLocaleString('En-Us')} ${client.e.coin}**`
			]
			await client.send(client, message, soldSuccess, null)
    }
    }
    else {
      let nothingfound = [
        `${client.e.fail} | **${message.author.username}**, bạn phải nhập thứ muốn bán! 
Bán thú : \`Ysell <type/all>\`
Bán nhẫn : \`Ysell <type/id>\`
Bán tinh hoa : \`Ysell <type(p,l,f)> <quanlity/all>\``,
        `${client.e.fail} | **${message.author.username}**, you have to define which to sell! 
Sell animals : \`Ysell <rank/all>\`
Sell rings : \`Ysell <ID>\`
or elite : \`Ysell <p|l|f> <quanlity | all>\``
      ]
      return await client.send(client, message, nothingfound, null)
    }
  }
}
function checkprice(c, u, r, s, e, p, g, d, v, thu) {
  let result = 0
  if (c.includes(thu)) result = 2
  if (u.includes(thu)) result = 6
  if (r.includes(thu)) result = 10
  if (s.includes(thu)) result = 50
  if (e.includes(thu)) result = 400
  if (p.includes(thu)) result = 1000
  if (g.includes(thu)) result = 5000
  if (d.includes(thu)) result = 10000
  if (v.includes(thu)) result = 50000
  return result
}
function Datecheck(date) {
  let now = new Date(Date.now() + 25200000);
  let midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  /* Calculate time until midnight */
  let temp = Math.trunc(((midnight - now) + 86400000) / 1000);
  let seconds = temp % 60;
  temp = Math.trunc(temp / 60);
  let minutes = temp % 60
  temp = Math.trunc(temp / 60);
  let hours = temp % 24;
  temp = Math.trunc(temp / 24);
  let days = temp;

  /* If there is no data */
  if (!date) return { after: true, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

  let pDate = new Date(date);
  let diff = midnight - pDate;

  /* Not past midnight */
  if (diff <= 0) return { after: false, diff: diff, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

  /* Within 1 day */
  else if (diff <= 172810000) return { after: true, diff: diff, withinDay: true, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

  /* Over 1 full day */
  else return { after: true, diff: diff, withinDay: (overrideWithinDay || false), seconds: seconds, minutes: minutes, hours: hours, days: days, now };
}
function checktienhg(array, hg) {
  let result
  if (hg == array[0]) result = 2000
  if (hg == array[1]) result = 7
  if (hg == array[2]) result = 150
  return result
}
