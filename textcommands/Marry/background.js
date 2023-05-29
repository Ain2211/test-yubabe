const marrySchema = require('../../models/marrySchema');
const anhcuoi = require(`../../models/anhcuoi`)
  module.exports = {
  name: "background",
  description: ["Thay ảnh cưới của bạn!", "Change your marry background photo!"],
  aliases: ["hinhcuoi", "anhcuoi", "bg"],
  usage:["{prefix}bg <link>", "{prefix}bg <link>"],
  cooldown: 3600000,
	category: "Marry",
	canuse: "everyone",
  errorcd : ["Chỉ có thể thay ảnh 1 tiếng/lần! Quay lại sau **{time}**", "You can adjust Marry Background for 1hours/time! Try again after **{time}**"],
  run: async (client, message, args) => {
    await message.delete()
    let link = args[0]
    if (link.startsWith(`http`)) {
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