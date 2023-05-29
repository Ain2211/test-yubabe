const banSchema = require('../../models/BanSchema')
const userReg = RegExp(/<@!?(\d+)>/)
module.exports = {
	name: "dms",
	description: ["DMS user có kèm tên mod.", "DMS with mod name."],
	aliases: ["reply"],
	usage: ["{prefix}dms <id> <message>", "{prefix}dms <id> <message>"],
	cooldown: 10000,
	category: "Admins",
	canuse: "admins",
	errorcd: ["Vẫn còn {time} cooldown, hãy kiên nhẫn!", "CD: **{time}** !"],
	run: async (client, message, args) => {
    if (!client.admins.includes(message.author.id)) return;
    let reason = args.slice(1).join(' ')
    const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : [0]
    if (!reason) return message.channel.send(`Không thể gửi nội dung trống`)
    const mentionedUser = message.mentions.members.first() || client.users.cache.find(u => u.id == args[0])
    let username = mentionedUser.username || mentionedUser.user.username
    await mentionedUser.send(`Xin chào **${mentionedUser.username}**, tâm thư của bạn đã được MOD **${message.author.username}** trả lời :
\`\`\`${reason}\`\`\``)
  }
	}
//
//
//

	