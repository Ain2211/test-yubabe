module.exports = {
  name: "ping",
  description: "PONG",
  aliases: ["ping", "pong", "uptime"],
  description2: "Get the bot pings",
  usage2: "Yping",
  usage: "Yping",
  cooldown: 10000,
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB()
    const lang = await db.get(`${message.guild.id}_languages`)
    var shard
    const promises = [
      client.shard.fetchClientValues('guilds.cache.size'),
      client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
    ];

    Promise.all(promises)
      .then(results => {
        const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
        const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
        shard = `Server count: ${totalGuilds}\nMember count: ${totalMembers}`;
      })
      .catch(console.error);
    if (lang == "vi") {
      const dt = new Date(message.createdTimestamp);
      const { EmbedBuilder } = require("discord.js")
      const mss = await message.channel.send({
        content:
          `🏓 Pong \`${new Date() - dt}ms\`| ws : \`${client.ws.ping}ms\``, embeds: [
            new EmbedBuilder()
              .setDescription(`[Bấm Vào Đây Để Vote Cho Tôi Nhé!](https://top.gg/bot/936872532932440065/vote)`)
              .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe" })
          ]
      }).catch(e => console.log(e))
      setTimeout(() => mss.delete(), 10000);
    } else if (lang == "en") {
      const dt = new Date(message.createdTimestamp);
      const { EmbedBuilder } = require("discord.js")
      const mss = await message.channel.send({
        content:
          `🏓 Pong \`${new Date() - dt}ms\`| ws : \`${client.ws.ping}ms\``, embeds: [
            new EmbedBuilder()
              .setDescription(`[Click here to vote <3!](https://top.gg/bot/936872532932440065/vote)`)
              .setFooter({ text: "Thank for chosing YUBABE" })
          ]
      }).catch(e => console.log(e))
      setTimeout(() => mss.delete(), 10000);
    }

  }
}