const mongoose = require('mongoose');
const number = require('../../config/number.json');
const thu = require('../../config/animal.json');
const BanSchema = require('../../models/BanSchema');
const animalSchema = require('../../models/animalSchema')
const zoopointSchema = require('../../models/zoopointSchema')
const moneySchema = require('../../models/moneySchema')
const bankSchema = require('../../models/bankSchema')
const marrySchema = require('../../models/marrySchema')
module.exports = {
  name: 'leaderboard',
  cooldown: 30000,
  description: 'Xem bảng xếp hạng!',
  aliases: ['lb', 'top', 'rank'],
  usage: 'Ylb + [TOP]',
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  run: async (client, message, args) => {
    let type = args[0]
    if (type == `money` || type == `cash` || type == `coin` || type == `c` || type == `bal`) {
      let soluong = 10
      if (parseInt(args[1])) soluong = parseInt(args[1])
      if (soluong > 25) soluong = 25
      let find = await moneySchema.find({
        coins: { $gte: 1 }
      }).sort({ coins: -1 })
      let msg = ``
      let ids = []
      let money = []
      for (f in find) {
        let o = find[f]
        ids[f] = o.id
        money[f] = o.coins
      }
      for (var i = 0; i < soluong; i++) {
        let userid = ids[i]
        console.log(userid)
        let moneys = money[i]
        let members = await client.users.cache.find(user => user.id === userid)
        if (!members) continue;
        msg += `[${i + 1}] **${members.username}** - \`${parseInt(moneys).toLocaleString('En-Us')}\`\n`
      }
      await message.channel.send(`\`TOP ${soluong} CASH YCOIN\`\n` + `${msg}`).catch(e => console.log(e))
    }
    if (type == `bank` || type == `deposit` || type == `b` || type == `dep`) {
      if (message.author.id!== "896739787392819240") return
      let soluong = 10
      if (parseInt(args[1])) soluong = parseInt(args[1])
      if (soluong > 25) soluong = 25
      let find = await bankSchema.find({
        coins: { $gte: 1 }
      }).sort({ coins: -1 })
      let msg = ``
      let ids = []
      let money = []
      for (f in find) {
        let o = find[f]
        ids[f] = o.id
        money[f] = o.coins
      }
      for (var i = 0; i < soluong; i++) {
        let userid = ids[i]
        console.log(userid)
        let moneys = money[i]
        let members = await client.users.cache.find(user => user.id === userid)
        if (!members) continue;
        msg += `[${i + 1}] **${members.username}** - \`${parseInt(moneys).toLocaleString('En-Us')}\`\n`
      }
      await message.channel.send(`\`TOP ${soluong} BANK YCOIN\`\n` + `${msg}`).catch(e => console.log(e))
    }
    if (type == `zoo` || type == `z`) {
      let soluong = 10
      if (parseInt(args[1])) soluong = parseInt(args[1])
      if (soluong > 25) soluong = 25
      let find = await zoopointSchema.find({
        quanlity: { $gte: 1 }
      }).sort({ quanlity: -1 })
      let msg = ``
      let ids = []
      let money = []
      for (f in find) {
        let o = find[f]
        ids[f] = o.zooid
        money[f] = o.quanlity
      }
      for (var i = 0; i < soluong; i++) {
        let userid = ids[i]
        let moneys = money[i]
        let members = await client.users.cache.find(user => user.id === userid)
        if (!members) continue;
        msg += `[${i + 1}] **${members.username}** - \`${parseInt(moneys).toLocaleString('En-Us')}\`\n`
      }
      await message.channel.send(`\`TOP ${soluong} ĐIỂM ZOO\`\n` + `${msg}`).catch(e => console.log(e))
    }
    if (type == `together` || type == `tm` || type == `thanmat`) {
      let soluong = 5
      if (parseInt(args[1])) soluong = parseInt(args[1])
      if (soluong > 5) soluong = 5
      let find = await marrySchema.find({
        together: { $gte: 1 }
      }).sort({ together: -1 })
      let msg = ``
      let ids = []
      let money = []
      for (f in find) {
        let o = find[f]
        ids[f] = o.authorid
        money[f] = o.together
      }
      var stt = 0;
      for (var i = 0; i < soluong * 2; i++) {

        let userid = ids[i]
        let moneys = money[i]
        let members = await client.users.cache.find(user => user.id === userid)
        if (!members) continue;
        if (i == 0) msg += `[${stt + 1}] **${members.username}** ❤️ `
        if (i == 1) msg += `**${members.username}** - \`${parseInt(moneys).toLocaleString('En-Us')} điểm thân mật\`\n`, stt += 1
        if (i !== 0 && i % 2 == 0) msg += `[${stt + 1}] **${members.username}** ❤️ `
        if (i !== 1 && i % 2 !== 0) msg += `**${members.username}** - \`${parseInt(moneys).toLocaleString('En-Us')} điểm thân mật\`\n`, stt += 1

      }
      await message.channel.send(`\`TOP ${soluong} ĐIỂM THÂN MẬT\`\n` + `${msg}`).catch(e => console.log(e))
    }
  }
}