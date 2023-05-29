const ls = require('local-storage');
const { readdirSync } = require('fs');
const path = require('path');
const { PermissionsBitField } = require('discord.js')
const { QuickDB } = require('quick.db')
const db = new QuickDB()
module.exports = {
  name: "enable",
  cooldown: 0,
  description: "Kích hoạt lệnh, cho phép dùng trong kênh!",
  description2: 'Enable a commands or all of its!!',
  usage2: "Yenable <commands | all>",
  aliases: ["enablecommand", "en", "ec"],
  usage: `Yenable + <tên lệnh>`,
  run: async (client, message, args) => {
    const errorPerm = [
      `${client.emo.fail} | Bạn phải có quyền \`ADMINISTRATOR\` để cài đặt lệnh trong guild này!`,
      `${client.emo.fail} | You have to get \`ADMINISTRATOR\` Permission to Configure Commands!`
    ]
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await client.send(client, message, errorPerm, null).catch(e => console.log(e))
    const done = `<:vvv:921536318062862396>`
    let commandsa = []
    if (args[0] == `all`) {
      var cms;
      readdirSync("./textcommands/").forEach(async (dir) => {
        const commands = readdirSync(`./textcommands/${dir}/`).filter(async (file) => file.endsWith(".js"));
        for (let file of commands) {
          if (dir == `Config` || dir == `AdminsOnly`) continue;
          let pull = require(`../../textcommands/${dir}/${file}`);
          if (pull) await db.set(`${message.channel.id}_${pull.name}`, `true`), cms += pull.name
        }
      })
      let messsagess = [
        `${client.emo.done} | Đã kích hoạt tất cả lệnh trong kênh!`,
        `${client.emo.done} | Enabled all commands in this channel!`
      ]
      await client.send(client, message, messsagess, null).catch(e => console.log(e))
      console.log(cms)
    }
    else {
      let commandsa = []
      for (var i = 0; i < args.length; i++) {
        if (args[i].length === 0) return;
        let command =
          client.tcommands.get(args[i]) ||
          client.tcommands.find((command) => command.aliases && command.aliases.includes(args[i]));
        if (!command) return message.channel.send(`:x: | Không tìm thấy ${args[i]}`);
        if (command) await db.set(`${message.channel.id}_${command.name}`, `true`)
        if (command) commandsa[i] = command.name
      }
      let messsagess = [
        `${done} | Lệnh \`${commandsa}\` đã được **Kích Hoạt** trong kênh <#${message.channel.id}>!`,
        `${done} | Command(s) \`${commandsa}\` have/has been **Enabled** at <#${message.channel.id}>!`
      ]
      await client.send(client, message, messsagess, null).catch(e => console.log(e))
    }

  }
}
