const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, IntentsBitField, Partials, Options } = require('discord.js');
require('colors')
const token = process.env.token
const client = new Client({
	intents: [
		3276799
	],
	partials: [
		Partials.Message,
		Partials.Reaction,
		Partials.User,
		Partials.Channel,
		Partials.GuildMember,
		Partials.ThreadMember,
		Partials.GuildScheduledEvent,
	],
  restRequestTimeout: 60000,
	allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});
module.exports = client
const { AutoPoster } = require('topgg-autoposter')

const ap = AutoPoster(process.env.TOPGGtoken, client)

ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})
const topgg = require("./TOPGG.js")
topgg(client)
///////////////////////////////////
client.commands = new Collection();
client.tcommands = new Collection();
client.aliases = new Collection();
//////////////////////////////////
////// Dẫn Các File HANDLERS //////
const ascii = require("ascii-table");
let table1 = new ascii("HANDLERS");
table1.setHeading("Trợ Năng", "Trạng Thái");
["commands", "functions", "events", "giveawayUtils"].forEach(handlers => {
	table1.addRow(handlers, `✅`);
	require(`./handlers/${handlers}`)(client);
});
/*
const promises = [
  client.shard.fetchClientValues('guilds.cache.size'),
  client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
];
/*
Promise.all(promises)
  .then(results => {
	const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
	const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
	return console.log(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);
  })
  .catch(console.error);
*/
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
  process.kill(1);
});
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
  process.kill(1);
});

client.login(token);


