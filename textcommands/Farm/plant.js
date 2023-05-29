const plantSchema = require('../../models/plantSchema')
module.exports = {
  name: "plant",
  description: ["Trồng Cây!", "Plant a crop!"],
  aliases: ['tc', 'trongcay', 'p'],
  usage: ["{prefix}tc", "{prefix}p"],
  cooldown: 0,
  category: "Farm",
  canuse: "everyone",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
    return message.reply(`${client.e.fail} | Tính năng đang được sửa chữa!`)
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({table: "DB"})
    const lang = await db.get(`${message.guild.id}_languages`)
    const username = message.author.username
    const author = message.author.id
    await trong_cay(client, client.hg.ot, client.hg.lua, client.hg.dautay, client.hg.ngo, client.hg.cachua, client.hg.dao, client.hg.khoaimi, client.hg.mia, client.hg.khoaitay, client.hg.duagang, client.hg.carot, client.hg.caingot, client.hg.mit, "ot", "lua", "dautay", "ngo", "cachua", "dao", "khoaimi", "mia", "khoaitay", "duagang", "carot", "caingot", "mit", message, author, username)
  }
}
async function trong_cay(client, hg1, hg2, hg3, hg4, hg5, hg6, hg7, hg8, hg9, hg10, hg11, hg12, hg13, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13, message, authorid, username) {
  const { QuickDB } = require("quick.db")
  const db = new QuickDB()
  const lang = await db.get(`${message.guild.id}_languages`)
  const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
  const plantSchema = require('../../models/plantSchema')
  let buttonrow1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg1)
        .setCustomId('ot'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg2)
        .setCustomId('lua'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg3)
        .setCustomId('dautay'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg4)
        .setCustomId('ngo'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg5)
        .setCustomId('cachua')
    );
  let buttonrow2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg6)
        .setCustomId('dao'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg7)
        .setCustomId('khoaimi'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg8)
        .setCustomId('mia'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg9)
        .setCustomId('khoaitay'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg10)
        .setCustomId('duagang')
    );
  let buttonrow3 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg11)
        .setCustomId('carot'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg12)
        .setCustomId('caingot'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg13)
        .setCustomId('mit')
    );
  let startembed
  if (lang == "vi") startembed = new EmbedBuilder()
    .setAuthor({ name: message.author.username })
    .setTitle(`Bạn Muốn Trồng Cây?`)
    .setDescription(`Nhấp Nút Bên Dưới Để Trồng Cây`)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL())
  else startembed = new EmbedBuilder()
    .setAuthor({ name: message.author.username })
    .setTitle(`You want to grow some plants?`)
    .setDescription(`Tap the buttons below`)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL())

  let reply = await message.reply({ embeds: [startembed], components: [buttonrow1, buttonrow2, buttonrow3] })

  var collector = reply.createMessageComponentCollector({
    filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
  })
  collector.on("collect", async (interaction) => {
    if (interaction.user.id !== authorid) {
      if (lang == "vi") {
        return interaction.reply({ content: `:x: | **${interaction.user.username}** , không phải nút dành cho bạn!`, ephemeral: true }).then(async msg => {
          await client.sleep(5000)
          await msg.delete()
        }).catch(e => console.log(e))
      } else if (lang == "en") {
        return interaction.reply({ content: `:x: | **${interaction.user.username}** , this interaction isn't for you!`, ephemeral: true }).then(async msg => {
          await client.sleep(5000)
          await msg.delete()
        }).catch(e => console.log(e))
      }
    }
    if (interaction.customId == n1) {
      await interaction.deferUpdate()
      let hatgiong = await client.grow(`${authorid}`, `${hg1}`)
      let noCrops = [
        `${client.emo.fail} | **${username}**, bạn đã hết hạt ${hg1} để trồng!`,
        `${client.emo.fail} | **${username}**, you have 0 ${hg1}! Buy some to grow!`
      ]
      if (hatgiong == 0) return await client.reply(client, message, noCrops, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))

      let plant = await plantSchema.findOne({ key: `${n1}_${authorid}` })
      let planted = [
        `${client.emo.fail} | **${username}**, bạn đã trồng ${hg1} rồi! Xin hãy trồng loại khác!`,
        `${client.emo.fail} | **${username}**, you have already planted ${hg1}!`
      ]
      if (plant) return await client.reply(client, message, planted, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      await client.trugrow(`${authorid}`, `${hg1}`, 1, 'ns');
      await client.timeout(message.author.id, `trong${n1}`)
      let addplant = new plantSchema({ key: `${n1}_${authorid}`, value: `true` })
      await addplant.save()
      let Harvest = [
        `${hg1} | **${username}**, bạn đã trồng ${hg1}! Gõ Yruong để xem khi nào thu hoạch được nhé!!!`,
        `${hg1} | **${username}**, you planted ${hg1}! Type Yfield to see when it ripe!!!`
      ]
      await client.reply(client, message, Harvest, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }).catch(e => console.log(e))
    }
    else if (interaction.customId == n2) {
      await interaction.deferUpdate()
      let hatgiong = await client.grow(`${authorid}`, `${hg2}`)
      let noCrops = [
        `${client.emo.fail} | **${username}**, bạn đã hết hạt ${hg2} để trồng!`,
        `${client.emo.fail} | **${username}**, you have 0 ${hg2}! Buy some to grow!`
      ]
      if (hatgiong == 0) return await client.reply(client, message, noCrops, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      let plant = await plantSchema.findOne({ key: `${n2}_${authorid}` })
      let planted = [
        `${client.emo.fail} | **${username}**, bạn đã trồng ${hg2} rồi! Xin hãy trồng loại khác!`,
        `${client.emo.fail} | **${username}**, you have already planted ${hg2}!`
      ]
      if (plant) return await client.reply(client, message, planted, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      await client.trugrow(`${authorid}`, `${hg2}`, 1, 'ns');
      await client.timeout(message.author.id, `trong${n2}`)
      let addplant = new plantSchema({ key: `${n2}_${authorid}`, value: `true` })
      await addplant.save()
      let Harvest = [
        `${hg2} | **${username}**, bạn đã trồng ${hg2}! Gõ Yruong để xem khi nào thu hoạch được nhé!!!`,
        `${hg2} | **${username}**, you planted ${hg2}! Type Yfield to see when it ripe!!!`
      ]
      await client.reply(client, message, Harvest, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }).catch(e => console.log(e))
    }
    else if (interaction.customId == n3) {
      await interaction.deferUpdate()
      let hatgiong = await client.grow(`${authorid}`, `${hg3}`)
      let noCrops = [
        `${client.emo.fail} | **${username}**, bạn đã hết hạt ${hg3} để trồng!`,
        `${client.emo.fail} | **${username}**, you have 0 ${hg3}! Buy some to grow!`
      ]
      if (hatgiong == 0) return await client.reply(client, message, noCrops, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      let plant = await plantSchema.findOne({ key: `${n3}_${authorid}` })
      let planted = [
        `${client.emo.fail} | **${username}**, bạn đã trồng ${hg3} rồi! Xin hãy trồng loại khác!`,
        `${client.emo.fail} | **${username}**, you have already planted ${hg3}!`
      ]
      if (plant) return await client.reply(client, message, planted, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      await client.trugrow(`${authorid}`, `${hg3}`, 1, 'ns');
      await client.timeout(message.author.id, `trong${n3}`)
      let addplant = new plantSchema({ key: `${n3}_${authorid}`, value: `true` })
      await addplant.save()
      let Harvest = [
        `${hg3} | **${username}**, bạn đã trồng ${hg3}! Gõ Yruong để xem khi nào thu hoạch được nhé!!!`,
        `${hg3} | **${username}**, you planted ${hg3}! Type Yfield to see when it ripe!!!`
      ]
      await client.reply(client, message, Harvest, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }).catch(e => console.log(e))
    }
    else if (interaction.customId == n4) {
      await interaction.deferUpdate()
      let hatgiong = await client.grow(`${authorid}`, `${hg4}`)
      let noCrops = [
        `${client.emo.fail} | **${username}**, bạn đã hết hạt ${hg4} để trồng!`,
        `${client.emo.fail} | **${username}**, you have 0 ${hg4}! Buy some to grow!`
      ]
      if (hatgiong == 0) return await client.reply(client, message, noCrops, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      let plant = await plantSchema.findOne({ key: `${n4}_${authorid}` })
      let planted = [
        `${client.emo.fail} | **${username}**, bạn đã trồng ${hg4} rồi! Xin hãy trồng loại khác!`,
        `${client.emo.fail} | **${username}**, you have already planted ${hg4}!`
      ]
      if (plant) return await client.reply(client, message, planted, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      await client.trugrow(`${authorid}`, `${hg4}`, 1, 'ns');
      await client.timeout(message.author.id, `trong${n4}`)
      let addplant = new plantSchema({ key: `${n4}_${authorid}`, value: `true` })
      await addplant.save()
      let Harvest = [
        `${hg4} | **${username}**, bạn đã trồng ${hg4}! Gõ Yruong để xem khi nào thu hoạch được nhé!!!`,
        `${hg4} | **${username}**, you planted ${hg4}! Type Yfield to see when it ripe!!!`
      ]
      await client.reply(client, message, Harvest, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }).catch(e => console.log(e))
    }
    else if (interaction.customId == n5) {
      await interaction.deferUpdate()
      let hatgiong = await client.grow(`${authorid}`, `${hg5}`)
      let noCrops = [
        `${client.emo.fail} | **${username}**, bạn đã hết hạt ${hg5} để trồng!`,
        `${client.emo.fail} | **${username}**, you have 0 ${hg5}! Buy some to grow!`
      ]
      if (hatgiong == 0) return await client.reply(client, message, noCrops, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      let plant = await plantSchema.findOne({ key: `${n5}_${authorid}` })
      let planted = [
        `${client.emo.fail} | **${username}**, bạn đã trồng ${hg5} rồi! Xin hãy trồng loại khác!`,
        `${client.emo.fail} | **${username}**, you have already planted ${hg5}!`
      ]
      if (plant) return await client.reply(client, message, planted, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      await client.trugrow(`${authorid}`, `${hg5}`, 1, 'ns');
      await client.timeout(message.author.id, `trong${n5}`)
      let addplant = new plantSchema({ key: `${n5}_${authorid}`, value: `true` })
      await addplant.save()
      let Harvest = [
        `${hg5} | **${username}**, bạn đã trồng ${hg5}! Gõ Yruong để xem khi nào thu hoạch được nhé!!!`,
        `${hg5} | **${username}**, you planted ${hg5}! Type Yfield to see when it ripe!!!`
      ]
      await client.reply(client, message, Harvest, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }).catch(e => console.log(e))
    }
    else if (interaction.customId == n6) {
      await interaction.deferUpdate()
      let hatgiong = await client.grow(`${authorid}`, `${hg6}`)
      let noCrops = [
        `${client.emo.fail} | **${username}**, bạn đã hết hạt ${hg6} để trồng!`,
        `${client.emo.fail} | **${username}**, you have 0 ${hg6}! Buy some to grow!`
      ]
      if (hatgiong == 0) return await client.reply(client, message, noCrops, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      let plant = await plantSchema.findOne({ key: `${n6}_${authorid}` })
      let planted = [
        `${client.emo.fail} | **${username}**, bạn đã trồng ${hg6} rồi! Xin hãy trồng loại khác!`,
        `${client.emo.fail} | **${username}**, you have already planted ${hg6}!`
      ]
      if (plant) return await client.reply(client, message, planted, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      await client.trugrow(`${authorid}`, `${hg6}`, 1, 'ns');
      await client.timeout(message.author.id, `trong${n6}`)
      let addplant = new plantSchema({ key: `${n6}_${authorid}`, value: `true` })
      await addplant.save()
      let Harvest = [
        `${hg6} | **${username}**, bạn đã trồng ${hg6}! Gõ Yruong để xem khi nào thu hoạch được nhé!!!`,
        `${hg6} | **${username}**, you planted ${hg6}! Type Yfield to see when it ripe!!!`
      ]
      await client.reply(client, message, Harvest, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }).catch(e => console.log(e))
    }
    else if (interaction.customId == n7) {
      await interaction.deferUpdate()
      let hatgiong = await client.grow(`${authorid}`, `${hg7}`)
      let noCrops = [
        `${client.emo.fail} | **${username}**, bạn đã hết hạt ${hg7} để trồng!`,
        `${client.emo.fail} | **${username}**, you have 0 ${hg7}! Buy some to grow!`
      ]
      if (hatgiong == 0) return await client.reply(client, message, noCrops, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      let plant = await plantSchema.findOne({ key: `${n7}_${authorid}` })
      let planted = [
        `${client.emo.fail} | **${username}**, bạn đã trồng ${hg7} rồi! Xin hãy trồng loại khác!`,
        `${client.emo.fail} | **${username}**, you have already planted ${hg7}!`
      ]
      if (plant) return await client.reply(client, message, planted, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      await client.trugrow(`${authorid}`, `${hg7}`, 1, 'ns');
      await client.timeout(message.author.id, `trong${n7}`)
      let addplant = new plantSchema({ key: `${n7}_${authorid}`, value: `true` })
      await addplant.save()
      let Harvest = [
        `${hg7} | **${username}**, bạn đã trồng ${hg7}! Gõ Yruong để xem khi nào thu hoạch được nhé!!!`,
        `${hg7} | **${username}**, you planted ${hg7}! Type Yfield to see when it ripe!!!`
      ]
      await client.reply(client, message, Harvest, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }).catch(e => console.log(e))
    }
    else if (interaction.customId == n8) {
      await interaction.deferUpdate()
      let hatgiong = await client.grow(`${authorid}`, `${hg8}`)
      let noCrops = [
        `${client.emo.fail} | **${username}**, bạn đã hết hạt ${hg8} để trồng!`,
        `${client.emo.fail} | **${username}**, you have 0 ${hg8}! Buy some to grow!`
      ]
      if (hatgiong == 0) return await client.reply(client, message, noCrops, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      let plant = await plantSchema.findOne({ key: `${n8}_${authorid}` })
      let planted = [
        `${client.emo.fail} | **${username}**, bạn đã trồng ${hg8} rồi! Xin hãy trồng loại khác!`,
        `${client.emo.fail} | **${username}**, you have already planted ${hg8}!`
      ]
      if (plant) return await client.reply(client, message, planted, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      await client.trugrow(`${authorid}`, `${hg8}`, 1, 'ns');
      await client.timeout(message.author.id, `trong${n8}`)
      let addplant = new plantSchema({ key: `${n8}_${authorid}`, value: `true` })
      await addplant.save()
      let Harvest = [
        `${hg8} | **${username}**, bạn đã trồng ${hg8}! Gõ Yruong để xem khi nào thu hoạch được nhé!!!`,
        `${hg8} | **${username}**, you planted ${hg8}! Type Yfield to see when it ripe!!!`
      ]
      await client.reply(client, message, Harvest, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }).catch(e => console.log(e))
    }
    else if (interaction.customId == n9) {
      await interaction.deferUpdate()
      let hatgiong = await client.grow(`${authorid}`, `${hg9}`)
      let noCrops = [
        `${client.emo.fail} | **${username}**, bạn đã hết hạt ${hg9} để trồng!`,
        `${client.emo.fail} | **${username}**, you have 0 ${hg9}! Buy some to grow!`
      ]
      if (hatgiong == 0) return await client.reply(client, message, noCrops, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      let plant = await plantSchema.findOne({ key: `${n9}_${authorid}` })
      let planted = [
        `${client.emo.fail} | **${username}**, bạn đã trồng ${hg9} rồi! Xin hãy trồng loại khác!`,
        `${client.emo.fail} | **${username}**, you have already planted ${hg9}!`
      ]
      if (plant) return await client.reply(client, message, planted, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      await client.trugrow(`${authorid}`, `${hg9}`, 1, 'ns');
      await client.timeout(message.author.id, `trong${n9}`)
      let addplant = new plantSchema({ key: `${n9}_${authorid}`, value: `true` })
      await addplant.save()
      let Harvest = [
        `${hg9} | **${username}**, bạn đã trồng ${hg9}! Gõ Yruong để xem khi nào thu hoạch được nhé!!!`,
        `${hg9} | **${username}**, you planted ${hg9}! Type Yfield to see when it ripe!!!`
      ]
      await client.reply(client, message, Harvest, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }).catch(e => console.log(e))
    }
    else if (interaction.customId == n10) {
      await interaction.deferUpdate()
      let hatgiong = await client.grow(`${authorid}`, `${hg10}`)
      let noCrops = [
        `${client.emo.fail} | **${username}**, bạn đã hết hạt ${hg10} để trồng!`,
        `${client.emo.fail} | **${username}**, you have 0 ${hg10}! Buy some to grow!`
      ]
      if (hatgiong == 0) return await client.reply(client, message, noCrops, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      let plant = await plantSchema.findOne({ key: `${n10}_${authorid}` })
      let planted = [
        `${client.emo.fail} | **${username}**, bạn đã trồng ${hg10} rồi! Xin hãy trồng loại khác!`,
        `${client.emo.fail} | **${username}**, you have already planted ${hg10}!`
      ]
      if (plant) return await client.reply(client, message, planted, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      await client.trugrow(`${authorid}`, `${hg10}`, 1, 'ns');
      await client.timeout(message.author.id, `trong${n10}`)
      let addplant = new plantSchema({ key: `${n10}_${authorid}`, value: `true` })
      await addplant.save()
      let Harvest = [
        `${hg10} | **${username}**, bạn đã trồng ${hg10}! Gõ Yruong để xem khi nào thu hoạch được nhé!!!`,
        `${hg10} | **${username}**, you planted ${hg10}! Type Yfield to see when it ripe!!!`
      ]
      await client.reply(client, message, Harvest, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }).catch(e => console.log(e))
    }
    else if (interaction.customId == n11) {
      await interaction.deferUpdate()
      let hatgiong = await client.grow(`${authorid}`, `${hg11}`)
      let noCrops = [
        `${client.emo.fail} | **${username}**, bạn đã hết hạt ${hg11} để trồng!`,
        `${client.emo.fail} | **${username}**, you have 0 ${hg11}! Buy some to grow!`
      ]
      if (hatgiong == 0) return await client.reply(client, message, noCrops, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      let plant = await plantSchema.findOne({ key: `${n11}_${authorid}` })
      let planted = [
        `${client.emo.fail} | **${username}**, bạn đã trồng ${hg11} rồi! Xin hãy trồng loại khác!`,
        `${client.emo.fail} | **${username}**, you have already planted ${hg11}!`
      ]
      if (plant) return await client.reply(client, message, planted, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      await client.trugrow(`${authorid}`, `${hg11}`, 1, 'ns');
      await client.timeout(message.author.id, `trong${n11}`)
      let addplant = new plantSchema({ key: `${n11}_${authorid}`, value: `true` })
      await addplant.save()
      let Harvest = [
        `${hg11} | **${username}**, bạn đã trồng ${hg11}! Gõ Yruong để xem khi nào thu hoạch được nhé!!!`,
        `${hg11} | **${username}**, you planted ${hg11}! Type Yfield to see when it ripe!!!`
      ]
      await client.reply(client, message, Harvest, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }).catch(e => console.log(e))
    }
    else if (interaction.customId == n12) {
      await interaction.deferUpdate()
      let hatgiong = await client.grow(`${authorid}`, `${hg12}`)
      let noCrops = [
        `${client.emo.fail} | **${username}**, bạn đã hết hạt ${hg12} để trồng!`,
        `${client.emo.fail} | **${username}**, you have 0 ${hg12}! Buy some to grow!`
      ]
      if (hatgiong == 0) return await client.reply(client, message, noCrops, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      let plant = await plantSchema.findOne({ key: `${n12}_${authorid}` })
      let planted = [
        `${client.emo.fail} | **${username}**, bạn đã trồng ${hg12} rồi! Xin hãy trồng loại khác!`,
        `${client.emo.fail} | **${username}**, you have already planted ${hg12}!`
      ]
      if (plant) return await client.reply(client, message, planted, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      await client.trugrow(`${authorid}`, `${hg12}`, 1, 'ns');
      await client.timeout(message.author.id, `trong${n12}`)
      let addplant = new plantSchema({ key: `${n12}_${authorid}`, value: `true` })
      await addplant.save()
      let Harvest = [
        `${hg12} | **${username}**, bạn đã trồng ${hg12}! Gõ Yruong để xem khi nào thu hoạch được nhé!!!`,
        `${hg12} | **${username}**, you planted ${hg12}! Type Yfield to see when it ripe!!!`
      ]
      await client.reply(client, message, Harvest, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }).catch(e => console.log(e))
    }
    else if (interaction.customId == n13) {
      await interaction.deferUpdate()
      let hatgiong = await client.grow(`${authorid}`, `${hg13}`)
      let noCrops = [
        `${client.emo.fail} | **${username}**, bạn đã hết hạt ${hg13} để trồng!`,
        `${client.emo.fail} | **${username}**, you have 0 ${hg13}! Buy some to grow!`
      ]
      if (hatgiong == 0) return await client.reply(client, message, noCrops, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      let plant = await plantSchema.findOne({ key: `${n13}_${authorid}` })
      let planted = [
        `${client.emo.fail} | **${username}**, bạn đã trồng ${hg13} rồi! Xin hãy trồng loại khác!`,
        `${client.emo.fail} | **${username}**, you have already planted ${hg13}!`
      ]
      if (plant) return await client.reply(client, message, planted, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }
      ).catch(e => console.log(e))
      await client.trugrow(`${authorid}`, `${hg13}`, 1, 'ns');
      await client.timeout(message.author.id, `trong${n13}`)
      let addplant = new plantSchema({ key: `${n13}_${authorid}`, value: `true` })
      await addplant.save()
      let Harvest = [
        `${hg13} | **${username}**, bạn đã trồng ${hg13}! Gõ Yruong để xem khi nào thu hoạch được nhé!!!`,
        `${hg13} | **${username}**, you planted ${hg13}! Type Yfield to see when it ripe!!!`
      ]
      await client.reply(client, message, Harvest, null).then(async msg => {
        await client.sleep(5000)
        await msg.delete()
      }).catch(e => console.log(e))
    }
  })
}