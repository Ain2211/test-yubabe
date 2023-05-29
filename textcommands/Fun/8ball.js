module.exports = {
  name: "8ball",
  description: ["Trả lời một câu hỏi yes/n", "Answer a yes/no question!"],
  aliases: ["cothay", "chohoi", "ask"],
  usage: ["{prefix}ask <question>", "{prefix}8ball + <question>"],
  cooldown: 0,
  category: "Fun",
  canuse: "everyone",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({table: "DB"})
    const lang = await db.get(`${message.guild.id}_languages`)
    let answers
    if (lang == "vi") answers = require('../../config/8ball.json')
    if (lang == "en") answers = require('../../config/9ball.json')
    const question = args.join(" ")

    if (!question) {
      const missingQuestion = [
        `Xin hãy đưa ra một câu hỏi!`,
        `Please ask something!`
      ]
      return await client.send(client, message, missingQuestion, null).catch(e => console.log(e))
    }
    let answer = answers[Math.floor(Math.random() * answers.length)];
    const responses = [
      `Nếu mà **${message.author.username}** hỏi **${question}** thì **${answer}**`,
      `If **${message.author.username}** asked **${question}**, I think the answer is: **${answer}**`
    ]
    await client.send(client, message, responses, null).catch(e => console.log(e));

  }
}