const invSchema = require('../../models/invSchema')
const vipSchema = require('../../models/vipSchema')
const itemSchema = require('../../models/itemSchema')
let { QuickDB } = require('quick.db')
let db = new QuickDB()
module.exports = {
  name: 'buy',
  description: "Mua các Item, sẽ có Shop sau!",
  aliases: ['mua'],
  cooldown: 0,
  usage: "[prefix]buy [item]",
  run: async (client, message, args) => {
    let member = message.author
    let purchase = args[0]
    let cash = await client.cash(member.id)
    let tn1 = `<:YuGaCon:953394343148920902>`
    let tn2 = `<:YuBoCon:953394492503908362>`
    let tn3 = `<:YuHeoCon:953396171181817997>`

    let thunuoi1 = await client.grow(`${member.id}`, `${tn1}`)
    let thunuoi2 = await client.grow(`${member.id}`, `${tn2}`)
    let thunuoi3 = await client.grow(`${member.id}`, `${tn3}`)
    let pricehg = [
      "<:Yu_ot:953103262318477342>",
      "<:Yu_lua:953059348777672705>",
      "<:Yu_DauTay:953375220935295047>",
      "<:Yu_ngo:953971194565124186>",
      "<:Yu_cachua:953059348794470420>",
      "<:Yu_Dao:953375136134877294>",
      "<:Yu_khoaimi:953059349637500968>",
      "<:Yu_mia:953103263476117584>",
      "<:Yu_khoaitay:953103263178305566>",
      "<:Yu_DuaGang:953375173225091133>",
      "<:Yu_carot:953103263895535626>",
      "<:Yu_caingot:953059348731543592>",
      "<:Yu_Mit:953237141440327700>"
    ]
    let arrhg1 = {
      "1": "<:Yu_ot:953103262318477342>",
      "2": "<:Yu_lua:953059348777672705>",
      "3": "<:Yu_DauTay:953375220935295047>",
      "4": "<:Yu_ngo:953971194565124186>",
      '5': "<:Yu_cachua:953059348794470420>",
      "6": "<:Yu_Dao:953375136134877294>",
      "7": "<:Yu_khoaimi:953059349637500968>",
      "8": "<:Yu_mia:953103263476117584>",
      "9": "<:Yu_khoaitay:953103263178305566>",
      "10": "<:Yu_DuaGang:953375173225091133>",
      "11": "<:Yu_carot:953103263895535626>",
      "12": "<:Yu_caingot:953059348731543592>",
      "13": "<:Yu_Mit:953237141440327700>"
    }
    let arrhg2 = {
      "ot": "<:Yu_ot:953103262318477342>",
      "lua": "<:Yu_lua:953059348777672705>",
      "dautay": "<:Yu_DauTay:953375220935295047>",
      "ngo": "<:Yu_ngo:953971194565124186>",
      "ngo": "<:Yu_ngo:953971194565124186>",
      "cachua": "<:Yu_cachua:953059348794470420>",
      "dao": "<:Yu_Dao:953375136134877294>",
      "khoaimi": "<:Yu_khoaimi:953059349637500968>",
      "mia": "<:Yu_mia:953103263476117584>",
      "khoaitay": "<:Yu_khoaitay:953103263178305566>",
      "duagang": "<:Yu_DuaGang:953375173225091133>",
      "carot": "<:Yu_carot:953103263895535626>",
      "caingot": "<:Yu_caingot:953059348731543592>",
      "mit": "<:Yu_Mit:953237141440327700>"
    }
    let arrmypham1 = {
      "m1": "<:Yu_daugoi:1025262281774346361>",
      "m2": "<:Yu_suatam:1025262293749092353>",
      "m3": "<:Yu_kemchongnang:1025262255601885234>",
      "m4": "<:Yu_kemduongda:1025262288254554183>",
      "m5": '<:Yu_sonmongtay:1025262260744093768>',
      "m6": "<:Yu_mascara:1025262266511269938>",
      "m7": "<:Yu_phanmat:1025262271817068575>",
      "m8": "<:Yu_serum:1025262244587642950>",
    }
    let namehg1 = arrhg1[args[0]]
    let namehg2 = arrhg2[args[0]]
    let namemp1 = arrmypham1[args[0]]
    let pro = false
    let vip = false
    const provip = await vipSchema.findOne({ memberid: message.author.id })
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
    }
    if (!purchase) {
      errorNoPurchase = [
        `<:Yu_fail:941589021761634306> | **${member.username}**, bạn muốn mua gì ?`,
        `<:Yu_fail:941589021761634306> | **${member.username}**, what'd you like to buy?`
      ]
      return await client.send(client, message, errorNoPurchase, null).catch(e => console.log(e))
    }
    if (purchase == '002' || purchase == 'nhanb' || purchase == 'nhanbac') {
      if (cash < 500000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${member.username}**, bạn không đủ tiền mua Nhẫn Bạc!`,
          `<:Yu_fail:941589021761634306> | **${member.username}**, you don't have enough money to by Silver Ring!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanBac = await invSchema.findOne({ memberid: `${member.id}`, name: '<:Yu_nhanbac:941435162728730675>' })
      if (NhanBac) {
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
        if (luck <= 3) price = Math.floor(Math.random() * 15000)
        if (luck > 3) price = -(Math.floor(Math.random() * 15000))
        const muanhanbac = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhanbac:941435162728730675>`, quanlity: 1, type: `ring`, price: (500000 + price) })
        await muanhanbac.save()
      }
      client.tru(member.id, 500000)
      const success = [
        `<:Yu_nhanbac:941435162728730675> | **${member.username}**, bạn đã mua **Nhẫn Bạc** với giá **500,000 Ycoin!**`,
        `<:Yu_nhanbac:941435162728730675> | **${member.username}**, you bought **Silver Ring** with **500,000 Ycoin!**`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (purchase == '003' || purchase == 'nhanv' || purchase == 'nhanvang') {
      if (cash < 1000000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${member.username}**, bạn không đủ tiền mua Nhẫn Vàng!`,
          `<:Yu_fail:941589021761634306> | **${member.username}**, you don't have enough money to by Golden Ring!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanVang = await invSchema.findOne({ memberid: `${member.id}`, name: `<:Yu_nhanvang:941435163181727824>` })
      if (NhanVang) {
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
        if (luck <= 3) price = Math.floor(Math.random() * 100000)
        if (luck > 3) price = -(Math.floor(Math.random() * 100000))
        const muanhanvang = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhanvang:941435163181727824>`, quanlity: 1, type: `ring`, price: (1000000 + price) })
        await muanhanvang.save()
      }
      await client.tru(member.id, 1000000)
      const success = [
        `<:Yu_nhanvang:941435163181727824> | **${member.username}**, bạn đã mua **Nhẫn Vàng** với giá **1,000,000 Ycoin!**`,
        `<:Yu_nhanvang:941435163181727824> | **${member.username}**, you bought **Golden Ring** with **1,000,000 Ycoin!**`
      ]
      return await client.send(client, message, success, null)
    }
    else if (purchase == '004' || purchase == 'nhankc' || purchase == 'nhankimcuong') {
      if (cash < 10000000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${member.username}**, bạn không đủ tiền mua Nhẫn Kim Cương!`,
          `<:Yu_fail:941589021761634306> | **${member.username}**, you don't have enough money to by Diamond Ring!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanKimCuong = await invSchema.findOne({ memberid: `${member.id}`, name: `<:Yu_nhankimcuong:941435160883265556>` })
      if (NhanKimCuong) {
        let errorHad = [
          `Bạn đã sở hữu nhẫn Kim Cương rồi!`,
          `You already had Diamond ring!`
        ]
        return await client.send(client, message, errorHad, null).catch(e => console.log(e))
      } else {
        let price = 0
        let luck = 0
        if (!pro && !vip) luck = Math.floor(Math.random() * 10)
        if (pro) luck = Math.floor(Math.random() * 10) - 2
        if (vip) luck = Math.floor(Math.random() * 10) - 4
        if (luck == 1) price = Math.floor(Math.random() * 300000)
        if (luck !== 1) price = -(Math.floor(Math.random() * 300000))
        const muanhankimcuong = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhankimcuong:941435160883265556>`, quanlity: 1, type: `ring`, price: (10000000 + price) })
        await muanhankimcuong.save()
      }
      client.tru(member.id, 10000000)
      const success = [
        `<:Yu_nhankimcuong:941435160883265556> | **${member.username}**, bạn đã mua **Nhẫn Kim Cương** với giá **10,000,000 Ycoin!**`,
        `<:Yu_nhankimcuong:941435160883265556> | **${member.username}**, you bought **Diamond Ring** with **10,000,000 Ycoin!**`
      ]
      return await client.send(client, message, success, null)
    }
    else if (purchase == '001' || purchase == 'nhanc' || purchase == 'nhanco') {
      if (cash < 25000) {
        let errorCash = [
          `<:Yu_fail:941589021761634306> | **${member.username}**, bạn không đủ tiền mua Nhẫn Cỏ!`,
          `<:Yu_fail:941589021761634306> | **${member.username}**, you don't have enough money to by Grass Ring!`
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
        if (luck == 1) price = Math.floor(Math.random() * 5000)
        if (luck !== 1) price = -(Math.floor(Math.random() * 5000))
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
    else if (purchase == '005' || purchase == 'nhanvkc' || purchase == 'nhanvangkimcuong') {
      if (cash < 25000000) {
        const errorCash = [
          `<:Yu_fail:941589021761634306> | **${member.username}**, bạn không đủ tiền mua Nhẫn Đôi Hột Soàn!`,
          `<:Yu_fail:941589021761634306> | **${member.username}**, You don't have enough money to buy Luxury Diamond Rings!`
        ]
        return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      }
      const NhanVangKimCuong = await invSchema.findOne({ memberid: `${member.id}`, name: `<:Yu_nhanvangkc:951586992897024060>` })
      if (NhanVangKimCuong) {
        const HAd = [
          `Bạn đã sở hữu nhẫn đôi Kim Cương rồi!`,
          `You already had Luxury Golden Ring`
        ]
        return await client.send(client, message, HAd, null).catch(e => console.log(e))
      } else {
        let price = 0
        let luck = 0
        if (!pro && !vip) luck = Math.floor(Math.random() * 10)
        if (pro) luck = Math.floor(Math.random() * 10) - 2
        if (vip) luck = Math.floor(Math.random() * 10) - 4
        if (luck == 1) price = Math.floor(Math.random() * 50000)
        if (luck !== 1) price = -(Math.floor(Math.random() * 50000))
        const muanhanvkimcuong = new invSchema({ memberid: `${member.id}`, name: `<:Yu_nhanvangkc:951586992897024060>`, quanlity: 1, type: `ring`, price: (25000000 + price) })
        await muanhanvkimcuong.save()
      }
      client.tru(member.id, 25000000)
      const success = [
        `<:Yu_nhanvangkc:951586992897024060> | **${member.username}**, bạn đã mua **Nhẫn Đôi Kim Cương** với giá **25,000,000 Ycoin**!`,
        `<:Yu_nhanvangkc:951586992897024060> | **${member.username}**, you bought **Luxury Golden Diamond Ring** with **25,000,000 Ycoin**!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (purchase == 'thoc' || purchase == 'paddy') {
      let soluong = parseInt(args[1])

      const errorSoluong = [
        `:x: | **${message.author.username}** Bạn không thể nhập số âm !`,
        `:x: | **${message.author.username}** Amount can't be negative !`
      ]
      if (soluong < 0) return await client.send(client, message, errorSoluong, null).catch(e => console.log(e))
      const errorNaN = [`Số lượng không hợp lệ!`, `Missing amount or amount is not a number!`]
      if (!soluong || isNaN(soluong)) return await client.send(client, message, errorNaN, null)
      if (cash < (2000 * soluong)) {
        const errorMoney = [
          `<:Yu_fail:941589021761634306> | **${member.username}**, bạn không đủ tiền mua thóc!`,
          `<:Yu_fail:941589021761634306> | **${member.username}**, You don't have enough money!`
        ]
        return await client.send(client, message, errorMoney, null).catch(e => console.log(e))
      }
      client.tru(member.id, 2000 * soluong)
      await client.addgrow(`${message.author.id}`, `thoc`, soluong, 'food')
      const success = [
        `<:Yu_Ycoin:953323682246316082> | **${member.username}**, bạn đã mua <:Yu_thoc:953407482884161566> **${soluong}** <:Yu_thoc:953407482884161566> Bao Thóc với giá **${parseInt(2000 * soluong).toLocaleString('En-us')} Ycoin**!`,
        `<:Yu_Ycoin:953323682246316082> | **${member.username}**, you bought <:Yu_thoc:953407482884161566> **${soluong}** <:Yu_thoc:953407482884161566> Chicken's paddy for **${parseInt(2000 * soluong).toLocaleString('En-us')} Ycoin**!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (purchase == 'co' || purchase == 'grass') {
      let soluong = parseInt(args[1])

      const errorSoluong = [
        `:x: | **${message.author.username}** Bạn không thể nhập số âm !`,
        `:x: | **${message.author.username}** Amount can't be negative !`
      ]
      if (soluong < 0) return await client.send(client, message, errorSoluong, null).catch(e => console.log(e))
      const errorNaN = [`Số lượng không hợp lệ!`, `Missing amount or amount is not a number!`]
      if (!soluong || isNaN(soluong)) return await client.send(client, message, errorNaN, null)
      if (cash < (2000 * soluong)) {
        const errorMoney = [
          `<:Yu_fail:941589021761634306> | **${member.username}**, bạn không đủ tiền mua cỏ!`,
          `<:Yu_fail:941589021761634306> | **${member.username}**, You don't have enough money!`
        ]
        return await client.send(client, message, errorMoney, null).catch(e => console.log(e))
      }
      client.tru(member.id, 2000 * soluong)
      await client.addgrow(`${message.author.id}`, `co`, soluong, 'food')
      const success = [
        `<:Yu_Ycoin:953323682246316082> | **${member.username}**, bạn đã mua <:Yu_co:953408530474475520> **${soluong}** <:Yu_co:953408530474475520> Bao Cỏ với giá **${parseInt(2000 * soluong).toLocaleString('En-us')} Ycoin**!`,
        `<:Yu_Ycoin:953323682246316082> | **${member.username}**, you bought <:Yu_co:953408530474475520> **${soluong}** <:Yu_co:953408530474475520> Cow's Grass for **${parseInt(2000 * soluong).toLocaleString('En-us')} Ycoin**!`
      ]
      client.send(client, message, success, null)
    }
    else if (purchase == 'cam' || purchase == 'camheo' || purchase == 'pran') {
      let soluong = parseInt(args[1])

      const errorSoluong = [
        `:x: | **${message.author.username}** Bạn không thể nhập số âm !`,
        `:x: | **${message.author.username}** Amount can't be negative !`
      ]
      if (soluong < 0) return await client.send(client, message, errorSoluong, null).catch(e => console.log(e))
      const errorNaN = [`Số lượng không hợp lệ!`, `Missing amount or amount is not a number!`]
      if (!soluong || isNaN(soluong)) return await client.send(client, message, errorNaN, null)
      if (cash < (2000 * soluong)) {
        const errorMoney = [
          `<:Yu_fail:941589021761634306> | **${member.username}**, bạn không đủ tiền mua cám heo!`,
          `<:Yu_fail:941589021761634306> | **${member.username}**, You don't have enough money!`
        ]
        return await client.send(client, message, errorMoney, null).catch(e => console.log(e))
      }
      client.tru(member.id, 2000 * soluong)
      await client.addgrow(`${message.author.id}`, `camheo`, soluong, 'food')
      const success = [
        `<:Yu_Ycoin:953323682246316082> | **${member.username}**, bạn đã mua <:Yu_camheo:953407482955436062> **${soluong}** <:Yu_camheo:953407482955436062> Bao Cám Heo với giá **${parseInt(2000 * soluong).toLocaleString('En-us')} Ycoin**!`,
        `<:Yu_Ycoin:953323682246316082> | **${member.username}**, you bought <:Yu_camheo:953407482955436062> **${soluong}** <:Yu_camheo:953407482955436062> Pig's pran for **${parseInt(2000 * soluong).toLocaleString('En-us')} Ycoin**!`
      ]
      client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (purchase == 'ga' || purchase == 'chicken' || purchase == 'chic') {
      const ERROR1 = [
        `:x: | **Thú nuôi của bạn vẫn đang trong quá trình nuôi dưỡng! Không thể mua thú mới!**`,
        `:x: | **Your cattle is still growing, can't buy new one!**`
      ]
      if (thunuoi1 > 0) return await client.send(client, message, ERROR1, null).catch(e => console.log(e))
      const noMoney = [`<:Yu_fail:941589021761634306> | **${message.author.username}**, bạn không có đủ tiền mua ${tn1}!`,
      `<:Yu_fail:941589021761634306> | **${message.author.username}**, you don't have enought money ${tn1}!`
      ]
      if (cash < 50000) return await client.send(client, message, noMoney, null).catch(e => console.log(e))
      await client.addgrow(`${member.id}`, `${tn1}`, 8, 'thu')
      await client.tru(member.id, 50000)
      const success = [
        `${tn1} | **${message.author.username}**, bạn đã mua Gà Giống ${tn1} để nuôi lấy trứng 🥚!!`,
        `${tn1} | **${message.author.username}**, you bought a baby chicken ${tn1} for laying eggs 🥚!!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (purchase == 'bo' || purchase == 'cow') {
      const ERROR1 = [
        `:x: | **Thú nuôi của bạn vẫn đang trong quá trình nuôi dưỡng! Không thể mua thú mới!**`,
        `:x: | **Your cattle is still growing, can't buy new one!**`
      ]
      if (thunuoi2 > 0) return await client.send(client, message, ERROR1, null).catch(e => console.log(e))
      const noMoney = [`<:Yu_fail:941589021761634306> | **${message.author.username}**, bạn không có đủ tiền mua ${tn2}!`,
      `<:Yu_fail:941589021761634306> | **${message.author.username}**, you don't have enought money ${tn2}!`
      ]
      if (cash < 100000) return await client.send(client, message, noMoney, null).catch(e => console.log(e))
      await client.addgrow(`${member.id}`, `${tn2}`, 10, 'thu')
      await client.tru(member.id, 100000)
      const success = [
        `${tn2} | **${message.author.username}**, bạn đã mua Bò Giống ${tn2} để nuôi lấy sữa <a:Ybluemilk:918844687425609739>!!`,
        `${tn2} | **${message.author.username}**, you bought a baby cow ${tn2} for raise and harvest Milk <a:Ybluemilk:918844687425609739>!!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (purchase == 'heo' || purchase == 'pig') {
      const ERROR1 = [
        `:x: | **Thú nuôi của bạn vẫn đang trong quá trình nuôi dưỡng! Không thể mua thú mới!**`,
        `:x: | **Your cattle is still growing, can't buy new one!**`
      ]
      if (thunuoi3 > 0) return await client.send(client, message, ERROR1, null).catch(e => console.log(e))
      const noMoney = [`<:Yu_fail:941589021761634306> | **${message.author.username}**, bạn không có đủ tiền mua ${tn3}!`,
      `<:Yu_fail:941589021761634306> | **${message.author.username}**, you don't have enought money ${tn3}!`
      ]
      if (cash < 150000) return await client.send(client, message, noMoney, null).catch(e => console.log(e))
      await client.addgrow(`${member.id}`, `${tn3}`, 12, 'thu')
      await client.tru(member.id, 150000)
      const success = [
        `${tn3} | **${message.author.username}**, bạn đã mua Heo Giống ${tn3} để nuôi lấy thịt 🥩!!`,
        `${tn3} | **${message.author.username}**, you bought a baby pig ${tn3} raising for meat 🥩!!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (namehg1) {
      let soluong = parseInt(args[1])
      const errorSoluong = [
        `:x: | **${message.author.username}** Bạn không thể nhập số âm !`,
        `:x: | **${message.author.username}** Amount can't be negative !`
      ]
      if (soluong < 0) return await client.send(client, message, errorSoluong, null).catch(e => console.log(e))
      if (soluong > 20) soluong = 20
      if (isNaN(soluong)) soluong = 1
      let price = await client.checktienhg(pricehg, namehg1)
      const cash = await client.cash(message.author.id)
      const errorCash = [
        `Bạn không đủ tiền!`,
        `You don't have enough money!`
      ]
      if (price * soluong > cash) return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      await client.addgrow(message.author.id, namehg1, soluong, 'ns')
      await client.tru(message.author.id, price * soluong)
      const success = [
        `<:Yu_field:953050619558645820> | **${message.author.username}**, bạn đã mua **${soluong}** hạt ${namehg1} để trồng!`,
        `<:Yu_field:953050619558645820> | **${message.author.username}**, you bought **${soluong}** seeds ${namehg1} for growing!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    else if (namehg2) {
      let soluong = parseInt(args[1])

      const errorSoluong = [
        `:x: | **${message.author.username}** Bạn không thể nhập số âm !`,
        `:x: | **${message.author.username}** Amount can't be negative !`
      ]
      if (soluong < 0) return await client.send(client, message, errorSoluong, null).catch(e => console.log(e))
      if (!soluong) soluong = 1
      if (soluong > 20) soluong = 20
      if (isNaN(soluong)) soluong = 1
      const cash = await client.cash(message.author.id)
      let price = await client.checktienhg(pricehg, namehg2)
      const errorCash = [
        `Bạn không đủ tiền!`,
        `You don't have enough money!`
      ]
      if (price * soluong > cash) return await client.send(client, message, errorCash, null).catch(e => console.log(e))

      await client.addgrow(message.author.id, namehg2, soluong, 'ns')
      await client.tru(message.author.id, price * soluong)
      const success = [
        `<:Yu_field:953050619558645820> | **${message.author.username}**, bạn đã mua **${soluong}** hạt ${namehg2} để trồng!`,
        `<:Yu_field:953050619558645820> | **${message.author.username}**, you bought **${soluong}** seeds ${namehg2} for growing!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))

    }
    else if (namemp1) {
      let soluong = parseInt(args[1])
      const errorSoluong = [
        `:x: | **${message.author.username}** Bạn không thể nhập số âm !`,
        `:x: | **${message.author.username}** Amount can't be negative !`
      ]
      if (soluong < 0) return await client.send(client, message, errorSoluong, null).catch(e => console.log(e))
      if (soluong > 20) soluong = 20
      if (isNaN(soluong)) soluong = 1
      let price = checktienmp(namemp1)
      const cash = await client.cash(message.author.id)
      const errorCash = [
        `Bạn không đủ tiền!`,
        `You don't have enough money!`
      ]
      if (price * soluong > cash) return await client.send(client, message, errorCash, null).catch(e => console.log(e))
      await client.item(message.author.id, 'cong', namemp1, soluong, "mypham")
      await client.tru(message.author.id, price * soluong)
      const success = [
        `<:Yu_field:953050619558645820> | **${message.author.username}**, bạn đã mua **${soluong}** ${namemp1} để dùng!`,
        `<:Yu_field:953050619558645820> | **${message.author.username}**, you bought **${soluong}** ${namemp1} for using!`
      ]
      await client.send(client, message, success, null).catch(e => console.log(e))
    }
    /**
    else if (purchase == `cmt`) {
      let soluong = 1
      if (parseInt(args[1])) soluong = parseInt(args[1])
      let cash = await client.cash(message.author.id)
      if (cash < soluong * 10000) return message.reply(`Bạn không có đủ tiền mua chiêu mộ lệnh! Bạn còn thiếu **__${((soluong * 10000) - cash).toLocaleString('en-us')} Ycoin__**`)
      if (soluong > 1000) soluong = 1000
      let buyed = await db.get(`${message.author.id}_cmtlenh`)
      
      if (buyed > 1000) return message.reply(`:x: | Bạn đã mua giới hạn 1000 lệnh test!`)
      await client.tru(message.author.id, soluong * 10000)
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
      await db.set(`${message.author.id}_cmtlenh`, soluong)
      await message.reply(`<:LenhBaiChieuMo:991633427168231505> | Bạn đã mua ${soluong} <:LenhBaiChieuMo:991633427168231505>! Lưu ý, tính năng chỉ đang test cho mọi người chơi vui, sẽ bị xóa tất cả dữ liệu khi đưa vào hoạt động!`)
    }
    **/
  }
}
function checktienmp(m) {
  let arrmypham1 = {
    "m1": "<:Yu_daugoi:1025262281774346361>",
    "m2": "<:Yu_suatam:1025262293749092353>",
    "m3": "<:Yu_kemchongnang:1025262255601885234>",
    "m4": "<:Yu_kemduongda:1025262288254554183>",
    "m5": '<:Yu_sonmongtay:1025262260744093768>',
    "m6": "<:Yu_mascara:1025262266511269938>",
    "m7": "<:Yu_phanmat:1025262271817068575>",
    "m8": "<:Yu_serum:1025262244587642950>",
  }
  let result
  if (m == arrmypham1["m1"]) result = 15000
  else if (m == arrmypham1["m2"]) result = 15000
  else if (m == arrmypham1["m3"]) result = 112000
  else if (m == arrmypham1["m4"]) result = 252000
  else if (m == arrmypham1["m5"]) result = 82000
  else if (m == arrmypham1["m6"]) result = 182000
  else if (m == arrmypham1["m7"]) result = 112000
  else if (m == arrmypham1["m8"]) result = 2000000
  return result
}
/*
\`m1\`<:Yu_daugoi:1025262281774346361> : **__15.000__ Ycoin**
\`m2\`<:Yu_suatam:1025262293749092353> : **__15.000__ Ycoin**
\`m3\`<:Yu_kemchongnang:1025262255601885234> : **__112.000__ Ycoin**
\`m4\`<:Yu_kemduongda:1025262288254554183> : **__252.000__ Ycoin**
\`m5\`<:Yu_sonmongtay:1025262260744093768> : **__82.000__ Ycoin**
\`m6\`<:Yu_mascara:1025262266511269938> : **__182.000__ Ycoin**
\`m7\`<:Yu_phanmat:1025262271817068575> : **__112.000__ Ycoin**
\`m8\`<:Yu_serum:1025262244587642950> : **__2.000.000__ Ycoin**
*/