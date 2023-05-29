const SoundBoard = require("djs-soundboard")
module.exports = {
  name: 'tts',
  cooldown: 0,
  description: "Cày điểm may mắn",
  usage: "Ydotnhang",
  aliases: [],
  description2: "Pray for you and your friends",
  usage2: "Ypray [tag]",
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  run: async (client, message, args) => {
    let sound = new SoundBoard()
    let channel = message.member.voice.channel // required*
    let text = args[0]
    try {
       sound.tts(channel, "bruh") //Text
    } catch (err) {
      console.log(err)
    }

  }
}
//npm i ffmpeg-static
//npm install discordjs/opus
