const { QuickDB } = require("quick.db")
const db = new QuickDB()
const { AttachmentBuilder } = require("discord.js")
module.exports = {
  name: 'fishing',
  cooldown: 15000,
  description: "Săn thú và sở hữu khối tài sản khổng lồ của riêng bạn! Sử dụng ngọc để boost sức mạnh thợ săn của mình! JOB chuyên dùng : THỢ SĂN",
  description2: "Hunting and get your self a huge amount of cash, using gems to boost your hunter power!",
  aliases: ['cc', 'fs', 'fish', `cauca`],
  cderror: 'đừng vội thế chứ, bạn vừa đi câu mà',
  cderror2: 'don\'t rush, you\'ve just catch some fishes',
  use2: "you hard-working fisher <3",
  use: 'nhé!',
  usage: "Ycc",
  usage2: "Yfs",
  run: async (client, message, args) => {
    const fishes = [
      "<:10:1029696302159761418>",
      "<:11:1029696328919437352>",
      "<:12:1029696369037938708>",
      "<:13:1029696395671777292>",
      "<:14:1029696414651007017>",
      "<:15:1029696435085643796>",
      "<:16:1029696451900612668>",
      "<:17:1029696468820430878>",
      "<:26:1029698981128835133>",
      "<:28:1029699017598316556>",
      "<:31:1029699064146710528>",
      "<:33:1029699094584766464>",
      "<:34:1029699111269715979>",
      "<:1_:1029686391455629333>",
      "<:2_:1029687338118430731>",
      "<:3_:1029687639168790548>",
      "<:4_:1029689468728397865>",
      "<:5_:1029689486558384139>",
      "<:6_:1029689502479949886>",
      "<:7_:1029692997249540166>",
      "<:8_:1029693845090357259>",
      "<:9_:1029693917962178592>",

    ]
    let fails = [
      "cái nịt...",
      "đúng mỗi cái nịt...",
      "một mớ rác thải biển...",
      "<:24:1029698926619660288>",
      "<:32:1029699079061655573>",
    ]
    let fails2 = {
      "cái nịt..." : ", ngồi cả tiếng đồng hồ và chỉ câu được đúng cái nịt",
      "đúng mỗi cái nịt...": ", ngồi cả tiếng đồng hồ và chỉ câu được đúng mỗi cái nịt",
      "một mớ rác thải biển..." : ", ngồi cả tiếng đồng hồ và chỉ câu một mớ rác thải biển...",
      "<:24:1029698926619660288>": ", móc câu của bạn bị dính vào <:24:1029698926619660288> và không gỡ ra được!",
      "<:32:1029699079061655573>": ", câu được một thằng cha thợ lặn <:32:1029699079061655573>",
    }    
    let fish = fishes[Math.floor(Math.random() * fishes.length)]
    let failOrNot = Math.floor(Math.random() * 10000)
    if (failOrNot <= 7000) {
      fish = fails[Math.floor(Math.random() * fails.length)]
      await message.reply(`<:Yu_cancaudacbiet:952585357143195718> | Bạn đi câu cá ${fails2[fish]}`)
    } else {
      await client.animal(message.author.id, fish, 1, "fish")
      await message.reply(`<:Yu_cancaudacbiet:952585357143195718> | Bạn đi câu cá, và đã bắt được ${fish}!`)
    }

  }
}