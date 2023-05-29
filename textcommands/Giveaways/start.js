const { PermissionsBitField, EmbedBuilder, ActionRowBuilder } = require("discord.js")
module.exports = {
  name: "start",
  description: ["Bắt đầu một giveaways", ""],
  aliases: ["ga", "giveaway"],
  usage: ["{prefix}ga <TIME(1d/1h/1m/6s)> <WINS(1,2...)> <CONTENTS>", "{prefix}ga <TIME(1d/1h/1m/6s)> <WINS(1,2...)> <CONTENTS>"],
  cooldown: 0,
  category: "Giveaways",
  canuse: "everyone",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({table: "DB"})
    const lang = await db.get(`${message.guild.id}_languages`) 
	let missingPerm = [
      `Tôi phải được bật đủ 3 quyền:\n\`Xem Lịch Sử Tin Nhắn - Dùng Emoji Bên Ngoài - Gửi Embed\` trong kênh này thì mới có thể tạo g.a`,
      `Missing Permissions:\n\`Read Message History - Use External Emojis - Embed Links\``
    ]
    let notManageMess = [
      `Tôi phải được bật quyền:\n\`Quản Lý Tin Nhắn\` trong kênh này thì mới có thể tạo g.a`,
      `Missing Permissions:\n\`Manage Messages\``
    ]
    let avoidReact = [
      `Tôi phải được bật quyền:\n\`Thêm Biểu Cảm\` trong kênh này thì mới có thể tạo g.a`,
      `Missing Permissions:\n\`Add Reactions\``
    ]
    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ReadMessageHistory) 
		|| !message.guild.members.me.permissions.has(PermissionsBitField.Flags.UseExternalEmojis) 
		|| !message.guild.members.me.permissions.has(PermissionsBitField.Flags.EmbedLinks)) 
		return client
			.reply(client, message, missingPerm, null)
			.catch(e => console.log(e))
    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages))
		return client
			.reply(client, message, notManageMess, null)
			.catch(e => console.log(e))
    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.AddReactions)) 
		return client
			.reply(client, message, avoidReact, null)
			.catch(e => console.log(e))
    const ms = require('ms');
    //List những giveaways vẫn còn hoạt động!
    const atg =  client.giveawaysManager.giveaways.filter((g) => g.guildId === message.guild.id && !g.ended);
    if (!args[0]) {
      let noGaActive = [
        `${client.e.fail} | **Không có Giveaway nào đang hoạt động tại ${message.guild.name}**`,
        `${client.e.fail} | **There's no active Giveaways in ${message.guild.name}**`
      ]
      if (atg == 0) return client.reply(client, message, noGaActive, null).catch(e => console.log(e))
      let mssg = ""
      for (let n in atg) {
        let i = atg[n]
        if (i) mssg += `**[${i.prize}](${i.messageURL})**\n
Tổ chức bởi : ${i.hostedBy}\n`
      }
      let a = [
        new EmbedBuilder()
          .setTitle(`Giveaways đang tổ chức tại ${message.guild.name}`)
          .setThumbnail(message.guild.iconURL())
          .setDescription(mssg)
          .setFooter({ text: 'Nhấp vào tên để đi đến Giveaway.' }),
        new EmbedBuilder()
          .setTitle(`Active giveaways in ${message.guild.name}`)
          .setThumbnail(message.guild.iconURL())
          .setDescription(mssg)
          .setFooter({ text: 'Press on Giveaways\' name to get into it!' })
      ]
      await client
		  .reply(client, message, null, a)
		  .catch(e => console.log(e))
    }   
	else if (args[0] == "disable") {
      if(args[1] == "everyone") await db.set(`${message.guild.id}.createga.everyone`, true),
      await message.reply(lang == "vi"
						 ? `${client.e.done} | Đã vô hiệu lệnh giveaways cho role everyone (role không có quyền quản lý tin nhắn)`
						 : `${client.e.done} | Disabled giveaways create for member who doesn't have Manage Messages permissions`)
}
    else if (args[0] == "enable") {
if(args[1] == "everyone") await db.delete(`${message.guild.id}.createga.everyone`),
      await message.reply(lang == "vi"
						 ? `${client.e.done} | Đã kích hoạt lệnh giveaways cho role everyone (role không có quyền quản lý tin nhắn)`
						 : `${client.e.done} | Enabled giveaways create for member who doesn't have Manage Messages permissions`)

}
	else {
      let winMess = [
        new EmbedBuilder()
          .setDescription(`**__[NHẤP ĐỂ ĐẾN GIVEAWAYS](${`{this.messageURL}`})__**`)
          .setColor(`#ffcc00`),
        new EmbedBuilder()
          .setDescription(`**__[GIVEAWAYS MESSAGE](${`{this.messageURL}`})__**`)
          .setColor(`#ffcc00`)
      ]
	  let everyoneCantGiveaways = await db.get(`${message.guild.id}.createga.everyone`)
      if (everyoneCantGiveaways &&
		  !message.member.permissionsIn(message.channel).has(PermissionsBitField.Flags.ManageMessages)) 
		  return message
			  .reply(lang == "vi"
					 ? 'Bạn phải có quyền `Quản Lý Tin Nhắn` mới được tạo g.a'
                     : 'You need `Manage Messages` permissions to create new giveaways'
)
      const tooManyGA = [
        `${client.e.fail} | Để tối ưu hóa bot, mỗi GUILD chỉ được tạo tối đa \`15 giveaways\` hoạt động cùng lúc!`,
        `${client.e.fail} | Each GUILD can only create \`15 giveaways\` at the same time!!`
      ]
      if (atg.length > 15) return client.reply(client, message, tooManyGA, null).catch(e => console.log(e))
      const duration = args[0]
      const MissingArgs = [
        `${client.e.fail} | Lệnh đúng là Yga <5s/10m/5d> <số người thắng> <tên giveaway>`,
        `${client.e.fail} | Correct usage : Yga <5s/10m/5d> <winners> <prize>`
      ]
      if (args.length < 3) return client
		  .reply(client, message, MissingArgs, null)
		  .catch(e => console.log(e))
      let realtime = ms(duration);
      if (!realtime) return client
		  .reply(client, message, MissingArgs, null)
		  .catch(e => console.log(e))
      const tooLong = [
        `${client.e.fail} | Không thể tạo giveaway lớn hơn 15 ngày`,
        `${client.e.fail} | Cannot create a giveaway for more than 15 days`
      ]
      if (realtime > 1296000000) return client
		  .reply(client, message, tooLong, null)
		  .catch(e => console.log(e))
      if (realtime < 6000) realtime = 6000
      const winnerCount = parseInt(args[1])
      const noWinners = [
        `${client.e.fail} | Số người thắng không hợp lệ.`,
        `${client.e.fail} | Cannot found Winners`
      ]
      if (winnerCount < 1 || !winnerCount) return client.reply(client, message, noWinners, null).catch(e => console.log(e))
      const prize = args.slice(2).join(" ")
      if (lang == "vi") {
        await client.giveawaysManager
          .start(message.channel, {
            duration: ms(duration),
            winnerCount,
            prize,
            hostedBy: message.author,
            allowedMentions: true,
            thumbnail: message.author.avatarURL(),
            messages: {
              giveaway: '<a:Yvayduoi:924665374589481040> **__Giveaways Đã Bắt Đầu__** <a:Yvayduoi1:924665323578359888>',
              giveawayEnded: '<a:ga:901921067944271912> **__Giveaways Đã Kết Thúc__** <a:ga:901921067944271912>',
              title: prize,
              drawing: '<a:Ycheck:934446343861186620> Đếm ngược: {timestamp}',
              inviteToParticipate: '<a:Ybia:936408211492323348> *Nhấn emoji 💝 bên dưới để tham gia !*',
              winMessage: { content: `<a:Ykimcuonglaplanh:922597979146313830> | **Xin chúc mừng, {winners}! đã trúng Giveaways __{this.prize}__ tổ chức bởi ${message.author}**!`, embeds: [winMess[0]] },
              embedFooter: 'Giveaways với {this.winnerCount} giải',
              noWinner: '<:Ypikachukhinh:922598486023745587> **Giveaway đã kết thúc, không có người thắng.**',
              hostedBy: `<a:Ycheck:934446343861186620> Tổ chức bởi: ${message.author}`,
              winners: '<a:Ycheck:934446343861186620> **__Xin Chúc Mừng__**\n**Người thắng:**',
              endedAt: 'Kết thúc vào lúc'
            }
          })
      } else if (lang == "en") {
        await client.giveawaysManager
          .start(message.channel, {
            duration: ms(duration),
            winnerCount,
            prize,
            hostedBy: message.author,
            allowedMentions: true,
            thumbnail: message.author.avatarURL(),
            messages: {
              giveaway: '<a:Yvayduoi:924665374589481040> **__Giveaway Has Been Started__** <a:Yvayduoi1:924665323578359888>',
              giveawayEnded: '<a:ga:901921067944271912> **__Giveaways Ended__** <a:ga:901921067944271912>',
              title: prize,
              drawing: '<a:Ycheck:934446343861186620> Countdown: {timestamp}',
              inviteToParticipate: '<a:Ybia:936408211492323348> *Tap on emoji 💝 to join!*',
              winMessage: { content: `<a:Ykimcuonglaplanh:922597979146313830> | **Congrats, {winners}! have won Giveaways __{this.prize}__. Hosted by ${message.author}**!`, embeds: [winMess[1]] },
              embedFooter: 'Giveaways with {this.winnerCount} winner(s)',
              noWinner: '<:Ypikachukhinh:922598486023745587> **Giveaway ended, none participated...**',
              hostedBy: `<a:Ycheck:934446343861186620> Hosted by: ${message.author}`,
              winners: '<a:Ycheck:934446343861186620> **__Congratulations__**\n**Winner(s):**',
              endedAt: 'Ended at'
            }
          })
      }
    }
  }
}
