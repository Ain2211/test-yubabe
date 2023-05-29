const { EmbedBuilder, PermissionsBitField } = require("discord.js")
module.exports = {
  name: "serverlist",
  description: ["Check servers!", "Check servers!"],
  aliases: ["svl"],
  usage: ["{prefix}sv", "{prefix}sv"],
  cooldown: 0,
  category: "Admins",
  canuse: "admins",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return message.channel
          .send("I Dont Have Permissions")
          .then((msg) => msg.delete({ timeout: 5000 }));


      let description =
        `Total Servers - ${client.guilds.cache.size}\n\n` +
        client.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map((r) => r)
          .map(
            (r, i) =>
              `**${i + 1}** - **${r.name}** | \`${r.memberCount}\` Members\nID - ${r.id
              }`
          )
          .slice(0, 25)
          .join("\n");

      let embed = new EmbedBuilder()

        .setColor("Blue")
        .setDescription(description);

      let msg = await message.channel.send({ embeds: [embed] });


    }
};