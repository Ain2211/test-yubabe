module.exports = {
  name: "cook",
  aliases: ["nauan"],
  cooldown: 5000,
  run: async (client, message, args) => {
    const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require("discord.js")
    const lifeSchema = require("../../models/lifeSchema")
    let age = await client.age(message.author.id, null, null)
    const notAge = [
      `:x: **|** Bạn còn quá nhỏ để nấu nướng! Bạn chỉ mới ${age} tuổi!
\`Ít nhất 7 tuổi bạn mới có thể nấu!\``,
      `:x: **|** You're too young to cook! You're now just ${age} ages!
\`At least 7 years old for cooking!\``
    ]
    if (age < 7) return await client.send(client, message, notAge, null)
    let nguyenLieu = {
      "ot": "<:Yu_ot:953103262318477342>",
      "lua": "<:Yu_lua:953059348777672705>",
      "dautay": "<:Yu_DauTay:953375220935295047>",
      "ngo": "<:Yu_ngo:953971194565124186>",
      "cachua": "<:Yu_cachua:953059348794470420>",
      "dao": "<:Yu_Dao:953375136134877294>",
      "khoaimi": "<:Yu_khoaimi:953059349637500968>",
      "mia": "<:Yu_mia:953103263476117584>",
      "khoaitay": "<:Yu_khoaitay:953103263178305566>",
      "duagang": "<:Yu_DuaGang:953375173225091133>",
      "carot": "<:Yu_carot:953103263895535626>",
      "caingot": "<:Yu_caingot:953059348731543592>",
      "mit": "<:Yu_Mit:953237141440327700>",
    }
    let nguyenLieu2 = {
      "1": "<:Yu_ot:953103262318477342>",
      "2": "<:Yu_lua:953059348777672705>",
      "3": "<:Yu_DauTay:953375220935295047>",
      "4": "<:Yu_ngo:953971194565124186>",
      "5": "<:Yu_cachua:953059348794470420>",
      "6": "<:Yu_Dao:953375136134877294>",
      "7": "<:Yu_khoaimi:953059349637500968>",
      "8": "<:Yu_mia:953103263476117584>",
      "9": "<:Yu_khoaitay:953103263178305566>",
      "10": "<:Yu_DuaGang:953375173225091133>",
      "11": "<:Yu_carot:953103263895535626>",
      "12": "<:Yu_caingot:953059348731543592>",
      "13": "<:Yu_Mit:953237141440327700>",
    }

    let choose1 = nguyenLieu[args[0]] || nguyenLieu2[args[0]]
    if (!choose1) return message.reply("Không tìm thấy nguyên liệu thứ nhất.")
    let nguyenlieu = await client.grow(message.author.id, choose1)
    if (nguyenlieu < 1) return message.reply(`Bạn không đủ ${choose1} để nấu ăn`)
    await client.trugrow(message.author.id, choose1, 1, "hg")
    let cash = await client.cash(message.author.id)
    if (cash < 15) return message.reply(`Bạn không đủ tiền để nấu ăn`)
    let a = await cooking(choose1, message.author.id)

    await message.reply(`Bạn đã nấu được : ${a}`)
  }
}

async function cooking(recipes, authorid) {
  const dishesSchema = require("../../models/dishesSchema")
  let dishes = [//ratatouille 
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
  let sanpham;
  if (recipes == "<:Yu_mia:953103263476117584>") sanpham = dishes[2]
  else if (recipes == "<:Yu_lua:953059348777672705>") sanpham = dishes[0]
  else if (recipes == "<:Yu_ngo:953971194565124186>") sanpham = dishes[1]
  else if (recipes == "<:Yu_khoaitay:953103263178305566>") sanpham = dishes[3]
  else if (recipes == "<:Yu_DauTay:953375220935295047>") sanpham = dishes[4]
  else if (recipes == "<:Yu_Dao:953375136134877294>") sanpham = dishes[5]
  else if (recipes == "<:Yu_cachua:953059348794470420>") sanpham = dishes[6]
  else if (recipes == "<:Yu_ot:953103262318477342>") sanpham = dishes[7]
  else if (recipes == "<:Yu_caingot:953059348731543592>") sanpham = dishes[8]
  else if (recipes == "<:Yu_DuaGang:953375173225091133>") sanpham = dishes[9]
  else return sanpham = "Một món ăn khét lẹt"

  let meal = await dishesSchema.findOne({ authorid: authorid, name: sanpham })
  if (!meal) {
    let newmeal = new dishesSchema({ authorid: authorid, name: sanpham, quanlity: 1 })
    await newmeal.save()
  } else {
    meal.quanlity += 1
    await meal.save()
  }
  return sanpham
}