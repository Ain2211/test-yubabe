const questSchema = require("../../models/questSchema")
module.exports = {
  name: "coinflip",
  description: ["Chơi tung đồng xu!", "Play coinflip"],
  aliases: ["cf", "tdx"],
  usage: ["{prefix}cf <h/t> <bet>", "{prefix}cf <h/t> <bet>"],
  cooldown: 15000,
  category: "Fun",
  canuse: "everyone",
  errorcd: ["Xin hãy đợi **{time}** để chơi tung đồng xu tiếp!", "Please wait for **{time}** and play again!"],
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({table: "DB"})
    const lang = await db.get(`${message.guild.id}_languages`)
    //return message.reply(`Lệnh đang được sửa chữa`)
    if (lang == "en") {
      let member = message.author;
      let text = args.join(' ').split(' ')
      let tiền = parseInt(text[1]) || parseInt(text);
      let choice
      for (let t in text) {
        let choose1 = `h`
        let choose2 = `t`
        let choose3 = `n`
        let choose4 = `u`
        let choose5 = `ngua`
        let choose6 = `up`
        let choose7 = `head`
        let choose8 = `tail`
        if (text.includes(choose1) || text.includes(choose3) || text.includes(choose5) || text.includes(choose7)) choice = `h`
        else if (text.includes(choose2) || text.includes(choose4) || text.includes(choose6) || text.includes(choose8)) choice = `t`
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
      let message1 = await message.channel.send(`<a:Yucf_quay:1036951098847670343> | **${message.author.username}** spent **${tiền.toLocaleString('En-us')} Ycoin** and choose **${mat}**`).catch(e => console.log(e))
      await client.sleep(3000);
      if (mat == "tail" && coin == "<:Yucf_up:940859097375440936>") {
        await client.cong(member.id, tiền)
        await message1.edit(`<:Yu_Ycoin:953323682246316082> | Result is  : ${coin} [${mat}], **${message.author.username}** you've won **${tiền.toLocaleString('En-us')} Ycoin**`).catch(e => console.log(e));
      } else if (mat == "head" && coin == "<:Yucf_ngua:940859032267288606>") {
        await client.cong(member.id, tiền)
        await message1.edit(`<:Yu_Ycoin:953323682246316082> | Result is  : ${coin} [${mat}], **${message.author.username}** you've won **${tiền.toLocaleString('En-us')} Ycoin**`).catch(e => console.log(e));
      } else {
        await client.tru(member.id, tiền)
        await message1.edit(`<:Yu_Ycoin:953323682246316082> | Result is  : ${coin} [${mat}], **${message.author.username}** you've lost **${tiền.toLocaleString('En-us')} Ycoin**`).catch(e => console.log(e));
      }
    }
    else if (lang == "vi") {
      let member = message.author;
      let text = args.join(' ').split(' ')
      let tiền = parseInt(text[1]) || parseInt(text);
      let choice
      for (let t in text) {
        let choose1 = `h`
        let choose2 = `t`
        let choose3 = `n`
        let choose4 = `u`
        let choose5 = `ngua`
        let choose6 = `up`
        let choose7 = `head`
        let choose8 = `tail`
        if (text.includes(choose1) || text.includes(choose3) || text.includes(choose5) || text.includes(choose7)) choice = `n`
        else if (text.includes(choose2) || text.includes(choose4) || text.includes(choose6) || text.includes(choose8)) choice = `u`
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

        await client.tru(member.id, tiền)
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
      let message1 = await message.channel.send(`**__${message.author.username}__** đã bỏ ra **${tiền.toLocaleString('En-us')} Ycoin** và chọn **${mat}**
Đồng xu đang được tung lên : <a:Yucf_quay:1036951098847670343>`).catch(e => console.log(e))
      await client.sleep(3000);
      if (mat == "úp" && coin == "<:Yucf_up:940859097375440936>") {
        await client.cong(member.id, tiền*2)
        await message1.edit(`**__${message.author.username}__** đã bỏ ra **${tiền.toLocaleString('En-us')} Ycoin** và chọn **${mat}**
Kết quả là : ${coin} [${mat}], bạn đã thắng ${(tiền*2).toLocaleString('En-us')}`).catch(e => console.log(e));
      } else if (mat == "ngửa" && coin == "<:Yucf_ngua:940859032267288606>") {
        await client.cong(member.id, tiền*2)
        await message1.edit(`**__${message.author.username}__** đã bỏ ra **${tiền.toLocaleString('En-us')} Ycoin** và chọn **${mat}**
Kết quả là : ${coin} [${mat}], bạn đã thắng ${(tiền*2).toLocaleString('En-us')}`).catch(e => console.log(e));
      } else {
        await message1.edit(`**__${message.author.username}__** đã bỏ ra **${tiền.toLocaleString('En-us')} Ycoin** và chọn **${mat}**
Kết quả là : ${coin} [${mat == "úp"? "ngửa":"úp"}], bạn đã thua ${(tiền).toLocaleString('En-us')}`)
      }
    }

    

  }
}
