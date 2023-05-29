const { PermissionsBitField, EmbedBuilder, ActionRowBuilder } = require("discord.js")
module.exports = {
  name: "rerollgiveaways",
  description: ["Kết thúc một giveaways", ""],
  aliases: ["reroll", "rr"],
  usage: ["{prefix}rr <Giveaway Message ID>", "{prefix}rr <Giveaway Message ID>"],
  cooldown: 0,
  category: "Giveaways",
  canuse: "everyone",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply('Bạn phải có quyền `Quản Lý Tin Nhắn` mới được reroll g.a')
    const query = args[0]
    const giveaway = await client.giveawaysManager.giveaways.find((g) => g.guildId === message.guild.id && g.messageId === query);
    // If no giveaway was found
    if (!giveaway) return message.reply(`**Không tìm thấy giveaways với ID \`${query}\`. Xin hãy kiểm tra lại`);
    const messageId = query
    await client.giveawaysManager.reroll(messageId, {
      messages: {
        congrat: '<a:Ybia:936408211492323348> Người trúng giveaway mới: {winners}! Xin chúc mừng, bạn đã thắng Giveaways **{this.prize}**!\n{this.messageURL}',
        error: '👾 Only 1 Joined... Can\'t reroll !'
      }
    })
      .then(() => {
        message.reply('Done!');
      })
      .catch((err) => {
        message.reply(`err...`);
      });
  }
}