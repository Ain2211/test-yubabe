const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const marrySchema = require('../../models/marrySchema')
const userReg = RegExp(/<@!?(\d+)>/)
const invSchema = require('../../models/invSchema')
const anhcuoiSchema = require(`../../models/anhcuoi`)
module.exports = {
  name: "marry",
  description: ["Cưới nhau và sở hữu những ngày tháng tuyệt vời!", "Love... the most wonderful thing!"],
  aliases: ["cuoi"],
  usage:["{prefix}marry <tag> <ringID>", "{prefix}marry <tag> <ringID>"],
  cooldown: 0,
	category: "Marry",
	canuse: "everyone",
  errorcd : ["{time}", "{time}"],
  run: async (client, message, args) => {
      const { QuickDB } = require("quick.db")
      const db = new QuickDB({table: "DB"})
      const lang = await db.get(`${message.guild.id}_languages`)
      const data = await marrySchema.findOne({ authorid: message.author.id })
      const husband = message.author
      let wifeid
      if (data) wifeid = data.wifeid
      let wife = userReg.test(args[0]) ? userReg.exec(args[0])[1] : [0]
      const lovedata = await marrySchema.findOne({ authorid: wife })
      const hinhcuoi = await anhcuoiSchema.findOne({ authorid: message.author.id })
      if (!args[0]) {
        if (!data) {
          const noPartner = [
            `*Người ta nắm tay nhau hạnh phúc... ***${husband.username}*** nằm ở nhà hát nhạc Justatee!*`,
            `**${husband.username}** You don't even have a partner to show... just find one and propose them!`
          ]
          return await client.send(client, message, noPartner, null)
        }
        else {
          let hinhcuoia = `https://media.discordapp.net/attachments/995649273746182185/1024608797907501066/702a29e3a5ddf6a5165de8bc0a1f174a.gif`
          if (hinhcuoi) hinhcuoia = hinhcuoi.anhcuoi
          let dacodoi = data.wifeid
          let bennhau = data.together || 0
          if(!data.date) {
            data.date = Date.now()
            await data.save()
          }
          
          let ngaycuoi = data.date ? `${new Date(data.date + 25200000)}` : `${new date(Date.now() + 25200000)}`
          let nhan = data.nhan
          let imageRing = {
            "<:Yu_nhanvang:941435163181727824>" : `https://cdn.discordapp.com/emojis/941435163181727824.webp?size=128&quality=lossless`,
            "<:Yu_nhanbac:941435162728730675>":`https://cdn.discordapp.com/emojis/941435162728730675.webp?size=128&quality=lossless`,
            "<:Yu_nhanco:951133679546159214>":`https://cdn.discordapp.com/emojis/951133679546159214.webp?size=128&quality=lossless`,
            "<:Yu_nhankimcuong:941435160883265556>":`https://cdn.discordapp.com/emojis/941435160883265556.webp?size=128&quality=lossless`,
          "<:Yu_nhanvangkc:951586992897024060>":`https://cdn.discordapp.com/emojis/951586992897024060.png`
          }
          nhan = imageRing[nhan]
          let loihuacuack = data.loihua
          let vkid = data.wifeid
          const vkdata = await marrySchema.findOne({ authorid: vkid })
          //const wifename = wifefin
          let wifes = await client.users.cache.find(u => u.id === vkid)
          let wifename = wifes.username ||  `No Name`
          let loihuacuavk = vkdata.loihua
          const love = new EmbedBuilder()
            .setTitle(`💖 𝓢𝓸 𝓢𝔀𝓮𝓮𝓽 💖`)
            .setThumbnail(`${nhan}`)
            .setDescription(`**__${husband.username}__** <a:Yu_timnhaynhot:950735238177366076> **__${wifename}__**
<a:yl_bluetick:1109063373246701568>  𝑳𝒐𝒗𝒆 𝑷𝒐𝒊𝒏𝒕𝒔 : **${bennhau}** 𝑷𝒕𝒔
<a:diam_vip:921424404808871936> Married Day: ${ngaycuoi}`)
            .addFields({
              name: `𝑷𝒓𝒐𝒎𝒊𝒔𝒆𝒔 𝒇𝒐𝒓 𝒍𝒐𝒗𝒊𝒏𝒈:`, value:
                `<a:FW_bluetick:911688322638807050> **${loihuacuack}**
<a:yl_verify:914624462647857232> **${loihuacuavk}**`
            })
            .setFooter({ text: `💖 𝑯𝒂𝒑𝒑𝒊𝒍𝒚 𝒆𝒗𝒆𝒓 𝒂𝒇𝒕𝒆𝒓~ 💖`, iconURL: message.author.displayAvatarURL() })
            .setColor(`#FFCCCC`)
            .setImage(hinhcuoia)
            .setTimestamp()

          await message.channel.send({ content: `𝓐𝓷𝓭 𝓪𝓯𝓽𝓮𝓻 𝓽𝓱𝓪𝓽... 𝓣𝓱𝓮𝔂 𝓵𝓲𝓿𝓮 𝓱𝓪𝓹𝓹𝓲𝓵𝔂 𝓮𝓿𝓮𝓻 𝓪𝓯𝓽𝓮𝓻~`, embeds: [love] }).catch(e => console.log(e))
        }
      }
      else if (args[0].includes(message.author.id)) {
        return message.channel.send(`**Why'd you marry yourself ?**`)
      }
      else {
        const author = message.author.id
        const data = await marrySchema.findOne({ authorid: message.author.id })
        const wife = userReg.test(args[0]) ? userReg.exec(args[0])[1] : [0]
        const lovedata = await marrySchema.findOne({ authorid: wife })
        
        let nameOfRings = {
          "001":"<:Yu_nhanco:951133679546159214>",
          "002":"<:Yu_nhanbac:941435162728730675>",
          "003":"<:Yu_nhanvang:941435163181727824>",
          "004":"<:Yu_nhankimcuong:941435160883265556>",
          "005":"<:Yu_nhanvangkc:951586992897024060>",
        }
        let ringName = nameOfRings[args[1]]
        const lackRingName = [
          `*:x: | Bạn muốn chọn nhẫn nào để cầu hôn?*`,
          `*:x: | Which ring you'd like to use for proposal?*`
        ]
        if (!ringName) return  await client.reply(client, message, lackRingName, null)
 const proposalRing = await invSchema.findOne({ memberid: `${message.author.id}`, name: ringName })
        const shortRing = [
          `*:x: | Bạn chưa sở hữu ${ringName}! Gõ lệnh này để mua : \`Ybuy <Ring ID>\`*`,
          `*:x: | You don't have ${ringName}! Buy one by type : \`Ybuy <Ring ID>\`*`
        ]
        if (!proposalRing) return await  client.send(client, message, shortRing, null)
        //code below describe how would they upgrade their married rings - YwY Yukii
        if (data || lovedata) {
          const betrayal = [
            `*:x: | Bạn đã có đối tượng rồi! Đừng phản bội họ chứ!!*`,
            `*:x: | You already has partner! Don't be a betrayal!!*`
          ]
          if (wife !== data.wifeid) return await  client.reply(client,message,betrayal, null)
           const thirdWheel = [
             `Đối phương đã có nửa kia rồi! Đừng làm kỳ đà cản mũi chứ!`,
             `Your chosen one already had their love! Don't be the Third Wheel!`
           ]
          if (lovedata.wifeid !== message.author.id) return await  message.reply(client, message, thirdWheel, null)
          else if (wife == data.wifeid) {
              data.nhan = ringName
              await data.save()
              lovedata.nhan = ringName
              await lovedata.save()
            let successfullyUpgrade = [
              `**Xin chúc mừng! Hai bạn đã up nhẫn thành công : ${ringName}**`,
              `**Congratulation! You guys update your rings to : ${ringName}**`
            ]
              return await client.reply(client, message, successfullyUpgrade, null)
          }
          }
        else {
          const marryRow = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId('yes')
                .setLabel('Yes, I Do!!!!')
                .setStyle(ButtonStyle.Success)
                .setEmoji('1108916226580819968')
            )
            .addComponents(
              new ButtonBuilder()
                .setCustomId('no')
                .setLabel('No... pls, don\'t')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('1108838388305494136')
            )
          
          let proposeMessage 
          if (lang == "en") proposeMessage = await message.channel.send({ content: `***__<@!${wife}>, <@!${husband.id}> proposed to marry you... you have 30s to answer their proposal!!__***`, components: [marryRow] }).catch(e => console.log(e));
          else if (lang == "vi") proposeMessage = await message.channel.send({ content: `***__<@!${wife}>, <@!${husband.id}> đã cầu hôn bạn... bạn có 30s để trả lời người ấy!!__***`, components: [marryRow] }).catch(e => console.log(e));

          const filter = i => i.customId === 'yes' && i.user.id === wife || i.customId === 'no' && i.user.id === wife
          const collector = await message.channel.createMessageComponentCollector({ filter, time: 30000 })
          collector.on('collect', async i => {
            if (i.customId === 'yes') {
              await invSchema.deleteOne({ memberid: `${message.author.id}`, name: ringName })
              let loihuacuack = `Love on your side~`
              if (lang == "vi") loihuacuack = `Bên nhau đến lúc Đầu Bạc Răng Long`
              let loihuacuavk = `Till forever and ever`
              if (lang == "vi") loihuacuavk = `Yêu người tận khi Bách Niên Giai Lão`

              let addWife = new marrySchema({ authorid: husband.id, wifeid: wife, husbandid: wife, nhan: ringName, together: 1, loihua: loihuacuack, date: Date.now() })
              await addWife.save();
              let addHusband = new marrySchema({ authorid: wife, wifeid: husband.id, husbandid: husband.id, loihua: loihuacuavk, nhan: ringName, together: 1, date: Date.now() })
              await addHusband.save();
              await i.update({ content: `<a:yl_bluetick:1109063373246701568> <a:yl_bluetick:1109063373246701568> <a:yl_bluetick:1109063373246701568>  **__You're now husband and wife!__** <a:yl_bluetick:1109063373246701568> <a:yl_bluetick:1109063373246701568> <a:yl_bluetick:1109063373246701568> `});
            }
            else if (i.customId === 'no') {
              return i.update(`Oops,  **${message.author.username}** , sorry.....!!`)
            }
          });
          collector.on('end', async i => {
console.log(`${message.author.id} cầu hôn ${wife}`)
            message.channel.send("PROPOSAL WAS ENDED!!!")
          })
        }
      }
    }
  }