const invSchema = require('../../models/invSchema')
const thu = require('../../config/animal.json');
const { QuickDB } = require('quick.db')
const db = new QuickDB()
const animalSchema = require('../../models/animalSchema')
const farmSchema = require('../../models/farmSchema')
const C = ["🐛", "🪱", "🐞", "🐌", "🦋"]
const U = ["🐭", "🐰", "🐱", "🐶", "🦊"]
const R = ["🐓", "🐖", "🐏", "🐄", "🐃"]
const SR = ["🦎", "🐢", "🦂", "🐍", "🐊"]
const E = ["🐒", "🦛", "🐆", "🐅", "🐘"]
const P = [
  "<a:Ybutterfly:911682101005398058>",
  "<a:Yizumilacmong:929738419930808430>",
  "<:Ynth:930032493065801758>",
  "<:Ykhatrapboi:918082945686851615>",
  "<:be_non:918932737543503912>",
  "<a:Yu_meobaymau:944351775597674558>",
  "<:Yquyxu:941244934797799434>",
  "<a:GG_hongchuyen:911309645681946685>"
]
const G = [
  "<:G_naisungtam:974392899536056401>",
  "<:G_kilan:974392813095616542>",
  "<:G_gautruc:974392721106149466>",
  "<:G_cho:974392664445308958>",
  "<:G_chim:974392505317597194>",
  "<:G_caoden:974392590029959188>",
  "<:G_bachtuoc:974392970931470347>"
]
const D = [
  "<:D_Chimera:985411852542562344>",
  "<:D_Hydra:985411855927349298>",
  "<:D_Medusa:985411858557202513>",
  "<:D_Minotaur:985411860922761276>",
  "<:D_Pegasus:985411864324358184>"
]
const V = [
  "<a:V_Cinderella:988149859745943592>",
  "<a:V_Sonic:988149031291215914>",
  "<a:V_Vanellope:988148591669440615>",
  "<a:V_Belle:988150258066423858>",
  "<a:V_BossBaby:988147327292276756>"
]

