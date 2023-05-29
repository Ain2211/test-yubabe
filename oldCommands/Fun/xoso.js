const { EmbedBuilder } = require('discord.js');

const number = require('../../config/nbxs.json');
function toSmallNum(count, digits) {
  var result = '';
  var num = count;
  if (count < 0) count = 0;
  for (i = 0; i < digits; i++) {
    var digit = count % 10;
    count = Math.trunc(count / 10);
    result = number.numbers[digit] + result;
  }
  return result;
}
module.exports = {
  name: 'xoso',
  cooldown : 0,
  description: "Check tài khoản ngân hàng của bạn!",
  usage: "Ycf + <tiền đặt> + mặt úp|ngửa",
  aliases: ['xs'],
  run: async (client, message, args) => {
    if (message.guild.id !== `896744428100804688`) return
    if (message.author.id == `896739787392819240`) {
      const author = message.author.id
      const number1 = Math.floor(Math.random() * 999999) + 1
      const number2 = Math.floor(Math.random() * 999999) + 1
      const number3 = Math.floor(Math.random() * 999999) + 1
      const number4 = Math.floor(Math.random() * 999999) + 1
      const number5 = Math.floor(Math.random() * 999999) + 1
      const number6 = Math.floor(Math.random() * 999999) + 1
      const number7 = Math.floor(Math.random() * 999999) + 1
      const number8 = Math.floor(Math.random() * 999999) + 1
      const number9 = Math.floor(Math.random() * 999999) + 1
      const number10 = Math.floor(Math.random() * 999999) + 1

      const xoso = new EmbedBuilder()
        .setTitle(`Xổ Số YULAND!!!`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/944316979626528789/979133548667764786/Big-win-banner-Design-on-transparent-background-PNG.png`)
        .setDescription(`
●${toSmallNum(number1, 6)}\n●${toSmallNum(number2, 6)}\n●${toSmallNum(number3, 6)}\n●${toSmallNum(number4, 6)}\n●${toSmallNum(number5, 6)}
●●●●●
●${toSmallNum(number6, 6)}\n●${toSmallNum(number7, 6)}\n●${toSmallNum(number8, 6)}\n●${toSmallNum(number9, 6)}\n●${toSmallNum(number10, 6)}`)
        .setImage(`https://thumbs.dreamstime.com/b/bingo-lottery-balls-golden-confetti-poster-text-lucky-big-win-lotto-game-internet-leisure-vector-gambling-realistic-189033328.jpg`)
        .setFooter(`DMS nhận giải trong 24h cùng ngày!`)
      await message.channel.send({ content: `<@&959010287653101598>`, embeds: [xoso] })
    }
    else if (message.author.id == `893688556965466152`) {
      const author = message.author.id
      const number1 = Math.floor(Math.random() * 99) + 1
      const number2 = Math.floor(Math.random() * 99) + 1
      const number3 = Math.floor(Math.random() * 99) + 1
      const number4 = Math.floor(Math.random() * 99) + 1
      const number5 = Math.floor(Math.random() * 99) + 1
      const number6 = Math.floor(Math.random() * 99) + 1
      const number7 = Math.floor(Math.random() * 99) + 1
      const number8 = Math.floor(Math.random() * 99) + 1
      const number9 = Math.floor(Math.random() * 99) + 1
      const number10 = Math.floor(Math.random() * 99) + 1

      const xoso = new EmbedBuilder()
        .setTitle(`Xổ Số YULAND!!!`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/944316979626528789/979133548667764786/Big-win-banner-Design-on-transparent-background-PNG.png`)
        .setDescription(`**__Giải X3__**
●${toSmallNum(number1, 2)}\n●${toSmallNum(number2, 2)}\n●${toSmallNum(number3, 2)}\n●${toSmallNum(number4, 2)}\n●${toSmallNum(number5, 2)} 
●●●●●
**__Giải X4__**
●${toSmallNum(number6, 2)}\n●${toSmallNum(number7, 2)}\n●${toSmallNum(number8, 2)}\n●${toSmallNum(number9, 2)}\n●${toSmallNum(number10, 2)}`)
        .setImage(`https://thumbs.dreamstime.com/b/bingo-lottery-balls-golden-confetti-poster-text-lucky-big-win-lotto-game-internet-leisure-vector-gambling-realistic-189033328.jpg`)
        .setFooter(`DMS nhận giải trước 0h cùng ngày!`)
      await message.channel.send({ content: `<@&959010287653101598>`, embeds: [xoso] })
    }


  }
}