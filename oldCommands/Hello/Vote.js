module.exports = {
  name: "vote",
  description: "PONG",
  aliases: ["topgg"],
  cooldown: 10000,
  description2: "Get the bot pings",
  usage2: "Yping",
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB()
    const lang = await db.get(`${message.guild.id}_languages`)
    if (args[0] == "on") {
     await db.set(`${message.author.id}.voteReminder`, true)
    await message.react("1032637139961270323")
    }
    if (lang == "vi") {
      const { EmbedBuilder } = require("discord.js")
      const a = new EmbedBuilder()
        .setDescription(`[BẤM VÀO ĐÂY ĐỂ VOTE BOT](https://top.gg/bot/936872532932440065/vote)`)
      await message.reply({ content: `Vote mỗi 12h để nhận 3 hộp ngọc`, embeds: [a] }).catch(e => console.log(e))
    } else if (lang == "en") {
      const { EmbedBuilder } = require("discord.js")
      const a = new EmbedBuilder()
        .setDescription(`[Click here to vote!!!](https://top.gg/bot/936872532932440065/vote)`)
      await message.reply({ content: `Vote each 12h to get 3 gembox`, embeds: [a] }).catch(e => console.log(e))
    }
  }
}