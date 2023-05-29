
const mongoose = require('mongoose')
const marrySchema = require('../../models/marrySchema');
const userReg = RegExp(/<@!?(\d+)>/)
module.exports = {
  name: "promise",
  description: ["Thề non hẹn biển...", "Say something to prove your love!"],
  aliases: ["loihua"],
  usage: ["{prefix}loihua <nội dung>", "{prefix}promise <content>"],
  cooldown: 0,
  category: "Marry",
  canuse: "everyone",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
    const BanSchema = require('../../models/BanSchema')
    const ban = await BanSchema.findOne({ memberid: message.author.id })
    if (ban) {
      if (ban.memberid == message.author.id) return
    }
    const husband = message.author
    const data = await marrySchema.findOne({ authorid: husband.id })
    const errorNOmarry = [
      `Chưa cưới mà đã thề non hẹn biển...`,
      `You don't have anyone to promise...`
    ]
    if (!data) return await client.send(client, message, errorNOmarry, null)
    const vkid = data.wifeid
    const loihua = data.loihua
    data.loihua = args.join(' ')
    await data.save()
    let loihuamoi = args.join(' ')
    const errorNOmarry2 = [
      `<:Yquyxu:941244934797799434> | **${husband.username}** đã chuyển lời hứa *${loihua}* thành **${loihuamoi}**`,
      `<:Yquyxu:941244934797799434> | **${husband.username}** changed the promise from *${loihua}* into **${loihuamoi}**`
    ]
    return await client.reply(client, message, errorNOmarry2, null)
  }
}