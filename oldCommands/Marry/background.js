const marrySchema = require('../../models/marrySchema');
const anhcuoi = require(`../../models/anhcuoi`)
module.exports = {
  name: 'anhcuoi',
  cooldown: 0,
  description: "Sửa Ảnh Cưới!",
  aliases: ['hinhcuoi'],
  usage: "[prefix]anhcuoi + link",
  run: async (client, message, args) => {
    const BanSchema = require('../../models/BanSchema')
    const ban = await BanSchema.findOne({ memberid: message.author.id })
    if (ban) {
      if (ban.memberid == message.author.id) return
    }
    await message.delete()
    let link = args[0]
    if (link.includes(`http`)) {
      const husband = message.author
      const data = await marrySchema.findOne({ authorid: husband.id })
      if (!data) return message.channel.send(`Chưa cưới mà đã đòi chụp hình cưới...`)
      const lovedata = await marrySchema.findOne({ authorid: data.wifeid })
      const hinhcuoi = await anhcuoi.findOne({ authorid: message.author.id })
      const hinhcuoi2 = await anhcuoi.findOne({ authorid: data.wifeid })
      await anhcuoi.deleteOne({ authorid: message.author.id })
      await anhcuoi.deleteOne({ authorid: data.wifeid })
      const hinhcuoi3 = new anhcuoi({ authorid: husband.id, wifeid: data.wifeid, anhcuoi: args[0] })
      await hinhcuoi3.save()
      const hinhcuoi4 = new anhcuoi({ authorid: data.wifeid, wifeid: husband.id, anhcuoi: args[0] })
      await hinhcuoi4.save()
      await message.channel.send(`<:Yquyxu:941244934797799434> | **${husband.username}** đã thay đổi ảnh cưới : ${args[0]}`).catch(e => console.log(e))
    }
    else {
      return message.channel.send("**Xin hãy nhập link có định dạng: https://**").catch(e => console.log(e));
    }

  }
}