const questSchema = require("../../models/questSchema")
module.exports = {
  name: "threecard",
  description: ["Chơi tung đồng xu!", "Play coinflip"],
  aliases: ["baicao", "3la"],
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
    let bobai = require("../../config/blackjack.json")
	let cards = bobai.bj
	let game = await db.get(`${message.guild.id}.game3la`)
    if (!game) {
	 // await db.set(`${message.guild.id}.game3la`)
     message.channel.send(`${cards[Math.ceil(Math.random()*52)]}`)
	}
  }
}
