
module.exports = {
  name: "json",
  description: "PONG",
  aliases: ["js",],
  cooldown : 0,
  usage: null,
  run: async (client, message, args) => {
    const status = checkban(message.author.id)
    if (status == false || !status)
      await message.channel.send(`Bạn không bị ban!`)
  }
}