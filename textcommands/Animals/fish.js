let animal = require("../../config/fishes.json")

module.exports = {
	name: "fishing",
	description: ["Bắt cá và bán chúng để có một ít Ycoin!", "Fishing for fishes and selling them!"],
	aliases: ["cc", "c", "fs"],
	usage: ["{prefix}cc", "{prefix}fs"],
	cooldown: 15000,
	category: "Animals",
	canuse: "everyone",
	errorcd: ["Đừng vội! Hãy chờ sau **{time}** và thử lại!", "Don't rush! Try a gain after **{time}**"],
	run: async (client, message, args) => {
		const { BatThuThuong, Captcha } = require("../../handlers/fishUtils")
		const author = message.author.id
		let cash = await client.cash(author)
		let errorCash = [
			`${client.e.fail} | **${message.author.username}**, bạn còn không có nỗi 10 đồng Ycoin câu cá??`,
			`${client.e.fail} | **${message.author.username}**, you need at least 10 Ycoin for fishing!!`
		]
		if (cash < 10) return await client.send(client, message, errorCash, null).catch(e => console.log(e))
		await client.tru(author, 10)
		let a = await BatThuThuong(client, message)
		let ar1 = a.hunted
		let buffmsg = a.buffmsg
		let thusanduoc = ar1.join(" ")
		let point = a.point
		let huntmsg = [
			`**${message.author.username}**, ${buffmsg}
🎣 | Bạn câu được: ${thusanduoc}
🐟 | \`Điểm tank : +${point}\``,
			`**${message.author.username}**, ${buffmsg}        
🎣 | You've catched : ${thusanduoc}
🐟 | \`Tank Point : +${point}\``
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
			await client.fishes(author, item, count[item], type)
		}
		await client.addpointf(message.author.id, point);
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