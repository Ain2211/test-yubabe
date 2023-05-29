
const { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const BanSchema = require('../../models/BanSchema')
module.exports = {
  name: 'deposit',
  description: "Tiết kiệm ngân hàng. Check DMS nhé, vì mọi giao dịch của bạn đều bảo mật!",
  usage: "Ygui + <amount>",
  cooldown : 4000,
  aliases: ['tk', 'gtk', 'guitietkiem', 'gui', 'dps'],
  description2: 'Deposit money to bank, check your dms!',
  usage2: "Ydps + <amount>",
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  run: async (client, message, args) => {
const ban = await BanSchema.findOne({ memberid: message.author.id })
        if (ban) {
      if (ban.memberid == message.author.id) return
    }
    let timeout = 3000
    let lastused = await client.cd(message.author.id, `tietkiem`)
    let used = client.checkcd(lastused, timeout)
    let cooldown = used.after
  if(!cooldown) {
     const DelayMSG = [
        `${client.emo.fail} | **${message.author.username}**, bạn check dms đi ạ...`,
        `${client.emo.fail} | **${message.author.username}**, please check your DMS to see the money! If your DMS not open, please text me at least 1...`
      ]
      const delay = await client.send(client, message, DelayMSG, null).catch(e => console.log(e))
      await client.sleep(timeout - (Date.now() - lastused))
      await delay.delete()
    }
    else {
      await client.timeout(message.author.id, `tietkiem`)
    let member = message.author;


    let all = await client.cash(member.id);
    let bank = await client.bank(member.id)
    if (args[0] === "all") args[0] = all


     const errorAmount = [
        `**Bạn muốn gửi tiết kiệm bao nhiêu?**`,
        `**Missing the Amount to Deposit?**`
      ]
      if (!args[0]) {
        return await client.send(client, message, errorAmount, null).catch(e => console.log(e))
      }

    const errorAmountLessThanZero = [
        `**Không thể nhập số âm!**`,
        `**The amount must be greater than Zero?**`
      ]
      if (args[0] < 0) return await client.send(client, message, errorAmountLessThanZero, null).catch(e => console.log(e))
       const errorBankLessThanZero = [
        `**Tiền của bạn đang âm,xin hãy liên lạc support Server để được hỗ trợ !!**`,
        `**Your pocket is less than 0? Please contact support Server for helps! **`
      ]
      if (all < 0) return await client.send(client, message, errorBankLessThanZero, null).catch(e => console.log(e))
    
    const errorNumber = [
        `**Số không hợp lệ!**`,
        `**The amount must be an Integer!**`
      ]

      if (isNaN(args[0])) return await client.send(client, message, errorNumber, null).catch(e => console.log(e))

    const errorBankNotEnough = [
        `**Bạn không đủ tiền để tiết kiệm, xin vui lòng kiếm thêm tiền và thử lại !!**`,
        `**Your pocket balance isn't enough! Please make some more and retry **`
      ]
      if (parseInt(args[0]) > all) return await client.send(client, message, errorBankNotEnough, null).catch(e => console.log(e))
    const banking = parseInt(args[0])
    client.tietkiem(member.id, banking);
    await client.tru(member.id, banking);
    const bankBal = await client.bank(member.id);
    const Success = [
      `<a:Yu_cassh:942212732642537502> **|** **${message.author.username}**, bạn đã gửi tiết kiệm thành công : **${parseInt(args[0]).toLocaleString('En-us')}**, Tài khoản ngân hàng của bạn hiện tại là : **${parseInt(bankBal + banking).toLocaleString('En-us')} Ycoin**  `,
      `<a:Yu_cassh:942212732642537502> | **${message.author.username}**, your transaction was Successful, you've deposited : **${parseInt(args[0]).toLocaleString('En-us')}**, your Bank account's now having : **${parseInt(bankBal + banking).toLocaleString('En-us')} Ycoin**  `
    ]
     await client.dms(client, message, message.author, Success, null, null, null).catch(async e => {
        console.log(e)
        await client.dms(client, message, Success, null)
      })
  }
  }
}