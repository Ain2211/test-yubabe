const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const itemSchema = require('../../models/itemSchema')
module.exports = {
  name: 'testadmin',
  cooldown: 0,
  description: "",
  usage: "",
  run: async (client, message, args) => {
    if (client.admins.includes(message.author.id)) return message.reply("OK, bạn là nhất! Nhất bạn rồi!")
    else return
  }
}
