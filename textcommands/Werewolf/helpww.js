module.exports = {
	name: "helpwerewolf",
	description: ["Tính giùm bạn các phép tính cơ bản!", "Resolve your basic mathematics problem!"],
	aliases: ["hww", "helpww"],
	usage: ["{prefix} <> <> <>", "{prefix}add <> <> <>"],
	cooldown: 0,
	category: "Utils",
	canuse: "everyone",
	errorcd: ["{time}", "{time}"],
	run: async (client, message, args) => {
     const { EmbedBuilder } = require("discord.js")
	 const embedHelp = new EmbedBuilder()
		.setAuthor({name : message.author.tag, iconURL : message.author.avatarURL() })
		.setDescription(`Để chơi ma sói bạn cần setup như sau:
**CHANNEL NGÀY**
Yww set daychannel <ID CHANNEL CHAT BAN NGÀY>
=> Dành cho HOST nhận tin nhắn từ bot vào ban ngày!
**CHANNEL ĐÊM**
Yww set nightchannel <ID CHANNEL CHAT BAN ĐÊM>
=> Dành cho HOST nhận tin nhắn từ bot vào ban đêm! 
**Số Người Chơi Và Cơ Chế Phân Role**
=> Ít nhất 6 người - nhiều nhất 18 người!
Yww set player <Số người chơi>
Cứ 6 người sẽ có:
1 sói / 1 sói / 1 sói con
1 dân / 1 bán sói / 1 dân
1 phù thủy /  1 xạ thủ / 1 mục sư
1 bảo vệ / 1 thầy đồng / 1 bác sĩ
1 tiên tri / 1 thám tử / 1 dân
+ phe thứ ba
[1 ngố, 1 sát thủ, 1 tình nhân]

Với mỗi role : host sẽ setting : 
Yww set <tên role không dấu> <ID người chơi!>`)

		await message.reply({embeds : [embedHelp]})
	}
}