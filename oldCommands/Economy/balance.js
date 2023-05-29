const BanSchema = require('../../models/BanSchema')
const { QuickDB } = require('quick.db');
const db = new QuickDB();
module.exports = {
  name: 'checkbalance',
  cooldown: 5000,
  category: "ADMINISTRATOR",
  description: "Xem tài khoản của bạn và đua top cùng mọi người!",
  description2: 'Check your balance and be on top!!',
  usage2: "Ycheckbal",
  usage: "Ybalance",
  aliases: ['checkbal', 'checkcash'],
  cderror: 'đừng vội thế chứ, bạn vừa check tài khoản mà',
  use: 'sử dụng lệnh tiếp!!',
  cderror2: 'don\'t rush, you\'ve just check your balance',
  use2: "check again <3",
  usage: "Yhunt",
  run: async (client, message, args) => {
    if (client.admins.includes(message.author.id)) {
let member = message.mentions.members.first()
 
if (!member) member = client.users.cache.find(u => u.id == args[0]) || message.author
      if (!args[0] || member.id == `896739787392819240`) {
        const cash = await client.cash(message.author.id);
        await db.set(`${message.author.id}_money`, cash)
        let content = [
          `<:Yu_Ycoin:953323682246316082> **|** **${message.author.username}** , bạn đang có **${cash.toLocaleString('En-us')} Ycoin**`,
          `<:Yu_Ycoin:953323682246316082> **|** **${message.author.username}** , you're now having **${cash.toLocaleString('En-us')} Ycoin**`
        ]
        await client.send(client, message, content, null).catch((e) => console.log(e))
      } 
      else {
        const cash = await client.cash(member.id);
        await db.set(`${message.author.id}_money`, cash)
        let content = [
          `<:Yu_Ycoin:953323682246316082> **|** **${message.author.username}** , **${member.user.username ? member.user.username : member.username || args[0]}** đang có **${cash.toLocaleString('En-us')} Ycoin**`,
          `<:Yu_Ycoin:953323682246316082> **|** **${message.author.username}** , **${member.user.username ? member.user.username : member.username || args[0]}** is having **${cash.toLocaleString('En-us')} Ycoin** in their Pocket!`
        ]
        await client.send(client, message, content, null).catch((e) => console.log(e))
      }
    }
    else return
    /*{
      let member = message.author;
      const cash = await client.cash(member.id);
      let content = [
        `<:Yu_Ycoin:953323682246316082> **|** **${message.author.username}** , bạn đang có **${cash.toLocaleString('En-us')} Ycoin**`,
        `<:Yu_Ycoin:953323682246316082> **|** **${message.author.username}** , you're now having **${cash.toLocaleString('En-us')} Ycoin**`
      ]
      await client.send(client, message, content, null).catch((e) => console.log(e))

    }
*/
  }
}
