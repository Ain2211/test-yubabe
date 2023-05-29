const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: "crop",
  description: ["Check kho hạt giống của bạn!", "Check your warehouse!"],
  aliases: ['hatgiong', 'hg', 'nongsan', 'ns', 'cr'],
  usage: ["{prefix}hg", "{prefix}crop"],
  cooldown: 30000,
  category: "Farm",
  canuse: "everyone",
  errorcd : ["Hãy kiên nhẫn chờ **{time}**", "Please wait for **{time}**"],
  run: async (client, message, args) => {
    return message.reply(`${client.e.fail} | Tính năng đang được sửa chữa!`)
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
    let hatgiong1 = await client.grow(message.author.id, `${hg1}`)
    let hatgiong2 = await client.grow(message.author.id, `${hg2}`)
    let hatgiong3 = await client.grow(message.author.id, `${hg3}`)
    let hatgiong4 = await client.grow(message.author.id, `${hg4}`)
    let hatgiong5 = await client.grow(message.author.id, `${hg5}`)
    let hatgiong6 = await client.grow(message.author.id, `${hg6}`)
    let hatgiong7 = await client.grow(message.author.id, `${hg7}`)
    let hatgiong8 = await client.grow(message.author.id, `${hg8}`)
    let hatgiong9 = await client.grow(message.author.id, `${hg9}`)
    let hatgiong10 = await client.grow(message.author.id, `${hg10}`)
    let hatgiong11 = await client.grow(message.author.id, `${hg11}`)
    let hatgiong12 = await client.grow(message.author.id, `${hg12}`)
    let hatgiong13 = await client.grow(message.author.id, `${hg13}`)
    let elite1 = await client.grow(message.author.id, "<:PlantElite:1029360913863671839>")
    let elite2 = await client.grow(message.author.id, "<:LifeElite:1029361004167037090>")
    let elite3 = await client.grow(message.author.id, "<:FoodElite:1029360819286331422>")
    let thoc = await client.grow(message.author.id, `thoc`)
    let co = await client.grow(message.author.id, `co`)
    let camheo = await client.grow(message.author.id, `camheo`)

    const lifeSchema = require("../../models/lifeSchema");
    const dishesSchema = require("../../models/dishesSchema")
    let dishes = [
      "<:yu_com:1021045040686055454>",
      "<:yu_bapnuong:1021045038144303114>",
      "<:yu_duong:1021045035132780645>",
      "<:yu_khoaitaychien:1021045033249558628>",
      "<:yu_suachuadau:1021045289542488114>",
      "<:yu_tradao:1021045031416639498>",
      "<:yu_tuongca:1021045029143314463>",
      "<:yu_tuongot:1021045026463158292>",
      "<:yu_salad:1021045743965962260>",
      "<:yu_sinhtoduagang:1021045024613486662>"
    ]
    let foodArray = await dishesSchema
      .find({ authorid: message.author.id, quanlity: { $gt: 0 } })
      .sort({ quanlity: -1 })
    let count = {}
    foodArray.forEach(f => {
      let name = f.name
      let quanlity = f.quanlity
      count[name] = quanlity
    })
    let foodMsg = ``
    for (let i in count) {
      foodMsg += `${i} : \`${count[i]}\``
    }
    const cropembed = new EmbedBuilder()
      .setTitle(`🌾 Kho Nông Sản Của ${message.author.username} 🌾`)
      .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setDescription(`<a:Yngoisaohivong:919968345418268714> **Rau Củ** :

${hg1} : \`${hatgiong1}\` ${hg2} : \`${hatgiong2}\` ${hg3} : \`${hatgiong3}\` ${hg4} : \`${hatgiong4}\` ${hg5} : \`${hatgiong5}\` 
${hg6} : \`${hatgiong6}\` ${hg7} : \`${hatgiong7}\` ${hg8} : \`${hatgiong8}\` ${hg9} : \`${hatgiong9}\` ${hg10} : \`${hatgiong10}\` 
${hg11} : \`${hatgiong11}\` ${hg12} : \`${hatgiong12}\` ${hg13} : \`${hatgiong13}\`

<a:Yngoisaohivong:919968345418268714> **Nguyên Liệu** :

<:Yu_thoc:953407482884161566> : \`${thoc}\` <:Yu_co:953408530474475520> : \`${co}\` <:Yu_camheo:953407482955436062> : \`${camheo}\`

<a:Yngoisaohivong:919968345418268714> **Tủ Lạnh** :

${foodMsg}

<a:Yngoisaohivong:919968345418268714> **Tinh Hoa** : *Nhận từ thu hoạch cây trồng, giết thú, dùng để nấu ăn, bán hoặc sáng tạo món ăn*

Tinh hoa thực vật:
<:PlantElite:1029360913863671839> : \`${elite1}\`
Tinh hoa sự sống:
<:LifeElite:1029361004167037090> : \`${elite2}\`
Tinh hoa thực phẩm:
<:FoodElite:1029360819286331422> : \`${elite3}\``)
      .setColor(`#FFCC00`)
      .setTimestamp()

    const cropembed2 = new EmbedBuilder()
      .setTitle(`🌾 ${message.author.username}'s warehouse 🌾`)
      .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setDescription(`<a:Yngoisaohivong:919968345418268714> **Fruits & Vegetables** :

${hg1} : \`${hatgiong1}\` ${hg2} : \`${hatgiong2}\` ${hg3} : \`${hatgiong3}\` ${hg4} : \`${hatgiong4}\` ${hg5} : \`${hatgiong5}\` 
${hg6} : \`${hatgiong6}\` ${hg7} : \`${hatgiong7}\` ${hg8} : \`${hatgiong8}\` ${hg9} : \`${hatgiong9}\` ${hg10} : \`${hatgiong10}\` 
${hg11} : \`${hatgiong11}\` ${hg12} : \`${hatgiong12}\` ${hg13} : \`${hatgiong13}\`

<a:Yngoisaohivong:919968345418268714> **Ingredients** :

<:Yu_thoc:953407482884161566> : \`${thoc}\` <:Yu_co:953408530474475520> : \`${co}\` <:Yu_camheo:953407482955436062> : \`${camheo}\`

<a:Yngoisaohivong:919968345418268714> **Refrigerator** :
  
${foodMsg}
 
 <a:Yngoisaohivong:919968345418268714> **Elites** : *Harvest, kill to get elites, use for cooking or selling*
 
Plant Elite:
<:PlantElite:1029360913863671839> : \`${elite1}\`
Life Elite:
<:LifeElite:1029361004167037090> : \`${elite2}\`
Food Elite:
<:FoodElite:1029360819286331422> : \`${elite3}\``)

      .setColor(`#FFCC00`)
      .setTimestamp()

    const embeds = [cropembed, cropembed2]
    await client.send(client, message, null, embeds).catch(e => console.log(e))
  }
}