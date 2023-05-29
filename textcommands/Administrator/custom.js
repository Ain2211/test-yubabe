module.exports = {
  name: "addcus",
  description: ["Add custom cho members", "Add custom cho members"],
  aliases: ["custom"],
  usage:["{prefix}custom <userID> <type> <content>", "{prefix}custom <userID> <type> <content>"],
  cooldown: 0,
	category: "Admins",
	canuse: "owners",
  errorcd : ["No cooldown!", "No cooldown!"],
  run: async (client, message, args) => {
  const customSchema = require("../../models/customSchema")
  const userId = args[0]
  const typed = args[1]
  let custom = await customSchema.findOne({authorid: userId, type: typed})
  if (!custom) {
    let newcus = new customSchema({
     authorid: userId,
     content: args.slice(2).join(" "),
     type: typed
    })
    await newcus.save()
 }
  else {
    custom.content = args.slice(2).join(" ")
    await custom.save()
  }
    await message.react("✅")
	}
}