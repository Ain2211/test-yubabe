const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const taxiSchema = require(`../../models/taxiSchema`)
module.exports = {
  name: "taxi",
  description: ["Đi đến các kênh trong server mà không cần lướt danh sách", "Go to different channels without surfing the channels list!"],
  aliases: ["go"],
  usage: ["{prefix} <> <> <>", "{prefix}add <> <> <>"],
  cooldown: 2000,
  category: "Utils",
  canuse: "everyone",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
    let emojis = [
      '<a:Yvayduoi1:924665323578359888>',
      '<a:Ymeonhay:902835820094971924>',
      '<a:Ykimcuonglaplanh:922597979146313830>',
      '<a:yhug:903753945397231726>',
      '<a:Ydosat:919967409190862858>',
      '<a:Ybutterfly:911682101005398058>',
      '<a:Yaibietjdou:915376724152287342>',
    ];
    let emoji = emojis[Math.floor(Math.random() * emojis.length)];
    let emoji2 = emojis[Math.floor(Math.random() * emojis.length)];
    let job = args[0]
    if (!job) {
      let missingJob = [
        `1. Nếu bạn có quyền quản lý trong server :
- Gõ Ytaxi new [ID CHANNEL] [TAG] để tạo lối tắt đến kênh
Ví dụ: Ytaxi new 123456789 main
2. Sau đó sử dụng bằng cách
- Gõ Ygo main => Tôi sẽ đưa link kênh cho bạn mà không cần phải lướt danh sách kênh.
3. Ngoài ra bạn có thể check các tag đã tạo bằng Ygo list`,
        `1. If you had ADMINISTRATOR Permission :
- Type Ytaxi new [ID CHANNEL] [TAG] to creat shortcut to channels
Ex: Ytaxi new 02123456789 main
2. Usage:
- Type Ygo main => I'll give you a channel shortcut to bring you to the channel.
3. You can check all tag by typing : Ygo list`
      ]
      await client.send(client, message, missingJob, null).catch(e => console.log(e))
    }
    else if (job == 'new') {
      let errorMissingPerm = [
        `Bạn phải có quyền quản lý mới được tạo lệnh taxi mới!`,
        `Shortcut creating required ADMINISTRATOR permissions!`
      ]
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await client.send(client, message, errorMissingPerm, null)
      let idchannel = args[1]
      let errorMissingChannel = [
        `Thiếu ID hoặc ID channel không đúng! 
Cú Pháp : \`Ytaxi new [channelid] [tag]\`
VD : Ytaxi new 123456789 mainchat`,
        `Missing ID or ID channel incorrect! 
Command Usage : \`Ytaxi new [channelid] [tag]\`
Ex: : Ytaxi new 123456789 mainchat`
      ]
      if (!idchannel) return await client.send(client, message, errorMissingChannel, null).catch(e => console.log(e))
      let tag = args[2]
      let errorTag = [
        `Thiếu tag channel ! 
Cú Pháp : \`Ytaxi new [channelid] [tag]\`
VD : Ytaxi new 123456789 mainchat`,
        `Missing channel tag name ! 
Command Usage : \`Ytaxi new [channelid] [tag]\`
Ex : Ytaxi new 123456789 mainchat`
      ]
      if (!tag) return await client.send(client, message, errorTag, null).catch(e => console.log(e))
      const guild = await taxiSchema.findOne({ guildid: `${message.guild.id}_${tag}` })
      const list = await taxiSchema.findOne({ guildid: message.guild.id })
      if (!list) {
        const newlist = new taxiSchema({ guildid: message.guild.id, channelid: `LIST`, tag: args[2] })
        await newlist.save()
      } else {
        list.tag += `\`${args[2]}\` `
        await list.save()
      }
      let errorExist = [
        `Bạn đã tạo lối tắt có tag : **${tag}** rồi! Hãy sử dụng tên khác!`,
        `Tag : **${tag}** already being used! Try another tag name!`
      ]
      if (guild) return await client.send(client, message, errorExist, null).catch(e => console.log(e))

      const newtag = new taxiSchema({ guildid: `${message.guild.id}_${tag}`, channelid: args[1], tag: args[2] })
      await newtag.save()
      let success = [
        `Bạn đã tạo lối tắt **${tag}** cho kênh <#${idchannel}>! Dùng lệnh : Ygo **${tag}** sẽ dẫn đến kênh này!
\`Dùng lệnh Ygo list để xem các tag trong server!\``,
        `Successfully created **${tag}** for <#${idchannel}>! Use : Ygo **${tag}** to lead you to this Channel!
\`Type Ygo list to view server's tag name list!\``
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (job == 'delete' || job == 'xoa') {
      let errorMissingPerm = [
        `Bạn phải có quyền quản lý mới được tạo lệnh taxi mới!`,
        `Shortcut creating required ADMINISTRATOR permissions!`
      ]
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await client.send(client, message, errorMissingPerm, null)
      let tag = args[1]
      let errorTag = [
        `Thiếu tag channel ! 
Cú Pháp : \`Ytaxi xoa [tag]\`
VD : Ytaxi xoa mainchat`,
        `Missing channel tag name ! 
Command Usage : \`Ytaxi delete  [tag]\`
Ex : Ytaxi delete 123456789 mainchat`
      ]
      if (!tag) return await client.send(client, message, errorTag, null).catch(e => console.log(e))
      const guild = await taxiSchema.findOne({ guildid: `${message.guild.id}_${tag}` })
      const errorTag2 = [
        `Không có **${tag}** rồi! Hãy check lại list taxi bằng lệnh Ytaxi list!`,
        `**${tag}** not exist! Check all tags list by using : Ytaxi list!`
      ]
      if (!guild) return await client.send(client, message, errorTag2, null).catch(e => console.log(e))
      const list = await taxiSchema.findOne({ guildid: message.guild.id })
      if (list) {
        const string = list.tag
        list.tag = string.replace(`\`${args[1]}\` `, ``)
        await list.save()
      }
      await taxiSchema.deleteOne({ guildid: `${message.guild.id}_${tag}` })
      const success = [
        `Bạn đã xóa lối tắt **${tag}** Dùng lệnh : Ygo list để xem danh sách tag còn lại trong server!`,
        `Successfully delete shorcut: **${tag}** Use Ygo list to view server tags list!!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (job == `list`) {
      const list = await taxiSchema.findOne({ guildid: message.guild.id })
      let listed = []
      if (list) listed = list.tag
      const listedMSG = [
        `Danh sách các tag dùng được trong server : 
${listed}`,
        `TAGs List in this server : 
${listed}`
      ]
      await client.send(client, message, listedMSG, null).catch(e => console.log(e))
    }
    else {
      const tag = args[0]
      const place = await taxiSchema.findOne({ guildid: `${message.guild.id}_${tag}` })
      const errorTag2 = [
        `Không tìm thấy lối tắt **${tag}**, hãy tạo bằng lệnh : Ytaxi new [channel ID] [tag]`,
        `**${tag}** not exist! Create it by using : Ytaxi new [channel ID] [tag]!`
      ]
      if (!place) return await client.send(client, message, errorTag2, null)
      const id = place.channelid
      const success = [
        `🚕 | Mời bạn đến <#${id}> ${emoji}`,
        `🚕 | Welcome to <#${id}> ${emoji}`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
  }
}