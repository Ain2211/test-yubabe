
const { EmbedBuilder } = require('discord.js')
const axios = require('axios');
module.exports = {
  name: "hug",
	description: ["Ôm một người nào đó !", "Hug someone !"],
	aliases: ["om"],
	usage: ["{prefix}hug @tag"],
	cooldown: 300,
	category: "Action",
	canuse: "everyone",
	errorcd: ["Bạn phải chờ **{time}**", "You must wait **{time}**"],
  run: async (client, message, args) => {
    let random = [
      `Anh se luon ben em ma`,
      `Yeu em nhieu, nhung khong dam noi!`,
      `Mai ben nhau ban nhe`,
      `Cho bop dit mieng <3`
    ]
    let word = random[Math.floor(Math.random() * random.length)]
    let victim = message.mentions.users.first()
    if (!victim) return message.channel.send("Bạn cô đơn lắm hả? Muốn tự ôm mình hả?")
    const image = await axios('https://api.waifu.pics/sfw/hug').then((res) =>
      res.data ? res.data.url : null
    );
    if (!image) return message.channel.send("Đã có lỗi xảy ra")
    const embed = new EmbedBuilder()
     .setAuthor({name: message.author.username,iconURL: message.author.avatarURL({ dynamic: true })})
      .setColor("#FF69B4")
      .setDescription(`${victim} đã nhận được một cái ôm từ ${message.author.username}`)
      .setImage(image)
      .setTimestamp()
      .setFooter({text: word})

    message.channel.send({embeds: [embed]});

  }
}