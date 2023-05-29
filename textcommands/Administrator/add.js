module.exports = {
  name: "additem",
  description: ["Add vật phẩm cho members", "Add vật phẩm cho members"],
  aliases: ["add"],
  usage:["{prefix}add <user> <itemType [itemName]> <amount>", "{prefix}add <user> <itemType [itemName]> <amount>"],
  cooldown: 0,
	category: "Admins",
	canuse: "owners",
  errorcd : ["No cooldown!", "No cooldown!"],
  run: async (client, message, args) => {
		const itemSchema = require('../../models/itemSchema')
const invSchema = require('../../models/invSchema')
  /*DEFINE MEMBER*/  
    let member = message.mentions.members.first()
    if (!member) member = client.users.cache.find(u => u.id == args[0])
		if (!member) return message.reply(`${client.e.fail} | Bạn phải mentions ai đó để add`)
    let type = args[1]
    let soluong = parseInt(args[2])
    if (!parseInt(args[2])) soluong = 1
    if (type == `cmt`) {
      console.log(`${message.author.username} add ${soluong} Lenhbaichieumo cho ${member.user.username}`)
      let lenhbai = await itemSchema.findOne({ id: member.id, name: `<:LenhBaiChieuMo:991633427168231505>` })
      if (!lenhbai) {
        let add = new itemSchema({
          id: member.id,
          name: `<:LenhBaiChieuMo:991633427168231505>`,
          quanlity: soluong,
          type: `chieumo`
        })
        await add.save()
      }
      else {
        lenhbai.quanlity += soluong
        await lenhbai.save()
      }
      await message.channel.send(`Đã add cho **${member.user.username}** **__${soluong}__** <:LenhBaiChieuMo:991633427168231505>`)
    }
    else if (type == `cash` || 
             type == `money` || 
             type == `ycoin` || 
             type == `coin` ||
             type == `c`) {
      await client.cong(member.id, soluong);
      await client.tietkiem(member.id, 0)
      await message.channel.send(`<a:Yvip:919967591307550740> | Đã tặng **${member.username ? member.username : member.user.username}** **__${parseInt(soluong).toLocaleString('En-us')}__ Ycoin!**`)
    }
    else if (type == `bank` || type == `b`) {
      await client.tietkiem(member.id, soluong)
      await message.channel.send(`<a:Yvip:919967591307550740> | Đã tặng **${member.username ? member.username : member.user.username}** **__${parseInt(soluong).toLocaleString('En-us')}__ Ycoin vào ngân hàng!**`)
      }
    else if (type == `pp` || type == `passport`) {
      let rank = args[2]
      const passports = {
        "vip": "<:VIPPassport:988093810955411456>",
        "pro": "<:ProPassport:988093838348410930>"
      }
      let passport = passports[rank]
      let ba = await invSchema.findOne({
        memberid: member.id,
        name: passport,
      })
      if (!ba) {
        const add = new invSchema({
          memberid: member.id,
          name: passport,
          quanlity: parseInt(args[3]),
          type: `passport`,
          price: 0
        })
        await add.save()
      } else {
        ba.quanlity += parseInt(args[3])
        await ba.save()
      }
      await message.channel.send(`${passport} | Đã tặng **${member.user.username}** **__${parseInt(args[3]).toLocaleString('En-us')}__ ${passport}!**`)
    }
    else if (type == 'badge') {
      const badgeSchema = require('../../models/badgeSchema')
      if (!member) return message.channel.send(`Phải tag người tặng badge`)
      let badge = args[2]
      let ba = await badgeSchema.findOne({
        memberid: member.id,
        badge: badge
      })
      if (ba) return message.channel.send(`Người chơi này đã có phù hiệu ${args[2]} rồi`)

      const add = new badgeSchema({
        memberid: member.id,
        badge: args[2]
      })
      await add.save()
      await message.react("✔")
    }
    else if (type == 'gem') {
      let gem1 = {
        '01': '<:C_gem_01:982028743608533022>',
        '05': '<:U_gem_01:982028744204103810>',
        '09': '<:R_gem_01:982028744107655198>',
        '13': '<:SR_gem_01:982028743960854598>',
        '17': '<:E_gem_01:982028743595941938>',
        '21': '<:P_gem_01:982028744191529010>',
        '25': '<:G_gem_01:982028743629484082>',
      }
      let gem2 = {
        '02': '<:C_gem_02:982028743537209424>',
        '06': '<:U_gem_02:982028744061505606>',
        '10': '<:R_gem_02:982028744124428428>',
        '14': '<:SR_gem_02:982028743956652072>',
        '18': '<:E_gem_02:982028743679827968>',
        '22': '<:P_gem_02:982028743713366066>',
        '26': '<:G_gem_02:982028743646265364>',
      }
      let gem3 = {
        '03': '<:C_gem_03:982028743914696704>',
        '07': '<:U_gem_03:982028743650463795>',
        '11': '<:R_gem_03:982028743948247110>',
        '15': '<:SR_gem_03:982028744124411924>',
        '19': '<:E_gem_03:982028743805648926>',
        '23': '<:P_gem_03:982028743960830032>',
        '27': '<:G_gem_03:982028743537217588>',
      }
      let gem4 = {
        '04': '<:C_gem_04:982028743570755624>',
        '08': '<:U_gem_04:982028744187326494>',
        '12': '<:R_gem_04:982028743822426152>',
        '16': '<:SR_gem_04:982028743981817908>',
        '20': '<:E_gem_04:982028743688212520>',
        '24': '<:P_gem_04:982028743893721178>',
        '28': '<:G_gem_04:982028744057294848>',
      }
      const id = args[2]
      const idngoc1 = gem1[args[2]]
      const idngoc2 = gem2[args[2]]
      const idngoc3 = gem3[args[2]]
      const idngoc4 = gem4[args[2]]

      if (!args[2]) return message.channel.send(`Bạn phải nhập id ngọc`)
      if (!args[3]) return message.channel.send(`Bạn phải nhập số lượng ngọc`)
      if (idngoc1) {
        await client.addgem(member.id, idngoc1, parseInt(args[3]), 1)
        await message.channel.send(`<:vvv:921536318062862396> | Đã add **${args[3]}** ngọc ${idngoc1} cho **${member.user.username}**`)
      }
      else if (idngoc2) {
        await client.addgem(member.id, idngoc2, parseInt(args[3]), 2)
        await message.channel.send(`<:vvv:921536318062862396> | Đã add **${args[3]}** ngọc ${idngoc2} cho **${member.user.username}**`)
      }
      else if (idngoc3) {
        await client.addgem(member.id, idngoc3, parseInt(args[3]), 3)
        await message.channel.send(`<:vvv:921536318062862396> | Đã add **${args[3]}** ngọc ${idngoc3} cho **${member.user.username}**`)
      }
      else if (idngoc4) {
        await client.addgem(member.id, idngoc4, parseInt(args[3]), 4)
        await message.channel.send(`<:vvv:921536318062862396> | Đã add **${args[3]}** ngọc ${idngoc4} cho **${member.user.username}**`)
      }
      else if (args[2] == `gb` || args[2] == `29`) {
        await client.addgem(member.id, `<:GEMBOX:982028743952441355>`, parseInt(args[3]), 0)
        await message.channel.send(`<:vvv:921536318062862396> | Đã add **${args[3]}** <:GEMBOX:982028743952441355> cho **${member.user.username}**`)
      }
      else if (args[2] == `pgb` || args[2] == `32`) {
        await client.addgem(member.id, `<:PRO_GEMBOX:982028744057298964>`, parseInt(args[3]), 0)
        await message.channel.send(`<:vvv:921536318062862396> | Đã add **${args[3]}** <:PRO_GEMBOX:982028744057298964> cho **${member.user.username}**`)
      }
      else if (args[2] == `vgb` || args[2] == `33`) {
        await client.addgem(member.id, `<:VIP_GEMBOX:982028743889543278>`, parseInt(args[3]), 0)
        await message.channel.send(`<:vvv:921536318062862396> | Đã add **${args[3]}** <:VIP_GEMBOX:982028743889543278> cho **${member.user.username}**`)
      }
    }
    else return
  }
}
	
