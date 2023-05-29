const gems1 = [
  '<:C_gem_01:982028743608533022>',
  '<:U_gem_01:982028744204103810>',
  '<:R_gem_01:982028744107655198>',
  '<:SR_gem_01:982028743960854598>',
  '<:E_gem_01:982028743595941938>',
  '<:P_gem_01:982028744191529010>',
  '<:G_gem_01:982028743629484082>',
]
const gems2 = [
  '<:C_gem_02:982028743537209424>',
  '<:U_gem_02:982028744061505606>',
  '<:R_gem_02:982028744124428428>',
  '<:SR_gem_02:982028743956652072>',
  '<:E_gem_02:982028743679827968>',
  '<:P_gem_02:982028743713366066>',
  '<:G_gem_02:982028743646265364>',
]
const gems3 = [
  '<:C_gem_03:982028743914696704>',
  '<:U_gem_03:982028743650463795>',
  '<:R_gem_03:982028743948247110>',
  '<:SR_gem_03:982028744124411924>',
  '<:E_gem_03:982028743805648926>',
  '<:P_gem_03:982028743960830032>',
  '<:G_gem_03:982028743537217588>',
]
const gems4 = [
  '<:C_gem_04:982028743570755624>',
  '<:U_gem_04:982028744187326494>',
  '<:R_gem_04:982028743822426152>',
  '<:SR_gem_04:982028743981817908>',
  '<:E_gem_04:982028743688212520>',
  '<:P_gem_04:982028743893721178>',
  '<:G_gem_04:982028744057294848>',
]
const invSchema = require('../../models/invSchema')
const userSchema = require('../../models/userSchema')
const lifeSchema = require("../../models/lifeSchema")
module.exports = {
  name: "use",
  description: ["Sử dụng vật phẩm!", "Use items"],
  aliases: [],
  usage: ["{prefix}use <id vật phẩm>", "{prefix}use <id vật phẩm>"],
  cooldown: 3000,
  category: "Inven",
  canuse: "everyone",
  errorcd: ["Đợi **{time}** và sử dụng lại.", "Wait for **{time}** and try again."],
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({table: "DB"})
    const buff1 = await client.buff(message.author.id, 1)
    const buff2 = await client.buff(message.author.id, 2)
    const buff3 = await client.buff(message.author.id, 3)
    const buff4 = await client.buff(message.author.id, 4)
    let author = message.author.id
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
    let mp = {
      "m1": "<:Yu_daugoi:1025262281774346361>",
      "m2": "<:Yu_suatam:1025262293749092353>",
      "m3": "<:Yu_kemchongnang:1025262255601885234>",
      "m4": "<:Yu_kemduongda:1025262288254554183>",
      "m5": '<:Yu_sonmongtay:1025262260744093768>',
      "m6": "<:Yu_mascara:1025262266511269938>",
      "m7": "<:Yu_phanmat:1025262271817068575>",
      "m8": "<:Yu_serum:1025262244587642950>",
    }
    const id = args[0]
    const idngoc1 = gem1[args[0]]
    const idngoc2 = gem2[args[0]]
    const idngoc3 = gem3[args[0]]
    const idngoc4 = gem4[args[0]]
    const idmp = mp[args[0]]
    let passports = {
      "30": "<:ProPassport:988093838348410930>",
      "31": "<:VIPPassport:988093810955411456>",
      "passport": "<:ProPassport:988093838348410930>",
      "vippassport": "<:VIPPassport:988093810955411456>",
      "pp": "<:ProPassport:988093838348410930>",
      "vp": "<:VIPPassport:988093810955411456>",
      "ppp": "<:ProPassport:988093838348410930>",
      "vpp": "<:VIPPassport:988093810955411456>",
      "propassport": "<:ProPassport:988093838348410930>",
      "vip": "<:VIPPassport:988093810955411456>",
      "pro": "<:ProPassport:988093838348410930>"
    }
    const idpassport = passports[args[0]]
    if (id == `gb` || id == `gembox` || id == `29`) {
      const gemboxes = [
        '<:C_gem_01:982028743608533022>',
        '<:U_gem_01:982028744204103810>',
        '<:R_gem_01:982028744107655198>',
        '<:SR_gem_01:982028743960854598>',
        '<:C_gem_02:982028743537209424>',
        '<:U_gem_02:982028744061505606>',
        '<:R_gem_02:982028744124428428>',
        '<:SR_gem_02:982028743956652072>',
        '<:C_gem_03:982028743914696704>',
        '<:U_gem_03:982028743650463795>',
        '<:R_gem_03:982028743948247110>',
        '<:SR_gem_03:982028744124411924>'
      ]
      const gembox = await client.gem(author, `<:GEMBOX:982028743952441355>`)
      const lackGemboxes2 = [
        `Bạn không còn hộp ngọc để dùng.`,
        `You don't have enough Gembox to use.`
      ]
      if (gembox < 1) return client.send(client, message, lackGemboxes2, null)
      let soluong = parseInt(args[1])
      const errorAmount = [
        `${client.e.fail} | **${message.author.username} Bạn không thể nhập số âm !**`,
        `${client.e.fail} | **${message.author.username} You can't insert Negatives !**`
      ]
      if (soluong < 0) return client.send(client, message, errorAmount, null)
      if (!soluong && gembox > 0) soluong = 1
      if (args[1] == `all`) soluong = gembox
      if (soluong > 20) soluong = 20
      const lackGemboxes = [
        `${client.e.fail} | Bạn không còn hộp ngọc để dùng.`,
        `${client.e.fail} | You don't have enough Gembox to use.`
      ]
      if (gembox < soluong) return client.send(client, message, lackGemboxes, null)
      await client.trugem(author, `<:GEMBOX:982028743952441355>`, soluong)
        // array thu thập dữ liệu trả về ngọc đã mở được 
		let gg = []
	  // Nếu dùng nhiều hơn 1 hộp gem box
      if (soluong > 1) {
        //vòng lặp random ngọc
        for (var i = 0; i < soluong; i++) {
          let g = gemboxes[Math.floor(Math.random() * gemboxes.length)]
          gg[i] = g //thêm ngọc vào array ngọc
        }
		//object số lượng chi tiết 
        let count = {}
        //check xem mỗi loại có bao nhiêu viên và thêm vào object
        gg.forEach(item => {
            //nếu đã xuất hiện từ trước
			if (count[item]) {
            count[item] += 1
            return
          }
          //nếu là một ngọc khác
          count[item] = 1
        })
        // vòng lặp thêm ngọc vào dữ liệu
        for (let item in count) {
          //function check loại
		  let type = checktype(gems1, gems2, gems3, gems4, item)
          //func add ngọc vào túi => id, tên ngọc, sl, loại
		  await client.addgem(author, item, count[item], type)
        }
        const USED = [
          `<:GEMBOX:982028743952441355> | **${message.author.username}**, bạn đã sử dụng **${soluong}** hộp ngọc và nhận được ${gg}!`,
          `<:GEMBOX:982028743952441355> | **${message.author.username}**, You have used **${soluong}** gemboxes and received ${gg}!`
        ]
        await client.send(client, message, USED, null)
      }
      else {
	  // Nếu chỉ dùng 1 hộp
        let a = gemboxes[Math.floor(Math.random() * gemboxes.length)]
        let type = checktype(gems1, gems2, gems3, gems4, a)
        await client.addgem(author, a, 1, type)
        const USED = [
          `<:GEMBOX:982028743952441355> | **${message.author.username}**, bạn đã sử dụng **${soluong}** hộp ngọc và nhận được ${a}!`,
          `<:GEMBOX:982028743952441355> | **${message.author.username}**, You have used **${soluong}** gemboxes and received ${a}!`
        ]
        await client.send(client, message, USED, null)
      }
    }
    else if (id == `pgb` || id == `progembox` || id == `32`) {
      const gemboxes = [
        '<:C_gem_01:982028743608533022>',
        '<:U_gem_01:982028744204103810>',
        '<:R_gem_01:982028744107655198>',
        '<:SR_gem_01:982028743960854598>',
        '<:E_gem_01:982028743595941938>',
        '<:P_gem_01:982028744191529010>',

        '<:C_gem_02:982028743537209424>',
        '<:U_gem_02:982028744061505606>',
        '<:R_gem_02:982028744124428428>',
        '<:SR_gem_02:982028743956652072>',
        '<:E_gem_02:982028743679827968>',
        '<:P_gem_02:982028743713366066>',

        '<:C_gem_03:982028743914696704>',
        '<:U_gem_03:982028743650463795>',
        '<:R_gem_03:982028743948247110>',
        '<:SR_gem_03:982028744124411924>',
        '<:E_gem_03:982028743805648926>',
        '<:P_gem_03:982028743960830032>',
      ]
      const gembox = await client.gem(author, `<:PRO_GEMBOX:982028744057298964>`)
      const LackOfBox = [
        `${client.e.fail} | Bạn không còn hộp ngọc PRO để dùng.`,
        `${client.e.fail} | You don't have enough PRO GEMBOX to use.`
      ]
      if (gembox < 1) return client.send(client, message, LackOfBox, null)
      let soluong = parseInt(args[1])
      const errrorOfAmoiint = [
        `${client.e.fail} | **${message.author.username} Bạn không thể nhập số âm !**`,
        `${client.e.fail} | **${message.author.username} Amount can't be negative !**`
      ]
      if (soluong < 0) return client.send(client, message, errrorOfAmoiint, null)
      if (!soluong && gembox > 0) soluong = 1
      if (args[1] == `all`) soluong = gembox
      if (soluong > 20) soluong = 20
      const LackofSth12 = [
        `${client.e.fail} | **${message.author.username}**, bạn không có đủ hộp ngọc PRO để dùng!`,
        `${client.e.fail} | **${message.author.username}**, you don't have enough PRO gemboxes to use!!`
      ]
      if (gembox < soluong) return client.send(client, message, LackofSth12, null)
      await client.trugem(author, `<:PRO_GEMBOX:982028744057298964>`, soluong)
      let gg = []
      if (soluong > 1) {
        for (var i = 0; i < soluong; i++) {
          let g = gemboxes[Math.floor(Math.random() * gemboxes.length)]
          gg[i] = g
        }
        let count = {}
        gg.forEach(item => {
          if (count[item]) {
            count[item] += 1
            return
          }
          count[item] = 1
        })
        for (let item in count) {
          let type = checktype(gems1, gems2, gems3, gems4, item)
          await client.addgem(author, item, count[item], type)
        }
        const msgg1123 = [
          `<:PRO_GEMBOX:982028744057298964> | **${message.author.username}**, bạn đã sử dụng **${soluong}** hộp ngọc PRO và nhận được ${gg}!`,
          `<:PRO_GEMBOX:982028744057298964> | **${message.author.username}**, you used **${soluong}** PRO gemboxes and received ${gg}!`
        ]
        await client.send(client, message, msgg1123, null)
      }
      else {
        let a = gemboxes[Math.floor(Math.random() * gemboxes.length)]
        let type = checktype(gems1, gems2, gems3, gems4, a)
        await client.addgem(author, a, 1, type)
        const msgg1123 = [
          `<:PRO_GEMBOX:982028744057298964> | **${message.author.username}**, bạn đã sử dụng **${soluong}** hộp ngọc PRO và nhận được ${a}`,
          `<:PRO_GEMBOX:982028744057298964> | **${message.author.username}**, you used **${soluong}** PRO gemboxes and received ${a}`
        ]
        await client.send(client, message, msgg1123, null)
      }
    }
    else if (id == `vgb` || id == `vipgembox` || id == `33`) {
      const gemboxes = [
        '<:C_gem_04:982028743570755624>',
        '<:U_gem_04:982028744187326494>',
        '<:R_gem_04:982028743822426152>',
        '<:SR_gem_04:982028743981817908>',
        '<:E_gem_04:982028743688212520>',
        '<:P_gem_04:982028743893721178>',
      ]
      const gembox = await client.gem(author, `<:VIP_GEMBOX:982028743889543278>`)
      const LackOfBox = [
        `${client.e.fail} | Bạn không còn hộp ngọc VIP để dùng.`,
        `${client.e.fail} | You don't have enough VIP GEMBOX to use.`
      ]
      if (gembox < 1) return client.send(client, message, LackOfBox, null)
      let soluong = parseInt(args[1])
      const errrorOfAmoiint = [
        `${client.e.fail} | **${message.author.username} Bạn không thể nhập số âm !**`,
        `${client.e.fail} | **${message.author.username} Amount can't be negative !**`
      ]
      if (soluong < 0) return client.send(client, message, errrorOfAmoiint, null)
      if (!soluong && gembox > 0) soluong = 1


      if (args[1] == `all`) soluong = gembox
      if (soluong > 20) soluong = 20 
      const LackofSth12 = [
        `${client.e.fail} | **${message.author.username}**, bạn không có đủ hộp ngọc VIP để dùng!`,
        `${client.e.fail} | **${message.author.username}**, you don't have enough VIP gemboxes to use!!`
      ]
      if (gembox < soluong) return client.send(client, message, LackofSth12, null)
      await client.trugem(author, `<:VIP_GEMBOX:982028743889543278>`, soluong)
      let gg = []
      if (soluong > 1) {
        for (var i = 0; i < soluong; i++) {
          let g = gemboxes[Math.floor(Math.random() * gemboxes.length)]
          gg[i] = g
        }
        let count = {}
        gg.forEach(item => {
          if (count[item]) {
            count[item] += 1
            return
          }
          count[item] = 1
        })
        for (let item in count) {
          let type = checktype(gems1, gems2, gems3, gems4, item)
          await client.addgem(author, item, count[item], type)
        }
        const msgg1123 = [
          `<:VIP_GEMBOX:982028743889543278> | **${message.author.username}**, bạn đã sử dụng **${soluong}** hộp ngọc VIP và nhận được ${gg}`,
          `<:VIP_GEMBOX:982028743889543278> | **${message.author.username}**, you used **${soluong}** VIP gemboxes and received ${gg}`
        ]
        await client.send(client, message, msgg1123, null)
      }
      else {
        let a = gemboxes[Math.floor(Math.random() * gemboxes.length)]
        let type = checktype(gems1, gems2, gems3, gems4, a)
        await client.addgem(author, a, 1, type)
        const msgg1123 = [
          `<:PRO_GEMBOX:982028744057298964> | **${message.author.username}**, bạn đã sử dụng **${soluong}** hộp ngọc VIP và nhận được ${a}`,
          `<:PRO_GEMBOX:982028744057298964> | **${message.author.username}**, you used **${soluong}** VIP gemboxes and received ${a}`
        ]
        await client.send(client, message, msgg1123, null)


      }
    }
    else if (idngoc1) {
      const geml = await client.gem(author, `${idngoc1}`)
      const gemlIsZero = [
        `${client.e.fail} | **${message.author.username}**, bạn không có ngọc ${idngoc1}`,
        `${client.e.fail} | **${message.author.username}**, you don't have ${idngoc1}`
      ]
      if (geml == 0) return client.send(client, message, gemlIsZero, null)
      const gemlIsZero2 = [
        `${client.e.fail} | **${message.author.username}**, bạn không thể dùng chung loại ngọc!`,
        `${client.e.fail} | **${message.author.username}**, you can't use same type of game!`
      ]
      if (buff1 > 0) return client.send(client, message, gemlIsZero2, null)
      const gemlIsZero23 = [
        `${client.e.fail} | **${message.author.username}**, bạn không thể dùng thêm ngọc khi đã dùng KINGSTONE!`,
        `${client.e.fail} | **${message.author.username}**, you can't use more gems while using KINGSTONE!`
      ]
      if (buff4 > 0) return client.send(client, message, gemlIsZero23, null)
      let soluong = checkngoc(gems1, idngoc1, 10)
      let heso = checkbuff(gems1, idngoc1, 1)
      await client.trugem(author, idngoc1, 1)
      await client.addbuff(author, 1, soluong, heso)
      const gemlIsZero234 = [
        `${idngoc1} | **${message.author.username}**, bạn đã sử dụng ngọc ${idngoc1} và được buff **${soluong}** lần hunt x${heso}`,
        `${idngoc1} | **${message.author.username}**, you used ${idngoc1} and boost **${soluong}** times hunt x${heso}`
      ]
      await db.set(`${message.author.id}.Soluongbuff1`, soluong)
      await db.set(`${message.author.id}.buff1`, idngoc1)
      await client.send(client, message, gemlIsZero234, null)
    }
    else if (idngoc2) {
      const geml = await client.gem(author, `${idngoc2}`)
      const gemlIsZero = [
        `${client.e.fail} | **${message.author.username}**, bạn không có ngọc ${idngoc2}`,
        `${client.e.fail} | **${message.author.username}**, you don't have ${idngoc2}`
      ]
      if (geml == 0) return client.send(client, message, gemlIsZero, null)
      const gemlIsZero2 = [
        `${client.e.fail} | **${message.author.username}**, bạn không thể dùng chung loại ngọc!`,
        `${client.e.fail} | **${message.author.username}**, you can't use same type of game!`
      ]
      if (buff2 > 0) return client.send(client, message, gemlIsZero2, null)
      const gemlIsZero23 = [
        `${client.e.fail} | **${message.author.username}**, bạn không thể dùng thêm ngọc khi đã dùng KINGSTONE!`,
        `${client.e.fail} | **${message.author.username}**, you can't use more gems while using KINGSTONE!`
      ]
      if (buff4 > 0) return client.send(client, message, gemlIsZero23, null)
      let soluong = checkngoc(gems2, idngoc2, 10)
      await client.trugem(author, idngoc2, 1)
      await client.addbuff(author, 2, soluong, 1)
      const gemlIsZero234 = [
        `${idngoc2} | **${message.author.username}**, bạn đã sử dụng ngọc ${idngoc2} và được buff **${soluong}** lần hunt double!`,
        `${idngoc2} | **${message.author.username}**, you used ${idngoc2} and boost **${soluong}** times hunt double!`
      ]
      await db.set(`${message.author.id}.Soluongbuff2`, soluong)
      await db.set(`${message.author.id}.buff2`, idngoc2)
      await client.send(client, message, gemlIsZero234, null)
    }
    else if (idngoc3) {
      const geml = await client.gem(author, `${idngoc3}`)
      const gemlIsZero = [
        `${client.e.fail} | **${message.author.username}**, bạn không có ngọc ${idngoc3}`,
        `${client.e.fail} | **${message.author.username}**, you don't have ${idngoc3}`
      ]
      if (geml == 0) return client.send(client, message, gemlIsZero, null)
      const gemlIsZero2 = [
        `${client.e.fail} | **${message.author.username}**, bạn không thể dùng chung loại ngọc!`,
        `${client.e.fail} | **${message.author.username}**, you can't use same type of game!`
      ]
      if (buff3 > 0) return client.send(client, message, gemlIsZero2, null)
      const gemlIsZero23 = [
        `${client.e.fail} | **${message.author.username}**, bạn không thể dùng thêm ngọc khi đã dùng KINGSTONE!`,
        `${client.e.fail} | **${message.author.username}**, you can't use more gems while using KINGSTONE!`
      ]
      if (buff4 > 0) return client.send(client, message, gemlIsZero23, null)
      let soluong = checkngoc(gems3, idngoc3, 10)
      await client.trugem(author, idngoc3, 1)
      await client.addbuff(author, 3, soluong, 1)

      const gemlIsZero234 = [
        `${idngoc3} | **${message.author.username}**, bạn đã sử dụng ngọc ${idngoc3} và được buff **${soluong}** lần hunt may mắn!`,
        `${idngoc3} | **${message.author.username}**, you used ${idngoc3} and boost **${soluong}** times lucky hunt!`
      ]
      await db.set(`${message.author.id}.Soluongbuff3`, soluong)
      await db.set(`${message.author.id}.buff3`, idngoc3)
      await client.send(client, message, gemlIsZero234, null)
    }
    else if (idngoc4) {
      const gem = await client.gem(author, `${idngoc4}`)
      const lackk1 = [
        `${client.e.fail} | **${message.author.username}**, bạn không có ngọc ${idngoc4}`,
        `${client.e.fail} | **${message.author.username}**, you don't have ${idngoc4}`
      ]
      if (gem < 1) return client.send(client, message, lackk1, null)
      const lackk2 = [
        `${client.e.fail} | **${message.author.username}**, bạn không thể dùng thêm  KINGSTONE khi vẫn còn sức mạnh đá quý!`,
        `${client.e.fail} | **${message.author.username}**, you can't use KINGSTONE while still have another gem power!`
      ]
      if (buff1 > 0) return client.send(client, message, lackk2, null)
      if (buff2 > 0) return client.send(client, message, lackk2, null)
      if (buff3 > 0) return client.send(client, message, lackk2, null)
      if (buff4 > 0) return client.send(client, message, lackk2, null)
      let soluong = checkngoc(gems4, idngoc4, 10)
      let heso = checkbuff(gems4, idngoc4, 1)
      await client.trugem(author, idngoc4, 1)
      await client.addbuff(author, 4, soluong, heso)
      const uSED = [
        `${idngoc4} | **${message.author.username}**, bạn đã sử dụng ngọc ${idngoc4} và được buff **${soluong}** lần hunt may mắn!`,
        `${idngoc4} | **${message.author.username}**, you've used ${idngoc4} and boosted **${soluong}** times for KING of HUNT!`
      ]
      await db.set(`${message.author.id}.Soluongbuff4`, soluong)
      await db.set(`${message.author.id}.buff4`, idngoc4)
      await client.send(client, message, uSED, null)
    }
    else if (idpassport) {

      const passport = await invSchema.findOne({ memberid: message.author.id, name: idpassport })
      if (!passport || passport.quanlity == 0) return message.reply(`${client.emo.fail} | Bạn không còn ${idpassport} để dùng!`)

      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      let d = status.d
      let h = status.h
      let m = status.m
      let s = status.s
      if (!end) return message.reply(`${client.emo.fail} | Passport của bạn vẫn còn ${d + `ngày` + h + `giờ` + m + `phút` + s + `giây`} mới hết hạn !`)
      passport.quanlity -= 1
      await passport.save()
      await client.activatepassport(message.author.id, idpassport)
      await message.channel.send(`${idpassport} | **${message.author.username}**, bạn đã sử dụng PASSPORT ${idpassport}! Passport sẽ có hiệu lực trong 30 ngày!`)
      const user = await userSchema.findOne({ memberid: message.author.id })
      if (idpassport == "<:VIPPassport:988093810955411456>") {
        user.vip = `Đã Đăng Ký`
        await user.save()
      } else {
        user.pro = `Đã Đăng Ký`
        await user.save()
      }
    }
    else if (idmp) {
      let userProfile = await lifeSchema.findOne({ authorid: message.author.id })
      let userNotExist = [
        `${client.e.fail} | Bạn chưa tạo nhân vật, gõ Yme để tạo!`,
        `${client.e.fail} | You haven't created Character, type Yme !`
      ]
      if (!userProfile) return client.reply(client, message, userNotExist, null)

      let age = userProfile.me.age
      let userNotAge = [
        `${client.e.fail} | Bạn chưa đủ tuổi để sử dụng mỹ phẩm, còn quá nhỏ mà :( \`ít nhất 7 tuổi\`!`,
        `${client.e.fail} | You're too young to use cosmetics, try again after 7 years old !`
      ]
      if (age < 7) return client.reply(client, message, userNotAge, null)
      let amount = await client.item(message.author.id, null, idmp, null, "mypham")
      let notEnough = [
        `${client.e.fail} | Bạn không còn đủ ${idmp} để dùng!`,
        `${client.e.fail} | You don't have enough ${idmp} to use!`
      ]
      if (amount < 1) return client.reply(client, message, notEnough, null)
      let diemcong = checkpointMP(idmp)
      await client.item(message.author.id, 'tru', idmp, 1, "mypham")
      if (userProfile.stat.appear <= 100 - diemcong) userProfile.stat.appear += diemcong
      else userProfile.stat.appear = 100
      await userProfile.save()
      let success = [
        `${idmp} | Bạn đã sử dụng thành công, ngoại hình của bạn được cải thiện rất nhiều
\`+${diemcong}đ\``,
        `${idmp} | Successfully used, your appearance is now perfect !!!
\`+${diemcong}pts\``
      ]
      await client.reply(client, message, success, null)
    }
    else {
      return message.channel.send(`**${message.author.username}**, vật phẩm bạn dùng không hợp lệ.`)
    }
  }
}
function checkngoc(array, ngoc, heso) {
  if (ngoc == array[0]) result = heso * 1
  if (ngoc == array[1]) result = heso * 2
  if (ngoc == array[2]) result = heso * 4
  if (ngoc == array[3]) result = heso * 6
  if (ngoc == array[4]) result = heso * 8
  if (ngoc == array[5]) result = heso * 10
  if (ngoc == array[6]) result = heso * 15
  return result
}
function checktype(s1, s2, s3, s4, ngoc) {
  if (s1.includes(ngoc)) result = 1
  if (s2.includes(ngoc)) result = 2
  if (s3.includes(ngoc)) result = 3
  if (s4.includes(ngoc)) result = 4
  return result

}
function checkbuff(array, ngoc, heso) {
  if (ngoc == array[0]) result = 3
  if (ngoc == array[1]) result = 4
  if (ngoc == array[2]) result = 5
  if (ngoc == array[3]) result = 6
  if (ngoc == array[4]) result = 7
  if (ngoc == array[5]) result = 8
  if (ngoc == array[6]) result = 9
  return result
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
function checkpointMP(idmp) {
  let result
  if (idmp == "<:Yu_daugoi:1025262281774346361>") result = 5
  else if (idmp == "<:Yu_suatam:1025262293749092353>") result = 5
  else if (idmp == "<:Yu_kemchongnang:1025262255601885234>") result = 12
  else if (idmp == "<:Yu_kemduongda:1025262288254554183>") result = 24
  else if (idmp == "<:Yu_sonmongtay:1025262260744093768>") result = 10
  else if (idmp == "<:Yu_mascara:1025262266511269938>") result = 15
  else if (idmp == "<:Yu_phanmat:1025262271817068575>") result = 12
  else if (idmp == "<:Yu_serum:1025262244587642950>") result = 30
  return result
}