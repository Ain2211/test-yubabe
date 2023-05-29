const dailySchema = require("../../models/dailySchema")
const BanSchema = require('../../models/BanSchema')
const vipSchema = require('../../models/vipSchema')
module.exports = {
  name: "work",
  description: ["Work để kiếm tí tiền!", "Work to get some money!"],
  aliases: ["w"],
  usage: ["{prefix}w", "{prefix}w"],
  cooldown: 3000,
  category: "Eco",
  canuse: "everyone",
  errorcd: ["Hãy thử lại sau **{time}**", "Try again after **{time}**"],
  run: async (client, message, args) => {
    const author = message.author
    let timeouts = 3000
    let lastused = await client.cd(message.author.id, `addngoc`)
    let used = client.checkcd(lastused, timeouts)
    let cooldown = used.after
    if (!cooldown) {
      const errorSpam = [
        `${client.e.fail} | **${message.author.username}**, bạn từ từ thôi cho tôi thở phát... **${used.s}s** nữa hãy gõ tiếp!`,
        `${client.e.fail} | **${message.author.username}**, you're too quick for me, please slow down... wait **${used.s}s** and continue !`
      ]
      const delay = await client.send(client, message, errorSpam, null).catch(error => console.log(error))
      await client.sleep(2000)
      await delay.delete()
      return
    }
    else {
      await client.timeout(message.author.id, `addngoc`)
      let user = message.author;
      let timeout = 600000
      let lastused = await client.cd(message.author.id, `work1`)
      let used = client.checkcd(lastused, timeout)
      let cooldown = used.after
      if (!cooldown) {
        let errorDaily = [
          `${client.e.fail} | **${message.author.username}**, bạn quá mệt để đi làm... Hãy quay lại sau **${used.h + `:` + used.m + `:` + used.s}s** nữa !`,
          `${client.e.fail} | **${message.author.username}**, you're too tired too work... Please comeback after **${used.h + `:` + used.m + `:` + used.s}s**!`
        ]
        const delay = await client.send(client, message, errorDaily, null).catch((e) => console.log(e))
        await client.sleep(timeout - (Date.now() - lastused))
        await delay.delete()
        return
      }
      else {
        await client.timeout(message.author.id, `work1`)
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
        if (!pro && !vip) {
          await client.addgem(user.id, `<:GEMBOX:982028743952441355>`, 1, 0)
          let lương = Math.floor(Math.random() * 9) * 100
          client.cong(user.id, parseInt(lương));
          const Works = [
            `**${user.username}**, bạn đã đi làm và được trả **${parseInt(lương).toLocaleString('En-us')} Ycoin và x1 <:GEMBOX:982028743952441355> **
\`VOTE CHO BOT MỖI 12G ĐỂ NHẬN 3 GEMBOX!\``,
            `**${user.username}**, you've worked hard and receive **${parseInt(lương).toLocaleString('En-us')} Ycoin bonus x1 <:GEMBOX:982028743952441355> **
\`VOTE FOR ME EVERY 12H TO GET 3 GEMBOX!\``
          ]
          await client.send(client, message, Works, null).catch(e => console.log(e))
        }
        else if (pro) {
          await client.addgem(user.id, `<:PRO_GEMBOX:982028744057298964>`, 1, 0)
          let lương = Math.floor(Math.random() * 99) * 100
          client.cong(user.id, parseInt(lương));
          const Works = [
            `**${user.username}**, bạn đã đi làm và được trả **${parseInt(lương).toLocaleString('En-us')} Ycoin và x1 <:PRO_GEMBOX:982028744057298964> [PRO-PASSPORT]**
\`VOTE CHO BOT MỖI 12G ĐỂ NHẬN 3 GEMBOX!\``,
            `**${user.username}**, you've worked hard and receive **${parseInt(lương).toLocaleString('En-us')} Ycoin bonus x1 <:PRO_GEMBOX:982028744057298964> [PRO-PASSPORT]**
\`VOTE FOR ME EVERY 12H TO GET 3 GEMBOX!\``
          ]
          await client.send(client, message, Works, null).catch(e => console.log(e))
        }
        else if (vip) {
          await client.addgem(user.id, `<:PRO_GEMBOX:982028744057298964>`, 1, 0)
          await client.addgem(user.id, `<:GEMBOX:982028743952441355>`, 1, 0)
          let lương = Math.floor(Math.random() * 99) * 100
          client.cong(user.id, parseInt(lương));
          const Works = [
            `**${user.username}**, bạn đã đi làm và được trả **${parseInt(lương).toLocaleString('En-us')} Ycoin, x1 <:GEMBOX:982028743952441355> và x1 <:PRO_GEMBOX:982028744057298964> [VIP-PASSPORT]**
\`VOTE CHO BOT MỖI 12G ĐỂ NHẬN 3 GEMBOX!\``,
            `**${user.username}**, you've worked hard and receive **${parseInt(lương).toLocaleString('En-us')} Ycoin bonuses x1 <:GEMBOX:982028743952441355> & x1 <:PRO_GEMBOX:982028744057298964> [VIP-PASSPORT]**
\`VOTE FOR ME EVERY 12H TO GET 3 GEMBOX!\``
          ]
          await client.send(client, message, Works, null).catch(e => console.log(e))
        }
      }
    }
  }
}