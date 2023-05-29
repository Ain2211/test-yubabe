const { EmbedBuilder } = require("discord.js")
module.exports = {
  name: "server",
  description: "Check server",
  usage: "Yserver",
  aliases: ["sv"],
  cooldown : 0,
  run: async (client, message, args) => {
    if (!client.admins.includes(message.author.id)) return
    const dt = new Date(message.createdTimestamp);
    const svembed = new EmbedBuilder()
    .setTitle(`TỔNG SỐ SERVER CÓ YUBABE`)
    .setColor(`#FF0099`)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setDescription(`Server: **__${client.guilds.cache.size}__**

Channels: **__${client.channels.cache.size}__**

Member: **__${client.guilds.cache.reduce(
        (a, b) => a + b.memberCount,
        0
      )}__**`)
    .setTimestamp()
    message.channel.send({embeds: [svembed]})
  }
};