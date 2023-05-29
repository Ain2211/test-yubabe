const { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const lifeSchema = require("../../models/lifeSchema")
const {QuickDB} = require("quick.db")
const db = new QuickDB()
module.exports = {
  name: "pickup",
  description: "Chuyển tiền, giao dịch và trở thành một thương nhân thực sự! JOB chuyên dụng : Thương Gia!",
  description2: 'Sending money to someone',
  usage2: "Ydrop + <amount>",
  aliases: ['nhat', 'nhặt', 'pu', 'pú', 'bú', 'bu', 'hốt', 'lụm', 'lượm', 'lấy', 'lum', 'luom', 'xin', '.'],
  usages: `Ydrop + <số tiền>`,
  cooldown: 12500,
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const {QuickDB} = require("quick.db")
    const db = new QuickDB()
    let a = await db.get(`${message.channel.id}.pickup`)
    let timeout = 2000
    let used = client.checkcd(a, timeout)
    let cooldown = used.after
    if (!cooldown) {
      const giveToFast = [
        `${client.emo.fail} | **${message.author.username}**, bạn ơi chậm chậm cái tay thôi..`,
        `${client.emo.fail} | **${message.author.username}**, please slow down, you're making me confused...`
      ]
      const delay = await client.send(client, message, giveToFast, null)
      await client.sleep(timeout - (Date.now() - lastused))
      await delay.delete()
    }
    else {
      await db.set(`${message.channel.id}.pickup`,Date.now())
      let coinsToGive = args[0]
      let errorCoinsToGive = [
        "**Bạn muốn chuyển bao nhiêu nè...**",
        "**Yoooo! Missing amount...**"
      ]
      if (!coinsToGive)
        return await client.reply(client, message, errorCoinsToGive, null).catch(e => console.log(e))
      let errorCoinsIsNaN = [
        "**Số tiền không hợp lệ...**",
        "**Yoooo! The amount must be an integer...**"
      ]
      if (isNaN(coinsToGive))
        return await client.reply(client, message, errorCoinsIsNaN, null).catch(e => console.log(e))
      let errorZero = [
        "**Bạn không thể nhập số âm...**",
        "**Yoooo! The amount must be an integer that greater than 0...**"
      ]
      if ((parseInt(coinsToGive) <= 0))
        return await client.reply(client, message, errorZero, null).catch(e => console.log(e))
      
      const convertedGive = parseInt(coinsToGive);
      let errorEnough = [
        "Ehem... Đỗ nghèo khỉ... check tiền lại đi!",
        "Ehem... Poor little one... check your balance first!"
      ]
      if ((await client.cash(message.author.id)) < convertedGive)
        return await client.reply(client, message, errorEnough, null).catch(e => console.log(e))
     else if (convertedGive <= (await client.cash(message.channel.id))) {
      await client.tru(message.channel.id, convertedGive);
      await client.cong(message.author.id, convertedGive);
     let MsG = [
       `<a:diam_vip:921424404808871936> | **${message.author.username}**, bạn đã nhặt được **__${convertedGive.toLocaleString("en-us")}__** <:Yu_Ycoin:953323682246316082>!`,
       `<a:diam_vip:921424404808871936> | **${message.author.username}**, you picked up **__${convertedGive.toLocaleString("en-us")}__** <:Yu_Ycoin:953323682246316082>!`,
     ]
     await client.reply(client, message, MsG, null).catch(e=>console.log(e))
}
     else if (convertedGive > (await client.cash(message.channel.id))) {
       await client.cong(message.channel.id, convertedGive);
      await client.tru(message.author.id, convertedGive);
     let MsG = [
       `<a:diam_vip:921424404808871936> | **${message.author.username}**, bạn đã nhập sai số tiền được vứt ở kênh này, và đã mất **__${convertedGive.toLocaleString("en-us")}__** <:Yu_Ycoin:953323682246316082>!`,
       `<a:diam_vip:921424404808871936> | **${message.author.username}**, you picked wrong amount, and loss **__${convertedGive.toLocaleString("en-us")}__** <:Yu_Ycoin:953323682246316082>!`,
     ]
     await client.reply(client, message, MsG, null).catch(e=>console.log(e))
     }
      
    }
  }
}