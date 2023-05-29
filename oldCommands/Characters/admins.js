const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const itemSchema = require('../../models/itemSchema')
module.exports = {
  name: 'xoadulieu',
  cooldown: 0,
  description: "",
  aliases: ['xdl'],
  usage: "",
  run: async (client, message, args) => {
     if (message.author.id !== `896739787392819240` && message.author.id !== `941690116722798633` && message.author.id !== `626811137035337758` && message.author.id !== `889832634056863774` && message.author.id !== `696893548863422494`) return;
    let dulieu = args[0]
    if (dulieu == `manhtuong`) {
      await itemSchema.deleteMany({ type: `manhtuong` })
      await message.reply(`Đã xóa thành công dữ liệu mảnh tướng`)
    }

  }
}
