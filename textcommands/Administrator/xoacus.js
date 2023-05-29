module.exports = {
	name: 'xoacus',
	description: ["", ""],
	aliases: [''],
	usage: ["{prefix}", "{prefix}"],
	cooldown: 0,
	category: "Admins",
	canuse: "owner",
	errorcd: ["{time}", "{time}"],
	run: async (client, message, args) => {
    if (message.author.id !== "896739787392819240") return
    const customSchema = require("../../models/randomSchema")
    let id = args[0]
    await customSchema.deleteOne({ authorid: id })
    await message.react("912284409976197131")
  }
}
