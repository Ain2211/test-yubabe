const BanSchema = require('../../models/BanSchema')
module.exports = {
  name: "bank",
  description: ["Check tiền trong tài khoản ngân hàng của bạn!", "Check your balance in Yubank"],
  aliases: [""],
  usage:["{prefix}bank", "{prefix}bank"],
  cooldown: 5000,
	category: "Eco",
	canuse: "everyone",
  errorcd : ["Xin hãy chờ **{time}** để thử lại! Bot sẽ dms cho bạn!", "Please wait for **{time}**, check your dms if you still can't see!"],
  run: async (client, message, args) => {   
    if (message.author.id == `896739787392819240`) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
      if (!args[0]) {
        const cash = await client.bank(message.author.id)
        message.author.send(`<a:Ykimcuonglaplanh:922597979146313830> **|** **${message.author.username}** , anh đang có **${cash.toLocaleString('En-us')} Ycoin** trong **Quỹ Đen**!`).catch((e) => console.log(e));
      } else {
        const cash = await client.bank(member.id)
        message.channel.send(`<a:Yu_cassh:942212732642537502> **|** **${member}** đang có **${cash.toLocaleString('En-us')} Ycoin** trong **ngân hàng**!`).catch((e) => console.log(e));
      }
    }
    else if (message.author.id == `893688556965466152`) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
      if (!args[0]) {
        const cash = await client.bank(message.author.id)
        message.author.send(`<a:Ykimcuonglaplanh:922597979146313830> **|** **${message.author.username}** đang giấu **${cash.toLocaleString('En-us')} Ycoin** trong **Ngân Hàng**!`).catch((e) => console.log(e));
      } else {
        const cash = await client.bank(member.id)
        message.channel.send(`<a:Yu_cassh:942212732642537502> **|** **${member}** đang có **${cash.toLocaleString('En-us')} Ycoin** trong **ngân hàng**!`).catch((e) => console.log(e));
      }
    }
    else if (message.author.id == `696893548863422494`) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
      if (!args[0]) {
        const cash = await client.bank(message.author.id)
        message.author.send(`<a:Ykimcuonglaplanh:922597979146313830> **|** **${message.author.username}** đang giấu **${cash.toLocaleString('En-us')} Ycoin** trong **Ngân Hàng**!`).catch((e) => console.log(e));
      } else {
        const cash = await client.bank(member.id)
        message.channel.send(`<a:Yu_cassh:942212732642537502> **|** **${member}** đang có **${cash.toLocaleString('En-us')} Ycoin** trong **ngân hàng**!`).catch((e) => console.log(e));
      }
    }
    else {
      let member = message.author;
      const cash = await client.bank(member.id);
      const bankMsg = [
        `<a:Yu_cassh:942212732642537502> **|** **${message.author.username}** , bạn đang có **${cash.toLocaleString('En-us')} Ycoin** trong **YUBANK**!`,
        `<a:Yu_cassh:942212732642537502> **|** **${message.author.username}** , you're having **${cash.toLocaleString('En-us')} Ycoin** in **YUBANK**!`
      ]
      await client.dms(client, message, message.author, bankMsg, null, null)
        .catch(async (e) => {
          console.log(e)
          await client.send(client, message, bankMsg, null)
        }
        );
    }
  }
          }