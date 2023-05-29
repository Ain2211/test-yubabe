
module.exports = {
  name: 'feed',
  cooldown: 0,
  description: "Cho thú nuôi ăn :D",
  usage: "Yn ga | bo | heo",
  aliases: ['n', 'nuoi', 'choan'],
  description2: "Feed the animals",
  usage2: "[prefix]feed <chicken | cow | pig>",
  run: async (client, message, args) => {
    const author = message.author.id
    const username = message.author.username   
  const { QuickDB } = require("quick.db")
    const db = new QuickDB()
    const lang = await db.get(`${message.guild.id}_languages`)
    await nuoi_thu(client,`<:YuGaCon:953394343148920902>`,`<:YuBoCon:953394492503908362>`, `<:YuHeoCon:953396171181817997>`, "ga", "bo", "heo", message, author, username)
  }
}
async function nuoi_thu(client, hg1, hg2, hg3, n1, n2, n3, message, authorid, username) {
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
        .setCustomId('ga'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg2)
        .setCustomId('bo'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(hg3)
        .setCustomId('heo'),
    );
  let startembed
  if (lang == "vi") startembed = new EmbedBuilder()
    .setAuthor({ name: message.author.username })
    .setTitle(`Bạn Muốn Nuôi Thú?`)
    .setDescription(`Nhấp Nút Bên Dưới Để Cho Thú Ăn`)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL())
  else if (lang == "en") startembed = new EmbedBuilder()
    .setAuthor({ name: message.author.username })
    .setTitle(`You want to feed your cattles?`)
    .setDescription(`Tap the buttons below`)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL())

  let reply = await message.reply({ embeds: [startembed], components: [buttonrow1] })

  var collector = reply.createMessageComponentCollector({
    filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
  })
  collector.on("collect", async (interaction) => {
    let thoc = await client.grow(message.author.id, `thoc`)
    let co = await client.grow(message.author.id, `co`)
    let camheo = await client.grow(message.author.id, `camheo`)
    let ga = await client.grow(message.author.id, `<:YuGaCon:953394343148920902>`)
    let bo = await client.grow(message.author.id, `<:YuBoCon:953394492503908362>`)
    let heo = await client.grow(message.author.id, `<:YuHeoCon:953396171181817997>`)
    let tinhhoa = "<:FoodElite:1029360819286331422>"
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
      const ErrorFeed = [
        `${client.emo.fail} | **${username}** , bạn đã hết thóc! Mua thim ik <3`,
        `${client.emo.fail} | **${username}** , you've ran out of Chicken's paddy! Please buy some! <3`
      ]
      if (thoc < 1) return await client.send(client, message, ErrorFeed, null).catch(e => console.log(e))
      const ErrorChicken = [
        `${client.emo.fail} | **${username}** , bạn không còn gà để nuôi, mua gà ik <3`,
        `${client.emo.fail} | **${username}** , you have no chicken, please buy one to raise it! <3`
      ]
      if (ga < 1) return await client.send(client, message, ErrorChicken, null).catch(e => console.log(e))
      let timeout = 3600000
      let lastfeed = await client.cd(message.author.id, `cdga`)
      let used = client.checkcd(lastfeed, timeout)
      let cooldown = used.after
      if (!cooldown) {
        const DelayMSG = [
          `${client.emo.fail} | **${message.author.username}**, bạn phải chờ : \`${used.h + `:` + used.m + `:` + used.s}s\` để cho gà ăn tiếp!`,
          `${client.emo.fail} | **${message.author.username}**, you have to wait : \`${used.h + `:` + used.m + `:` + used.s}s\` to feed those Chickens!`
        ]
        const delay = await client.send(client, message, DelayMSG, null).catch(e => console.log(e))
        await client.sleep(5000)
        await delay.delete()
        return
      }
      else {
        await client.timeout(message.author.id, `cdga`)
        if (ga > 4) {
          await client.trugrow(message.author.id, `<:YuGaCon:953394343148920902>`, 1, `thu`)
          await client.trugrow(message.author.id, `thoc`, 1, `food`)
          let solan = -(ga - 1) + 8
          const Raised = [
            `<:YuGaCon:953394343148920902> | **${username}**, bạn đã nuôi gà được **${solan}**/8 lần, tinh hoa sẽ được thu hoạch từ lần thứ 5!`,
            `<:YuGaCon:953394343148920902> | **${username}**, you've raised the Chickens for **${solan}**/8 times, Food Elite can be harvested by the 5th time!`
          ]
          await client.send(client, message, Raised, null).catch(e => console.log(e))
        }
        else if (ga <= 4 && ga > 0) {
          await client.trugrow(message.author.id, `<:YuGaCon:953394343148920902>`, 1, `thu`)
          await client.trugrow(message.author.id, `thoc`, 1, `food`)
          await client.addgrow(message.author.id, tinhhoa, 3, `elite`)
          let solan = -(ga - 1) + 8
          const Raised = [
            `<:YuGa:953394305614094336> | **${username}**, bạn đã nuôi gà được **${solan}**/8 lần, Bạn nhận được **__3__** ${tinhhoa}!`,
            `<:YuGa:953394305614094336> | **${username}**, you've raised the Chickens for **${solan}**/8 times, you've harvested **__3__** ${tinhhoa}!`
          ]
          await client.send(client, message, Raised, null).catch(e => console.log(e))
        }
                               }
    }
    else if (interaction.customId == n2) {
      await interaction.deferUpdate()
      const ErrorFeed = [
        `${client.emo.fail} | **${username}** , bạn đã hết cỏ! Mua thim ik <3`,
        `${client.emo.fail} | **${username}** , you've ran out of Cow's grass! Please buy some! <3`
      ]
      if (co < 1) return await client.send(client, message, ErrorFeed, null).catch(e => console.log(e))
      const ErrorCow = [
        `${client.emo.fail} | **${username}** , bạn không còn bò để nuôi, mua bò ik <3`,
        `${client.emo.fail} | **${username}** , you have no cow, please buy one to raise it! <3`
      ]
      if (bo < 1) return await client.send(client, message, ErrorCow, null).catch(e => console.log(e))
      let timeout = 7200000
      let lastfeed = await client.cd(message.author.id, `cdbo`)
      let used = client.checkcd(lastfeed, timeout)
      let cooldown = used.after
      if (!cooldown) {
        const DelayMSG = [
          `${client.emo.fail} | **${message.author.username}**, bạn phải chờ : \`${used.h + `:` + used.m + `:` + used.s}s\` để cho bò ăn tiếp!`,
          `${client.emo.fail} | **${message.author.username}**, you have to wait : \`${used.h + `:` + used.m + `:` + used.s}s\` to feed those Cows!`
        ]
        const delay = await client.send(client, message, DelayMSG, null).catch(e => console.log(e))
        await client.sleep(5000)
        await delay.delete()
        return
      }
      else {
        await client.timeout(message.author.id, `cdbo`)
        if (bo > 5) {
          await client.trugrow(message.author.id, `<:YuBoCon:953394492503908362>`, 1, 'thu')
          await client.trugrow(message.author.id, `co`, 1, 'food')
          let solan = -(bo - 1) + 10
          const Raised = [
            `<:YuBoCon:953394492503908362> | **${username}**, bạn đã nuôi bò được **${solan}**/10 lần, sữa sẽ được thu hoạch từ lần thứ 6!`,
            `<:YuBoCon:953394492503908362> | **${username}**, you've feed the cows for **${solan}**/10 times, milk can be harvested at the 6th time!`
          ]
          await client.send(client, message, Raised, null).catch(e => console.log(e))
        }
        else if (bo <= 5 && bo > 0) {
          client.trugrow(message.author.id, `<:YuBoCon:953394492503908362>`, 1, 'thu')
          client.trugrow(message.author.id, `co`, 1, 'food')
          client.addgrow(message.author.id, tinhhoa, 4, 'elite')
          let solan = -(bo - 1) + 10

          const Raised = [
            `<:YuConBo:953394436086308934> | **${username}**, bạn đã nuôi bò được **${solan}**/10 lần, Bạn nhận được **__4__** ${tinhhoa}!`,
            `<:YuConBo:953394436086308934> | **${username}**, you've feed the cows for **${solan}**/10 times, you've gotten **__4__** ${tinhhoa}!`
          ]
          await client.send(client, message, Raised, null).catch(e => console.log(e))
        }
    }
    }
    else if (interaction.customId == n3) {
      await interaction.deferUpdate()
      const ErrorFeed = [
        `${client.emo.fail} | **${username}** , bạn đã hết cám! Mua thim ik <3`,
        `${client.emo.fail} | **${username}** , you've ran out of Pig's pran! Please buy some! <3`
      ]
      if (camheo < 1) return await client.send(client, message, ErrorFeed, null).catch(e => console.log(e))
      const ErrorPig = [
        `${client.emo.fail} | **${username}** , bạn không còn heo để nuôi, mua heo ik <3`,
        `${client.emo.fail} | **${username}** , you have no pig, please buy one to raise it! <3`
      ]
      if (heo < 1) return await client.send(client, message, ErrorPig, null).catch(e => console.log(e))
      let timeout = 10800000
      let lastfeed = await client.cd(message.author.id, `cdheo`)
      let used = client.checkcd(lastfeed, timeout)
      let cooldown = used.after
      if (!cooldown) {
       const DelayMSG = [
          `${client.emo.fail} | **${message.author.username}**, bạn phải chờ : \`${used.h + `:` + used.m + `:` + used.s}s\` để cho heo ăn tiếp!`,
          `${client.emo.fail} | **${message.author.username}**, you have to wait : \`${used.h + `:` + used.m + `:` + used.s}s\` to feed those Pigs!`
        ]
        const delay = await client.send(client, message, DelayMSG, null).catch(e => console.log(e))
        await client.sleep(5000)
        await delay.delete()
        return
      }
      else {
        await client.timeout(message.author.id, `cdheo`)
        if (heo > 6) {
          await client.trugrow(message.author.id, `<:YuHeoCon:953396171181817997>`, 1, 'thu')
          await client.trugrow(message.author.id, `camheo`, 1, 'food')
          let solan = -(heo - 1) + 12
          const Feeds = [
            `<:YuHeoCon:953396171181817997> | **${username}**, bạn đã nuôi heo được **${solan}**/12 lần, thịt sẽ được thu hoạch từ lần thứ 7!`,
            `<:YuHeoCon:953396171181817997> | **${username}**, you've feed the Pigs for **${solan}**/12 times, meat can be harvested from 7th time!`
          ]
          await client.send(client, message, Feeds, null).catch(e => console.log(e))
        }
        else if (heo <= 6 && heo > 0) {
          await client.trugrow(message.author.id, `camheo`, 1, 'food')
          await client.trugrow(message.author.id, `<:YuHeoCon:953396171181817997>`, 1, 'thu')
          await client.addgrow(message.author.id, tinhhoa, 5, `elite`)
          let solan = -(heo - 1) + 12
          const Feeds = [
            `<:YuHeo:953394386165698610> | **${username}**, bạn đã nuôi heo được **${solan}**/12 lần, Bạn nhận được **__5__** ${tinhhoa}!`,
            `<:YuHeo:953394386165698610> | **${username}**, you've feed the Pigs for **${solan}**/12 times, you've harvested **__5__** ${tinhhoa}!`
          ]
          await client.send(client, message, Feeds, null).catch(e => console.log(e))
          await message.channel.send().catch(e => console.log(e))
        }
                 }
    }
  })
 }
