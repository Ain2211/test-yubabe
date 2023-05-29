const { EmbedBuilder } = require('discord.js')
module.exports = {
  name: "taixiu",
  category: "🎯 Minigames",
  aliases: ["tx"],
  cooldown: 0,
  usage: "<PREFIX>rd <number>",
  description2: "Play a Vietnamese Game, choose Tai Xiu and bet with friends",
  usage2: "Ytx",
  description: "Đổ tài xỉu, cùng bạn bè thư giãn",
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB()
    const lang = await db.get(`${message.guild.id}_languages`)
    let thu = [
      "<:Ytx_1:1031866523708555335>",
"<:Ytx_2:1031866428812439562>",
"<:Ytx_3:1031866398923816982>",
"<:Ytx_4:1031866367089066044>",
"<:Ytx_5:1031866336835534868>",
"<:Ytx_6:1031866305663483944>",
    ]

    let thuString = {
      "<:Ytx_1:1031866523708555335>": "**Một**",
      "<:Ytx_2:1031866428812439562>": "**Hai**",
      "<:Ytx_3:1031866398923816982>": "**Ba**",
      "<:Ytx_4:1031866367089066044>": "**Bốn**",
      "<:Ytx_5:1031866336835534868>": "**Năm**",
      "<:Ytx_6:1031866305663483944>": "**Sáu**"
    }
    let thuString2 = {
      "<:Ytx_1:1031866523708555335>": "**One**",
      "<:Ytx_2:1031866428812439562>": "**Two**",
      "<:Ytx_3:1031866398923816982>": "**Three**",
      "<:Ytx_4:1031866367089066044>": "**Four**",
      "<:Ytx_5:1031866336835534868>": "**Five**",
      "<:Ytx_6:1031866305663483944>": "**Six**"
     }
    let con1 = thu[Math.floor(Math.random() * thu.length)]
    let con2 = thu[Math.floor(Math.random() * thu.length)]
    let con3 = thu[Math.floor(Math.random() * thu.length)]
    let thuS1 = thuString[con1]
    let thuS2 = thuString[con2]
    let thuS3 = thuString[con3]
    if (lang == "en") {
      thuS1 = thuString2[con1]
      thuS2 = thuString2[con2]
      thuS3 = thuString2[con3]
    }
    let msgss = [
      "<a:DiceDice:1031872079500427324> **| Lắc, lắc, lắc, may túi ba gang, giữ tiền cho chắc...**",
      "<a:DiceDice:1031872079500427324> **| Shake, shake, shake, may the rich hold his estates...**"
    ]
    let msg = await client.reply(client, message, msgss, null).catch(e => console.log(e))
    await msg.edit(`<a:DiceDice:1031872079500427324> <a:DiceDice:1031872079500427324> <a:DiceDice:1031872079500427324>`)
    await client.sleep(1000)
    await msg.edit(`${con1} <a:DiceDice:1031872079500427324> <a:DiceDice:1031872079500427324>`)
    await client.sleep(1000)
    await msg.edit(`${con1} ${con2} <a:DiceDice:1031872079500427324>`)
    await client.sleep(1000)
    await msg.edit(`${con1} ${con2} ${con3}`)
    let quan = {
      "<:Ytx_1:1031866523708555335>": 1,
      "<:Ytx_2:1031866428812439562>": 2,
      "<:Ytx_3:1031866398923816982>": 3,
      "<:Ytx_4:1031866367089066044>": 4,
      "<:Ytx_5:1031866336835534868>": 5,
      "<:Ytx_6:1031866305663483944>": 6
    }
    let so1 = quan[con1]
    let so2 = quan[con2]
    let so3 = quan[con3]
    let tong = so1 + so2 + so3
    let ketqua 
    let ketqua2
    if (tong >= 11) ketqua = "**Tài**"
    else if (tong < 11) ketqua = "**Xỉu**"
    if (tong%2 == 0) ketqua2  = "**Chẵn**"
    else ketqua2 = "**Lẻ**"
    let ketquaString = `__${ketqua} ${ketqua2}__`
    let res = [
      `Kết quả là: __${thuS1} • ${thuS2} • ${thuS3}__
<a:8595checkblancoo:912284409976197131> ${ketquaString}`,
      `Result: __${thuS1} • ${thuS2} • ${thuS3}__`
    ]
    await client.send(client, message, res, null).catch(e => console.log(e))
  }
};

