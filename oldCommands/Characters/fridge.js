module.exports = {
  name: "food",
  aliases: ["tulanh","doan"],
  cooldown: 5000,
  run: async (client, message, args) => {
    const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require("discord.js")
    const lifeSchema = require("../../models/lifeSchema")
    let author = message.author
    let userProfile = await lifeSchema.findOne({ authorid: author.id })
    const dishesSchema = require("../../models/dishesSchema")
    let dishes = [
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
    let foodArray = await dishesSchema
      .find({ authorid: message.author.id, quanlity: {$gt: 0} })
      .sort({ quanlity: -1})
    let count = {}
    foodArray.forEach(f => {
      let name = f.name
      let quanlity = f.quanlity
      count[name] = quanlity
    })
    let foodMsg = ``
    for (let i in count) {
      foodMsg += `${i} : \`${count[i]}\``
    }
      let button1 = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("<:yu_com:1021045040686055454>")
        .setCustomId(`${message.id}.com`);
      let button2 = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("<:yu_bapnuong:1021045038144303114>")
        .setCustomId(`${message.id}.bap`);
      let button3 = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("<:yu_duong:1021045035132780645>")
        .setCustomId(`${message.id}.duong`)
        .setDisabled(true);
      let button4 = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("<:yu_khoaitaychien:1021045033249558628>")
        .setCustomId(`${message.id}.khoai`);
      let button5 = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("<:yu_suachuadau:1021045289542488114>")
        .setCustomId(`${message.id}.sua`);
    let button6 = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("<:yu_tradao:1021045031416639498>")
        .setCustomId(`${message.id}.tra`);
      let button7 = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("<:yu_tuongca:1021045029143314463>")
        .setCustomId(`${message.id}.tuongca`)
        .setDisabled(true);
      let button8 = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("<:yu_tuongot:1021045026463158292>")
        .setCustomId(`${message.id}.tuongot`)
        .setDisabled(true);
      let button9 = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("<:yu_salad:1021045743965962260>")
        .setCustomId(`${message.id}.salad`);
      let button10 = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("<:yu_sinhtoduagang:1021045024613486662>")
        .setCustomId(`${message.id}.duagang`);
    let allButtons = [button1, button2, button3, button4, button5]
    let allButtons2 = [button6, button7, button8, button9, button10]
    let timeout = 600000
    let timeKey = await client.cd(message.author.id, 'eat1')
    let cd = await client.checkcd(timeKey, timeout)
    let after = cd.after
    let m = cd.m
    let s = cd.s
    if (!after) {
      for (let a in allButtons) {
        allButtons[a].setDisabled(true)
      }
      for (let a in allButtons2) {
        allButtons2[a].setDisabled(true)
      }
    }
    let rowOne = new ActionRowBuilder()
    .addComponents(
      allButtons
    );
    let rowTwo = new ActionRowBuilder()
    .addComponents(
      allButtons2
    );
    let reply = await message.reply({embeds:[
      new EmbedBuilder()
      .setTitle("🍥 Tủ Lạnh Của Bạn 🍥")
      .setDescription(`\`Các món ăn bạn đã nấu được:\`
${foodMsg}
`)
    ], components: [rowOne, rowTwo]})
  var collector = reply.createMessageComponentCollector({
    filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
  })
  collector.on("collect", async (interaction) => {
    if (interaction.user.id !== message.author.id) {
      if (lang == "vi") {
        return interaction.reply({ content: `:x: | **${interaction.user.username}** , không phải nút dành cho bạn!`, ephemeral: true }).then(async msg => {
          await client.sleep(5000)
          await msg.delete()
        }).catch(e => console.log(e))
      } 
      else if (lang == "en") {
        return interaction.reply({ content: `:x: | **${interaction.user.username}** , this interaction isn't for you!`, ephemeral: true }).then(async msg => {
          await client.sleep(5000)
          await msg.delete()
        }).catch(e => console.log(e))
      }
    }
    for (let a in allButtons) {
        allButtons[a].setDisabled(true)
      }
      for (let a in allButtons2) {
        allButtons2[a].setDisabled(true)
      }
    let newRow1 = new ActionRowBuilder()
    .addComponents(
      allButtons
    );
    let newRow2 = new ActionRowBuilder()
    .addComponents(
      allButtons2
    );
    if (interaction.customId == `${message.id}.com`) {
      await interaction.deferUpdate()
      let food = `<:yu_com:1021045040686055454>`
      if (food) {
        let haveFood = await dishesSchema.findOne({ authorid: message.author.id, name: food })
        let amount = 0
        if (haveFood) amount = haveFood.quanlity
        let notEnoughFood = [
          `:x: | Bạn không có đủ ${food} để ăn! Xin hãy tìm thêm và thử lại!`,
          `:x: | You don't have enough ${food} to eat!, please find more and try again!`
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
      await client.timeout(message.author.id, `eat1`)
      let dishes = [
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
    let foodArray = await dishesSchema
      .find({ authorid: message.author.id, quanlity: {$gt: 0} })
      .sort({ quanlity: -1})
    let count = {}
    foodArray.forEach(f => {
      let name = f.name
      let quanlity = f.quanlity
      count[name] = quanlity
    })
    let foodMsg = ``
    for (let i in count) {
      foodMsg += `${i} : \`${count[i]}\``
    }
    await reply.edit({embeds:[
      new EmbedBuilder()
      .setTitle("🍥 Tủ Lạnh Của Bạn 🍥")
      .setDescription(`\`Các món ăn bạn đã nấu được:\`
${foodMsg}
`)
    ], components : [newRow1, newRow2]})
    }
    else if (interaction.customId == `${message.id}.bap`) {
      await interaction.deferUpdate()
      let food = `<:yu_bapnuong:1021045038144303114>`
      if (food) {
        let haveFood = await dishesSchema.findOne({ authorid: message.author.id, name: food })
        let amount = 0
        if (haveFood) amount = haveFood.quanlity
        let notEnoughFood = [
          `:x: | Bạn không có đủ ${food} để ăn! Xin hãy tìm thêm và thử lại!`,
          `:x: | You don't have enough ${food} to eat!, please find more and try again!`
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
      await client.timeout(message.author.id, `eat1`)
      let dishes = [
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
    let foodArray = await dishesSchema
      .find({ authorid: message.author.id, quanlity: {$gt: 0} })
      .sort({ quanlity: -1})
    let count = {}
    foodArray.forEach(f => {
      let name = f.name
      let quanlity = f.quanlity
      count[name] = quanlity
    })
    let foodMsg = ``
    for (let i in count) {
      foodMsg += `${i} : \`${count[i]}\``
    }
    await reply.edit({embeds:[
      new EmbedBuilder()
      .setTitle("🍥 Tủ Lạnh Của Bạn 🍥")
      .setDescription(`\`Các món ăn bạn đã nấu được:\`
${foodMsg}
`)
    ], components : [newRow1, newRow2]})
    }
    else if (interaction.customId == `${message.id}.khoai`) {
      await interaction.deferUpdate()
      let food = `<:yu_khoaitaychien:1021045033249558628>`
      if (food) {
        let haveFood = await dishesSchema.findOne({ authorid: message.author.id, name: food })
        let amount = 0
        if (haveFood) amount = haveFood.quanlity
        let notEnoughFood = [
          `:x: | Bạn không có đủ ${food} để ăn! Xin hãy tìm thêm và thử lại!`,
          `:x: | You don't have enough ${food} to eat!, please find more and try again!`
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
      await client.timeout(message.author.id, `eat1`)
      let dishes = [
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
    let foodArray = await dishesSchema
      .find({ authorid: message.author.id, quanlity: {$gt: 0} })
      .sort({ quanlity: -1})
    let count = {}
    foodArray.forEach(f => {
      let name = f.name
      let quanlity = f.quanlity
      count[name] = quanlity
    })
    let foodMsg = ``
    for (let i in count) {
      foodMsg += `${i} : \`${count[i]}\``
    }
    await reply.edit({embeds:[
      new EmbedBuilder()
      .setTitle("🍥 Tủ Lạnh Của Bạn 🍥")
      .setDescription(`\`Các món ăn bạn đã nấu được:\`
${foodMsg}
`)
    ], components : [newRow1, newRow2]})
    }
    else if (interaction.customId == `${message.id}.sua`) {
      await interaction.deferUpdate()
      let food = `<:yu_suachuadau:1021045289542488114>`
      if (food) {
        let haveFood = await dishesSchema.findOne({ authorid: message.author.id, name: food })
        let amount = 0
        if (haveFood) amount = haveFood.quanlity
        let notEnoughFood = [
          `:x: | Bạn không có đủ ${food} để ăn! Xin hãy tìm thêm và thử lại!`,
          `:x: | You don't have enough ${food} to eat!, please find more and try again!`
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
      await client.timeout(message.author.id, `eat1`)
      let dishes = [
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
    let foodArray = await dishesSchema
      .find({ authorid: message.author.id, quanlity: {$gt: 0} })
      .sort({ quanlity: -1})
    let count = {}
    foodArray.forEach(f => {
      let name = f.name
      let quanlity = f.quanlity
      count[name] = quanlity
    })
    let foodMsg = ``
    for (let i in count) {
      foodMsg += `${i} : \`${count[i]}\``
    }
    await reply.edit({embeds:[
      new EmbedBuilder()
      .setTitle("🍥 Tủ Lạnh Của Bạn 🍥")
      .setDescription(`\`Các món ăn bạn đã nấu được:\`
${foodMsg}
`)
    ], components : [newRow1, newRow2]})
    }
    else if (interaction.customId == `${message.id}.tra`) {
      await interaction.deferUpdate()
      let food = `<:yu_tradao:1021045031416639498>`
      if (food) {
        let haveFood = await dishesSchema.findOne({ authorid: message.author.id, name: food })
        let amount = 0
        if (haveFood) amount = haveFood.quanlity
        let notEnoughFood = [
          `:x: | Bạn không có đủ ${food} để ăn! Xin hãy tìm thêm và thử lại!`,
          `:x: | You don't have enough ${food} to eat!, please find more and try again!`
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
      await client.timeout(message.author.id, `eat1`)
      let dishes = [
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
    let foodArray = await dishesSchema
      .find({ authorid: message.author.id, quanlity: {$gt: 0} })
      .sort({ quanlity: -1})
    let count = {}
    foodArray.forEach(f => {
      let name = f.name
      let quanlity = f.quanlity
      count[name] = quanlity
    })
    let foodMsg = ``
    for (let i in count) {
      foodMsg += `${i} : \`${count[i]}\``
    }
    await reply.edit({embeds:[
      new EmbedBuilder()
      .setTitle("🍥 Tủ Lạnh Của Bạn 🍥")
      .setDescription(`\`Các món ăn bạn đã nấu được:\`
${foodMsg}
`)
    ], components : [newRow1, newRow2]})
          }
    else if (interaction.customId == `${message.id}.salad`) {
      await interaction.deferUpdate()
      let food = `<:yu_salad:1021045743965962260>`
      if (food) {
        let haveFood = await dishesSchema.findOne({ authorid: message.author.id, name: food })
        let amount = 0
        if (haveFood) amount = haveFood.quanlity
        let notEnoughFood = [
          `:x: | Bạn không có đủ ${food} để ăn! Xin hãy tìm thêm và thử lại!`,
          `:x: | You don't have enough ${food} to eat!, please find more and try again!`
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
      await client.timeout(message.author.id, `eat1`) 
      let dishes = [
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
    let foodArray = await dishesSchema
      .find({ authorid: message.author.id, quanlity: {$gt: 0} })
      .sort({ quanlity: -1})
    let count = {}
    foodArray.forEach(f => {
      let name = f.name
      let quanlity = f.quanlity
      count[name] = quanlity
    })
    let foodMsg = ``
    for (let i in count) {
      foodMsg += `${i} : \`${count[i]}\``
    }
    await reply.edit({embeds:[
      new EmbedBuilder()
      .setTitle("🍥 Tủ Lạnh Của Bạn 🍥")
      .setDescription(`\`Các món ăn bạn đã nấu được:\`
${foodMsg}
`)
    ], components : [newRow1, newRow2]})
    }
    else if (interaction.customId == `${message.id}.duagang`) {
      await interaction.deferUpdate()
      let food = `<:yu_sinhtoduagang:1021045024613486662>`
      if (food) {
        let haveFood = await dishesSchema.findOne({ authorid: message.author.id, name: food })
        let amount = 0
        if (haveFood) amount = haveFood.quanlity
        let notEnoughFood = [
          `:x: | Bạn không có đủ ${food} để ăn! Xin hãy tìm thêm và thử lại!`,
          `:x: | You don't have enough ${food} to eat!, please find more and try again!`
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
      await client.timeout(message.author.id, `eat1`)
      let dishes = [
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
    let foodArray = await dishesSchema
      .find({ authorid: message.author.id, quanlity: {$gt: 0} })
      .sort({ quanlity: -1})
    let count = {}
    foodArray.forEach(f => {
      let name = f.name
      let quanlity = f.quanlity
      count[name] = quanlity
    })
    let foodMsg = ``
    for (let i in count) {
      foodMsg += `${i} : \`${count[i]}\``
    }
    await reply.edit({embeds:[
      new EmbedBuilder()
      .setTitle("🍥 Tủ Lạnh Của Bạn 🍥")
      .setDescription(`\`Các món ăn bạn đã nấu được:\`
${foodMsg}
`)
    ], components : [newRow1, newRow2]})
          }
  })
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