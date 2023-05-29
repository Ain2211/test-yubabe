const BanSchema = require('../../models/BanSchema')
const { QuickDB } = require('quick.db');
const db = new QuickDB();
module.exports = {
  name: 'level',
  cooldown: 5000,
  description: "Xem kinh nghiệm và level của bạn!",
  usage: "Ylvl",
  aliases: ['exp', 'lv', 'lvl', 'experience'],
  run: async (client, message, args) => {
    return
    const exp = await client.exp(message.author.id, `find`, 0)
    let e = 0
    let l = 1
    if (exp) e = exp.exp
    if (exp) l = exp.lv
    const { EmbedBuilder } = require('discord.js')

    let expembed = new EmbedBuilder()
      .setAuthor({ name: message.author.username })
      .setTitle(`Nông Dân Chăm Chỉ`)
      .addFields(
        {
          name: `<a:Ycheck:934446343861186620> Level`, value: `${parseInt(l).toLocaleString('en-us')}`
        },
        {
          name: `<a:Ykimcuonglaplanh:922597979146313830> Exp`, value: `**${parseInt(e).toLocaleString('en-us')}/${parseInt(l * l * 1000).toLocaleString('en-us')}**`
        }
      )
      .setFooter({ text: `Mỗi ngày có 20 lần tăng exp` })
      .setThumbnail(message.author.avatarURL())



    await message.channel.send({ embeds: [expembed] }).catch((e) => console.log(e))


  }
}