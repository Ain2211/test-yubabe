const banSchema = require('../../models/BanSchema')
const userReg = RegExp(/<@!?(\d+)>/)
module.exports = {
	name: "dm",
	description: ["DMS user có kèm tên mod.", "DMS with mod name."],
	aliases: ["modreply"],
	usage: ["{prefix}dms <id> <message>", "{prefix}dms <id> <message>"],
	cooldown: 0,
	category: "Admins",
	canuse: "admins",
	errorcd: ["Vẫn còn {time} cooldown, hãy kiên nhẫn!", "CD: **{time}** !"],
	run: async (client, message, args) => {
    let reason = args.slice(1).join(' ')
    if (!reason) return message.channel.send(`Không thể gửi nội dung trống`)
    const mentionedUser = message.mentions.members.first() || client.users.cache.find(u => u.id == args[0])
    let username = mentionedUser.username || mentionedUser.user.username
    await mentionedUser
      .send(`\`\`\`${reason}\`\`\``)
      .catch(e => console.log(e))
    await message.react("😉")
	}
	}
//
//
//

	