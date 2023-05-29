const { EmbedBuilder } = require('discord.js')
const axios = require('axios');
module.exports = {
 	name: "dance",
	description: ["HuHu"],
	aliases: ["nhaydi"],
	usage: ["{prefix}nhaydi"],
	cooldown: 300,
	category: "Action",
	canuse: "everyone",
	errorcd: ["Bạn phải chờ **{time}**", "You must wait **{time}**"],
  run: async (client, message, args) => {
    let random = [
      `Nhảy, nhảy đi! Tăng tăng tăng, tăng tắng tắng tằng tằng tằng`,
      `Nhịp điệu Cha Cha Cha`,
      `Wo men bu yi yang!`,
    ]
    let word = random[Math.floor(Math.random() * random.length)]
    // let victim = message.mentions.users.first()
    // if (!victim) return message.channel.send("Bạn cô đơn lắm hả? Muốn có người vỗ về bạn hả?")
    const image = await axios('https://api.waifu.pics/sfw/dance').then((res) =>
      res.data ? res.data.url : null
    );
    if (!image) return message.channel.send("Đã có lỗi xảy ra")
    const embed = new EmbedBuilder()
      .setAuthor({name: message.author.username,iconURL: message.author.avatarURL({ dynamic: true })})
      .setColor("#FF69B4")
      .setDescription(`Dẫy lên đi pà con!!`)
      .setImage(image)
      .setTimestamp()
      .setFooter({text: `Quãy? Cơ trưởng gọi nghe rõ trả lời.`})

    message.channel.send({embeds: [embed]});

  }
}