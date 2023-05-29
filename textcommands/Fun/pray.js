const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "pray",
  description: ["Cày điểm may mắn", "Pray for you and your friends"],
  aliases: ['dotnhang', 'dichua', 'ditu', 'samhoi', 'caunguyen'],
  usage: ["{prefix}pray [tag]", "{prefix}pray [tag]"],
  cooldown: 300000,
  category: "Fun",
  canuse: "everyone",
  errorcd: ["Vẫn còn **{time}** trước khi bạn có thể cầu nguyện tiếp!", "Still left **{time}** before pray again!"],
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({table: "DB"})
    const lang = await db.get(`${message.guild.id}_languages`)
    if (message.author.id == "945071381182296144" || message.author.id == "896739787392819240") {
      const member = message.author;
      const user = message.mentions.users.first();
      if (!user) {
        await client.pray(member.id);
        const prayed = await client.prayed(member.id);
        const prays = new EmbedBuilder()
          .setTitle(`<a:yl_moon:920437547950301294> | ${message.author.username} đã cầu nguyện`)
          .setThumbnail(`https://media.discordapp.net/attachments/987747294134816808/1027910256044560445/IMG_0065.jpg?width=468&height=468`)
          .setDescription(`<a:hoahong:910600476460990495> *Oh, Carolina knows why for years they’ve said.
That I was guilty as sin and sleep in a liar’s bed.
But the sleep comes fast and i’ll meet no ghosts.
It’s between me, the sand, and the sea, Carolina knows.* <a:emoji_22:1033052982985642014> 
<a:Yhoa:945619719355002881> **__${prayed}__** <a:Yhoa:945619719355002881> 
<a:emoji_24:1035838551780245544> \`North Carolina - ${new Date(Date.now()).toLocaleString("vi", { timeZone: "Asia/Ho_Chi_Minh" })}\``)
          .setFooter({ text: `Cầu nguyện để nhận sự may mắn!🍀`, iconURL: 'https://cdn.discordapp.com/emojis/983135001300307968.png' })
        message.channel.send({ content: `<@${message.author.id}>`, embeds: [prays] });
      }
      else {
        await client.pray(user.id);
        await client.curse(member.id)
        const prayed = await client.prayed(user.id)
        const cursed = await client.prayed(member.id);
        const prays = new EmbedBuilder()
          .setTitle(`<a:yl_moon:920437547950301294> | ${message.author.username} đã cầu nguyện cho ${user.username}`)
          .setColor(0xfae4ff)
          .setThumbnail(`https://i.gifer.com/7Or5.gif`)
          .addFields({ name: `<a:Yngoisaohivong:919968345418268714> | ${user.username}, bạn đã có được ${prayed + 1} điểm may mắn `, value: `<a:Yngoisaohivong:919968345418268714> | ${message.author.username}, bạn còn ${cursed - 1} điểm may mắn`, inline: true })
          .setFooter({ text: `Cầu nguyện để nhận sự may mắn!🍀`, iconURL: 'https://cdn.discordapp.com/emojis/983135001300307968.png' })
        await message.channel.send({ content: `<@${message.author.id}>`, embeds: [prays] }).catch(e => console.log(e));
      }
    }
    else if (lang == "vi") {
      const member = message.author;
      const user = message.mentions.users.first();
      if (!user) {
        await client.pray(member.id);
        const prayed = await client.prayed(member.id);
        const prays = new EmbedBuilder()
          .setTitle(`<a:yl_moon:920437547950301294> | ${message.author.username} đã cầu nguyện`)
          .setColor(0xfae4ff)
          .setThumbnail(`https://i.gifer.com/7Or5.gif`)
          .setDescription(`\`Bạn đã thắp được:\`
<a:Yngoisaohivong:919968345418268714> **__${prayed + 1}__**  <a:Yngoisaohivong:919968345418268714> **ngọn nến may mắn!**`)
          .setFooter({ text: `Cầu nguyện để nhận sự may mắn!🍀`, iconURL: 'https://cdn.discordapp.com/emojis/983135001300307968.png' })
        message.channel.send({ content: `<@${message.author.id}>`, embeds: [prays] });
      }
      else {
        await client.pray(user.id);
        await client.curse(member.id)
        const prayed = await client.prayed(user.id)
        const cursed = await client.prayed(member.id);
        const prays = new EmbedBuilder()
          .setTitle(`<a:yl_moon:920437547950301294> | ${message.author.username} đã cầu nguyện cho ${user.username}`)
          .setColor(0xfae4ff)
          .setThumbnail(`https://i.gifer.com/7Or5.gif`)
          .addFields({ name: `<a:Yngoisaohivong:919968345418268714> | ${user.username}, bạn đã có được ${prayed + 1} điểm may mắn `, value: `<a:Yngoisaohivong:919968345418268714> | ${message.author.username}, bạn còn ${cursed - 1} điểm may mắn`, inline: true })
          .setFooter({ text: `Cầu nguyện để nhận sự may mắn!🍀`, iconURL: 'https://cdn.discordapp.com/emojis/983135001300307968.png' })
        await message.channel.send({ content: `<@${message.author.id}>`, embeds: [prays] }).catch(e => console.log(e));
      }

    }
    else if (lang == "en") {
      const member = message.author;
      const user = message.mentions.users.first();
      if (!user) {
        await client.pray(member.id);
        const prayed = await client.prayed(member.id);
        const prays = new EmbedBuilder()
          .setTitle(`<a:yl_moon:920437547950301294> | ${message.author.username} prayed`)
          .setColor(0xfae4ff)
          .setThumbnail(`https://i.gifer.com/7Or5.gif`)
          .setDescription(`\`You've lighten:\`
<a:Yngoisaohivong:919968345418268714> **__${prayed + 1}__**  <a:Yngoisaohivong:919968345418268714> **lucky candles!**`)
          .setFooter({ text: `Pray to get some luck!🍀`, iconURL: 'https://cdn.discordapp.com/emojis/983135001300307968.png' })
        message.channel.send({ content: `<@${message.author.id}>`, embeds: [prays] });
      }
      else {
        await client.pray(user.id);
        await client.curse(member.id)
        const prayed = await client.prayed(user.id)
        const cursed = await client.prayed(member.id);
        const prays = new EmbedBuilder()
          .setTitle(`<a:yl_moon:920437547950301294> | ${message.author.username} prayed for ${user.username}`)
          .setColor(0xfae4ff)
          .setThumbnail(`https://i.gifer.com/7Or5.gif`)
          .addFields({ name: `<a:Yngoisaohivong:919968345418268714> | ${user.username}, you have ${prayed + 1} lucky points`, value: `<a:Yngoisaohivong:919968345418268714> | ${message.author.username}, you have ${cursed - 1} lucky points`, inline: true })
          .setFooter({ text: `Pray to get some luck!🍀`, iconURL: 'https://cdn.discordapp.com/emojis/983135001300307968.png' })
        await message.channel.send({ content: `<@${message.author.id}>`, embeds: [prays] }).catch(e => console.log(e));
      }
    }
  }
}