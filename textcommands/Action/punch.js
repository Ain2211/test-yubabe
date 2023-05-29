const { EmbedBuilder } = require('discord.js')
const axios = require('axios');
module.exports = {
  name: "punch",
	description: ["Kí đầu, gõ đầu một ai đó !", "Punch someone !"],
	aliases: ["kidau"],
	usage: ["{prefix}punch @tag"],
	cooldown: 300,
	category: "Action",
	canuse: "everyone",
	errorcd: ["Bạn phải chờ **{time}**", "You must wait **{time}**"],
  run: async (client, message, args) => {
    let random = [
      `Ngon noi tieng nua ?!`,
      `Cu dam sam sex`,
      `An 1 dam cho tinh nguoi nhe!`,
      `Cu dam with yeu thuong.`
    ]
    let word = random[Math.floor(Math.random() * random.length)]
    let victim = message.mentions.users.first()
    if (!victim) return message.channel.send("Bạn phải tag ai đó để đấm chứ?")
    const image = await axios('https://api.waifu.pics/sfw/punch').then((res) =>
      res.data ? res.data.url : null
    );
    if (!image) return message.channel.send("Đã có lỗi xảy ra")
    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL({ dynamic: true }) })
      .setColor("#FF69B4")
      .setDescription(`**${victim.user.username}** đã ăn một cú đấm bá cháy từ **${message.author.username}**`)
      .setImage(image)
      .setTimestamp()
      .setFooter({ text: word })

    await message.channel.send({ embeds: [embed] });

  }
}