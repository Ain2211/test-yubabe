module.exports = {
  name: "vote",
  description: ["Vote cho bot để nhận quà", "Vote for bot to claim award"],
  aliases: [""],
  usage:["{prefix}vote", "{prefix}vote"],
  cooldown: 0,
	category: "Utils",
	canuse: "everyone",
  errorcd : ["{time}", "{time}"],
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({table : "DB"})
    const lang = await db.get(`${message.guild.id}_languages`)
    const voteReminder =  await db.get(`${message.author.id}.voteReminder`)
    if (args[0] == "on") {
    await db.set(`${message.author.id}.voteReminder`, true)
    return message.react("1032637139961270323")
    }
    else if (args[0] == "off") {
    await db.delete(`${message.author.id}.voteReminder`)
    return message.react("1032637139961270323")
    }
    if (lang == "vi") {
      const { EmbedBuilder } = require("discord.js")
      const a = new EmbedBuilder()
        .setDescription(`[BẤM VÀO ĐÂY ĐỂ VOTE BOT](https://top.gg/bot/936872532932440065/vote)`)
     if (!voteReminder) await message
       .reply({ content: `Gõ Yvote on để bật nhắc vote!`, embeds: [a] })
       .catch(e => console.log(e))
     else await message
       .reply({ content: `Gõ Yvote off để tắt nhắc vote!`, embeds: [a] })
       .catch(e => console.log(e))
    } 
    else if (lang == "en") {
      const { EmbedBuilder } = require("discord.js")
      const a = new EmbedBuilder()
        .setDescription(`[Click here to vote!!!](https://top.gg/bot/936872532932440065/vote)`)
      if (!voteReminder) await message
        .reply({ content: `Type Yvote on to turn Vote Reminder on!`, embeds: [a] })
        .catch(e => console.log(e))
      else return message
        .reply({ content: `Type Yvote off to turn Vote Reminder off!`, embeds: [a] })
        .catch(e => console.log(e))
      
    }
  }
}