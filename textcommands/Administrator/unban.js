module.exports = {
  name: "unbanbot",
  description: ["Check bot pings ", "Check bot pings"],
  aliases: ["anxa"],
  usage:["{prefix}anxa", "{prefix}unbanbot"],
  cooldown: 0,
	category: "Admins",
	canuse: "admins",
  errorcd : ["No CD!", "No CD!"],
  run: async (client, message, args) => {
const banSchema = require('../../models/BanSchema')
const { PermissionsBitField } = require(`discord.js`)
//const userReg = RegExp(/<@!?(\d+)>/)
//const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : [0]
const { QuickDB } = require("quick.db")
const db = new QuickDB({table: "DB"})
    let reason = args.slice(1).join(' ')
    let mentionedUser = message.mentions.members.first()
    if (!mentionedUser) mentionedUser = client.users.cache.find(u => u.id == args[0])
		if (!mentionedUser) return message.reply(`${client.e.fail} | Bạn phải mentions hoặc nhập ID của member cần unban!`)
    let username = mentionedUser.username || mentionedUser.user.username
    const banned = await banSchema.deleteOne({ memberid: mentionedUser.id })
    await db.delete(`${mentionedUser.id}_oncaptcha2`)
    //let soft = await db.get(`${mentionedUser.id}.warn1`)
   // await db.delete(`${mentionedUser.id}.warn1`)
    await message.channel.send(`${client.e.success} | Đã gỡ ban **${username}**`)
    const yukii = client.users.cache.find(u => u.id == `896739787392819240`)
    let language = await db.get(`${message.guild.id}_languages`)
    await db.delete(`${mentionedUser.id}_softban1`);
    
    const region = message.guild.preferredLocale
    if (!language) {
      if (region == "vi") await db.set(`${message.guild.id}_languages`, "vi")
      else await db.set(`${message.guild.id}_languages`, "en")
      await yukii.send(`${message.guild.name} đã được set Region **${message.guild.preferredLocale}**`)
    }
    else if (language == "vi") {
      if (!reason) reason = `Vì được xét không vi phạm quy định của bot!`
      let messagess = `Xin chào **${username}**, bạn đã được gỡ ban từ MOD **${message.author.username}** vì lý do :
\`\`\`${reason}\`\`\``
      await mentionedUser.send(messagess).catch(e => console.log(e))
    }
    else if (language == "en") {
      if (!reason) reason = `For considering not breaking the bot's law !`
      let messagess = `**${username}**, You have been unbanned from **${message.author.username}** for reason :
\`\`\`${reason}\`\`\``
      await mentionedUser.send(messagess).catch(e => console.log(e))
    }
  }
}

