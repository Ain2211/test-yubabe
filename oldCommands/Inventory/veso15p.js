let { QuickDB } = require('quick.db')
let db = new QuickDB()

module.exports = {
  name: "luckylottery",
  description: "Mua vé số may mắn 1phut",
  aliases: ["lottery", 'luckylott', 'll'],
  cooldown: 0,
  usage: null,
  error: `Bạn vừa mua vé số xong hoặc vẫn đang chờ kết quả dò số, xin hãy kiên nhẫn quay lại sau! Nếu đã mua xin hãy gõ Ylottery check! Nếu bạn gõ Ylottery buy khi đã mua hoặc Ylottery check khi chưa mua, bạn sẽ phải chờ thêm 60s nữa!`,
  run: async (client, message, args) => {
    const BanSchema = require('../../models/BanSchema')
    const ban = await BanSchema.findOne({ memberid: message.author.id })
    if (ban) {
      if (ban.memberid == message.author.id) return
    }
    let sotien = 100000
    let jackpot = await db.get("Yubabe.Jackpot")
    let cash = await client.cash(message.author.id)
    if (cash < sotien) return message.reply(`Bạn không đủ **100,000** Ycoin để mua vé số!`)
    const lotterySchema = require("../../models/lotterySchema")
    let bought = await lotterySchema.findOne({ authorid: message.author.id })
    if (bought) return message.reply(`:x: | Bạn đã mua vé số rồi! Hãy quay lại sau! 
Jackpot hiện tại là  **__${jackpot.toLocaleString("en-us")}__**`)
    if (!jackpot) await db.set("Yubabe.Jackpot", sotien)
    await client.tru(message.author.id, sotien)
    if (jackpot) await db.add("Yubabe.Jackpot", sotien)
    let buy = new lotterySchema({ authorid: message.author.id, money: sotien, time: Date.now() })
    await buy.save()
    await message.reply(`Chúc mừng bạn đã mua vé số thành công, bạn mua **${sotien}** và sẽ trúng ${(jackpot + sotien).toLocaleString("en-us")}. 
Sau 15p sẽ có kết quả, bot sẽ DMS và add tiền cho bạn!
\`hãy nhắn cho tôi ít nhất 1 tin nhắn nếu bạn không mở DMS nhé!!\``)
  }
}
//}
