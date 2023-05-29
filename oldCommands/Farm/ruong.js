
const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const plantSchema = require('../../models/plantSchema')
module.exports = {
  name: 'field',
  description: "Xem trang trại của bạn!",
  usage: "Yr",
  cooldown: 15000,
  aliases: ['ruong', 'r', 'f'],
  description2: "Check your farm",
  usage2: "Yfield",
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  run: async (client, message, args) => {

    let author = message.author.id
    let username = message.author.username
    let hgarray = {
      "1": client.hg.ot,
      "2": client.hg.lua,
      "3": client.hg.dautay,
      "4": client.hg.ngo,
      "5": client.hg.cachua,
      "6": client.hg.dao,
      "7": client.hg.khoaimi,
      "8": client.hg.mia,
      "9": client.hg.khoaitay,
      "10": client.hg.duagang,
      "11": client.hg.carot,
      "12": client.hg.caingot,
      "13": client.hg.mit,
    }
    let hgarray1 = {
      "1" : "ot",
      "2" : "lua",
      "3" : "dautay",
      "4" : "ngo",
      "5" : "cachua",
      "6" : "dao",
      "7" : "khoaimi",
      "8" : "mia",
      "9" : "khoaitay",
      "10" : "duagang",
      "11" : "carot",
      "12" : "caingot",
      "13" : "mit",
    }
    let hgarray2 = {
      "1": 1800000,
      "2": 1800000,
      "3": 3600000,
      "4": 3600000,
      "5": 5400000,
      "6": 5400000,
      "7": 7200000,
      "8": 7200000,
      "9": 14400000,
      "10": 14400000,
      "11": 21600000,
      "12": 21600000,
      "13": 64800000,
}
let hg = {}
/*
  for (const [key, value] of Object.entries(hgarray)) {
let name = {}
  for (const [key, value] of Object.entries(hgarray1)) {
    name[key] = value
  }
hg[key] = await checktime(value)
console.log(time)
}
    */
    let hg1 = await checktime(message, client, client.hg.lua, 'lua', message.author.id, 1800000)
    let hg2 = await checktime(message, client, client.hg.khoaimi, 'khoaimi', message.author.id, 7200000)
    let hg3 = await checktime(message, client, client.hg.cachua, 'cachua', message.author.id, 5400000)
    let hg4 = await checktime(message, client, client.hg.caingot, 'caingot', message.author.id, 21600000)
    let hg5 = await checktime(message, client, client.hg.ot, 'ot', message.author.id, 1800000)
    let hg6 = await checktime(message, client, client.hg.carot, 'carot', message.author.id, 21600000)
    let hg7 = await checktime(message, client, client.hg.khoaitay, 'khoaitay', message.author.id, 14400000)
    let hg8 = await checktime(message, client, client.hg.mia, 'mia', message.author.id, 7200000)
    let hg9 = await checktime(message, client, client.hg.dautay, 'dautay', message.author.id, 3600000)
    let hg10 = await checktime(message, client, client.hg.dao, 'dao', message.author.id, 5400000)
    let hg11 = await checktime(message, client, client.hg.duagang, 'duagang', message.author.id, 14400000)
    let hg12 = await checktime(message, client, client.hg.mit, 'mit', message.author.id, 64800000)
    let hg13 = await checktime(message, client, client.hg.ngo, 'ngo', message.author.id, 3600000)

    let ga = `<:YuGaCon:953394343148920902>`
    let bo = `<:YuBoCon:953394492503908362>`
    let heo = `<:YuHeoCon:953396171181817997>`
    let tnga = await checktimethu(message, client, ga, 'ga', message.author.id, 3600000)
    let tnbo = await checktimethu(message, client, bo, 'bo', message.author.id, 7200000)
    let tnheo = await checktimethu(message, client, heo, 'heo', message.author.id, 10800000)
    ///////////////////////////////////////////

    const fieldembed1 = new EmbedBuilder()
      .setAuthor({ name: message.guild.name })
      .setTitle(`**Ruộng Của ${username}**`)
      .setDescription(`

\`1\` 𝑶̛́𝒕 ${hg5}
\`2\` 𝑳𝒖́𝒂 ${hg1}
\`3\` 𝑫𝒂̂𝒖 𝑻𝒂̂𝒚 ${hg9}
\`4\` 𝑵𝒈𝒐̂ ${hg13}
\`5\` 𝑪𝒂̀ 𝑪𝒉𝒖𝒂 ${hg3}
\`6\` ***Đ***𝒂̀𝒐 ${hg10}`)
      .setFooter({ text: "Lệnh Thu Hoạch : Yth + tên trái cây(vietlien0dau)" })
    const fieldembed4 = new EmbedBuilder()
      .setAuthor({ name: message.guild.name })
      .setTitle(`**${username}'s Field**`)
      .setDescription(`

\`1\` 𝑪𝒉𝒊𝒍𝒊 ${hg5}
\`2\` 𝑾𝒉𝒆𝒂𝒕 ${hg1}
\`3\` 𝑺𝒕𝒓𝒂𝒘𝒃𝒆𝒓𝒓𝒚 ${hg9}
\`4\` 𝑪𝒐𝒓𝒏 ${hg13}
\`5\` 𝑻𝒐𝒎𝒂𝒕𝒐 ${hg3}
\`6\` 𝑷𝒆𝒂𝒄𝒉 ${hg10}`)
      .setFooter({ text: "To harvest : Select the buttons below" })

    const fieldembed5 = new EmbedBuilder()
      .setAuthor({ name: message.guild.name })
      .setTitle(`**${username}'s Field**`)
      .setDescription(`\`7\` 𝑪𝒂𝒔𝒔𝒂𝒗𝒂 ${hg2}
\`8\` 𝑺𝒖𝒈𝒂𝒓 𝑪𝒂𝒏𝒆 ${hg8}
\`9\` 𝑷𝒐𝒕𝒂𝒕𝒐 ${hg7}
\`10\` 𝑪𝒂𝒏𝒕𝒂𝒍𝒐𝒖𝒑𝒆 ${hg11}
\`11\` 𝑪𝒂𝒓𝒓𝒐𝒕 ${hg6}
\`12\` 𝑳𝒆𝒂𝒇 𝑴𝒖𝒔𝒕𝒂𝒓𝒅 ${hg4}
\`13\` 𝑱𝒂𝒄𝒌 𝑭𝒓𝒖𝒊𝒕 ${hg12}`)
      .setFooter({ text: "To harvest : Select the buttons below" })
    const fieldembed2 = new EmbedBuilder()
      .setAuthor({ name: message.guild.name })
      .setTitle(`**Ruộng Của ${username}**`)
      .setDescription(`\`7\` 𝑲𝒉𝒐𝒂𝒊 𝑴𝒊̀ ${hg2}
\`8\` 𝑴𝒊́𝒂 ${hg8}
\`9\` 𝑲𝒉𝒐𝒂𝒊 𝑻𝒂̂𝒚 ${hg7}
\`10\` 𝑫𝒖̛𝒂 𝑮𝒂𝒏𝒈 ${hg11}
\`11\` 𝑪𝒂̀ 𝑹𝒐̂́𝒕 ${hg6}
\`12\` 𝑪𝒂̉𝒊 𝑵𝒈𝒐̣𝒕 ${hg4}
\`13\` 𝑴𝒊́𝒕 ${hg12}`)
      .setFooter({ text: "Lệnh Thu Hoạch : Yth + tên trái cây(vietlien0dau)" })
    const fieldembed3 = new EmbedBuilder()
      .setAuthor({ name: message.guild.name })
      .setTitle(`**Trang trại của ${username}**`)
      .setDescription(`\`ga\` 𝑮𝒂̀ ${tnga}
\`bo\` 𝑩𝒐̀ ${tnbo}
\`heo\` 𝑯𝒆𝒐 ${tnheo}`)
      .setFooter({ text: "Lệnh Nuôi Thú : Ynuoi + Id thú(ga | bo | heo)" })
    const fieldembed6 = new EmbedBuilder()
      .setAuthor({ name: message.guild.name })
      .setTitle(`**${username}'s Farm**`)
      .setDescription(`\`chic\` 𝑪𝒉𝒊𝒄𝒌𝒆𝒏 ${tnga}
\`cow\` 𝑪𝒐𝒘 ${tnbo}
\`pig\` 𝑷𝒊𝒈 ${tnheo}`)
      .setFooter({ text: "To Feed The Animals : Yfeed + Id (chic | cow | pig)" })
    const { QuickDB } = require("quick.db")
    const db = new QuickDB()
    const lang = await db.get(`${message.guild.id}_languages`)
    let embeds
    if (lang == "vi") embeds = [fieldembed1, fieldembed2, fieldembed3]
    else if (lang == "en") embeds = [fieldembed4, fieldembed5, fieldembed6]
    let abc = await message.reply({ embeds: [fieldembed1] }).catch(e => console.log(e))
    let msgw = await chuyen_trang(client, abc, author, embeds)
    await thu_hoach(client, client.hg.ot, client.hg.lua, client.hg.dautay, client.hg.ngo, client.hg.cachua, client.hg.dao, client.hg.khoaimi, client.hg.mia, client.hg.khoaitay, client.hg.duagang, client.hg.carot, client.hg.caingot, client.hg.mit, message, message.author.id)
  }
}
//client.chuyentrangfull = async function chuyen_trang(client, message, author, embeds, home, menu)
async function chuyen_trang(client, message, authorid, embeds) {
  let currentPage = 0;
  const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

  let buttonrow1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji('<:ARROW1:874262374595588117>')
        .setCustomId('skip-page1'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('<:ARROW2:874262374733987860>')
        .setCustomId('back-page'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji('<:HOME:894217044013248532>')
        .setCustomId('home-page'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('<:ARROW3:874262374541049896>')
        .setCustomId('next-page'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji('<:ARROW4:874262374608150578>')
        .setCustomId('skip-page2')
    );

  if (embeds.length === 1) return message.edit({ embeds: [embeds[0]] })
  const queueEmbed = await message.edit(
    {
      content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
      components: [buttonrow1],
      embeds: [embeds[currentPage]]
    }
  ).catch(e => console.log(e))
  var collector = queueEmbed.createMessageComponentCollector({
    filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
  })
  collector.on("collect", (interaction) => {
    if (interaction.user.id !== authorid) return interaction.reply({ content: "Không phải nút dành cho bạn!", ephemeral: true })
    if (interaction.customId == "next-page") {
      if (currentPage < embeds.length - 1) {
        currentPage++;
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      }
      else {
        currentPage = 0
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      }
    }
    else if (interaction.customId == "back-page") {
      if (currentPage !== 0) {
        --currentPage;
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      } else {
        currentPage = embeds.length - 1
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      }
    }
    else if (interaction.customId == "skip-page1") {
      currentPage = 0;
      // queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      // queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
    }
    else if (interaction.customId == "skip-page2") {
      currentPage = embeds.length - 1;
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
    }
    else if (interaction.customId == "home-page") {
      interaction.message.edit({ embeds: [embeds[0]], components: [buttonrow1] })
    }
  })
}
async function checktime(message, client, hatgiong, name, author, timeout) {
  const { QuickDB } = require("quick.db")
  const db = new QuickDB()
  const lang = await db.get(`${message.guild.id}_languages`)
  let msg
  if (lang == "vi") msg = `${hatgiong} : ${client.emo.fail} Chưa Nuôi-Trồng`
  else if (lang == "en") msg = `${hatgiong} : ${client.emo.fail} not raise yet!`
  const plantSchema = require('../../models/plantSchema')
  let plant = await plantSchema.findOne({ key: `${name}_${author}` })
  if (plant && lang == "vi") msg = `${hatgiong} : ${client.emo.done} **Đã Chín**`
  if (plant && lang == "en") msg = `${hatgiong} : ${client.emo.done} **Ripe**`
  let key = await client.cd(author, `trong${name}`)
  let cd = await client.checkcd(key, timeout)
  let cooldown = cd.after
  if (!cooldown) msg = `${hatgiong} : \`${cd.h + `:` + cd.m + `:` + cd.s}s\``
  return msg
}
async function checktimethu(message, client, hatgiong, name, author, timeout) {
  const { QuickDB } = require("quick.db")
  const db = new QuickDB()
  const lang = await db.get(`${message.guild.id}_languages`)

  let msg
  if (lang == "vi") msg = `${hatgiong} : ${client.emo.fail} Chưa Nuôi-Trồng `
  else if (lang == "en") msg = `${hatgiong} : ${client.emo.fail} not raise yet! `
  //check khi đã nuôi
  let lastfeedheo = await client.cd(author, `cd${name}`)
  let timeheo = client.checkcd(lastfeedheo, timeout)
  let cooldownheo = timeheo.after
  let soheo = await client.grow(author, hatgiong)
  if (soheo > 0 && cooldownheo && lang == "vi") msg = `${hatgiong}: ${client.emo.done} **Đã Đói**`
  if (soheo > 0 && cooldownheo && lang == "en") msg = `${hatgiong}: ${client.emo.done} **Hungry Now**`
  if (soheo > 0 && !cooldownheo) msg = `${hatgiong} : \`${timeheo.h + `:` + timeheo.m + `:` + timeheo.s + `s`}\``
  return msg
}
async function thu_hoach(client, hg1, hg2, hg3, hg4, hg5, hg6, hg7, hg8, hg9, hg10, hg11, hg12, hg13, message, authorid) {
  const { QuickDB } = require("quick.db")
  const db = new QuickDB()
  const lang = await db.get(`${message.guild.id}_languages`)
  const { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder } = require("discord.js");
  const plantSchema = require('../../models/plantSchema')
  let buttonrow1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg1)
        .setCustomId('ot'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg2)
        .setCustomId('lua'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg3)
        .setCustomId('dautay'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg4)
        .setCustomId('ngo'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg5)
        .setCustomId('cachua')
    );
  let buttonrow2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg6)
        .setCustomId('dao'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg7)
        .setCustomId('khoaimi'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg8)
        .setCustomId('mia'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg9)
        .setCustomId('khoaitay'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg10)
        .setCustomId('duagang')
    );
  let buttonrow3 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg11)
        .setCustomId('carot'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg12)
        .setCustomId('caingot'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg13)
        .setCustomId('mit')
    );
  let startembed = new EmbedBuilder()
    .setAuthor({ name: message.author.username })
    .setTitle(`Bạn Muốn Thu Hoạch?`)
    .setDescription(`Nhấp Nút Bên Dưới Để Thu Hoạch`)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL())
  let startembed2 = new EmbedBuilder()
    .setAuthor({ name: message.author.username })
    .setTitle(`Wanna harvest ??`)
    .setDescription(`Type the button below`)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL())


  let reply
  if (lang == "vi") reply = await message.reply({ embeds: [startembed], components: [buttonrow1, buttonrow2, buttonrow3] }).catch(e => console.log(e))
  else if (lang == "en") reply = await message.reply({ embeds: [startembed2], components: [buttonrow1, buttonrow2, buttonrow3] }).catch(e => console.log(e))

  var collector = reply.createMessageComponentCollector({
    filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
  })
  collector.on("collect", async (interaction) => {
    let hgs = {
      "ot": hg1,
      "lua": hg2,
      "dautay": hg3,
      "ngo": hg4,
      "cachua": hg5,
      "dao": hg6,
      "khoaimi": hg7,
      "mia": hg8,
      "khoaitay": hg9,
      "duagang": hg10,
      "carot": hg11,
      "caingot": hg12,
      "mit": hg13,
    }


    if (interaction.user.id !== authorid) {
      if (lang == "vi") return interaction.reply({ content: `:x: | **${interaction.user.username}** , không phải nút dành cho bạn!`, ephemeral: true }).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      else if (lang == "en") return interaction.reply({ content: `:x: | **${interaction.user.username}** , this interaction isn't for you!`, ephemeral: true }).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
    }
    let a = interaction.customId
    let n1 = a
    let hgss = hgs[a]
    if (n1) {
      await interaction.deferUpdate()
      let timeout = checktimeout(n1)
      let plant = await client.cd(message.author.id, `trong${n1}`)
      let used = await client.checkcd(plant, timeout)
      let cooldown = used.after
      if (!cooldown) {
        let delay
        if (lang == "vi") {
          await message.channel.send(`${hgss} | **${message.author.username}**, ${hgss} bạn trồng chưa chín để thu hoạch! Xin hãy quay lại sau \`${used.h + `:` + used.m + `:` + used.s}s\` để thu hoạch nhé!`).then(async msg => {
            await client.sleep(5000)
            await msg.delete()
          }
          ).catch(e => console.log(e))
        } else if (lang == "en") {
          await message.channel.send(`${hgss} | **${message.author.username}**, ${hgss} you've raised does not ripe yet! Please comeback after \`${used.h + `:` + used.m + `:` + used.s}s\` to harvest!`).then(async msg => {
            await client.sleep(5000)
            await msg.delete()
          }
          ).catch(e => console.log(e))
        }

      }
      else {
        let planted = await plantSchema.findOne({ key: `${n1}_${authorid}` })
        const errorNotPlanted = [
          `${client.emo.fail} | **${message.author.username}**, bạn đã trồng ${hgss} đâu?`,
          `${client.emo.fail} | **${message.author.username}**, you've not raised ${hgss} yet?`
        ]
        if (!planted) return client.send(client, message, errorNotPlanted, null).then(async msg => {
          await client.sleep(5000)
          await msg.delete()
        }
        ).catch(e => console.log(e))
        await plantSchema.deleteOne({ key: `${n1}_${authorid}` })
        let soluong = checkelite(a)
        await client.addgrow(`${message.author.id}`, `<:PlantElite:1029360913863671839>`, soluong, 'elite')
        let Message = [
          `${hgss} | **${message.author.username}**, bạn đã thu hoạch được ***${soluong}*** <:PlantElite:1029360913863671839>, bạn có thể bán hoặc giữ để nấu ăn!`,
          `${hgss} | **${message.author.username}**, you've harvest ***${soluong}*** <:PlantElite:1029360913863671839>, sell it to get incomes, or you can save for cooking!`,
        ]
        await client.reply(client, message, Message, null).then(async msg => {
          await client.sleep(5000)
          await msg.delete()
        }
        ).catch(e => console.log(e))
      }
    }

  })
}
function checktimeout(name) {
  let timeout = 0
  if (name == `ot`) timeout = 1800000
  else if (name == `lua`) timeout = 1800000
  else if (name == `dautay`) timeout = 3600000
  else if (name == `ngo`) timeout = 3600000
  else if (name == `cachua`) timeout = 5400000
  else if (name == `dao`) timeout = 5400000
  else if (name == `khoaimi`) timeout = 7200000
  else if (name == `mia`) timeout = 7200000
  else if (name == `khoaitay`) timeout = 14400000
  else if (name == `duagang`) timeout = 14400000
  else if (name == `carot`) timeout = 21600000
  else if (name == `caingot`) timeout = 21600000
  else if (name == `mit`) timeout = 64800000
  return timeout
}
function checkelite(name) {
  let timeout = 0
  if (name == `ot`) timeout = 1
  else if (name == `lua`) timeout = 1
  else if (name == `dautay`) timeout = 2
  else if (name == `ngo`) timeout = 2
  else if (name == `cachua`) timeout = 3
  else if (name == `dao`) timeout = 3
  else if (name == `khoaimi`) timeout = 5
  else if (name == `mia`) timeout = 5
  else if (name == `khoaitay`) timeout = 10
  else if (name == `duagang`) timeout = 10
  else if (name == `carot`) timeout = 15
  else if (name == `caingot`) timeout = 15
  else if (name == `mit`) timeout = 30
  return timeout
}
function checksl(name) {
  let timeout = 0
  if (name == `ot`) timeout = Math.floor(Math.random() * 10) + 1
  else if (name == `lua`) timeout = timeout = Math.floor(Math.random() * 10) + 1
  else if (name == `dautay`) timeout = Math.floor(Math.random() * 8) + 1
  else if (name == `ngo`) timeout = Math.floor(Math.random() * 8) + 1
  else if (name == `cachua`) timeout = Math.floor(Math.random() * 6) + 1
  else if (name == `dao`) timeout = Math.floor(Math.random() * 6) + 1
  else if (name == `khoaimi`) timeout = Math.floor(Math.random() * 6) + 1
  else if (name == `mia`) timeout = Math.floor(Math.random() * 6) + 1
  else if (name == `khoaitay`) timeout = Math.floor(Math.random() * 4) + 1
  else if (name == `duagang`) timeout = Math.floor(Math.random() * 4) + 1
  else if (name == `carot`) timeout = Math.floor(Math.random() * 4) + 1
  else if (name == `caingot`) timeout = Math.floor(Math.random() * 4) + 1
  else if (name == `mit`) timeout = Math.floor(Math.random() * 3) + 1

  if (timeout < 2) timeout = 2
  return timeout
}



