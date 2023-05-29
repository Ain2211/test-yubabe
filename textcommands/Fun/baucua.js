const { EmbedBuilder, PermissionsBitField } = require('discord.js')
module.exports = {
  name: "baucua",
  description: ["Đổ bầu cua, cùng bạn bè thư giãn", "Play a Vietnamese Game, choose animal and bet with friends"],
  aliases: ["bc"],
  usage: ["{prefix}bc", "{prefix}bc"],
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
      await db.set(`${message.guild.id}_hostbaucua`, roleId)
      let Set = [
        `${client.e.success} | Đã set thành công role host bầu cua! Chỉ có host và admin server được lắc!`,
        `${client.e.success} | Successfully set host role! Just this role and server admins can shake!`,
      ]
      await client.reply(client, message, Set, null)
    }
    else {
      let hostrole = await db.get(`${message.guild.id}_hostbaucua`)
      console.log(hostrole)
      let fails = [
        `${client.e.fail} | Bạn phải là HOST hoặc là admin server thì mới được lắc bầu cua!
> Ybc set <ID ROLE HOST>`,
        `${client.e.fail} | You must be server admin or host to shake!
> Ybc set <ID ROLE HOST>`
      ]
      let guild = client.guilds.cache.find(g => g.id == message.guild.id)
      let host = guild.members.cache.find(m => m.id == message.author.id)
    const memberTarget = message.guild.members.cache.get(message.author.id);
            const role = message.guild.roles.cache.find(role => role.id === hostrole);

           
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !memberTarget.roles.cache.has(role.id)) return client.reply(client, message, fails, null)
      console.log(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !host.roles.cache.has(r => r.id === hostrole))
      let thuArray = [
        "<:Yu_ga:1035685230222266451>",
        "<:Yu_bau:1035685221078683658>",
        "<:Yu_cua:1035685224249565204>",
        "<:Yu_ca:1035685227890233424>",
        "<:Yu_nai:1035685233099558923>",
        "<:Yu_tom:1035685235603542078>"
      ]
      let CauBauCua = await db.get(`CauBauCua`)
      if (!CauBauCua) await db.set(`CauBauCua`, thuArray)
      let time = await db.get(`soLanLac`)
      if (!time) await db.set(`soLanLac`, 1)
      if (time == 5) {
        cau = shuffle(thuArray)
        await db.set(`CauBauCua`, cau)
        await db.set(`soLanLac`, 1)
      }
      let thu = await db.get(`CauBauCua`)
      await db.add(`soLanLac`, 1)
      
      // 
      let thuString = {
        "<:Yu_ga:1035685230222266451>": "**Gà**",
        "<:Yu_nai:1035685233099558923>": "**Nai**",
        "<:Yu_tom:1035685235603542078>": "**Tôm**",
        "<:Yu_bau:1035685221078683658>": "**Bầu**",
        "<:Yu_cua:1035685224249565204>": "**Cua**",
        "<:Yu_ca:1035685227890233424>": "**Cá**"
      }
      let thuString2 = {
        "<:Yu_ga:1035685230222266451>": "**Chicken**",
        "<:Yu_nai:1035685233099558923>": "**Deer**",
        "<:Yu_tom:1035685235603542078>": "**Scrimp**",
        "<:Yu_bau:1035685221078683658>": "**Gourd**",
        "<:Yu_cua:1035685224249565204>": "**Crab**",
        "<:Yu_ca:1035685227890233424>": "**Fish**"
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
        "<a:Yu_baucua:1035686579081060392> **| Lắc, lắc, lắc, may túi ba gang, giữ tiền cho chắc...**",
        "<a:Yu_baucua:1035686579081060392> **| Shake, shake, shake, may the rich hold his estates...**"
      ]
      let msg = await client.reply(client, message, msgss, null).catch(e => console.log(e))
      await msg.edit(`<a:Yu_baucua:1035686579081060392> <a:Yu_baucua:1035686579081060392> <a:Yu_baucua:1035686579081060392>`)
      await client.sleep(5000)
      await msg.edit(`${con1} <a:Yu_baucua:1035686579081060392> <a:Yu_baucua:1035686579081060392>`)
      await client.sleep(3000)
      await msg.edit(`${con1} ${con2} <a:Yu_baucua:1035686579081060392>`)
      await client.sleep(3000)
      await msg.edit(`${con1} ${con2} ${con3}`)
      let res = [
        `Kết quả là: __${thuS1} • ${thuS2} • ${thuS3}__`,
        `Result: __${thuS1} • ${thuS2} • ${thuS3}__`
      ]
      await client.send(client, message, res, null).catch(e => console.log(e))
    }
  }
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
