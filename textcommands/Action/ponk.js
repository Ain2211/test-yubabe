const { EmbedBuilder } = require('discord.js')
const axios = require('axios');
module.exports = {
  name: "ponk",
	description: ["Danh chet cha m", "Ponk!!"],
	aliases: ["bonk", "danhchetmem"],
	usage: ["{prefix}ponk @tag"],
	cooldown: 300,
	category: "Action",
	canuse: "everyone",
	errorcd: ["Bạn phải chờ **{time}**", "You must wait **{time}**"],
  run: async (client, message, args) => {
    let random = [
      `Pók!`,
      `1 xac`,
      `Ngon noi tieng nua ?`,
    ]
    let word = random[Math.floor(Math.random() * random.length)]
    let victim = message.mentions.users.first()
    if (!victim) return message.channel.send("Đừng tự làm đau mình chứ?")
    const image = await axios('https://api.waifu.pics/sfw/bonk').then((res) =>
      res.data ? res.data.url : null
    );
    if (!image) return message.channel.send("Đã có lỗi xảy ra")
    const embed = new EmbedBuilder()
     .setAuthor({name: message.author.username,iconURL: message.author.avatarURL({ dynamic: true })})
      .setColor("#FF69B4")
      .setDescription(`${victim} đã bị ${message.author.username} bonk vào đầu!!`)
      .setImage(image)
      .setTimestamp()
      .setFooter({text: word})

    message.channel.send({embeds: [embed]});

  }
}