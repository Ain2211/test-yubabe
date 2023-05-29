const { EmbedBuilder, PermissionsBitField } = require('discord.js')
module.exports = {
  name: "taixiu",
  description: ["Đổ tài xỉu, cùng bạn bè thư giãn", "Play a Vietnamese Game, choose big number, small number, even or odd numbers and bet with friends"],
  aliases: ["tx"],
  usage: ["{prefix}tx", "{prefix}tx"],
  cooldown: 0,
  category: "Fun",
  canuse: "everyone",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({table: "DB"})
    const lang = await db.get(`${message.guild.id}_languages`)
    if (args[0] == "set") {
      let fails = [
        `${client.e.fail} | Bạn phải là admin server thì mới được set role host!`,
        `${client.e.fail} | You must be server admin to set host role!`
      ]
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return client.reply(client, message, fails, null)
      let roleId = args[1]
      await db.set(`${message.guild.id}_hosttaixiu`, roleId)
      let Set = [
        `${client.e.success} | Đã set thành công role host tài xỉu! Chỉ có host và admin server được lắc!`,
        `${client.e.success} | Successfully set host role! Just this role and server admins can shake!`,
      ]
      await client.reply(client, message, Set, null)
    }
    else {
      let hostrole = await db.get(`${message.guild.id}_hosttaixiu`)
      let fails = [
        `${client.e.fail} | Bạn phải là HOST hoặc là admin server thì mới được lắc bầu cua!
> Ybc set <ID ROLE HOST>`,
        `${client.e.fail} | You must be server admin or host to shake!
> Ybc set <ID ROLE HOST>`
      ]
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.roles.cache.has(r => r.id === hostrole)) return client.reply(client, message, fails, null)
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
      if (tong % 2 == 0) ketqua2 = "**Chẵn**"
      else ketqua2 = "**Lẻ**"
      let ketquaString = `__${ketqua} ${ketqua2}__`
      let res = [
        `Kết quả là: __${thuS1} • ${thuS2} • ${thuS3}__
<a:8595checkblancoo:912284409976197131> ${ketquaString}`,
        `Result: __${thuS1} • ${thuS2} • ${thuS3}__`
      ]
      await client.send(client, message, res, null).catch(e => console.log(e))
    }
  }
}