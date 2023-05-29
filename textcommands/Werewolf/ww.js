module.exports = {
	name: "werewolf",
	description: ["Tính giùm bạn các phép tính cơ bản!", "Resolve your basic mathematics problem!"],
	aliases: ["ww"],
	usage: ["{prefix} <> <> <>", "{prefix}add <> <> <>"],
	cooldown: 0,
	category: "Utils",
	canuse: "everyone",
	errorcd: ["{time}", "{time}"],
	 run: async (client, message, args) => {
	const { QuickDB }= require("quick.db")
	const db = new QuickDB({table: "DB"})
	let guildid = message.guild.id
	if (args[0] == "set") {
    let player = parseInt(args[1])
    let arrayKey = [
		`🐺 Sói Đầu Đàn
 - Bạn sẽ là người ra quyết định giết ai!
 - Nếu có các sói khác, quản trò sẽ báo cho bạn, hãy tự đi tìm họ và thảo luận!
 - Thám tử soi bạn không ra thiện ác!
 - Cú pháp chọn giết : tôi chọn <tên người bị giết>`,
		`🚶Dân Thường 1
 - Sáng còng lưng đi làm, tối bị sói cắn :(`,
		`🧙‍♂️ Phù Thủy
 - Bạn có 1 Bình Độc và 1 Bình Hồi Sinh
 - Bình độc sử dụng vào đêm thứ 2 trở đi, hồi sinh sẽ có thể dùng khi có người chết!
 - Cú pháp sử dụng : 
Binh doc <tên nguoi độc>
Binh hs <tên người hồi sinh>`,
		`💂‍♂️ Bảo Vệ
 - Bạn có 1 Khiên, bạn được bảo vệ bạn hoặc người khác!
 Khi người đó bị sói cắn, bạn sẽ biết!
 Cú pháp bảo vệ :
 Bao ve <tên người bảo vệ>`,
		`🔮 Nhà Tiên Tri
 - Bạn được soi vai trò vào mỗi đêm!
 - Cú pháp soi : Soi <tên nguoi muốn soi>`,
		`🤪 Thằng Ngố
- Nhiệm vụ của bạn là tỏ ra nguy hiểm để dân làng treo cổ! Bạn sẽ thắng khi bị treo cổ!`,
		`🐺 Sói
- Sói đầu đàn sẽ tự dms bạn!
- Nếu sói đầu đàn chết, quản trò sẽ dms bạn để chọn người giết!
Cú pháp : Tôi chọn <tên người bị giết>`,
		`🚶 Dân Thường 2
- Dân ngu, hay bị cắt cổ ban đêm!`,
		`🔫 Xạ Thủ
- Bạn có 2 viên đạn, Bạn có thể bắn vào ngày vote thứ 2!
- Khi bạn bắn, mọi người sẽ biết bạn là xạ thủ!
Dms tôi : "tôi bắn <tên người bắn>" vào ban ngày để bắn!`,
		`👻 Thầy Đồng
- Bạn có thể hồi sinh 1 người!
- Vào ban đêm, bạn có thể chọn 1 ng chết để nói chuyện thoong qua quản trò
- Người chết sẽ không biết bạn là ai!`,
		`🕵️ Thám Tử
- Bạn có thể chọn 1 người để soi họ thiện hay ác!
- Bạn không thể soi ra phe thứ 3 hay sói đầu đàn
- Cú pháp soi : Dotham <tên người do thám>`,
		`🔪 Sát Thủ
- Bạn có thể chọn 1 người để giết vào ban đêm,
- Sói không thể giết bạn, thám tử không thể soi ra bạn thiện hay ác!
- Bạn không thể chết dù dính tình nhân hoặc bị sói con kéo theo!`,
		`🐺 Sói Con
- Sói đầu đàn sẽ tìm bạn để trưng cầu ý kiến!
- Bạn có thể chọn 1 người, nếu bạn chết, họ sẽ chết theo!
Cú pháp : soicon <tên nguoi kéo>`,
		`☣️ Người Sói
- Bạn là dân, nhưng khi bị cắn sẽ thành sói!`,
		`⛪ Mục Sư
- Bạn là mục sư, khi đang thảo luận, bạn có thể vẫy vẫy nước thánh vào một người
- Nếu đó là sói, hắn sẽ chết, nếu không bạn sẽ chết!
Cú pháp : dms tôi : vaynuoc <tên nguoi check>`,
		`👩‍⚕️ Bác Sĩ
- Bạn có thể bảo vệ một người!
- Nếu họ bị giết trong đêm, bạn sẽ chết thay!
Cú pháp : bacsycua <tên ng bao ve>`,
		`🎯 Thợ Săn Người
- Bạn được chọn một mục tiêu!
- Người này bị treo cổ bạn sẽ win!`,
		`❤️ Cupid
- Bạn được chọn 1 tình nhân, họ chết bạn sẽ chết
- Bạn chết họ cũng sẽ chết
- Bạn sẽ win nếu cả 2 còn sống cho đến khi hết game!`,
        `💘 Tình Nhân
- Bạn đã được Cupid chọn làm tình nhân!
- Bạn sẽ chết nếu họ chết và ngược lại!
- Bạn sẽ win nếu cả 2 còn sống đến khi hết game!`
	]
	let text = arrayKey.join("\n")
    //if (!args[0]) return message.channel.send(text)
    // await db.set(arrayKey[parseInt(args[0])], args[1])
	await message.reply(`Đã set người chơi <@${args[2]}> vào vai trò \`${arrayKey[parseInt(args[1])]}\`!`)
	let User = client.users.cache.find(u => u.id === args[2])
    content = [`Vai trò của bạn là ${arrayKey[parseInt(args[1])]}`,
			   `Vai trò của bạn là ${arrayKey[parseInt(args[1])]}`,
					 ]		 
    await client.dms(client, message, User, content, null, null).catch(e => console.log(e))
}
    else {
	  let User = message.mentions.member.first() || client.users.cache.find(u => u.id === args[0])
      await User.send(args.slice(1).join(" ")).catch(e => console.log(e))
	}
}
	
}