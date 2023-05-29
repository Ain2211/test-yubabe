const userSchema = require('../../models/userSchema')
const marrySchema = require('../../models/marrySchema')
const zoopointSchema = require('../../models/zoopointSchema')
const invSchema = require('../../models/invSchema')
const dailySchema = require('../../models/dailySchema')
const houseSchema = require('../../models/houseSchema')
const moneySchema = require('../../models/moneySchema')
const bankSchema = require('../../models/bankSchema')
const praySchema = require('../../models/praySchema')
const vipSchema = require('../../models/vipSchema')
const badgeSchema = require('../../models/badgeSchema')
const { EmbedBuilder } = require('discord.js')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
module.exports = {
  name: 'profile',
  cooldown: 10000,
  description: "Get Mentioned Users Avatar",
  usage: "[prefix]avatar",
  aliases: ['p5', "user"],
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  nsfwOnly: true,
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB()
    const lang = await db.get(`${message.guild.id}_languages`)
    const userp5 = await userSchema.findOne({ memberid: message.author.id })
    if (!userp5) {
      if (lang == "vi") {
        const add = new userSchema({
          memberid: message.author.id,
          membername: message.author.username,
          vip: `Chưa Đăng Ký`,
          pro: `Chưa Đăng Ký`,
          avatar: ``,
          about: `Nông Dân Chăm Chỉ`,
          description: `Người Bạn Thân Thiện Của Yubabe`,
        })
        await add.save()
        const msg = await message.channel.send(`Đang thiết lập profile của ${message.author.username}....`).catch(e => console.log(e))
        await sleep(1000)
        await msg.edit(`Đang thiết lập profile của ${message.author.username}...`).catch(e => console.log(e))
        await sleep(1000)
        await msg.edit(`Đang thiết lập profile của ${message.author.username}..`).catch(e => console.log(e))
        await sleep(1000)
        await msg.edit(`Đang thiết lập profile của ${message.author.username}...`).catch(e => console.log(e))
        await sleep(1000)
        await msg.edit(`Đang thiết lập profile của ${message.author.username}.`).catch(e => console.log(e))
        await sleep(1000)
        return msg.edit(`Đã hoàn tất, gõ lại lệnh để xem Profile!`).catch(e => console.log(e))
      }
      else if (lang == "en") {
        const add = new userSchema({
          memberid: message.author.id,
          membername: message.author.username,
          vip: `Not Sign Yet`,
          pro: `Not Sign Yet`,
          avatar: ``,
          about: `Hard-working Farmer`,
          description: `Yubabe's best friend!`,
        })
        await add.save()
        let number = Math.floor(Math.random() * (30 - 1)) + 1
        let addnum = Math.floor(Math.random() * 10) + 1
        const msg = await message.channel.send(`Setting ${message.author.username}'s profiles.... 3%`).catch(e => console.log(e))
        await sleep(1000)
        await msg.edit(`Setting ${message.author.username}'s profiles....${number + addnum + addnum}%`).catch(e => console.log(e))
        await sleep(1000)
        await msg.edit(`Setting ${message.author.username}'s profiles....${number + addnum + addnum + addnum}%`).catch(e => console.log(e))
        await sleep(1000)
        await msg.edit(`Setting ${message.author.username}'s profiles....${number + addnum + addnum + addnum + addnum}%`).catch(e => console.log(e))
        await sleep(1000)
        await msg.edit(`Setting ${message.author.username}'s profiles....99%`).catch(e => console.log(e))
        await sleep(1000)
        return msg.edit(`Successfully, type \`Yp5\` again to view Profile!`).catch(e => console.log(e))
      }
    }
    const marry = await marrySchema.findOne({ authorid: message.author.id })
    let tinhtrang = `Single`
    let wifename = ``
    if (marry) wifename = await marrySchema.findOne({ authorid: marry.wifeid })
    if (marry) tinhtrang = `Married <@${marry.wifeid}> with ${marry.nhan} - Love Points : ${marry.together}pts`
    const zpoint = await client.zoopoint(message.author.id)
    const daily = await dailySchema.findOne({ id: message.author.id })
    let stre = 0
    if (daily) stre = daily.streak
    let badges = ``
    const badgearr = await badgeSchema.find({
      memberid: message.author.id
    })
    if (badgearr[0]) {
      for (let bad in badgearr) {
        let bn = badgearr[bad]
        if (bn) {
          let bnem = bn.badge
          badges += `${bnem} `
        } else {
          badges = `No Badges`
        }
      }
    }
    let vip = false
    let pro = false
    const provip = await vipSchema.findOne({ memberid: message.author.id })
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true, pro = true
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
    }
    var msgpro;
    var msgvip
    if (!pro) msgpro = `Not Signed`
    if (!vip) msgvip = `Not Signed`
    if (pro) msgpro = `Available`
    if (vip) msgvip = `Available`, msgpro = `Included in VIP Subcriptions`

    
    const cash = await client.cash(message.author.id)
    const bank = await client.bank(message.author.id)
    const pray = await client.prayed(message.author.id)


    const pro5 = new EmbedBuilder()
      .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: `https://discord.gg/yuland` })
      .setTitle(`${userp5.membername}'s Profile'`)
      .setDescription(`${badges ? badges : "No Badges!"}`)
      .setThumbnail(message.author.avatarURL())
      .setColor(`#303037`)

      .addFields(
        { name: `<:GEMBOX:982028743952441355> Zoo Points : ${parseInt(zpoint).toLocaleString('En-Us')}`, value: `<:bufflucky:983135001300307968> Lucky Points : ${parseInt(pray).toLocaleString('En-Us')}` },
        { name: `Marriage`, value: tinhtrang },
        { name: userp5.about, value: userp5.description },
        { name: `<:VIPPassport:988093810955411456> V.I.P PASSPORT`, value: msgvip },
        { name: `<:ProPassport:988093838348410930> PRO-PASSPORT`, value: msgpro }
      )
      .setFooter({ text: `YuFarm's member!`, iconURL: message.author.avatarURL() })
      .setTimestamp()
    await message.channel.send({ embeds: [pro5] }).catch(e => console.log(e))
  }
}