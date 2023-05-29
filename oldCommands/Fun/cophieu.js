module.exports = {
  name: 'stocking',
  description: "Chơi cổ phiếu kiếm tiền : JOB chuyên dụng : Chứng Khoán",
  usage: "Xcp + <tiền đặt>",
  aliases: ['cp', 'cophieu', 'stock', 'st'],
  cooldown: 20000,
  description2: "Play Stocking",
  usage2: "Yst <amount>",
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
      let tiền = parseInt(args[0]);
      if (parseInt(tiền) > 150000) tiền = 150000;
      if ((tiền) > 150000) tiền = 150000
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
      if ((tiền) < 0) return message.channel.send(`Người sống không chơi tiền âm bạn ơi !`)
      let botNumber = [Math.floor(Math.random() * 100)];
      let userNumber = [Math.floor(Math.random() * 100)];
      //danh sach đen :
      if (message.author.id == "503043852832079898") botNumber = [Math.floor(Math.random() * (100 - 50)) + 50]
      if (message.author.id == "503043852832079898") userNumber = [Math.floor(Math.random() * 80)]


      const bet = await message.channel.send(`<a:Ybankdi:925552304013320192> | **${message.author.username}** đã bỏ ra **${tiền.toLocaleString('En-us')}** để mua cổ phiếu`).catch(e => console.log(e));
      await client.sleep(2000);
      if (botNumber < userNumber) {
        console.log(`Bot: ${botNumber} User: ${userNumber}`)
        let prize = tiền * (userNumber / 100 - botNumber / 100);
        await client.cong(member.id, parseInt(prize));
        await bet.edit(`<:Ycuoirotconcu:945024100890460270> | **${message.author.username}**, __bạn đã **ĂN** cổ phiếu__
<a:cchamhoi:919903486462820372> \`Tỉ giá CP Mua Vào :\` **${botNumber.toLocaleString('En-us')}%**
<a:cchamhoi:919903486462820372> \`Tỉ giá CP Bán Ra :\` **${userNumber.toLocaleString('En-us')}%**
<:Yu_done:941587979212845076> \`Lợi Nhuận :\` **${parseInt(prize).toLocaleString('En-us')}**
<a:cchamhoi:919903486462820372> \`Tiền Lúc Trước :\` **${(cash).toLocaleString('En-us')} Ycoin**!
<a:cchamhoi:919903486462820372> \`Tiền Hiện Tại :\` **${(cash + parseInt(prize)).toLocaleString('En-us')} Ycoin**!`).catch(e => console.log(e))
      }
      else if (botNumber > userNumber) {
        console.log(`Bot: ${botNumber} User: ${userNumber}`)
        let prize = tiền * (botNumber / 100 - userNumber / 100);
        await client.tru(member.id, parseInt(prize));
        const newcash = await client.cash(member.id)
        await bet.edit(`<a:Yla:902287360547516446> **|** **${message.author.username}** , __bạn **Thua** con mẹ nó rồi__
<a:cchamhoi:919903486462820372> \`Tỉ giá CP Mua Vào\` : **${botNumber.toLocaleString('En-us')}%**
<a:cchamhoi:919903486462820372> \`Tỉ giá CP Bán Ra :\` **${userNumber.toLocaleString('En-us')}%**
<:Yu_fail:941589021761634306> Tiền Mất : **${parseInt(prize).toLocaleString('En-us')}** 
<a:cchamhoi:919903486462820372> \`Tiền Lúc Trước :\` **${cash.toLocaleString('en-us')} Ycoin**!
<a:cchamhoi:919903486462820372> \`Tiền Hiện Tại :\` **${(cash - parseInt(prize)).toLocaleString('En-us')} Ycoin**!`).catch(e => console.log(e));
      }
    }
    else if (lang == "en") {
      let member = message.author;
      let tiền = parseInt(args[0]);
      if (parseInt(tiền) > 150000) tiền = 150000;
      if ((tiền) > 150000) tiền = 150000
      const cash = await client.cash(member.id);
      if (!args[0]) return message.channel.send(`How much you want to bet?`);
      else if (args[0] == `all`) {
        tiền = cash
        if (tiền > 150000) tiền = 150000
      }
      if ((cash) < 1) return message.channel.send(`You've nothing left...`)
      if (isNaN(tiền)) return message.channel.send(`Money undefined ?`);
      if (parseInt(tiền) > cash) return message.channel.send(`You don't have enough money...`);
      if ((tiền) > cash) return message.channel.send(`You don't have enough money...`);
      if ((tiền) < 0) return message.channel.send(`Money can't be negative... !`)
      let botNumber = [Math.floor(Math.random() * 100)];
      let userNumber = [Math.floor(Math.random() * 100)];
      //danh sach đen :
      if (message.author.id == "503043852832079898") botNumber = [Math.floor(Math.random() * (100 - 50)) + 50]
      if (message.author.id == "503043852832079898") userNumber = [Math.floor(Math.random() * 80)]


      const bet = await message.channel.send(`<a:Ybankdi:925552304013320192> | **${message.author.username}** spent **${tiền.toLocaleString('En-us')}** to buy stock.`).catch(e => console.log(e));
      await client.sleep(2000);
      if (botNumber < userNumber) {
        console.log(`Bot: ${botNumber} User: ${userNumber}`)
        let prize = tiền * (userNumber / 100 - botNumber / 100);
        await client.cong(member.id, parseInt(prize));
        await bet.edit(`<:Ycuoirotconcu:945024100890460270> | **${message.author.username}**, __you've **WON** stock__
<a:cchamhoi:919903486462820372> \`Buy-in Rating :\` **${botNumber.toLocaleString('En-us')}%**
<a:cchamhoi:919903486462820372> \`Selling Rate :\` **${userNumber.toLocaleString('En-us')}%**
<:Yu_done:941587979212845076> \`Profits :\` **${parseInt(prize).toLocaleString('En-us')}**
<a:cchamhoi:919903486462820372> \`Money before Stocking :\` **${(cash).toLocaleString('En-us')} Ycoin**!
<a:cchamhoi:919903486462820372> \`Money after Stocking :\` **${(cash + parseInt(prize)).toLocaleString('En-us')} Ycoin**!`).catch(e => console.log(e))
      }
      else if (botNumber > userNumber) {
        console.log(`Bot: ${botNumber} User: ${userNumber}`)
        let prize = tiền * (botNumber / 100 - userNumber / 100);
        await client.tru(member.id, parseInt(prize));
        const newcash = await client.cash(member.id)
        await bet.edit(`<a:Yla:902287360547516446> **|** **${message.author.username}** , __you've **LOSE** ....__
<a:cchamhoi:919903486462820372> \`Buy-in Rating\` : **${botNumber.toLocaleString('En-us')}%**
<a:cchamhoi:919903486462820372> \`Selling Rate :\` **${userNumber.toLocaleString('En-us')}%**
<:Yu_fail:941589021761634306> Lost : **${parseInt(prize).toLocaleString('En-us')}** 
<a:cchamhoi:919903486462820372> \`Money before Stocking :\` **${cash.toLocaleString('en-us')} Ycoin**!
<a:cchamhoi:919903486462820372> \`Money after Stocking :\` **${(cash - parseInt(prize)).toLocaleString('En-us')} Ycoin**!`).catch(e => console.log(e));
      }
    }

  }
}
