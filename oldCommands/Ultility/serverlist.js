const { EmbedBuilder, PermissionsBitField } = require("discord.js");
let ownerid = "896739787392819240";
let ownerid2 = "696893548863422494";

module.exports = {
  name: "serverlist",
  cooldown: 0,
  aliases: ["serverl"],
  description: "Show the Server list Which client Joined...",
  category: "owner",
  useage: "",
  accessableby: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (client.admins.includes(message.author.id)) {
      if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator))
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

        .setColor("BLUE")
        .setDescription(description);

      let msg = await message.channel.send({ embeds: [embed] });


    } else {
      return;
    }
  },
};
