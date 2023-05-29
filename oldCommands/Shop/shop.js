const invSchema = require('../../models/invSchema')
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
module.exports = {
  name: 'shop',
  cooldown: 10000,
  description: "SHOP ITEM CỦA YULAND, chuyên buôn bán các mặt hàng nhu yếu phẩm <3",
  aliases: ['mua'],
  usage: "[prefix]buy [item]",
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB()
    const lang = await db.get(`${message.guild.id}_languages`)
    if (lang == "vi") {
      let hg1 = `<:Yu_ot:953103262318477342>`
      let hg2 = `<:Yu_lua:953059348777672705>`
      let hg3 = `<:Yu_DauTay:953375220935295047>`
      let hg4 = `<:Yu_ngo:953971194565124186>`
      let hg5 = `<:Yu_cachua:953059348794470420>`
      let hg6 = `<:Yu_Dao:953375136134877294>`
      let hg7 = `<:Yu_khoaimi:953059349637500968>`
      let hg8 = `<:Yu_mia:953103263476117584>`
      let hg9 = `<:Yu_khoaitay:953103263178305566>`
      let hg10 = `<:Yu_DuaGang:953375173225091133>`
      let hg11 = `<:Yu_carot:953103263895535626>`
      let hg12 = `<:Yu_caingot:953059348731543592>`
      let hg13 = `<:Yu_Mit:953237141440327700>`

      let member = message.author
      let cash = await client.cash(member.id)

      let listshop = new EmbedBuilder()
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: `https://discord.gg/yuland` })
        .setTitle(`Tiệm Tạp Hóa Yubabe`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/936872532932440065/59b3e7c9da97700f3e629fe73714f1b2.webp?size=1024`)
        .setDescription(`
**Xin chào ${message.author}, bạn muốn mua gì ?**.

** <:vngc_discord:917212352410177536> Chọn Mục Bạn Muốn Mua Bên Dưới**

**<:Yu_nhanvangkc:951586992897024060> \`:\` Shop Nhẫn**
**<:Yu_field:953050619558645820> \`:\` Shop Hạt Giống 1**
**<:Yu_field:953050619558645820> \`:\` Shop Hạt Giống 2**
**<:Yu_GaCon:953394343148920902> \`:\` Shop Vật Nuôi**
**<:Yu_camheo:953407482955436062> \`:\` Shop Thức Ăn Vật Nuôi**

[Mời Tôi Về Server Của Bạn!](${`https://discord.com/api/oauth2/authorize?client_id=936872532932440065&permissions=431174843457&scope=bot`})
 `)

        .setFooter({ text: `Gõ <YBUY + ID> để mua`, iconURL: `https://cdn.discordapp.com/emojis/953322964764487690.png` })
        .setColor(`#303037`)
      const row = new ActionRowBuilder()
        .addComponents(
          new SelectMenuBuilder()
            .setCustomId(`${message.id}`)
            .setPlaceholder('❯ Tạp Hóa Yubabe!')
            .addOptions([
              {
                label: 'Shop Nhẫn',
                description: 'Xem nhẫn và mua để MARRY',
                value: 'ringshop',
                emoji: '<:Yu_nhanvangkc:951586992897024060>'
              },

              {
                label: 'Shop Hạt Giống 1',
                description: 'Mua hạt giống trồng cây!',
                value: 'seedshop1',
                emoji: "<:Yu_field:953050619558645820>"
              },
              {
                label: 'Shop Hạt Giống 2',
                description: 'Mua hạt giống trồng cây!',
                value: 'seedshop2',
                emoji: "<:Yu_field:953050619558645820>"
              },
              {
                label: 'Shop Vật Nuôi',
                description: 'Mua thú để nuôi lấy nông sản',
                value: 'cattleshop',
                emoji: "<:Yu_GaCon:953394343148920902>"
              },
              {
                label: 'Shop Thức Ăn Vật Nuôi',
                description: 'Mua thức ăn cho thú!',
                value: 'cattlefoodshop',
                emoji: "<:Yu_camheo:953407482955436062>"
              },
            ])
        )
      const shopmsg = await message.channel.send({ embeds: [listshop], components: [row] }).catch(e => console.log(e))
      client.on('interactionCreate', async shopinteraction => {
        if (!shopinteraction.isSelectMenu() && shopinteraction.message.id !== message.id) return;
        let options = shopinteraction.values;
        const shoptype = options[0]
        if (shoptype === 'ringshop') {
          shopinteraction.deferUpdate()
          const ringshop = new EmbedBuilder()
            .setAuthor({ name: `Tiệm Tạp Hóa Yubabe`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
            .setTitle(`SHOP NHẪN`)
            .setDescription(`\`Gõ <YBUY + ID> hoặc nhấn button bên dưới để mua\`
\`001\` <:Yu_nhanco:951133679546159214> : **__50.000__ Ycoin**
\`002\` <:Yu_nhanbac:941435162728730675> : **__500.000__ Ycoin**
\`003\` <:Yu_nhanvang:941435163181727824> : **__1.000.000__ Ycoin**
\`004\` <:Yu_nhankimcuong:941435160883265556> : **__10.000.000__ Ycoin**
\`005\` <:Yu_nhanvangkc:951586992897024060> : **__25.000.000__ Ycoin**
`)
            .setColor("#303037")
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
  const buy = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`<:Yu_nhanco:951133679546159214>`)
        .setCustomId(`${message.id}.nhanco`),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`<:Yu_nhanbac:941435162728730675>`)
        .setCustomId(`${message.id}.nhanbac`),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`<:Yu_nhanvang:941435163181727824>`)
        .setCustomId(`${message.id}.nhanvang`),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`<:Yu_nhankimcuong:941435160883265556>`)
        .setCustomId(`${message.id}.nhankc`),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`<:Yu_nhanvangkc:951586992897024060>`)
        .setCustomId(`${message.id}.nhanvangkc`),
    );
       let a = await shopmsg.edit({ content: `<@${message.author.id}>`, embeds: [ringshop], components: [row, buy] })
    var collector = a.createMessageComponentCollector({
    filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
  })
    collector.on("collect", async (interaction) => {
    if (interaction.user.id !== message.author.id) {
     const notForYou = [
       `:x: | **${interaction.user.username}** , không phải nút dành cho bạn!`,
       `:x: | **${interaction.user.username}** , this interaction isn't for you!`
     ] 
      return await client.reply(client,message,notForYou,null).catch(e=>console.log(e))
    }
    if (interaction.customId == `${message.id}.nhanco`) {
      const member = message.author
      await interaction.deferUpdate()
      const vipSchema = require("../../models/vipSchema")
      const invSchema = require("../../models/invSchema")
      let pro = false
    let vip = false
      let cash = await client.cash(message.author.id)
    const provip = await vipSchema.findOne({ memberid: message.author.id })
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
    }
    if (cash < 50000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, bạn không đủ tiền mua Nhẫn Cỏ!`,
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, you don't have enough money to buy Grass Ring!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanCo = await invSchema.findOne({ memberid: `${member.id}`, name: `<:Yu_nhanco:951133679546159214>` })
      if (NhanCo) {
        let errorHad = [
          `Bạn đã sở hữu nhẫn Cỏ rồi!`,
          `You already had Grass ring!`
        ]
        return await client.send(client, message, errorHad, null).catch(e => console.log(e))
      } 
      else {
        let price = 0
        let luck = 0
        if (!pro && !vip) luck = Math.floor(Math.random() * 10)
        if (pro) luck = Math.floor(Math.random() * 10) - 2
        if (vip) luck = Math.floor(Math.random() * 10) - 4
        if (luck == 1) price = Math.floor(Math.random() * 500)
        if (luck !== 1) price = -(Math.floor(Math.random() * 500))
        const muanhanco = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhanco:951133679546159214>`, quanlity: 1, type: `ring`, price: (25000 + price) })
        await muanhanco.save()
      }
      client.tru(member.id, 25000)
      const success = [
        `<:Yu_nhanco:951133679546159214> | **${member.username}**, bạn đã mua **Nhẫn Cỏ** với giá **25,000 Ycoin**!`,
        `<:Yu_nhanco:951133679546159214> | **${member.username}**, you bought **Grass Ring** with **25,000 Ycoin**!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (interaction.customId == `${message.id}.nhanbac`) {
      const member = message.author
      await interaction.deferUpdate()
      const vipSchema = require("../../models/vipSchema")
      const invSchema = require("../../models/invSchema")
      let pro = false
    let vip = false
      let cash = await client.cash(message.author.id)
    const provip = await vipSchema.findOne({ memberid: message.author.id })
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
    }
    if (cash < 500000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, bạn không đủ tiền mua Nhẫn Bạc!`,
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, you don't have enough money to buy Silver Ring!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanCo = await invSchema.findOne({ memberid: `${member.id}`, name: `<:Yu_nhanbac:941435162728730675>` })
      if (NhanCo) {
        let errorHad = [
          `Bạn đã sở hữu nhẫn Bạc rồi!`,
          `You already had Silver ring!`
        ]
        return await client.send(client, message, errorHad, null).catch(e => console.log(e))
      } 
      else {
        let price = 0
        let luck = 0
        if (!pro && !vip) luck = Math.floor(Math.random() * 10)
        if (pro) luck = Math.floor(Math.random() * 10) - 2
        if (vip) luck = Math.floor(Math.random() * 10) - 4
        if (luck == 1) price = Math.floor(Math.random() * 15000)
        if (luck !== 1) price = -(Math.floor(Math.random() * 15000))
        const muanhanco = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhanbac:941435162728730675>`, quanlity: 1, type: `ring`, price: (500000 + price) })
        await muanhanco.save()
      }
      client.tru(member.id, 500000)
      const success = [
        `<:Yu_nhanbac:941435162728730675> | **${member.username}**, bạn đã mua **Nhẫn Bạc** với giá **500,000 Ycoin**!`,
        `<:Yu_nhanbac:941435162728730675> | **${member.username}**, you bought **Silver Ring** with **500,000 Ycoin**!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (interaction.customId == `${message.id}.nhanvang`) {
      const member = message.author
      await interaction.deferUpdate()
      const vipSchema = require("../../models/vipSchema")
      const invSchema = require("../../models/invSchema")
      let pro = false
    let vip = false
      let cash = await client.cash(message.author.id)
    const provip = await vipSchema.findOne({ memberid: message.author.id })
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
    }
    if (cash < 1000000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, bạn không đủ tiền mua Nhẫn Vàng!`,
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, you don't have enough money to buy Golden Ring!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanCo = await invSchema.findOne({ memberid: `${member.id}`, name: `<:Yu_nhanvang:941435163181727824>` })
      if (NhanCo) {
        let errorHad = [
          `Bạn đã sở hữu nhẫn Vàng rồi!`,
          `You already had Golden ring!`
        ]
        return await client.send(client, message, errorHad, null).catch(e => console.log(e))
      } 
      else {
        let price = 0
        let luck = 0
        if (!pro && !vip) luck = Math.floor(Math.random() * 10)
        if (pro) luck = Math.floor(Math.random() * 10) - 2
        if (vip) luck = Math.floor(Math.random() * 10) - 4
        if (luck == 1) price = Math.floor(Math.random() * 100000)
        if (luck !== 1) price = -(Math.floor(Math.random() * 100000))
        const muanhanco = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhanvang:941435163181727824>`, quanlity: 1, type: `ring`, price: (1000000 + price) })
        await muanhanco.save()
      }
      client.tru(member.id, 1000000)
      const success = [
        `<:Yu_nhanvang:941435163181727824> | **${member.username}**, bạn đã mua **Nhẫn Vàng** với giá **10,000,000 Ycoin**!`,
        `<:Yu_nhanvang:941435163181727824> | **${member.username}**, you bought **Golden Ring** with **10,000,000 Ycoin**!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (interaction.customId == `${message.id}.nhankc`) {
      const member = message.author
      await interaction.deferUpdate()
      const vipSchema = require("../../models/vipSchema")
      const invSchema = require("../../models/invSchema")
      let pro = false
    let vip = false
      let cash = await client.cash(message.author.id)
    const provip = await vipSchema.findOne({ memberid: message.author.id })
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
    }
    if (cash < 10000000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, bạn không đủ tiền mua Nhẫn Kim Cương!`,
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, you don't have enough money to buy Diamond Ring!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanCo = await invSchema.findOne({ memberid: `${member.id}`, name: `<:Yu_nhankimcuong:941435160883265556>` })
      if (NhanCo) {
        let errorHad = [
          `Bạn đã sở hữu nhẫn Kim Cương rồi!`,
          `You already had Diamond ring!`
        ]
        return await client.send(client, message, errorHad, null).catch(e => console.log(e))
      } 
      else {
        let price = 0
        let luck = 0
        if (!pro && !vip) luck = Math.floor(Math.random() * 10)
        if (pro) luck = Math.floor(Math.random() * 10) - 2
        if (vip) luck = Math.floor(Math.random() * 10) - 4
        if (luck == 1) price = Math.floor(Math.random() * 300000)
        if (luck !== 1) price = -(Math.floor(Math.random() * 300000))
        const muanhanco = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhankimcuong:941435160883265556>`, quanlity: 1, type: `ring`, price: (10000000 + price) })
        await muanhanco.save()
      }
      client.tru(member.id, 10000000)
      const success = [
        `<:Yu_nhankimcuong:941435160883265556> | **${member.username}**, bạn đã mua **Nhẫn Kim Cương** với giá **10,000,000 Ycoin**!`,
        `<:Yu_nhankimcuong:941435160883265556> | **${member.username}**, you bought **Diamond Ring** with **10,000,000 Ycoin**!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (interaction.customId == `${message.id}.nhanvangkc`) {
      const member = message.author
      await interaction.deferUpdate()
      const vipSchema = require("../../models/vipSchema")
      const invSchema = require("../../models/invSchema")
      let pro = false
    let vip = false
      let cash = await client.cash(message.author.id)
    const provip = await vipSchema.findOne({ memberid: message.author.id })
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
    }
    if (cash < 25000000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, bạn không đủ tiền mua Nhẫn Đôi Kim Cương!`,
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, you don't have enough money to buy Luxury Diamond Ring!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanCo = await invSchema.findOne({ memberid: `${member.id}`, name: `<:Yu_nhanvangkc:951586992897024060>` })
      if (NhanCo) {
        let errorHad = [
          `Bạn đã sở hữu nhẫn Đôi Kim Cương rồi!`,
          `You already had Luxury Diamond ring!`
        ]
        return await client.send(client, message, errorHad, null).catch(e => console.log(e))
      } 
      else {
        let price = 0
        let luck = 0
        if (!pro && !vip) luck = Math.floor(Math.random() * 10)
        if (pro) luck = Math.floor(Math.random() * 10) - 2
        if (vip) luck = Math.floor(Math.random() * 10) - 4
        if (luck == 1) price = Math.floor(Math.random() * 500000)
        if (luck !== 1) price = -(Math.floor(Math.random() * 500000))
        const muanhanco = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhanvangkc:951586992897024060>`, quanlity: 1, type: `ring`, price: (25000000 + price) })
        await muanhanco.save()
      }
      client.tru(member.id, 25000000)
      const success = [
        `<:Yu_nhanvangkc:951586992897024060> | **${member.username}**, bạn đã mua **Nhẫn Đôi Kim Cương** với giá **25,000,000 Ycoin**!`,
        `<:Yu_nhanvangkc:951586992897024060> | **${member.username}**, you bought **Luxury Diamond Ring** with **25,000,000 Ycoin**!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else return
  })

        }
        if (shoptype === 'seedshop1') {
          shopinteraction.deferUpdate()
          const hatgiongshop1 = new EmbedBuilder()
            .setAuthor({ name: `Tiệm Tạp Hóa Yubabe`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
            .setTitle(`SHOP HẠT GIỐNG 1`)
            .setDescription(`\`Gõ <YBUY + ID> để mua\`
\`1 - ot\` ${hg1} : **__500__ Ycoin**
=> Thu Hoạch : 30p = 4-5
\`2 - lua\` ${hg2} : **__500__ Ycoin**
=> Thu Hoạch : 30p = 4-5
\`3 - dautay\` ${hg3} : **__800__ Ycoin**
=> Thu Hoạch : 1h = 3-5
\`4 - ngo - bap\` ${hg4} : **__800__ Ycoin**
=> Thu Hoạch : 1h = 3-5
\`5 - cachua\` ${hg5} : **__1000__ Ycoin**
=> Thu Hoạch : 1h30p = 2-5
\`6 - dao\` ${hg6} : **__1000__ Ycoin**
=> Thu Hoạch : 1h30p = 2-5
`)
            .setColor("#303037")
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          shopmsg.edit({ content: `<@${message.author.id}>`, embeds: [hatgiongshop1], components: [row] })

        }
        if (shoptype === 'seedshop2') {
          shopinteraction.deferUpdate()
          const hatgiongshop2 = new EmbedBuilder()
            .setAuthor({ name: `Tiệm Tạp Hóa Yubabe`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
            .setTitle(`SHOP HẠT GIỐNG 2`)
            .setDescription(`\`Gõ <YBUY + ID> để mua\`
\`7 - khoaimi\` ${hg7} : **__1.500__ Ycoin**
=> Thu Hoạch : 2h = 2-5
\`8 - mia\` ${hg8} : **__1.500__ Ycoin**
=> Thu Hoạch : 2h = 2-5
\`9 - khoaitay\` ${hg9} : **__3.000__ Ycoin**
=> Thu Hoạch : 4h = 2-4
\`10 - duagang\` ${hg10} : **__3.000__ Ycoin**
=> Thu Hoạch : 4h = 2-4
\`11 - carot\` ${hg11} : **__5.000__ Ycoin**
=> Thu Hoạch : 8h = 2-4
\`12 - caingot\` ${hg12} : **__5.000__ Ycoin**
=> Thu Hoạch : 8h = 2-4
\`13 - mit\` ${hg13} : **__15.000__ Ycoin**
=> Thu Hoạch : 18h = 2-4
`)
            .setColor("#303037")
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          shopmsg.edit({ content: `<@${message.author.id}>`, embeds: [hatgiongshop2], components: [row] })

        }
        if (shoptype === 'cattleshop') {
          shopinteraction.deferUpdate()
          const giasuc = new EmbedBuilder()
            .setAuthor({ name: `Tiệm Tạp Hóa Yubabe`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
            .setTitle(`SHOP VẬT NUÔI`)
            .setDescription(`\`Gõ <YBUY + ID> để mua\`
\`ga\` <:Yu_GaCon:953394343148920902> : **__50.000__ Ycoin**
\`bo\` <:Yu_BoCon:953394492503908362> : **__100.000__ Ycoin**
\`heo\` <:Yu_HeoCon:953396171181817997> : **__150.000__ Ycoin** 
`)
            .setColor("#303037")
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          shopmsg.edit({ content: `<@${message.author.id}>`, embeds: [giasuc], components: [row] })

        }
        if (shoptype === 'cattlefoodshop') {
          shopinteraction.deferUpdate()
          const thucangiasuc = new EmbedBuilder()
            .setAuthor({ name: `Tiệm Tạp Hóa Yubabe`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
            .setTitle(`SHOP THỨC ĂN VẬT NUÔI`)
            .setDescription(`\`Gõ <YBUY + ID> để mua\`
\`thoc\` <:Yu_thoc:953407482884161566> : **__2.000__ Ycoin**
\`co\` <:Yu_co:953408530474475520> : **__2.000__ Ycoin**
\`camheo\` <:Yu_camheo:953407482955436062> : **__2.000__ Ycoin**
`)
            .setColor("#303037")
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          shopmsg.edit({ content: `<@${message.author.id}>`, embeds: [thucangiasuc], components: [row] })

        }
      })
    }
    else if (lang == "en") {
      let hg1 = `<:Yu_ot:953103262318477342>`
      let hg2 = `<:Yu_lua:953059348777672705>`
      let hg3 = `<:Yu_DauTay:953375220935295047>`
      let hg4 = `<:Yu_ngo:953971194565124186>`
      let hg5 = `<:Yu_cachua:953059348794470420>`
      let hg6 = `<:Yu_Dao:953375136134877294>`
      let hg7 = `<:Yu_khoaimi:953059349637500968>`
      let hg8 = `<:Yu_mia:953103263476117584>`
      let hg9 = `<:Yu_khoaitay:953103263178305566>`
      let hg10 = `<:Yu_DuaGang:953375173225091133>`
      let hg11 = `<:Yu_carot:953103263895535626>`
      let hg12 = `<:Yu_caingot:953059348731543592>`
      let hg13 = `<:Yu_Mit:953237141440327700>`

      let member = message.author
      let cash = await client.cash(member.id)

      let listshop = new EmbedBuilder()
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: `https://discord.gg/yuland` })
        .setTitle(`Yubabe's Grocery Store`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/936872532932440065/59b3e7c9da97700f3e629fe73714f1b2.webp?size=1024`)
        .setDescription(`
**Greeting ${message.author}, what'd you like to buy ?**.

** <:vngc_discord:917212352410177536> Choose the shop you'd like to visit**

**<:Yu_nhanvangkc:951586992897024060> \`:\` Ring Shop**
**<:Yu_field:953050619558645820> \`:\` Seed Shop 1**
**<:Yu_field:953050619558645820> \`:\` Seed Shop 2**
**<:Yu_GaCon:953394343148920902> \`:\` Cattle Shop**
**<:Yu_camheo:953407482955436062> \`:\` Cattle's Food Shop**

[Invite me to your Server!](${`https://discord.com/api/oauth2/authorize?client_id=936872532932440065&permissions=431174843457&scope=bot`})
 `)

        .setFooter({ text: `Type <YBUY + ID> to buy something`, iconURL: `https://cdn.discordapp.com/emojis/953322964764487690.png` })
        .setColor(`#303037`)
      const row = new ActionRowBuilder()
        .addComponents(
          new SelectMenuBuilder()
            .setCustomId('shopop')
            .setPlaceholder('❯ Yubabe\'s Grocery Shop')
            .addOptions([
              {
                label: 'Ring Shop',
                description: 'Buy rings for marriage!',
                value: 'ringshop',
                emoji: '<:Yu_nhanvangkc:951586992897024060>'
              },

              {
                label: 'Seed Shop 1',
                description: 'Buy seeds for seeding!',
                value: 'seedshop1',
                emoji: "<:Yu_field:953050619558645820>"
              },
              {
                label: 'Seed Shop 2',
                description: 'Buy seeds for seeding!',
                value: 'seedshop2',
                emoji: "<:Yu_field:953050619558645820>"
              },
              {
                label: 'Cattle Shop',
                description: 'Buy cattle for Farm Products',
                value: 'cattleshop',
                emoji: "<:Yu_GaCon:953394343148920902>"
              },
              {
                label: 'Cattle\'s Food Shop',
                description: 'Buy food for your cattles!',
                value: 'cattlefoodshop',
                emoji: "<:Yu_camheo:953407482955436062>"
              },
            ])
        )
      const shopmsg = await message.channel.send({ embeds: [listshop], components: [row] }).catch(e => console.log(e))
      client.on('interactionCreate', async shopinteraction => {
        if (!shopinteraction.isSelectMenu()) return;
        let options = shopinteraction.values;
        const shoptype = options[0]
        if (shoptype === 'ringshop') {
          shopinteraction.deferUpdate()
          const ringshop = new EmbedBuilder()
            .setAuthor({ name: `Yubabe's Grocery Store`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
            .setTitle(`Ring Shop`)
            .setDescription(`\`Type <YBUY + ID> or tap the buttons to buy something\`
\`001\` <:Yu_nhanco:951133679546159214> : **__25.000__ Ycoin**
\`002\` <:Yu_nhanbac:941435162728730675> : **__500.000__ Ycoin**
\`003\` <:Yu_nhanvang:941435163181727824> : **__1.000.000__ Ycoin**
\`004\` <:Yu_nhankimcuong:941435160883265556> : **__10.000.000__ Ycoin**
\`005\` <:Yu_nhanvangkc:951586992897024060> : **__25.000.000__ Ycoin**
`)
            .setColor("#303037")
            .setFooter({ text: "Appreciated for Chosen YUBABE", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          const buy = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`<:Yu_nhanco:951133679546159214>`)
        .setCustomId(`${message.id}.nhanco`),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`<:Yu_nhanbac:941435162728730675>`)
        .setCustomId(`${message.id}.nhanbac`),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`<:Yu_nhanvang:941435163181727824>`)
        .setCustomId(`${message.id}.nhanvang`),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`<:Yu_nhankimcuong:941435160883265556>`)
        .setCustomId(`${message.id}.nhankc`),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`<:Yu_nhanvangkc:951586992897024060>`)
        .setCustomId(`${message.id}.nhanvangkc`),
    );
       let a = await shopmsg.edit({ content: `<@${message.author.id}>`, embeds: [ringshop], components: [row, buy] })
    var collector = a.createMessageComponentCollector({
    filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
  })
    collector.on("collect", async (interaction) => {
    if (interaction.user.id !== message.author.id) {
     const notForYou = [
       `:x: | **${interaction.user.username}** , không phải nút dành cho bạn!`,
       `:x: | **${interaction.user.username}** , this interaction isn't for you!`
     ] 
      return await client.reply(client,message,notForYou,null).catch(e=>console.log(e))
    }
    if (interaction.customId == `${message.id}.nhanco`) {
      const member = message.author
      await interaction.deferUpdate()
      const vipSchema = require("../../models/vipSchema")
      const invSchema = require("../../models/invSchema")
      let pro = false
    let vip = false
      let cash = await client.cash(message.author.id)
    const provip = await vipSchema.findOne({ memberid: message.author.id })
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
    }
    if (cash < 25000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, bạn không đủ tiền mua Nhẫn Cỏ!`,
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, you don't have enough money to buy Grass Ring!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanCo = await invSchema.findOne({ memberid: `${member.id}`, name: `<:Yu_nhanco:951133679546159214>` })
      if (NhanCo) {
        let errorHad = [
          `Bạn đã sở hữu nhẫn Cỏ rồi!`,
          `You already had Grass ring!`
        ]
        return await client.send(client, message, errorHad, null).catch(e => console.log(e))
      } 
      else {
        let price = 0
        let luck = 0
        if (!pro && !vip) luck = Math.floor(Math.random() * 10)
        if (pro) luck = Math.floor(Math.random() * 10) - 2
        if (vip) luck = Math.floor(Math.random() * 10) - 4
        if (luck == 1) price = Math.floor(Math.random() * 500)
        if (luck !== 1) price = -(Math.floor(Math.random() * 500))
        const muanhanco = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhanco:951133679546159214>`, quanlity: 1, type: `ring`, price: (25000 + price) })
        await muanhanco.save()
      }
      client.tru(member.id, 25000)
      const success = [
        `<:Yu_nhanco:951133679546159214> | **${member.username}**, bạn đã mua **Nhẫn Cỏ** với giá **25,000 Ycoin**!`,
        `<:Yu_nhanco:951133679546159214> | **${member.username}**, you bought **Grass Ring** with **25,000 Ycoin**!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (interaction.customId == `${message.id}.nhanbac`) {
      const member = message.author
      await interaction.deferUpdate()
      const vipSchema = require("../../models/vipSchema")
      const invSchema = require("../../models/invSchema")
      let pro = false
    let vip = false
      let cash = await client.cash(message.author.id)
    const provip = await vipSchema.findOne({ memberid: message.author.id })
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
    }
    if (cash < 500000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, bạn không đủ tiền mua Nhẫn Bạc!`,
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, you don't have enough money to buy Silver Ring!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanCo = await invSchema.findOne({ memberid: `${member.id}`, name: `<:Yu_nhanbac:941435162728730675>` })
      if (NhanCo) {
        let errorHad = [
          `Bạn đã sở hữu nhẫn Bạc rồi!`,
          `You already had Silver ring!`
        ]
        return await client.send(client, message, errorHad, null).catch(e => console.log(e))
      } 
      else {
        let price = 0
        let luck = 0
        if (!pro && !vip) luck = Math.floor(Math.random() * 10)
        if (pro) luck = Math.floor(Math.random() * 10) - 2
        if (vip) luck = Math.floor(Math.random() * 10) - 4
        if (luck == 1) price = Math.floor(Math.random() * 15000)
        if (luck !== 1) price = -(Math.floor(Math.random() * 15000))
        const muanhanco = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhanbac:941435162728730675>`, quanlity: 1, type: `ring`, price: (500000 + price) })
        await muanhanco.save()
      }
      client.tru(member.id, 500000)
      const success = [
        `<:Yu_nhanbac:941435162728730675> | **${member.username}**, bạn đã mua **Nhẫn Bạc** với giá **500,000 Ycoin**!`,
        `<:Yu_nhanbac:941435162728730675> | **${member.username}**, you bought **Silver Ring** with **500,000 Ycoin**!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (interaction.customId == `${message.id}.nhanvang`) {
      const member = message.author
      await interaction.deferUpdate()
      const vipSchema = require("../../models/vipSchema")
      const invSchema = require("../../models/invSchema")
      let pro = false
    let vip = false
      let cash = await client.cash(message.author.id)
    const provip = await vipSchema.findOne({ memberid: message.author.id })
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
    }
    if (cash < 1000000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, bạn không đủ tiền mua Nhẫn Vàng!`,
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, you don't have enough money to buy Golden Ring!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanCo = await invSchema.findOne({ memberid: `${member.id}`, name: `<:Yu_nhanvang:941435163181727824>` })
      if (NhanCo) {
        let errorHad = [
          `Bạn đã sở hữu nhẫn Vàng rồi!`,
          `You already had Golden ring!`
        ]
        return await client.send(client, message, errorHad, null).catch(e => console.log(e))
      } 
      else {
        let price = 0
        let luck = 0
        if (!pro && !vip) luck = Math.floor(Math.random() * 10)
        if (pro) luck = Math.floor(Math.random() * 10) - 2
        if (vip) luck = Math.floor(Math.random() * 10) - 4
        if (luck == 1) price = Math.floor(Math.random() * 100000)
        if (luck !== 1) price = -(Math.floor(Math.random() * 100000))
        const muanhanco = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhanvang:941435163181727824>`, quanlity: 1, type: `ring`, price: (1000000 + price) })
        await muanhanco.save()
      }
      client.tru(member.id, 1000000)
      const success = [
        `<:Yu_nhanvang:941435163181727824> | **${member.username}**, bạn đã mua **Nhẫn Vàng** với giá **1,000,000 Ycoin**!`,
        `<:Yu_nhanvang:941435163181727824> | **${member.username}**, you bought **Golden Ring** with **1,000,000 Ycoin**!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (interaction.customId == `${message.id}.nhankc`) {
      const member = message.author
      await interaction.deferUpdate()
      const vipSchema = require("../../models/vipSchema")
      const invSchema = require("../../models/invSchema")
      let pro = false
    let vip = false
      let cash = await client.cash(message.author.id)
    const provip = await vipSchema.findOne({ memberid: message.author.id })
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
    }
    if (cash < 10000000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, bạn không đủ tiền mua Nhẫn Kim Cương!`,
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, you don't have enough money to buy Diamond Ring!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanCo = await invSchema.findOne({ memberid: `${member.id}`, name: `<:Yu_nhankimcuong:941435160883265556>` })
      if (NhanCo) {
        let errorHad = [
          `Bạn đã sở hữu nhẫn Kim Cương rồi!`,
          `You already had Diamond ring!`
        ]
        return await client.send(client, message, errorHad, null).catch(e => console.log(e))
      } 
      else {
        let price = 0
        let luck = 0
        if (!pro && !vip) luck = Math.floor(Math.random() * 10)
        if (pro) luck = Math.floor(Math.random() * 10) - 2
        if (vip) luck = Math.floor(Math.random() * 10) - 4
        if (luck == 1) price = Math.floor(Math.random() * 300000)
        if (luck !== 1) price = -(Math.floor(Math.random() * 300000))
        const muanhanco = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhankimcuong:941435160883265556>`, quanlity: 1, type: `ring`, price: (10000000 + price) })
        await muanhanco.save()
      }
      client.tru(member.id, 10000000)
      const success = [
        `<:Yu_nhankimcuong:941435160883265556> | **${member.username}**, bạn đã mua **Nhẫn Kim Cương** với giá **10,000,000 Ycoin**!`,
        `<:Yu_nhankimcuong:941435160883265556> | **${member.username}**, you bought **Diamond Ring** with **10,000,000 Ycoin**!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (interaction.customId == `${message.id}.nhanvangkc`) {
      const member = message.author
      await interaction.deferUpdate()
      const vipSchema = require("../../models/vipSchema")
      const invSchema = require("../../models/invSchema")
      let pro = false
    let vip = false
      let cash = await client.cash(message.author.id)
    const provip = await vipSchema.findOne({ memberid: message.author.id })
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
    }
    if (cash < 25000000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, bạn không đủ tiền mua Nhẫn Đôi Kim Cương!`,
          `<:Yu_fail:941589021761634306> | **${message.author.username}**, you don't have enough money to buy Luxury Diamond Ring!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanCo = await invSchema.findOne({ memberid: `${member.id}`, name: `<:Yu_nhanvangkc:951586992897024060>` })
      if (NhanCo) {
        let errorHad = [
          `Bạn đã sở hữu nhẫn Đôi Kim Cương rồi!`,
          `You already had Luxury Diamond ring!`
        ]
        return await client.send(client, message, errorHad, null).catch(e => console.log(e))
      } 
      else {
        let price = 0
        let luck = 0
        if (!pro && !vip) luck = Math.floor(Math.random() * 10)
        if (pro) luck = Math.floor(Math.random() * 10) - 2
        if (vip) luck = Math.floor(Math.random() * 10) - 4
        if (luck == 1) price = Math.floor(Math.random() * 2500000)
        if (luck !== 1) price = -(Math.floor(Math.random() * 2500000))
        const muanhanco = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhanvangkc:951586992897024060>`, quanlity: 1, type: `ring`, price: (25000000 + price) })
        await muanhanco.save()
      }
      client.tru(member.id, 25000000)
      const success = [
        `<:Yu_nhanvangkc:951586992897024060> | **${member.username}**, bạn đã mua **Nhẫn Đôi Kim Cương** với giá **25,000,000 Ycoin**!`,
        `<:Yu_nhanvangkc:951586992897024060> | **${member.username}**, you bought **Luxury Diamond Ring** with **25,000,000 Ycoin**!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else return
  })

        }
        if (shoptype === 'seedshop1') {
          shopinteraction.deferUpdate()
          const hatgiongshop1 = new EmbedBuilder()
            .setAuthor({ name: `Yubabe's Grocery Store`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
            .setTitle(`Seed Shop 1`)
            .setDescription(`\`Type <YBUY + ID> to buy something\`
\`1 - chili\` ${hg1} : **__500__ Ycoin**
=> Harvest : 30p = 4-5
\`2 - wheat\` ${hg2} : **__500__ Ycoin**
=> Harvest : 30p = 4-5
\`3 - strawberry\` ${hg3} : **__800__ Ycoin**
=> Harvest : 1h = 3-5
\`4 - corn\` ${hg4} : **__800__ Ycoin**
=> Harvest : 1h = 3-5
\`5 - tomato\` ${hg5} : **__1000__ Ycoin**
=> Harvest : 1h30p = 2-5
\`6 - peach\` ${hg6} : **__1000__ Ycoin**
=> Harvest : 1h30p = 2-5
`)
            .setColor("#303037")
            .setFooter({ text: "Appreciated for Chosen YUBABE", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          shopmsg.edit({ content: `<@${message.author.id}>`, embeds: [hatgiongshop1], components: [row] })

        }
        if (shoptype === 'seedshop2') {
          shopinteraction.deferUpdate()
          const hatgiongshop2 = new EmbedBuilder()
            .setAuthor({ name: `Yubabe's Grocery Store`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
            .setTitle(`Seed Shop 2`)
            .setDescription(`\`Type <YBUY + ID> to buy something\`
\`7 - cassava\` ${hg7} : **__1.500__ Ycoin**
=> Harvest : 2h = 2-5
\`8 - sugarcane\` ${hg8} : **__1.500__ Ycoin**
=> Harvest : 2h = 2-5
\`9 - potato\` ${hg9} : **__3.000__ Ycoin**
=> Harvest : 4h = 2-4
\`10 - cantaloupe\` ${hg10} : **__3.000__ Ycoin**
=> Harvest : 4h = 2-4
\`11 - carrot\` ${hg11} : **__5.000__ Ycoin**
=> Harvest : 8h = 2-4
\`12 - leafmustard\` ${hg12} : **__5.000__ Ycoin**
=> Harvest : 8h = 2-4
\`13 - jackfruit\` ${hg13} : **__15.000__ Ycoin**
=> Harvest : 18h = 2-4
`)
            .setColor("#303037")
            .setFooter({ text: "Appreciated for Chosen YUBABE", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          shopmsg.edit({ content: `<@${message.author.id}>`, embeds: [hatgiongshop2], components: [row] })

        }
        if (shoptype === 'cattleshop') {
          shopinteraction.deferUpdate()
          const giasuc = new EmbedBuilder()
            .setAuthor({ name: `Yubabe's Grocery Store`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
            .setTitle(`Cattle Shop`)
            .setDescription(`\`Type <YBUY + ID> to buy something\`
\`chicken\` <:Yu_GaCon:953394343148920902> : **__50.000__ Ycoin**
\`cow\` <:Yu_BoCon:953394492503908362> : **__100.000__ Ycoin**
\`pig\` <:Yu_HeoCon:953396171181817997> : **__150.000__ Ycoin** 
`)
            .setColor("#303037")
            .setFooter({ text: "Appreciated for Chosen YUBABE", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          shopmsg.edit({ content: `<@${message.author.id}>`, embeds: [giasuc], components: [row] })

        }
        if (shoptype === 'cattlefoodshop') {
          shopinteraction.deferUpdate()
          const thucangiasuc = new EmbedBuilder()
            .setAuthor({ name: `Yubabe's Grocery Store`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
            .setTitle(`Cattle's Food Shop`)
            .setDescription(`\`Type <YBUY + ID> to buy something\`
\`paddy\` <:Yu_thoc:953407482884161566> : **__2.000__ Ycoin**
\`grass\` <:Yu_co:953408530474475520> : **__2.000__ Ycoin**
\`pran\` <:Yu_camheo:953407482955436062> : **__2.000__ Ycoin**
`)
            .setColor("#303037")
            .setFooter({ text: "Appreciated for Chosen YUBABE", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          shopmsg.edit({ content: `<@${message.author.id}>`, embeds: [thucangiasuc], components: [row] })

        }
      })
    }
  }
}