module.exports = {
	name: 'cusrd',
	description: ["", ""],
	aliases: ['customrandom', 'crd'],
	usage: ["{prefix}", "{prefix}"],
	cooldown: 0,
	category: "Admins",
	canuse: "owner",
	errorcd: ["{time}", "{time}"],
	run: async (client, message, args) => {
		if (message.author.id !== "896739787392819240") return
		const customSchema = require("../../models/randomSchema")
		let id = args[0]
		let method = args[1]
		let content = args.slice(2).join(" ")
		const custom = await customSchema.findOne({ authorid: id })
		if (!custom && method == "embedon") {
			let newCustom = new customSchema({
				authorid: id,
				embed: true
			})
			newCustom[method] = content
			await newCustom.save()
			await message.react("912284409976197131")
		}
		else if (!custom && method == "embedoff") {
			let newCustom = new customSchema({
				authorid: id,
				embed: false
			})
			newCustom[method] = content
			await newCustom.save()
			await message.react("912284409976197131")
		}
		else {
			if (method == "embedon") custom.embed = true
			else if (method == "embedoff") custom.embed = false
			else custom[method] = content
			await custom.save()
			await message.react("912284409976197131")
		}

	}
}
