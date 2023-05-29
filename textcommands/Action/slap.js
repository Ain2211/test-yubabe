const { EmbedBuilder } = require('discord.js')
const axios = require('axios');
module.exports = {
  name: "slap",
	description: ["Tán một ai đó, Tán tỉnh :))", "Slap someone !"],
	aliases: ["tan"],
	usage: ["{prefix}slap @tag"],
	cooldown: 300,
	category: "Action",
	canuse: "everyone",
	errorcd: ["Bạn phải chờ **{time}**", "You must wait **{time}**"],
  run: async (client, message, args) => {
    let random = [
      `Anh tan cho tinh nhe ?!`,
      `1 va~ nay`,
      `Ngon cai~ tieng nua!`,
    ]
    let word = random[Math.floor(Math.random() * random.length)]
    let victim = message.mentions.users.first()
    if (!victim) return message.channel.send("Đừng tự làm đau mình chứ?")
    const image = await axios('https://api.waifu.pics/sfw/slap').then((res) =>
      res.data ? res.data.url : null
    );
    if (!image) return message.channel.send("Đã có lỗi xảy ra")
    const embed = new EmbedBuilder()
     .setAuthor({name: message.author.username,iconURL: message.author.avatarURL({ dynamic: true })})
      .setColor("#FF69B4")
      .setDescription(`${victim} đã bị ${message.author.username} tát vào mồm té xỉu!!`)
      .setImage(image)
      .setTimestamp()
      .setFooter({text: word})

    message.channel.send({ embeds: [embed]});

  }
}