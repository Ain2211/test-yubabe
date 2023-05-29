let animal = require("../../config/animal.json")

module.exports = {
	name: "hunt",
	description: ["Bắt thú và bán chúng để có một ít Ycoin!", "Hunting for animals and selling them!"],
	aliases: ["h", "catch"],
	usage: ["{prefix}h", "{prefix}h"],
	cooldown: 15000,
	category: "Animals",
	canuse: "everyone",
	errorcd: ["Đừng vội! Hãy chờ sau **{time}** và thử lại!", "Don't rush! Try a gain after **{time}**"],
	run: async (client, message, args) => {
		const { BatThuThuong, Captcha } = require("../../handlers/huntUtils")
		const author = message.author.id
		let cash = await client.cash(author)
		let errorCash = [
			`${client.e.fail} | **${message.author.username}**, bạn còn không có nổi 10 đồng Ycoin hunt thú??`,
			`${client.e.fail} | **${message.author.username}**, you need at least 10 Ycoin for hunting!!`
		]
		if (cash < 10) return await client.send(client, message, errorCash, null).catch(e => console.log(e))
		await client.tru(author, 10)
		let a = await BatThuThuong(client, message)
		let ar1 = a.hunted
		let buffmsg = a.buffmsg
		let thusanduoc = ar1.join(" ")
		let point = a.point
		let huntmsg = [
			`**${message.author.username}**, ${buffmsg.length > 10 ? `\`Sức mạnh đá quý:\` ${buffmsg}` : buffmsg}
🌱 | Bạn hunt được: ${thusanduoc}
🐾 | \`Điểm zoo : +${point}\``,
			`**${message.author.username}**, ${buffmsg.length > 10 ? `\`Powered Gems:\` ${buffmsg}` : buffmsg}
🌱 | You've hunted : ${thusanduoc}
🐾 | \`Zoo Point : +${point}\``
		]
		await client.send(client, message, huntmsg, null).catch(e => console.log(e))
		let count = {}
		ar1.forEach(thu => {
			if (count[thu]) {
				count[thu] += 1
				return
			}
			count[thu] = 1
		})
		for (let item in count) {
			let type = checkthu(animal.common, animal.uncommon, animal.rare, animal.superrare, animal.epic, animal.pro, animal.glory, animal.devil, animal.vip, item)
			await client.animal(author, item, count[item], type)
		}
		await client.addpoint(message.author.id, point);
		await Captcha(client, message)
	}
}
function checkthu(c, u, r, sr, e, p, g, d, v, thu) {
  let result
	if (c.includes(thu)) result = `common`
	if (u.includes(thu)) result = `uncommon`
	if (r.includes(thu)) result = `rare`
	if (sr.includes(thu)) result = `superrare`
	if (e.includes(thu)) result = `epic`
	if (p.includes(thu)) result = `pro`
	if (g.includes(thu)) result = `glory`
	if (d.includes(thu)) result = `devil`
	if (v.includes(thu)) result = `vip`
	return result
}