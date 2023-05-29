let { QuickDB } = require('quick.db')
let db = new QuickDB()

module.exports = {
  name: "jackpot",
  description: "Mua vé số may mắn 1phut",
  aliases: ["jp"],
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
    const lotterySchema = require("../../models/lotterySchema")
    let bought = await lotterySchema.findOne({ authorid: message.author.id })
    if (bought) return message.reply(`Bạn **đã mua vé số**!
Jackpot hiện tại là  **__${jackpot.toLocaleString("en-us")}__**`)
    else return message.reply(`Bạn **chưa** mua vé số!
Jackpot hiện tại là  **__${jackpot.toLocaleString("en-us")}__**`)
  }
}
//}
