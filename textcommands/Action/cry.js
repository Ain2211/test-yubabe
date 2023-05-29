const { EmbedBuilder } = require('discord.js')
const axios = require('axios');
module.exports = {
 	name: "cry",
	description: ["HuHu"],
	aliases: ["khoc"],
	usage: ["{prefix}cry"],
	cooldown: 300,
	category: "Action",
	canuse: "everyone",
	errorcd: ["Bạn phải chờ **{time}**", "You must wait **{time}**"],
  run: async (client, message, args) => {
    let random = [
      `Yeu em nhieu, nhung khong dam noi!`,
      `Anh se luon ben em ma`,
      `Yeu em nhieu, nhung khong dam noi!`,
      `Mai ben nhau ban nhe`
    ]
    let word = random[Math.floor(Math.random() * random.length)]
    // let victim = message.mentions.users.first()
    // if (!victim) return message.channel.send("Bạn cô đơn lắm hả? Muốn có người vỗ về bạn hả?")
    const image = await axios('https://api.waifu.pics/sfw/cry').then((res) =>
      res.data ? res.data.url : null
    );
    if (!image) return message.channel.send("Đã có lỗi xảy ra")
    const embed = new EmbedBuilder()
      .setAuthor({name: message.author.username,iconURL: message.author.avatarURL({ dynamic: true })})
      .setColor("#FF69B4")
      .setDescription(`${message.author.username} đã khóc thật to!!`)
      .setImage(image)
      .setTimestamp()
      .setFooter({text: `Co sao hong ?`})

    message.channel.send({embeds: [embed]});

  }
}