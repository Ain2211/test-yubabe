const { EventEmitter } = require('node:events');
const { setTimeout, setInterval } = require('node:timers');
const { writeFile, readFile, access } = require('node:fs/promises');
const mongoose = require('mongoose');
const mongo_url = process.env.mongo_url
const { QuickDB } = require("quick.db")
const db = new QuickDB({ table: "DB" })
const { ActivityType } = require("discord.js")
module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
   /* await client.user.setActivity('Era of Resurrection !', { type: ActivityType.Streaming, url: "https://www.twitch.tv/nocopyrightsounds" });*/
    const options = {
      autoIndex: true, // Don't build indexes
    };
    try {
      await mongoose.connect(mongo_url, options)
        .then(console.log(`💖 | Đã kết nối với MONGODB`.bold.brightRed));
    }
    catch (error) {
      console.log(error)

    }
    /*try {
      setInterval(() => {
        checkveso()
      }, 3600000)
    }
    catch (error) {
      console.log(error)
    }
*/

    const { SlashCommandBuilder, Routes } = require('discord.js');
    const { REST } = require('@discordjs/rest');
    const token = process.env.token
    const guildId = process.env.guildId
    const clientId = process.env.clientId
    const fs = require('node:fs');
    const path = require('node:path');

    const commands = [];
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      client.commands.set(command.data.name, command.data)
      commands.push(command.data.toJSON());
    }
    const rest = new REST({ version: '10' }).setToken(token);

    rest.put(Routes.applicationCommands(clientId), { body: commands })
      .then(data => console.log(`Successfully registered ${data.length} application commands.`))
      .catch(console.error);
    async function checkveso() {
      const lotterySchema = require("../models/lotterySchema")
      let cd = await db.get(`JACKPOTPLAY`)
      let a = await client.newday(cd)
      //{ after: true, diff: diff, withinDay: (overrideWithinDay || false), seconds: seconds, minutes: minutes, hours: hours, days: days, now }
      let after = a.after
      let s = a.seconds
      let h = a.hours
      let m = a.minutes
      if (!after) return console.log(`Còn ${h + ":" + m + ":" + s} mới đến kỳ xổ số!`)
      let comuaveso = await lotterySchema.find({ money: { $gt: 0 } })
      if (!comuaveso[0]) return console.log("Không ai mua vé số cả!"); await db.set(`JACKPOTPLAY`, Date.now())
      let msg = []
      for (let i = 0; i < comuaveso.length; i++) {
        let a = comuaveso[i].authorid
        if (a) msg[i] = a
      }
      let win = msg[Math.floor(Math.random() * msg.length)]
      if (win) checkvesoComplete(win)
    }
    async function checkvesoComplete(win) {
      await db.set(`JACKPOTPLAY`, Date.now())
      const client = require("../bot.js")
      const lotterySchema = require("../models/lotterySchema")
      let jackpot = await db.get("Yubabe.Jackpot")
      let jp = parseInt(jackpot)
      await db.set("Yubabe.Jackpot", 0)
      let comuaveso = await lotterySchema.find({ money: { $gt: 0 } })
      if (!comuaveso[0]) return console.log("Không ai mua vé số cả!")
      let winner = client.users.cache.find(u => u.id == win)
      for (let i = 0; i < comuaveso.length; i++) {
        let a = comuaveso[i].authorid
        if (a == win) continue;
        console.log(a)
        let loser = client.users.cache.find(u => u.id == a)
        loser.send(`You've lost the lottery! The winner is : **${winner.username || winner.user.username}** 
Jackpot's value : **__${jp.toLocaleString("en-us")}__** <:Yu_Ycoin:953323682246316082>`).catch(e => console.log(e))
      }
      await client.cong(win, jp - parseInt(jp * (5 / 100)))
      await winner.send(`Congratulations!!!! You've won the lottery!
Jackpot's value: **__${(jp - parseInt(jp * (5 / 100))).toLocaleString("en-us")}__** Ycoin! (-5% taxes)`).catch(e => console.log(e))
      await lotterySchema.deleteMany({ money: { $gt: 0 } })
      return
    }

  }
}
/*
async function checkcophieu() {
  const { QuickDB } = require("quick.db")
  const db = new QuickDB()
  let cophieuPrice = [
  {
    Ycoin: 1,
    CheetahCoin: 0.1,
    EasyCoin: 0.03,
    PremiumCoin: 0.5,
    FoxCoin: 0.02
  }
  ]
  let Default = await db.get(`cophieuPrice`)
  if (!Default) {
  await db.set("cophieuPrice", cophieuPrice)
  }
  else console.log(Default)
}
*/