module.exports = {
  name: "sell",
  cooldown: 2000,
  description: "● Bán Thú : Ysell <thu | t | a | animal> [C,U,R,SR,E,P,G] [số lượng | all (nếu bán bằng ICON)] | Ysell thu all\n● Bán Nhẫn : Ysell <nhan | ring | r> <ID Nhẫn>\n● Bán Nông Sản : Ysell <nongsan | ns | hg | hatgiong> <Tên hoặc ID> <số lượng | all> | Ysell ns all",
  aliases: ["s"],
  usage: `Ysell <type> <name> [quanlity]`,
  description2: "selling stuff",
  usage2: "Ysell <type> <name> [quanlity]",
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  run: async (client, message, args) => {

    //if (message.author.id !== `896739787392819240`) return message.channel.send(`Lệnh Đang Sửa Chữa`)
    const { QuickDB } = require("quick.db")
    const db = new QuickDB()
    const lang = await db.get(`${message.guild.id}_languages`)
      const nsprice = [
      "<:FoodElite:1029360819286331422>",
     "<:LifeElite:1029361004167037090>",
    "<:PlantElite:1029360913863671839>"
      ]
      const type = args[0]
      const object = args[1]
      let soluong = parseInt(args[2])
      const errorType = [
        `:x: | **${message.author.username}**, bạn phải nhập thứ muốn bán! 
Giết thú : \`Ykill <type>\`
Bán nhẫn : \`Ysell <nhan> <type/id>\`
Bán tinh hoa : \`Ysell tinhhoa(th,el,elite,e) <type(p,l,f)> <quanlity/all>\``,
        `:x: | **${message.author.username}**, you have to define which to sell! 
Kill animals : \`Ykill <rank>\`
Sell rings : \`Ysell <ring> <type/id>\`
Sell Elite : \`Ysell elite(el,e) <type(p,l,f)> <quanlity/all>\``
      ]
      if (!type || !object) return await client.reply(client, message, errorType, null)
    /*
      if (type == `thu` || type == `animal`|| type == `animals` || type == `a` || type == `t`) {
        if (object !== `all`) {
          const selltype = await animalSchema.find(
            { id: message.author.id, type: object.toLowerCase() }
          ).sort({ quanlity: -1 })
          const sellname = await animalSchema.findOne({
            id: message.author.id, name: object.toLowerCase()
          }).sort({ quanlity: -1 })
          if (selltype[0]) {
            let sltb = 0
            let moneys = 0
            for (let a in selltype) {
              let thuban = selltype[a]
              let price = checkprice(C, U, R, SR, E, P, G, D, V, thuban.name)
              console.log(price)
              let sl = thuban.quanlity
              sltb += sl
              if (sl >= 1) moneys += price * sl
              if (sl < 1) moneys += 0
              thuban.quanlity = 0
              await thuban.save()
            }
            await client.cong(message.author.id, moneys)
            let soldSuccess = [
              `<:vvv:921536318062862396> | **${message.author.username}**, bạn đã bán ${sltb} loại ${object} và thu được **${parseInt(moneys).toLocaleString('En-Us')} Ycoin**`,
              `<:vvv:921536318062862396> | **${message.author.username}**, you sold ${sltb} type ${object} and received **${parseInt(moneys).toLocaleString('En-Us')} Ycoin**`
            ]
            await client.send(client, message, soldSuccess, null)
          }
          if (sellname) {
            if (args[2] == `all`) soluong = sellname.quanlity
            if (soluong > sellname.quanlity) soluong = sellname.quanlity
            if (!args[2]) soluong = 1
            sellname.quanlity -= soluong
            await sellname.save()
            let price = checkprice(C, U, R, SR, E, P, G, D, V, sellname.name)
            await client.cong(message.author.id, price * soluong)
            await message.channel.send(`<:vvv:921536318062862396> | **${message.author.username}**, bạn đã bán **${soluong}** ${sellname.name} và thu được **${parseInt(price * soluong).toLocaleString('En-Us')} Ycoin**`)
          }
        }
        else if (object == `all`) {
          let typeC = 0
          let typeU = 0
          let typeR = 0
          let typeSR = 0
          let typeE = 0
          let typeP = 0
          let typeG = 0
          let typeD = 0
          let typeV = 0
          let money = 0
          const array = await animalSchema.find(
            { id: message.author.id, quanlity: { $gt: 0 } }
          ).sort({ quanlity: -1 })
          let noAnimals = [
            `:x: | **${message.author.username}**, bạn làm gì có thú mà bán ?`,
            `:x: | **${message.author.username}**, you don't have any animals!`
          ]
          if (!array[0]) return await cliend.send(client, message, noAnimals, null)
          for (let a in array) {
            var o = array[a];
            i = o.quanlity
            if (o.type == `C`) {
              typeC += i
              money += i * 5
            }
            else if (o.type == `U`) {
              typeU += i
              money += i * 15
            }
            else if (o.type == `R`) {
              typeR += i
              money += i * 100
            }
            else if (o.type == `SR`) {
              typeSR += i
              money += i * 500
            }
            else if (o.type == `E`) {
              typeE += i
              money += i * 1000
            }
            else if (o.type == `P`) {
              typeP += i
              money += i * 100000
            }
            else if (o.type == `G`) {
              typeG += i
              money += i * 30000
            }
            else if (o.type == `D`) {
              typeD += i
              money += i * 70000
            }
            else if (o.type == `V`) {
              typeV += i
              money += i * 130000
            }
            o.quanlity = 0
            await o.save()
          }
          await client.cong(message.author.id, money)
          const soldSuccessful = [
            `<:vvv:921536318062862396> | **${message.author.username}**, bạn đã bán ${typeC} C, ${typeU} U, ${typeR} R, ${typeSR} SR, ${typeE} E, ${typeP} P, ${typeG} G, ${typeD} D,${typeV} V và thu được **${parseInt(money).toLocaleString('En-Us')} Ycoin**`,
            `<:vvv:921536318062862396> | **${message.author.username}**, you sold ${typeC} C, ${typeU} U, ${typeR} R, ${typeSR} SR, ${typeE} E, ${typeP} P, ${typeG} G, ${typeD} D,${typeV} V and received **${parseInt(money).toLocaleString('En-Us')} Ycoin**`
          ]
          await client.send(client, message, soldSuccessful, null)
        }
      }
      else */
    if (type == `nhan` || type == `ring` || type == `r` || type == `n`) {
        let nhanname = {
          '001': '<:Yu_nhanco:951133679546159214>',
          '002': '<:Yu_nhanbac:941435162728730675>',
          '003': '<:Yu_nhanvang:941435163181727824>',
          '004': '<:Yu_nhankimcuong:941435160883265556>',
          '005': '<:Yu_nhanvangkc:951586992897024060>'
        }
        const tennhan = nhanname[args[1]]
        const nhan = await invSchema.findOne({ memberid: message.author.id, name: tennhan })
        const errorNhan = [
          `:x: | **${message.author.username}**, bạn nhập sai ID nhẫn!`,
          `:x: | **${message.author.username}**, your ring ID does not exist, please check again!`
        ]
        if (!nhan) return await client.send(client, message, errorNhan, null)
        let user = message.author
        let a = await client.cd(message.author.id, `sellnhan1`)
        let day = await client.newday(a)
        let inday = day.withinDay
        let h = day.hours
        let min = day.minutes
        let sec = day.seconds
        let after = day.after
        if (!after) {
          const DelayTwo = [
            `<:Yu_fail:941589021761634306> | **${user.username}**, bạn phải chờ : \`${h}:${min}:${sec}s\` để sell nhẫn tiếp!`,
            `<:Yu_fail:941589021761634306> | **${user.username}**, you have to wait : \`${h}:${min}:${sec}s\` for next selling!`
          ]
          const delay = await client.send(client, message, DelayTwo, null)
          await client.sleep(5000)
          await delay.delete()
        }
        else {
          const QuanlityWrong = [
            `:x: | **${message.author.username}**, bạn không đủ nhẫn để bán!`,
            `:x: | **${message.author.username}**, you don't have this ring to sell!`
          ]
          if (nhan.quanlity < 1) return await client.send(client, message, QuanlityWrong, null)
          await client.timeout(message.author.id, `sellnhan1`)
          let money = nhan.price
          await invSchema.deleteOne({ memberid: message.author.id, name: tennhan })
          await client.cong(message.author.id, money)
          const successEndPoint = [
            `<:vvv:921536318062862396> | **${message.author.username}**, bạn đã bán thành công ${nhan.name} và nhận được **${parseInt(money).toLocaleString('En-Us')} Ycoin**`,
            `<:vvv:921536318062862396> | **${message.author.username}**, you've successfully sold ${nhan.name} and received **${parseInt(money).toLocaleString('En-Us')} Ycoin**`
          ]
          await client.send(client, message, successEndPoint, null)
        }
      }
      else if (type == `elite` || type == `tinhhoa` || type == `th` || type == `el` || type == `e`) {
        let arr = {
          'plant': `<:PlantElite:1029360913863671839>`,
          'life': `<:LifeElite:1029361004167037090>`,
          'food': `<:FoodElite:1029360819286331422>`,
          'p': `<:PlantElite:1029360913863671839>`,
          'l': `<:LifeElite:1029361004167037090>`,
          'f': `<:FoodElite:1029360819286331422>`,
        }
        let name = arr[args[1]]
        if (name) {
          const hatgiong = await client.grow(message.author.id, name)
          let soluong = parseInt(args[2])
          let errorAmount = [
            `:x: | **${message.author.username}** số lượng không hợp lệ !`,
            `:x: | **${message.author.username}** invalid amount!`
          ]
          if (soluong < 0) return await client.send(client, message, errorAmount, null)
          if (args[2] == `all`) soluong = hatgiong
          if (isNaN(soluong)) return await client.send(client, message, errorAmount, null)
          if (hatgiong < soluong) return await client.send(client, message, errorAmount, null)
          let a = checktienhg(nsprice, name)
          let money = soluong * a
          let realmoney = parseInt(money)
          await client.trugrow(message.author.id, name, soluong, 'elite')
          await client.cong(message.author.id, realmoney)
          const successEndpoint = [
            `${client.emo.done} | **${message.author.username}**, bạn đã bán **${soluong}** ${name} và thu được **${parseInt(realmoney).toLocaleString('En-Us')} Ycoin**`,
            `${client.emo.done} | **${message.author.username}**, you've sold **${soluong}** ${name} and received **${parseInt(realmoney).toLocaleString('En-Us')} Ycoin**`
          ]
          await client.send(client, message, successEndpoint, null)
        }
        else if (args[1] == `all`) {
          let nogsa = [
            "<:FoodElite:1029360819286331422>",
        "<:LifeElite:1029361004167037090> ",
        "<:PlantElite:1029360913863671839>"
          ]
          const nongsan = await farmSchema.find({
            memberid: message.author.id,
            name: { $in: nogsa },
            type: 'elite'
          })

          let money = 0
          for (let n in nongsan) {
            let ns = nongsan[n]
            let name = ns.name
            let sl = ns.quanlity
            let price = await client.checktienhg(nsprice, name)
            if (isNaN(price)) price = 0
            money += price * sl
            console.log(money)
            ns.quanlity = 0
            await ns.save()
          }
          
          let realmoney = parseInt(money)
          let successEndpoint = [
            `${client.emo.done} | **${message.author.username}**, vụ mùa qua, bạn đã bán tất cả tinh hoa và thu được **${realmoney.toLocaleString('En-Us')} Ycoin**`,
            `${client.emo.done} | **${message.author.username}**, you've sold all the elite and received **${realmoney.toLocaleString('En-Us')} Ycoin**`
          ]
          await client.send(client, message, successEndpoint, null)
          await client.cong(message.author.id, realmoney)
        }
      }
      else {
        let nothingfound = [
          `:x: | **${message.author.username}**, bạn phải nhập thứ muốn bán! 
Giết thú : \`Ykill <type>\`
Bán nhẫn : \`Ysell <nhan> <type/id>\`
Bán tinh hoa : \`Ysell tinhhoa(th,el,elite,e) <type(p,l,f)> <quanlity/all>\``,
        `:x: | **${message.author.username}**, you have to define which to sell! 
Kill animals : \`Ykill <rank>\`
Sell rings : \`Ysell <ring> <type/id>\`
Sell Elite : \`Ysell elite(el,e) <type(p,l,f)> <quanlity/all>\``
        ]
        return await client.send(client, message, nothingfound, null)
      }
    }
  }
