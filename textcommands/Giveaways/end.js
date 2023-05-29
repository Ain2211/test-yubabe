const { PermissionsBitField, EmbedBuilder, ActionRowBuilder } = require("discord.js")
module.exports = {
  name: "end",
  description: ["Kết thúc một giveaways", ""],
  aliases: [],
  usage: ["{prefix}end <Giveaway Message ID>", "{prefix}end <Giveaway Message ID>"],
  cooldown: 0,
  category: "Giveaways",
  canuse: "everyone",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({ table: "DB" })
    const query = args[0]
    const giveaway = await client.giveawaysManager.giveaways.find((g) => g.guildId === message.guild.id && g.messageId === query);

    // If no giveaway was found
    if (!giveaway) return message.reply(`${lang === "vi" ? "**Không tìm thấy giveaways với ID `${query}`. Xin hãy kiểm tra lại**" : "Cannot find giveaways with that ID, please check again!"}`);
    //if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply('Tôi phải được bật quyền `Quản Lý Tin Nhắn` trong kênh này thì mới có thể quản lý g.a')
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply(`${lang === "vi" ? "Bạn phải có quyền `Quản Lý Tin Nhắn` mới được kết thúc g.a" : "Missing Permission `Manage Messages`!"}`)
    let lang = await db.get(`${message.guild.id}_languages`)
    let des = `${lang === "vi" ? "Đi Tới Giveaways" : "Giveaways Message!"}`
    const messageId = query
    await client.giveawaysManager
      .end(messageId)
      .then(async (g) => {
        /** let guild = message.guild
         let channel = guild.channels.cache.find(c => {c.id== g.channelId})
         console.log(channel.id) */
        await g.message.channel.send({
          content: `${lang === "vi" ? "Giveaways đã được kết thúc" : "Giveaways Ended!"}`, embeds: [
            new EmbedBuilder()
              .setDescription(`[${des}](${g.messageURL})`)
          ]
        })
      })
      .catch((err) => {
        console.log(`An error has occurred, please check and try again.\n\`${err}\``)
      })

  }
}