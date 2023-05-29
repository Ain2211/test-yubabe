const BanSchema = require('../../models/BanSchema')
const { QuickDB } = require('quick.db');
const db = new QuickDB();
module.exports = {
  name: 'balance',
  cooldown: 5000,
  description: "Xem tài khoản của bạn và đua top cùng mọi người!",
  description2: 'Check your balance and be on top!!',
  usage2: "Ybal",
  usage: "Ybalance",
  aliases: ['bal', 'cash', 'coin', 'money'],
  cderror: 'đừng vội thế chứ, bạn vừa check tài khoản mà',
  use: 'sử dụng lệnh tiếp!!',
  cderror2: 'don\'t rush, you\'ve just check your balance',
  use2: "check again <3",
  usage: "Yhunt",
  run: async (client, message, args) => {
    let memberid = message.author.id
    let cash = await client.cash(memberid)
    let custom = await client.custom(memberid, "cash", false)
    let content = [
`<:Yu_Ycoin:953323682246316082> **|** **${message.author.username}** , bạn đang có **${cash.toLocaleString('En-us')} Ycoin**`,
          `<:Yu_Ycoin:953323682246316082> **|** **${message.author.username}** , you're now having **${cash.toLocaleString('En-us')} Ycoin**`
        ]
    if (custom)
    {
      let startContent = custom
      let moneyText = "{money}"
      console.log(startContent) 
        if(!startContent.includes(moneyText)) startContent += "{money}"
      let newcontent = startContent
      .replaceAll(/\\n/g, "\n")
      .replaceAll(/{name}/g, message.author.username)
      .replaceAll(/{tag}/g, `<@${message.author.id}>`)
      .replaceAll(/{money}/g, `${cash.toLocaleString("en-us")} <:Yu_Ycoin:953323682246316082>`)
   console.log(newcontent)               
  content = [
      newcontent,
      newcontent
    ]    
  }
    await client.reply(client, message, content, null).catch((e) => console.log(e))
  }
}
