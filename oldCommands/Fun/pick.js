
module.exports = {
  name: 'pick',
  aliases: ["chon", "choose"],
  description: ["Đưa ra những lựa chọn", "Pick a choose from many!"],
  usage: ["{prefix}pick + <question>", "{prefix}pick + <question>"],
  cooldown: 0,
  category: "Fun",
  canuse: "everyone",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB()
    const lang = await db.get(`${message.guild.id}_languages`)

    const array = args.join(" ")
    let question = array.split(",")
    if (!question[1]) {
      const missingQuestion = [
        `Xin hãy đưa ra những lựa chọn! cách nhau bằng dấu phẩy!`,
        `Please provide an array of something to pick! Split by a comma`
      ]
      return await client.send(client, message, missingQuestion, null).catch(e => console.log(e))
    }
    let answer = question[Math.floor(Math.random() * question.length)];
    const responses = [
      `**${message.author.username}** tôi sẽ chọn: **__${answer}__**`,
      `**${message.author.username}**, I think the best one is: **__${answer}__**`
    ]
    await client.send(client, message, responses, null).catch(e => console.log(e));

  }
}