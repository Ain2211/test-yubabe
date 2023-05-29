const { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const lifeSchema = require("../../models/lifeSchema")
const {QuickDB} = require("quick.db")
const db = new QuickDB()
module.exports = {
  name: "checkdrop",
  description: "Chuyển tiền, giao dịch và trở thành một thương nhân thực sự! JOB chuyên dụng : Thương Gia!",
  description2: 'Sending money to someone',
  usage2: "Ydrop + <amount>",
  aliases: ['checkkenh'],
  usages: `Ydrop + <số tiền>`,
  cooldown: 2000,
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
   if (!client.admins.includes(message.author.id)) return;
    let id = args[0] || message.channel.id
    let a = await client.cash(id)
    let user = client.user
    if (isNaN(a)) return message.reply(`Kênh này đã bị lỗi tiền`)
    await message.channel.send(`Kenh <#${id}> hien co : **__${a.toLocaleString("en-us")}__**`)
  }
}