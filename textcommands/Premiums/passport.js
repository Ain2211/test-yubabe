const vipSchema = require('../../models/vipSchema')
module.exports = {
  name: "passport",
	description: ["Check thời hạn sử dụng passport!.", "Check your passport date until end."],
	aliases: ["premium", "pp"],
	usage: ["{prefix}premium", "{prefix}premium"],
	cooldown: 20000,
	category: "Premium",
	canuse: "everyone",
	errorcd: ["Vẫn còn {time} cooldown, hãy kiên nhẫn!", "CD: **{time}** !"],
	run: async (client, message, args) => {
    const pp = await vipSchema.findOne({
      memberid: message.author.id
    })
    let emo = ``
    if (!pp) {
      let messagess = 
 `**${message.author.username}**, bạn hiện chưa đăng ký Passport!`
      return message.reply(messagess).catch(e=>console.log(e))
    }
    if (pp) emo = pp.type
    const date = await client.datepassport(message.author.id)
    const status = await client.checkpassport(date)
    let end = status.after
    let d = status.d
    let h = status.h
    let m = status.m
    let s = status.s
    if (end) {
      await vipSchema.deleteMany({ memberid: message.author.id })
      let messagess = `**${message.author.username}**, Passport của bạn đã hết hạn!`
      await message.reply(messagess).catch(e=>console.log(e))
    } else if (!end) {
      let messagess = `${emo} | **${message.author.username}**, cảm ơn bạn đã ủng hộ YwY team và Yubabe! Passport của bạn vẫn còn \`${d + ` ngày ` + h + ` giờ ` + m + ` phút ` + s + ` giây `}\` nữa mới hết hạn !`
      await message.reply(messagess).catch(e=>console.log(e))
    }

  }	
}