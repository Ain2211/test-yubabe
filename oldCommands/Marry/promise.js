
const mongoose = require('mongoose')
const marrySchema = require('../../models/marrySchema');
const userReg = RegExp(/<@!?(\d+)>/)
module.exports = {
  name: 'loihua',
  cooldown: 0,
  description: "Thề non hẹn biển...",
  aliases: ['promise'],
  usage: "[prefix]marry | cuoianhnha | cuoiemnha",
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
    return await client.send(client, message, errorNOmarry2, null)
  }
}