const { EmbedBuilder } = require('discord.js')
const questSchema = require("../../models/questSchema")
module.exports = {
  name: 'findball',
  cooldown: 20000,
  description: "Quả bóng sẽ nằm ở đâu nhỉ ?",
  usage: "Yfb + <1 | 2 | 3> + <tiền đặt>",
  aliases: ['fb', 'tb', 'timbanh', 'timbong'],
  description2: "Find the ball",
  usage2: "Yfb <1 | 2| 3> + <amount>",
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB()
    const lang = await db.get(`${message.guild.id}_languages`)

    if (lang == "vi") {
      let member = message.author;
      let tiền = parseInt(args[1]);
      if (parseInt(tiền) > 150000) tiền = 150000;
      if ((tiền) > 150000) tiền = 150000;
      const cash = await client.cash(member.id);
      if (!args[1] && cash > 1) args[1] = 1;
      if (!args[1] && cash < 1) return message.reply(`Bạn còn 0 đồng, lo làm ăn đi ạ!`)
      else if (args[1] == `all`) {
        tiền = cash
        if (tiền > 150000) tiền = 150000
      }
      if ((cash) < 1) return message.reply(`Bạn còn cái gì đâu mà all`)
      if (isNaN(tiền)) tiền = 1
      if (parseInt(tiền) > cash) return message.reply(`Làm gì đủ tiền mà đua đòi`);
      if ((tiền) > cash) return message.reply(`Làm gì đủ tiền mà đua đòi`);
      if ((tiền) < 0) return message.reply(`Người sống không chơi tiền âm bạn ơi !`);
      if ((tiền) > 10000000000) return message.reply(`không tiền nhập số bé thôi má`);
      let pics =
      {
        "1": "https://cdn.discordapp.com/attachments/944316979626528789/991067076762435614/1656354987996.png",
        "2": "https://cdn.discordapp.com/attachments/944316979626528789/991067076196171836/1656355077044.png",
        "3": "https://cdn.discordapp.com/attachments/944316979626528789/991067076452053082/1656355178917.png"
      }
      let array2 = [
        "https://cdn.discordapp.com/attachments/944316979626528789/991067076762435614/1656354987996.png",
        "https://cdn.discordapp.com/attachments/944316979626528789/991067076196171836/1656355077044.png",
        "https://cdn.discordapp.com/attachments/944316979626528789/991067076452053082/1656355178917.png"
      ]

      let luachon = pics[args[0]]
      let ketqua = array2[Math.floor(Math.random() * array2.length)]
      if (!args[0] || args[0] !== "1" && args[0] !== "2" && args[0] !== "3") args[0] = "1", luachon = `https://cdn.discordapp.com/attachments/944316979626528789/991067076762435614/1656354987996.png`
      let startembed = new EmbedBuilder()
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: `http://discord.gg/yuland` })
        .setDescription(`Bạn đã đặt **${tiền.toLocaleString('En-us')}** và chọn cốc **số ${args[0]}**`)
        .setFooter({ text: `Chúc bạn may mắn!` })
        .setImage(luachon)
        .setTimestamp()
      let message1 = await message.reply({ embeds: [startembed] }).catch(e => console.log(e))
      await client.sleep(3000)
      let rollembed = new EmbedBuilder()
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: `http://discord.gg/yuland` })
        .setDescription(`Bạn đã đặt **${tiền.toLocaleString('En-us')}** và chọn cốc **số ${args[0]}**`)
        .setFooter({ text: `Chúc bạn may mắn!` })
        .setImage(`https://cdn.discordapp.com/attachments/944316979626528789/991067075676102747/1656354590834.gif`)
        .setTimestamp()
      await message1.edit({ embeds: [rollembed] }).catch(e => console.log(e))
      await client.sleep(3000)
      if (luachon == ketqua) {
        let winembed = new EmbedBuilder()
          .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: `http://discord.gg/yuland` })
          .setDescription(`Bạn đã đặt **${tiền.toLocaleString('En-us')}** và chọn cốc **số ${args[0]}**. Kết quả là :`)
          .setColor('#15ff05')
          .setFooter({ text: `Bạn đã thắng ${tiền.toLocaleString('En-us')} Ycoin` })
          .setImage(ketqua)
          .setTimestamp()
        await message1.edit({ embeds: [winembed] }).catch(e => console.log(e))
        await client.cong(message.author.id, tiền)
      } else if (luachon !== ketqua) {
        let loseembed = new EmbedBuilder()
          .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: `http://discord.gg/yuland` })
          .setDescription(`Bạn đã đặt **${tiền.toLocaleString('En-us')}** và chọn cốc **số ${args[0]}**. Kết quả là :`)
          .setFooter({ text: `Bạn đã thua ${tiền.toLocaleString('En-us')} Ycoin | Tim banh trong 3 coc con k tim dc s tim duoc tinh yeu dich thuc trong hang ti? Nguoi - Măng` })
          .setColor('#ff2700')
          .setImage(ketqua)
          .setTimestamp()
        await message1.edit({ embeds: [loseembed] }).catch(e => console.log(e))
        await client.tru(message.author.id, tiền)
      }
    }
    else if (lang == "en") {
      let member = message.author;
      let tiền = parseInt(args[1]);
      if (parseInt(tiền) > 150000) tiền = 150000;
      if ((tiền) > 150000) tiền = 150000;
      const cash = await client.cash(member.id);
      if (!args[1] && cash > 1) args[1] = 1;
      if (!args[1] && cash < 1) return message.reply(`You have no money!`)
      else if (args[1] == `all`) {
        tiền = cash
        if (tiền > 150000) tiền = 150000
      }
      if ((cash) < 1) return message.reply(`You have no money!`)
      if (isNaN(tiền)) tiền = 1
      if (parseInt(tiền) > cash) return message.reply(`You don't have enough money...`);
      if ((tiền) > cash) return message.reply(`You don't have enough money...`);
      if ((tiền) < 0) return message.reply(`Money can't be negative`);
      if ((tiền) > 10000000000) return message.reply(`You typed a huge amount....`);
      let pics =
      {
        "1": "https://cdn.discordapp.com/attachments/944316979626528789/991067076762435614/1656354987996.png",
        "2": "https://cdn.discordapp.com/attachments/944316979626528789/991067076196171836/1656355077044.png",
        "3": "https://cdn.discordapp.com/attachments/944316979626528789/991067076452053082/1656355178917.png"
      }
      let array2 = [
        "https://cdn.discordapp.com/attachments/944316979626528789/991067076762435614/1656354987996.png",
        "https://cdn.discordapp.com/attachments/944316979626528789/991067076196171836/1656355077044.png",
        "https://cdn.discordapp.com/attachments/944316979626528789/991067076452053082/1656355178917.png"
      ]

      let luachon = pics[args[0]]
      let ketqua = array2[Math.floor(Math.random() * array2.length)]
      if (!args[0] || args[0] !== "1" && args[0] !== "2" && args[0] !== "3") args[0] = "1", luachon = `https://cdn.discordapp.com/attachments/944316979626528789/991067076762435614/1656354987996.png`
      let startembed = new EmbedBuilder()
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: `http://discord.gg/yuland` })
        .setDescription(`You've bet **${tiền.toLocaleString('En-us')}** and chosen **No. ${args[0]}**`)
        .setFooter({ text: `Goodluck!` })
        .setImage(luachon)
        .setTimestamp()
      let message1 = await message.reply({ embeds: [startembed] }).catch(e => console.log(e))
      await client.sleep(3000)
      let rollembed = new EmbedBuilder()
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: `http://discord.gg/yuland` })
        .setDescription(`You've bet **${tiền.toLocaleString('En-us')}** and chosen **No. ${args[0]}**`)
        .setFooter({ text: `Goodluck!` })
        .setImage(`https://cdn.discordapp.com/attachments/944316979626528789/991067075676102747/1656354590834.gif`)
        .setTimestamp()
      await message1.edit({ embeds: [rollembed] }).catch(e => console.log(e))
      await client.sleep(3000)
      if (luachon == ketqua) {
        let winembed = new EmbedBuilder()
          .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: `http://discord.gg/yuland` })
          .setDescription(`You've bet **${tiền.toLocaleString('En-us')}** and chosen **No. ${args[0]}**. Kết quả là :`)
          .setColor('#15ff05')
          .setFooter({ text: `You've won ${tiền.toLocaleString('En-us')} Ycoin` })
          .setImage(ketqua)
          .setTimestamp()
        await message1.edit({ embeds: [winembed] }).catch(e => console.log(e))
        await client.cong(message.author.id, tiền)
      } else if (luachon !== ketqua) {
        let loseembed = new EmbedBuilder()
          .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: `http://discord.gg/yuland` })
          .setDescription(`You've bet **${tiền.toLocaleString('En-us')}** and chosen **No. ${args[0]}**. Kết quả là :`)
          .setFooter({ text: `You've lost ${tiền.toLocaleString('En-us')} Ycoin | Can't find a ball in 3 cups, how can you find true love in 7bils people ? - Măng` })
          .setColor('#ff2700')
          .setImage(ketqua)
          .setTimestamp()
        await message1.edit({ embeds: [loseembed] }).catch(e => console.log(e))
        await client.tru(message.author.id, tiền)
      }
    }
  }
}
