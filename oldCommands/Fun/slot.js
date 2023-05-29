
const { EmbedBuilder } = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const questSchema = require("../../models/questSchema")
module.exports = {
  name: "slot",
  description: ["Chơi máy slot!", "Play slot machine"],
  aliases: ["sl"],
  usage: ["{prefix}sl <bet>", "{prefix}sl <bet>"],
  cooldown: 15000,
  category: "Fun",
  canuse: "everyone",
  errorcd: ["Xin hãy đợi **{time}** để chơi tung đồng xu tiếp!", "Please wait for **{time}** and play again!"],
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB()
    const lang = await db.get(`${message.guild.id}_languages`)
    if (lang == "vi") {
      let member = message.author;
      let tiền = parseInt(args[0]);
      if (parseInt(tiền) > 150000) tiền = 150000;
      if ((tiền) > 150000) tiền = 150000;
      const cash = await client.cash(member.id);
      if (!args[0]) return message.channel.send(`Đặt bao nhiêu?`);
      else if (args[0] == `all`) {
        tiền = cash
        if (tiền > 150000) tiền = 150000
      }
      if ((cash) < 1) return message.channel.send(`Bạn còn cái gì đâu mà all`)
      if (isNaN(tiền)) return message.channel.send(`Nhập cái quái gì vậy ?`);
      if (parseInt(tiền) > cash) return message.channel.send(`Làm gì đủ tiền mà đua đòi`);
      if ((tiền) > cash) return message.channel.send(`Làm gì đủ tiền mà đua đòi`);
      if ((tiền) < 0) return message.channel.send(`Người sống không chơi tiền âm bạn ơi !`);
      if ((tiền) > 10000000000) return message.channel.send(`Không tiền nhập số bé thôi má`);
      const quest = await questSchema.findOne({ memberid: message.author.id, questtype: 4 })
      if (quest) {
        let process = quest.process
        if (process == 0) {
          await questSchema.deleteOne({ memberid: message.author.id, questtype: 4 })
          const ngocs = [
            "<:Yu_C_ngoc01:950898397144023090>",
            "<:Yu_C_ngoc02:950898697359724595>",
            "<:Yu_C_ngoc03:950898698022445137>",
          ]
          let loai1 = `${message.author.id}_Yu_C_ngoc01`
          let loai2 = `${message.author.id}_Yu_C_ngoc02`
          let loai3 = `${message.author.id}_Yu_C_ngoc03`

          await client.buff(loai1, 3)
          await client.buff(loai2, 2)
          await client.buff(loai3, 1)
          await message.channel.send(`Chúc mừng ${message.author.username} đã hoàn thành nhiệm vụ chơi slot, bạn nhận được : x3 ngọc ${ngocs[0]} x2 ngọc ${ngocs[1]} và x1 ngọc ${ngocs[2]} `).catch(e => console.log(e))
        }
        else {
          quest.process -= 1
          await quest.save()
          await message.channel.send(`\`Quest chơi coinflip : ${quest.process}/10\``).catch(e => console.log(e))
        }
      }
      await db.set(`slot_${message.author.id}`, Date.now())
      let slots1 = [
        "<:Yu_tao:940876514851950642>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_bo:940876684150849578>",
        "<:Yu_cherry:940876580111126578>",
        "<:Yu_tao:940876514851950642>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_bo:940876684150849578>",
        "<:Yu_cherry:940876580111126578>",
        "<:Yu_tao:940876514851950642>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_bo:940876684150849578>",
        "<:Yu_cherry:940876580111126578>",
        "<:Yu_Ycoin:953323682246316082>"
      ];
      let slots2 = [
        "<:Yu_tao:940876514851950642>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_bo:940876684150849578>",
        "<:Yu_cherry:940876580111126578>",
        "<:Yu_tao:940876514851950642>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_bo:940876684150849578>",
        "<:Yu_cherry:940876580111126578>",
        "<:Yu_tao:940876514851950642>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_bo:940876684150849578>",
        "<:Yu_cherry:940876580111126578>",
        "<:Yu_Ycoin:953323682246316082>",
        "<:Yu_nho:940876643159916544>"
      ];
      /**
  let slots3 = [
          "<:Yu_tao:940876514851950642>",
          "<:Yu_nho:940876643159916544>",
          "<:Yu_thom:940876441938165760>",
          "<:Yu_bo:940876684150849578>",
          "<:Yu_cherry:940876580111126578>",
          "<:Yu_Ycoin:953323682246316082>"
        ];
  **/
      let slot1 = slots1[Math.floor(Math.random() * slots1.length)];
      let slot2 = slots2[Math.floor(Math.random() * slots2.length)];
      const embed1 =
        `\`___SLOTS___ \`
<a:Yu_slot:940876262094819338> | <a:Yu_slot:940876262094819338> | <a:Yu_slot:940876262094819338>
\`|         | \`
\`|         |\`
\`Ycoin x10, Cherry x5, Táo x4, Bơ x3, Nho x2, Thơm hòa Vốn.\``
      const start = await message.reply({ content: embed1 }).catch(e => console.log(e))
      await sleep(1000);
      const embed2 =
        `\`___SLOTS___ \`
${slot1} | <a:Yu_slot:940876262094819338> | <a:Yu_slot:940876262094819338>
\`|         | \`
\`|         |\`
\`Ycoin x10, Cherry x5, Táo x4, Bơ x3, Nho x2, Thơm hòa Vốn.\``
      await start.edit(embed2)
      await sleep(1000)
      const embed3 = `\`___SLOTS___ \`
${slot1} | <a:Yu_slot:940876262094819338> | ${slot1}
\`|         | \`
\`|         |\`
\`Ycoin x10, Cherry x5, Táo x4, Bơ x3, Nho x2, Thơm hòa Vốn.\``
      await start.edit(embed3)
      await sleep(1000)
      let win = false
      let x = 0
      // "<:Yu_tao:940876514851950642>",
      //   "<:Yu_nho:940876643159916544>",
      //   "<:Yu_thom:940876441938165760>",
      //   "<:Yu_bo:940876684150849578>",
      //   "<:Yu_cherry:940876580111126578>",
      //   "<:Yu_Ycoin:953323682246316082>"
      if (slot1 == slot2 && slot1 === "<:Yu_Ycoin:953323682246316082>") win = true, x = 10
      else if (slot1 == slot2 && slot1 === "<:Yu_tao:940876514851950642>") win = true, x = 4
      else if (slot1 == slot2 && slot1 === "<:Yu_nho:940876643159916544>") win = true, x = 2
      else if (slot1 == slot2 && slot1 === "<:Yu_thom:940876441938165760>") win = true, x = 1
      else if (slot1 == slot2 && slot1 === "<:Yu_bo:940876684150849578>") win = true, x = 3
      else if (slot1 == slot2 && slot1 === "<:Yu_cherry:940876580111126578>") win = true, x = 5
      if (win) {
        let embed4 = `\`___SLOTS___ \`
${slot1} | ${slot2} | ${slot1}
\`|         | \`
\`|         |\`
\`Bạn đã thắng x${x} : ${(tiền * x).toLocaleString('En-Us')} \``

        await start.edit(embed4)
        await client.cong(message.author.id, (tiền * x - tiền))
      } else {
        let embed4 = `\`___SLOTS___ \`
${slot1} | ${slot2} | ${slot1}
\`|         | \`
\`|         |\`
\`Bạn đã thua ${tiền.toLocaleString('En-Us')}\``
        await start.edit(embed4)
        await client.tru(message.author.id, tiền)
      }
    }
    else if (lang == "en") {
      let member = message.author;
      let tiền = parseInt(args[0]);
      if (parseInt(tiền) > 150000) tiền = 150000;
      if ((tiền) > 150000) tiền = 150000;
      const cash = await client.cash(member.id);
      if (!args[0]) return message.channel.send(`How much you'll bet?`);
      else if (args[0] == `all`) {
        tiền = cash
        if (tiền > 150000) tiền = 150000
      }
      if ((cash) < 1) return message.channel.send(`You have no money...`)
      if (isNaN(tiền)) return message.channel.send(`Money must be integer..`);
      if (parseInt(tiền) > cash) return message.channel.send(`You don't have enough money!`);
      if ((tiền) > cash) return message.channel.send(`You don't have enough money!`);
      if ((tiền) < 0) return message.channel.send(`Money can't be negative!`);
      if ((tiền) > 10000000000) return message.channel.send(`You've typed a huge amount....`);
      const quest = await questSchema.findOne({ memberid: message.author.id, questtype: 4 })
      let slots1 = [
        "<:Yu_tao:940876514851950642>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_bo:940876684150849578>",
        "<:Yu_cherry:940876580111126578>",
        "<:Yu_tao:940876514851950642>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_bo:940876684150849578>",
        "<:Yu_cherry:940876580111126578>",
        "<:Yu_tao:940876514851950642>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_bo:940876684150849578>",
        "<:Yu_cherry:940876580111126578>",
        "<:Yu_Ycoin:953323682246316082>"
      ];
      let slots2 = [
        "<:Yu_tao:940876514851950642>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_bo:940876684150849578>",
        "<:Yu_cherry:940876580111126578>",
        "<:Yu_tao:940876514851950642>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_bo:940876684150849578>",
        "<:Yu_cherry:940876580111126578>",
        "<:Yu_tao:940876514851950642>",
        "<:Yu_nho:940876643159916544>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_thom:940876441938165760>",
        "<:Yu_bo:940876684150849578>",
        "<:Yu_cherry:940876580111126578>",
        "<:Yu_Ycoin:953323682246316082>",
        "<:Yu_nho:940876643159916544>"
      ];
      /**
  let slots3 = [
          "<:Yu_tao:940876514851950642>",
          "<:Yu_nho:940876643159916544>",
          "<:Yu_thom:940876441938165760>",
          "<:Yu_bo:940876684150849578>",
          "<:Yu_cherry:940876580111126578>",
          "<:Yu_Ycoin:953323682246316082>"
        ];
  **/
      let slot1 = slots1[Math.floor(Math.random() * slots1.length)];
      let slot2 = slots2[Math.floor(Math.random() * slots2.length)];
      const embed1 =
        `\`___SLOTS___ \`
<a:Yu_slot:940876262094819338> | <a:Yu_slot:940876262094819338> | <a:Yu_slot:940876262094819338>
\`|         | \`
\`|         |\`
\`Ycoin x10, Cherry x5, Apple x4, Avocado x3, Grape x2, PineApple draw.\``
      const start = await message.reply({ content: embed1 }).catch(e => console.log(e))
      await sleep(1000);
      const embed2 =
        `\`___SLOTS___ \`
${slot1} | <a:Yu_slot:940876262094819338> | <a:Yu_slot:940876262094819338>
\`|         | \`
\`|         |\`
\`Ycoin x10, Cherry x5, Apple x4, Avocado x3, Grape x2, PineApple draw.\``
      await start.edit(embed2)
      await sleep(1000)
      const embed3 = `\`___SLOTS___ \`
${slot1} | <a:Yu_slot:940876262094819338> | ${slot1}
\`|         | \`
\`|         |\`
\`Ycoin x10, Cherry x5, Apple x4, Avocado x3, Grape x2, PineApple draw.\``
      await start.edit(embed3)
      await sleep(1000)
      let win = false
      let x = 0
      // "<:Yu_tao:940876514851950642>",
      //   "<:Yu_nho:940876643159916544>",
      //   "<:Yu_thom:940876441938165760>",
      //   "<:Yu_bo:940876684150849578>",
      //   "<:Yu_cherry:940876580111126578>",
      //   "<:Yu_Ycoin:953323682246316082>"
      if (slot1 == slot2 && slot1 === "<:Yu_Ycoin:953323682246316082>") win = true, x = 10
      else if (slot1 == slot2 && slot1 === "<:Yu_tao:940876514851950642>") win = true, x = 4
      else if (slot1 == slot2 && slot1 === "<:Yu_nho:940876643159916544>") win = true, x = 2
      else if (slot1 == slot2 && slot1 === "<:Yu_thom:940876441938165760>") win = true, x = 1
      else if (slot1 == slot2 && slot1 === "<:Yu_bo:940876684150849578>") win = true, x = 3
      else if (slot1 == slot2 && slot1 === "<:Yu_cherry:940876580111126578>") win = true, x = 5
      if (win) {
        let embed4 = `\`___SLOTS___ \`
${slot1} | ${slot2} | ${slot1}
\`|         | \`
\`|         |\`
\`You've won x${x} : ${(tiền * x).toLocaleString('En-Us')} \``

        await start.edit(embed4)
        await client.cong(message.author.id, (tiền * x - tiền))
      } else {
        let embed4 = `\`___SLOTS___ \`
${slot1} | ${slot2} | ${slot1}
\`|         | \`
\`|         |\`
\`You've lost ${tiền.toLocaleString('En-Us')}\``
        await start.edit(embed4)
        await client.tru(message.author.id, tiền)
      }
    }
  }
}
