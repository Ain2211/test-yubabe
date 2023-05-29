const banSchema = require('../../models/BanSchema')
const userReg = RegExp(/<@!?(\d+)>/)
module.exports = {
	name: "dms-captcha",
	description: ["Check user có auto spam hay không.", "Check user có spam hay không."],
	aliases: ["auto", "autocheck", "checkauto"],
	usage: ["{prefix}auto <id> <captcha>", "{prefix}auto <id> <captcha>"],
	cooldown: 10000,
	category: "Admins",
	canuse: "owners",
	errorcd: ["Vẫn còn {time} cooldown, hãy kiên nhẫn!", "CD: **{time}** !"],
	run: async (client, message, args) => {
    let captcha = args[1]
    if(!captcha) captcha =  "NOSPAMVERIFY"
    const mentionedUser = message.mentions.members.first() || client.users.cache.find(u => u.id == args[0])
    let username = mentionedUser.username || mentionedUser.user.username
    if (!mentionedUser) return
    await mentionedUser
.send(`Xin chào **${username}**, hãy reply tin nhắn này để xác nhận bạn không treo auto spam!
\`\`\`${captcha}\`\`\`
`)
.catch(e=>console.log(e))
    await message.channel.send(`${client.emo.done}`)
  }
	}