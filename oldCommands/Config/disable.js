const { readdirSync } = require('fs');
const { PermissionsBitField } = require(`discord.js`)
const { QuickDB } = require('quick.db')
const db = new QuickDB()
module.exports = {
  name: "disable",
  cooldown: 0,
  description: "Vô Hiệu lệnh trong một channel! 💡 Lệnh chưa hoàn thiện",
  description2: 'Disable a commands or all of its!!',
  usage2: "Ydisable <commands | all>",
  aliases: ["disablecommand", "ds", "dc"],
  usage: `Ydisable <tên lệnh>`,
  run: async (client, message, args) => {
    let errorPerms = [
      `${client.emo.fail} | Bạn phải có quyền \`ADMINISTRATOR\` để cài đặt lệnh trong guild này!`,
      `${client.emo.fail} | You have to get \`ADMINISTRATOR\` Permission to Configure Commands!`
    ]
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await client.send(client, message, errorPerms, null).catch(e => console.log(e))

    const done = `<:vvv:921536318062862396>`
    if (args[0] == `all`) {
      var cms;
      readdirSync("./textcommands/").forEach(async (dir) => {
        const commands = readdirSync(`./textcommands/${dir}/`).filter(async (file) => file.endsWith(".js"));
        for (let file of commands) {
          if (dir == `Config` || dir == `AdminsOnly`) continue;
          let pull = require(`../../textcommands/${dir}/${file}`);
          if (pull) await db.set(`${message.channel.id}_${pull.name}`, `false`), cms += pull.name
        }
      })
      let messages = [
        `${client.emo.done} | Đã vô hiệu tất cả lệnh trong kênh!`,
        `${client.emo.done} | Disabled All the Commands in this Channel!!`
      ]
      await client.send(client, message, messages, null).catch(e => console.log(e))
      console.log(cms)
    } else {
      let commandsa = []
      for (var i = 0; i < args.length; i++) {
        if (args[i].length === 0) return;
        let command =
          client.tcommands.get(args[i]) ||
          client.tcommands.find((command) => command.aliases && command.aliases.includes(args[i]));
        let errorName = [
          `:x: | Không tìm thấy lệnh ${args[i]}`,
          `:x: | Can't found any commands with ${args[i]}`
        ]
        if (!command) return await client.send(client, message, messagess, null).catch(e => console.log(e))
        if (command) await db.set(`${message.channel.id}_${command.name}`, `false`)
        if (command) commandsa[i] = command.name
      }
      let messagess = [
        `${done} | Lệnh \`${commandsa}\` đã được **Vô Hiệu** trong kênh <#${message.channel.id}>!`,
        `${done} | Command(s) \`${commandsa}\` has/have been **Disabled** at <#${message.channel.id}>!`
      ]
      await client.send(client, message, messagess, null).catch(e => console.log(e))
    }
  }
}
