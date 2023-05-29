const lifeSchema = require("../../models/lifeSchema")
const dishesSchema = require("../../models/dishesSchema")
module.exports = {
  name: 'eat',
  cooldown: 1000,
  description: "Cuộc sống của bạn ở Yuworld! Ăn uống sẽ giúp bạn tăng sức khỏe!",
  description2: 'Your life at Yuworld! Eating will help you increasing your health!',
  usage2: "Yeat + food",
  usage: "Yan + đồ ăn",
  aliases: ['an', 'ăn', 'e', 'ă', "uống", "uong", "drink"],
  cderror: 'đừng vội thế chứ, bạn vẫn chưa đói đâu',
  use: 'rồi hãy kiếm gì đó ăn tiếp!!',
  cderror2: 'don\'t rush, you\'ve just eat, you\'re still full now',
  use2: "and eat again <3",
  run: async (client, message, args) => {
    let traicay = {
      "dautay": "<:Yu_DauTay:953375220935295047>",
      "dâutây": "<:Yu_DauTay:953375220935295047>",
      "strawberry": "<:Yu_DauTay:953375220935295047>",
      "3": "<:Yu_DauTay:953375220935295047>",
      "ngo": "<:Yu_ngo:953971194565124186>",
      "bap": "<:Yu_ngo:953971194565124186>",
      "ngô": "<:Yu_ngo:953971194565124186>",
      "bắp": "<:Yu_ngo:953971194565124186>",
      "4": "<:Yu_ngo:953971194565124186>",
      "corn": "<:Yu_ngo:953971194565124186>",
      "dao": "<:Yu_Dao:953375136134877294>",
      "đào": "<:Yu_Dao:953375136134877294>",
      "peach": "<:Yu_Dao:953375136134877294>",
      "6": "<:Yu_Dao:953375136134877294>",
      "cassava": "<:Yu_khoaimi:953059349637500968>",
      "7": "<:Yu_khoaimi:953059349637500968>",
      "khoaimi": "<:Yu_khoaimi:953059349637500968>",
      "khoaimì": "<:Yu_khoaimi:953059349637500968>",
      "duagang": "<:Yu_DuaGang:953375173225091133>",
      "cantaloupe": "<:Yu_DuaGang:953375173225091133>",
      "10": "<:Yu_DuaGang:953375173225091133>",
      "mit": "<:Yu_Mit:953237141440327700>",
      "mít": "<:Yu_Mit:953237141440327700>",
      "jackfruit": "<:Yu_Mit:953237141440327700>",
      "13": "<:Yu_Mit:953237141440327700>"
    }
    let monan = {
      "com": "<:yu_com:1021045040686055454>",
      "cơm": "<:yu_com:1021045040686055454>",
      "14": "<:yu_com:1021045040686055454>",
      "rice": "<:yu_com:1021045040686055454>",
      "15": "<:yu_bapnuong:1021045038144303114>",
      "ngonuong": "<:yu_bapnuong:1021045038144303114>",
      "bapnuong": "<:yu_bapnuong:1021045038144303114>",
      "khoaitaychien": "<:yu_khoaitaychien:1021045033249558628>",
      "friedpotato": "<:yu_khoaitaychien:1021045033249558628>",
      "16": "<:yu_khoaitaychien:1021045033249558628>",
      "suachuadau": "<:yu_suachuadau:1021045289542488114>",
      "17": "<:yu_suachuadau:1021045289542488114>",
      "strawberryyogurt": "<:yu_suachuadau:1021045289542488114>",
      "tradao": "<:yu_tradao:1021045031416639498>",
      "peachtea": "<:yu_tradao:1021045031416639498>",
      "18": "<:yu_tradao:1021045031416639498>",
      "salad": "<:yu_salad:1021045743965962260>",
      "19": "<:yu_salad:1021045743965962260>",
      "sinhtoduagang": "<:yu_sinhtoduagang:1021045024613486662>",
      "cantalopeshake": "<:yu_sinhtoduagang:1021045024613486662>",
      "20": "<:yu_sinhtoduagang:1021045024613486662>"
    }
    let food = traicay[args[0]]
    let food2 = monan[args[0]]
    let missingFood = [
      `:x: | Không có món ăn bạn chọn, xin hãy kiểm tra lại!`,
      `:x: | The food you want to eat does not exist, please check again!`
    ]
    if (!food && !food2) return await client.reply(client, message, missingFood, null)
    let timeout = 600000
    let timeKey = await client.cd(message.author.id, 'eat1')
    let cd = await client.checkcd(timeKey, timeout)
    let after = cd.after
    let m = cd.m
    let s = cd.s
    let notAfter = [
      `:x: | Bạn vừa mới ăn mà, xin hãy đợi \`${m + ` phút ` + s + `giây`}\` để tiếp tục ăn`,
      `:x: | You've just eaten, please wait after \`${m + ` minutes ` + s + ` seconds`}\` before being hungry again`
    ]
    if (!after) {
      let a = await client.reply(client, message, notAfter, null)
      await client.sleep(5000)
      return a.delete()
    }
    else {
      await client.timeout(message.author.id, `eat1`)
      if (food) {
        let haveFood = await client.grow(message.author.id, food)
        let notEnoughFood = [
          `:x: | Bạn không có đủ ${food} để ăn! Xin hãy tìm thêm và thử lại!`,
          `:x: | You don't have enough ${food} to eat!, please find more and try again!`
        ]
        if (!haveFood || haveFood < 1) return client.reply(client, message, notEnoughFood, null)
        let userProfile = await lifeSchema.findOne({ authorid: message.author.id })
        let doesNotExist = [
          `:x: | Bạn chưa tạo nhân vật, xin hãy gõ lệnh \`Yme\` và thử lại sau!`,
          `:x: | You haven't create your character, please type \`Yme\` and try again`
        ]
        if (!userProfile) return client.reply(client, message, doesNotExist, null)
        await client.trugrow(message.author.id, food, 1, "ns")
        let hp = checkpoint(food)
        let health = userProfile.stat.health
        if (health >= 95) userProfile.stat.health = 100
        else userProfile.stat.health += hp
        await userProfile.save()
        let eatenSuccess = [
          `${food} | Bạn đã ăn **1** phần ${food} và tăng ${hp} điểm sức khỏe!`,
          `${food} | You've eaten **1** ${food} and increase ${hp} point of health!`
        ]
        await client.reply(client, message, eatenSuccess, null)
      }
      else if (food2) {
        let haveFood = await dishesSchema.findOne({ authorid: message.author.id, name: food2 })
        let amount = 0
        if (haveFood) amount = haveFood.quanlity
        let notEnoughFood = [
          `:x: | Bạn không có đủ ${food2} để ăn! Xin hãy tìm thêm và thử lại!`,
          `:x: | You don't have enough ${food2} to eat!, please find more and try again!`
        ]
        if (!haveFood || amount < 1) return client.reply(client, message, notEnoughFood, null)
        let userProfile = await lifeSchema.findOne({ authorid: message.author.id })
        let doesNotExist = [
          `:x: | Bạn chưa tạo nhân vật, xin hãy gõ lệnh \`Yme\` và thử lại sau!`,
          `:x: | You haven't create your character, please type \`Yme\` and try again`
        ]
        if (!userProfile) return client.reply(client, message, doesNotExist, null)
        haveFood.quanlity -= 1
        await haveFood.save()
        let hp = checkpoint(food2)
        let health = userProfile.stat.health
        if (health >= 95) userProfile.stat.health = 100
        else userProfile.stat.health += hp
        await userProfile.save()
        let eatenSuccess = [
          `${food2} | Bạn đã ăn **1** phần ${food2} và tăng ${hp} điểm sức khỏe!`,
          `${food2} | You've eaten **1** ${food2} and increase ${hp} point of health!`
        ]
        await client.reply(client, message, eatenSuccess, null)
      }
    }
  }
}
function checkpoint(food) {
  let result
  if (food == "<:Yu_DauTay:953375220935295047>") result = 5
  if (food == "<:Yu_ngo:953971194565124186>") result = 6
  if (food == "<:Yu_Dao:953375136134877294>") result = 7
  if (food == "<:Yu_khoaimi:953059349637500968>") result = 8
  if (food == "<:Yu_DuaGang:953375173225091133>") result = 9
  if (food == "<:Yu_Mit:953237141440327700>") result = 10
  if (food == "<:yu_com:1021045040686055454>") result = 7
  if (food == "<:yu_bapnuong:1021045038144303114>") result = 6
  if (food == "<:yu_khoaitaychien:1021045033249558628>") result = 3
  if (food == "<:yu_suachuadau:1021045289542488114>") result = 8
  if (food == "<:yu_tradao:1021045031416639498>") result = 7
  if (food == "<:yu_salad:1021045743965962260>") result = 10
  if (food == "<:yu_sinhtoduagang:1021045024613486662>") result = 12
  return result
}
/*
,
    ,
    "<:yu_duong:1021045035132780645>",
    ,
    ,
    ,
    "<:yu_tuongca:1021045029143314463>",
    "<:yu_tuongot:1021045026463158292>",
    ,
  
*/