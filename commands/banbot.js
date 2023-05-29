const { SlashCommandBuilder, } = require('discord.js');
const client = require("../bot.js")
const banSchema = require("../models/BanSchema")
module.exports = {
	data: new SlashCommandBuilder()
	.setName('thanhtrung')
	.setDescription('Replies with USER ID!')
	.addStringOption(option =>
		option.setName('id')
			.setDescription('ID of user who will get a ban!')
			.setRequired(true)),
	async execute(interaction) {
    const {QuickDB}= require("quick.db")
    const db = new QuickDB()
    const string = interaction.options.getString('id');
	if (!client.admins.includes(interaction.user.id)) return interaction.reply(`:x: | You must be Administrator of Bot to use this command!`)
	//await interaction.reply(string);
  let reason = `Lợi dụng bugs và khai thác tài nguyên trái phép!`
    const mentionedUser = client.users.cache.find(u => u.id == string)
    let username = mentionedUser.username || mentionedUser.user.username
    const banned = new banSchema({ memberid: mentionedUser.id, guildid: interaction.guild.id })
    await banned.save()
    const yukii = client.users.cache.find(u => u.id == `896739787392819240`)
    let language = await db.get(`${interaction.guild.id}_languages`)
    const region = interaction.guild.preferredLocale
    if (!language) {
      if (region == "vi") await db.set(`${interaction.guild.id}_languages`, "vi")
      else await db.set(`${interaction.guild.id}_languages`, "en")
      await yukii.send(`${interaction .guild.name} đã được set Region **${interaction.guild.preferredLocale}**`)
    }
    else if (language == "vi") {
      let messagess = `Xin chào **${username}**, bạn đã bị ban từ MOD **${interaction.user.username}** vì lý do :
\`\`\`${reason}\`\`\``;
      await mentionedUser
        .send(messagess)
        .catch(e => console.log(e))
    }
    else if (language == "en") {
      if (!reason) reason = `Taking advantage of bugs and illegally exploiting resources!`
      let messagess = `**${username}**, you have been banned from MOD **${interaction.user.username}** for the reason :
\`\`\`${reason}\`\`\``;
      await mentionedUser
        .send(messagess)
        .catch(e => console.log(e))
        }
    await interaction.reply(`Đã ban ${username}`)
	},
};
/*
const string = interaction.options.getString('input');
const boolean = interaction.options.getBoolean('bool');
const user = interaction.options.getUser('target');
const member = interaction.options.getMember('target');
const channel = interaction.options.getChannel('destination');
const role = interaction.options.getRole('role');
const integer = interaction.options.getInteger('int');
const number = interaction.options.getNumber('num');
const mentionable = interaction.options.getMentionable('mentionable');
const attachment = interaction.options.getAttachment('attachment');
*/