const questSchema = require("../../models/questSchema")
module.exports = {
  name: 'coinflip',
  cooldown: 20000,
  description: "Check tài khoản ngân hàng của bạn!",
  usage: "Ycf + <tiền đặt> + mặt úp|ngửa",
  aliases: ['cf', 'tungdongxu', 'tdx'],
  description2: "Play coinflip",
  usage2: "Ycf <money> <h/t>",
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB()
    const lang = await db.get(`${message.guild.id}_languages`)
    //return message.reply(`Lệnh đang được sửa chữa`)
    if (lang == "en") {
      let member = message.author;
      let text = args.join(' ').split(' ')
      let tiền = parseInt(text);
      let choice
      for (let t in text) {
        let choose1 = `h`
        let choose2 = `t`
        if (text.includes(choose1)) choice = `h`
        else if (text.includes(choose2)) choice = `t`
        else choice = `h`
      }
      if (parseInt(text) > 150000) tiền = 150000;
      if ((tiền) > 150000) tiền = 150000;
      const cash = await client.cash(member.id);
      if (!args[0]) return message.channel.send(`How much you'll bet?`);
      else if (text.includes(`all`)) {
        tiền = cash
        if (cash > 150000) tiền = 150000
      }
      if ((cash) < 1) return message.channel.send(`You have nothing...`)
      if (!text.includes(`all`) && isNaN(tiền)) tiền = 1
      if (parseInt(text) > cash) return message.channel.send(`You haven't enough money!`);
      if ((tiền) > cash) return message.channel.send(`You haven't enough money!`);
      if ((tiền) < 0) return message.channel.send(`Money can't be negative!`);
      if ((tiền) > 10000000000) return message.channel.send(`You've type a huge amount...`);


      let coinside = [
        "<:Yucf_up:940859097375440936>",
        "<:Yucf_ngua:940859032267288606>"
      ];
      let coin = coinside[Math.floor(Math.random() * coinside.length)];
      let mat = []
      if (choice == "t") {
        mat = "tail"
      }
      else {
        mat = "head"
      }
      let message1 = await message.channel.send(`<a:Yucf_quay:940859189759180830> | **${message.author.username}** spent **${tiền.toLocaleString('En-us')} Ycoin** and choose **${mat}**`).catch(e => console.log(e))
      await client.sleep(3000);
      if (mat == "tail" && coin == "<:Yucf_up:940859097375440936>") {
        await client.cong(member.id, tiền)
        await message1.edit(`<:Yu_Ycoin:953323682246316082> | Result is  : ${coin}, **${message.author.username}** you've won **${tiền.toLocaleString('En-us')} Ycoin**`).catch(e => console.log(e));
      } else if (mat == "head" && coin == "<:Yucf_ngua:940859032267288606>") {
        await client.cong(member.id, tiền)
        await message1.edit(`<:Yu_Ycoin:953323682246316082> | Result is  : ${coin}, **${message.author.username}** you've won **${tiền.toLocaleString('En-us')} Ycoin**`).catch(e => console.log(e));
      } else {
        await client.tru(member.id, tiền)
        await message1.edit(`<:Yu_Ycoin:953323682246316082> | Result is  : ${coin}, **${message.author.username}** you've lost **${tiền.toLocaleString('En-us')} Ycoin**`).catch(e => console.log(e));
      }
    }
    else if (lang == "vi") {
      let member = message.author;
      let text = args.join(' ').split(' ')
      let tiền = parseInt(text);
      let choice
      for (let t in text) {
        let choose1 = `n`
        let choose2 = `u`
        if (text.includes(choose1)) choice = `n`
        else if (text.includes(choose2)) choice = `u`
        else choice = `n`
      }
      if (parseInt(text) > 150000) tiền = 150000;
      if ((tiền) > 150000) tiền = 150000;
      const cash = await client.cash(member.id);
      if (!args[0]) return message.channel.send(`Đặt bao nhiêu?`);
      else if (text.includes(`all`)) {
        tiền = cash
        if (cash > 150000) tiền = 150000
      }
      if ((cash) < 1) return message.channel.send(`Bạn còn cái gì đâu mà all`)
      if (!text.includes(`all`) && isNaN(tiền)) tiền = 1
      if (parseInt(text) > cash) return message.channel.send(`Làm gì đủ tiền mà đua đòi`);
      if ((tiền) > cash) return message.channel.send(`Làm gì đủ tiền mà đua đòi`);
      if ((tiền) < 0) return message.channel.send(`Người sống không chơi tiền âm bạn ơi !`);
      if ((tiền) > 10000000000) return message.channel.send(`không tiền nhập số bé thôi má`);


      let coinside = [
        "<:Yucf_up:940859097375440936>",
        "<:Yucf_ngua:940859032267288606>"
      ];
      let coin = coinside[Math.floor(Math.random() * coinside.length)];
      let mat = []
      if (choice == "u") {
        mat = "úp"
      }
      else {
        mat = "ngửa"
      }
      let message1 = await message.channel.send(`<a:Yucf_quay:940859189759180830> | **${message.author.username}** đã bỏ ra **${tiền.toLocaleString('En-us')} Ycoin** và chọn **${mat}**`).catch(e => console.log(e))
      await client.sleep(3000);
      if (mat == "úp" && coin == "<:Yucf_up:940859097375440936>") {
        await client.cong(member.id, tiền)
        await message1.edit(`<:Yu_Ycoin:953323682246316082> | Kết quả là : ${coin}, **${message.author.username}** bạn đã thắng **${tiền.toLocaleString('En-us')} Ycoin**`).catch(e => console.log(e));
      } else if (mat == "ngửa" && coin == "<:Yucf_ngua:940859032267288606>") {
        await client.cong(member.id, tiền)
        await message1.edit(`<:Yu_Ycoin:953323682246316082> | Kết quả là : ${coin}, **${message.author.username}** bạn đã thắng **${tiền.toLocaleString('En-us')} Ycoin**`).catch(e => console.log(e));
      } else {
        await client.tru(member.id, tiền)
        await message1.edit(`<:Yu_Ycoin:953323682246316082> | Kết quả là : ${coin}, **${message.author.username}** bạn đã thua **${tiền.toLocaleString('En-us')} Ycoin**`).catch(e => console.log(e));
      }
    }



  }
}
