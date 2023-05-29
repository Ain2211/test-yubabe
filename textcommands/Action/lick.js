const { EmbedBuilder } = require('discord.js')
const axios = require('axios');
module.exports = {
  name: "lick",
	description: ["Liếm một ai đó ! ewww", "lick someone ! ewww"],
	aliases: ["liem"],
	usage: ["{prefix}lick @tag"],
	cooldown: 300,
	category: "Action",
	canuse: "everyone",
	errorcd: ["Bạn phải chờ **{time}**", "You must wait **{time}**"],
  run: async (client, message, args) => {
    let random = [
      `Mlem mlem`,
      `Ngon qua tr qua dat`,
      `😋`
    ]
    let word = random[Math.floor(Math.random() * random.length)]
    let victim = message.mentions.users.first()
    if (!victim) return message.channel.send("Bạn cô đơn lắm hả? Muốn tự liếm mình hả?")
    const image = await axios('https://api.waifu.pics/sfw/lick').then((res) =>
      res.data ? res.data.url : null
    );
    if (!image) return message.channel.send("Đã có lỗi xảy ra")
    const embed = new EmbedBuilder()
     .setAuthor({name: message.author.username,iconURL: message.author.avatarURL({ dynamic: true })})
      .setColor("#FF69B4")
      .setDescription(`${victim} đã bị ${message.author.username} liếm!`)
      .setImage(image)
      .setTimestamp()
      .setFooter({text: word})

    message.channel.send({embeds: [embed]});

  }
}