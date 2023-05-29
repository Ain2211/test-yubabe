const { EmbedBuilder } = require('discord.js')
const axios = require('axios');
module.exports = {
  name: "waifu",
	description: ["Xem waifu của bạn !", "Watch your waifu !"],
	aliases: ["wibu"],
	usage: ["{prefix}waifu"],
	cooldown: 300,
	category: "Action",
	canuse: "everyone",
	errorcd: ["Bạn phải chờ **{time}**", "You must wait **{time}**"],
  run: async (client, message, args) => {
    // let victim = message.mentions.users.first()
    // if (!victim) return message.channel.send("Bạn cô đơn lắm hả? Muốn có người vỗ về bạn hả?")
    const image = await axios('https://api.waifu.pics/sfw/waifu').then((res) =>
      res.data ? res.data.url : null
    );
    if (!image) return message.channel.send("Đã có lỗi xảy ra")
    const embed = new EmbedBuilder()
     .setAuthor({name: message.author.username,iconURL: message.author.avatarURL({ dynamic: true })})
      .setColor("#FF69B4")
      .setDescription(`Waifu của bạn ${message.author.username} đây!`)
      .setImage(image)
      .setTimestamp()
      .setFooter({text: `Co dep hong ?`})

    message.channel.send({embeds: [embed]});

  }
}