const { EmbedBuilder,PermissionsBitField } = require("discord.js")
module.exports = {
  name: "server",
  description: ["Check servers!", "Check servers!"],
  aliases: ["sv"],
  usage: ["{prefix}sv", "{prefix}sv"],
  cooldown: 0,
  category: "Admins",
  canuse: "admins",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
    if (!args[0]) {
      const dt = new Date(message.createdTimestamp);
      const svembed = new EmbedBuilder()
        .setTitle(`TỔNG SỐ SERVER CÓ YUBABE`)
        .setColor(`#FF0099`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(`Server: **__${client.guilds.cache.size}__**

Channels: **__${client.channels.cache.size}__**

Member: **__${client.guilds.cache.reduce(
          (a, b) => a + b.memberCount,
          0
        )}__**`)
        .setTimestamp()
      message.channel.send({ embeds: [svembed] })
    }
    else {
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
    }
  }
};