function checkprice(c, u, r, s, e, p, g, d, v, thu) {
  let result = 0
  if (c.includes(thu)) result = 5
  if (u.includes(thu)) result = 15
  if (r.includes(thu)) result = 100
  if (s.includes(thu)) result = 500
  if (e.includes(thu)) result = 1000
  if (p.includes(thu)) result = 100000
  if (g.includes(thu)) result = 30000
  if (d.includes(thu)) result = 70000
  if (v.includes(thu)) result = 130000
  return result
}
function Datecheck(date) {
  let now = new Date(Date.now() + 25200000);
  let midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  /* Calculate time until midnight */
  let temp = Math.trunc(((midnight - now) + 86400000) / 1000);
  let seconds = temp % 60;
  temp = Math.trunc(temp / 60);
  let minutes = temp % 60
  temp = Math.trunc(temp / 60);
  let hours = temp % 24;
  temp = Math.trunc(temp / 24);
  let days = temp;

  /* If there is no data */
  if (!date) return { after: true, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

  let pDate = new Date(date);
  let diff = midnight - pDate;

  /* Not past midnight */
  if (diff <= 0) return { after: false, diff: diff, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

  /* Within 1 day */
  else if (diff <= 172810000) return { after: true, diff: diff, withinDay: true, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

  /* Over 1 full day */
  else return { after: true, diff: diff, withinDay: (overrideWithinDay || false), seconds: seconds, minutes: minutes, hours: hours, days: days, now };
}
function checktienhg(array, hg) {
  let result
  if (hg == array[0]) result = 10000
  if (hg == array[1]) result = 50
  if (hg == array[2]) result = 1000
  return result
}