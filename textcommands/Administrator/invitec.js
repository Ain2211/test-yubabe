module.exports = {
	name: 'invitec',
	description: ["Tạo lời mời cho server", "Make a invite code for server"],
	aliases: ['taoloimoi'],
	usage: ["{prefix}", "{prefix}"],
	cooldown: 0,
	category: "Admins",
	canuse: "owner",
	errorcd: ["{time}", "{time}"],
	run: async (client, message, args) => {
    const guildID = client.guilds.cache.find(g => g.id == args[0])
    const channelID = args[1]
    if (!guildID) return message.reply("ID GUILD SAI")
    await guildID.invites.create(channelID)
      .then(async a => {
        console.log(a)
        await message.reply(`https://discord.gg/${a.code}`)
      })
      .catch(console.error);
  }
}
