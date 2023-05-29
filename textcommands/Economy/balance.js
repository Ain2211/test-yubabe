
module.exports = {
	name: "balance",
	description: ["Check tiền của bạn!", "Check your balance."],
	aliases: ["bal", "cash", "coin", "money"],
	usage: ["{prefix}cash", "{prefix}cash"],
	cooldown: 5000,
	category: "Eco",
	canuse: "everyone",
	errorcd: ["Sao lại check liên tục thế, hãy đợi **{time}** để tiếp tục.", "Don't rush, please wait **{time}** to continue."],
	run: async (client, message, args) => {
		const { QuickDB } = require("quick.db")
		const db = new QuickDB({ table: "DB" })
		let memberid = message.author.id
		let cash = await client.cash(memberid)
		let custom = await client.custom(memberid, "cash", false)
		let content = [
			`<:Yu_Ycoin:953323682246316082> **|** **${message.author.username}** , bạn đang có **${cash.toLocaleString('En-us')} Ycoin**`,
			`<:Yu_Ycoin:953323682246316082> **|** **${message.author.username}** , you're now having **${cash.toLocaleString('En-us')} Ycoin**`
		]
		if (custom) {
			let startContent = custom
			let moneyText = "{money}"
			console.log(startContent)
			if (!startContent.includes(moneyText)) startContent += "{money}"
			let newcontent = startContent
				.replaceAll(/\\n/g, "\n")
				.replaceAll(/{name}/g, message.author.username)
				.replaceAll(/{tag}/g, `<@${message.author.id}>`)
				.replaceAll(/{money}/g, `${cash.toLocaleString("en-us")} <:Yu_Ycoin:953323682246316082>`)
			console.log(newcontent)
			content = [
				newcontent,
				newcontent
			]
		}
		await client.reply(client, message, content, null).catch((e) => console.log(e))
	}
}
