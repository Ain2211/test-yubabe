const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const marrySchema = require('../../models/marrySchema')
const userReg = RegExp(/<@!?(\d+)>/)
const invSchema = require('../../models/invSchema')
const anhcuoiSchema = require(`../../models/anhcuoi`)
module.exports = {
  name: "divorce",
  description: ["Đường Ai Nấy Đi...", "No longer by your side... we..should we end up?"],
  aliases: ["divor", 'lyhon', 'lydi'],
  usage: ["{prefix}lyhon", "{prefix}divorce"],
  cooldown: 0,
  category: "Marry",
  canuse: "everyone",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({table: "DB"})
    const lang = await db.get(`${message.guild.id}_languages`)
    const data = await marrySchema.findOne({ authorid: message.author.id })
    const errorNoLove = [
      "Đồ F.A",
      "You're single... no marriage to display..."
    ]
    if (!data) return await client.reply(client, message, errorNoLove, null).catch(e => console.log(e))
    const husband = message.author
    let wifeid = data.wifeid
    let lovedata = await marrySchema.findOne({ id: wifeid })
    if (!data && !lovedata) {
      return await client.reply(client, message, errorNoLove, null).catch(e => console.log(e))
    } else {
      let dacodoi = data.wifeid || data.husbandid
      let nhan = data.nhan || lovedata.nhan || 0
      let lyhon = new EmbedBuilder()
        .setTitle(`❤️Ôi trời có thật là muốn ly hôn không ?❤️`)
        .setDescription(`<@!${husband.id}> <a:yl_timnhay:903011590876569630>  <@!${dacodoi}>
Bạn và người ấy đã cưới bằng nhẫn ${nhan}`)
        .setFooter({ text: `Hãy quyết định thật kỹ nhé!!` })

      let lyhon2 = new EmbedBuilder()
        .setTitle(`❤️ Geez.. really ?❤️`)
        .setDescription(`<@!${husband.id}> <a:yl_timnhay:903011590876569630>  <@!${dacodoi}>
You and your partner married by Ring ${nhan}`)
        .setFooter({ text: `Make a clearly decision!!` })
      let embed1
      if (lang == `vi`) embed1 = lyhon
      if (lang == `en`) embed1 = lyhon2
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('break')
            .setEmoji('949079502959566978')
            .setStyle(ButtonStyle.Success)
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId('thinkaboutit')
            .setLabel('❌')
            .setStyle(ButtonStyle.Danger)
        )
      let lyhonmessage = await message.channel.send({ embeds: [embed1], components: [row] }).catch(e => console.log(e));
      const filter = i => i.customId === 'break' && i.user.id === message.author.id || i.customId === 'thinkaboutit' && i.user.id === message.author.id
      const collector = await message.channel.createMessageComponentCollector({ filter, time: 30000 });
      collector.on('collect', async i => {
        if (i.customId === 'break') {
          const data = await marrySchema.findOne({ authorid: message.author.id })
          const wifeid = data.wifeid
          await marrySchema.deleteOne({ authorid: wifeid })
          await marrySchema.deleteOne({ authorid: message.author.id })
          let LeaveRela = [
            `<a:Yu_traitimvo:949079502959566978> *Đường ai nấy đi, không còn vương vấn* <a:Yu_traitimvo:949079502959566978>`,
            `<a:Yu_traitimvo:949079502959566978> *Since that moment, we have no longer been together.. My road... will never have you..* <a:Yu_traitimvo:949079502959566978>`
          ]
          await client.send(client, message, LeaveRela, null)
        }
        else if (i.customId === 'thinkaboutit') {
          let noThink = [
            `💟 Vẫn còn cứu vãn... hãy thử hỏi han vài câu... 💟`,
            `💟 Still some hope... Try to take a romantic dinner... 💟`
          ]
          return client.send(client, message, noThink, null)
        }
      })
    }
  }
}
