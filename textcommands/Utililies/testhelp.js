const {
  EmbedBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  ButtonStyle,
  ButtonBuilder,
  Collection
} = require("discord.js");
const { readdirSync } = require('fs');

module.exports = {
  name: "helpp",
  description: ["Trả về hướng dẫn sử dụng bot", "Returns all Commmands, or one specific command"],
  aliases: ["commandinfo", "commands", "cuutuivoi"],
  usage: ["{prefix}help <command>", "{prefix}help <command>"],
  cooldown: 5000,
  category: "Utils",
  canuse: "everyone",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args, guildData, player, prefix) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({table: "DB"})
    const lang = await db.get(`${message.guild.id}_languages`)
    client.helps = new Collection()
    readdirSync("./textcommands/").forEach(async (dir) => {
      const commands = readdirSync(`./textcommands/${dir}/`).filter(async (file) => file.endsWith(".js"));
      for (let file of commands) {
        if (dir == `Yuworld` || dir == `Administrator`) continue;
        let pull = require(`../../textcommands/${dir}/${file}`);
        if (pull) await client.helps.set(pull.name, pull.description, pull.usage, pull.cooldown, pull.category, pull.canuse, pull.aliases)
      }
      
    const EmbedHelpVi = new EmbedBuilder()
      .setAuthor({name : message.autho.username, icon_url: message.autho.avatarURL()})
      .setDescription(``)
    })
  }
}
async function swap_pages2(client, message, embeds) {
  let currentPage = 0;
  const { ButtonBuilder, ButtonStyle,
    ActionRowBuilder } = require("discord.js");

  let buttonrow1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji('<:ARROW1:874262374595588117>')
        .setCustomId('skip-page1'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('<:ARROW2:874262374733987860>')
        .setCustomId('back-page'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji('<:HOME:894217044013248532>')
        .setCustomId('home-page'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('<:ARROW3:874262374541049896>')
        .setCustomId('next-page'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji('<:ARROW4:874262374608150578>')
        .setCustomId('skip-page2')
    );

  if (embeds.length === 1) return message.channel.send({ embeds: [embeds[0]] })
  const queueEmbed = await message.channel.send(
    {
      content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
      components: [buttonrow1],
      embeds: [embeds[currentPage]]
    }
  ).then(msg => {
    const collector = msg.createMessageComponentCollector({
      filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
    })
  })

  collector.on("collect", (interaction) => {
    if (interaction.customId == "next-page") {
      if (currentPage < embeds.length - 1) {
        currentPage++;
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      } else {
        currentPage = 0
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1, buttonrow2] });
      }
    } else if (interaction.customId == "back-page") {
      if (currentPage !== 0) {
        --currentPage; to
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      } else {
        currentPage = embeds.length - 1
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      }
    } else if (interaction.customId == "skip-page1") {
      currentPage = 0;
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
    } else if (interaction.customId == "skip-page2") {
      currentPage = embeds.length - 1;
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
    } else if (interaction.customId == "home-page") {
      interaction.message.delete()
    }
  })
}