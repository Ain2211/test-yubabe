module.exports = {
  name: "disable",
  description: ["Vô hiệu một lệnh - một mục lệnh hoặc tất cả lệnh trong kênh.", "Disable one, a category or all commands."],
  aliases: ["ds", "dc", "disablecommands", "disallow"],
  usage: ["{prefix}disable <commands>", "{prefix}disable <commands>"],
  cooldown: 0,
  category: "Configs",
  canuse: "g-admins",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
    const { readdirSync } = require('fs');
    const { PermissionsBitField } = require(`discord.js`)
    const { QuickDB } = require('quick.db')
    const db = new QuickDB({table: "DB"})
    let errorPerms = [
      `${client.e.fail} | Bạn phải có quyền \`ADMINISTRATOR\` để cài đặt lệnh trong guild này!`,
      `${client.e.fail} | You have to get \`ADMINISTRATOR\` Permission to Configure Commands!`
    ]
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await client.send(client, message, errorPerms, null).catch(e => console.log(e))

    const done = client.e.success
    const err = client.e.fail
    if (args[0] == `all`) {
      var cms;
      readdirSync("./textcommands/").forEach(async (dir) => {
        const commands = readdirSync(`./textcommands/${dir}/`).filter(async (file) => file.endsWith(".js"));
        for (let file of commands) {
          if (dir == `Configurations` || dir == `Administrator`) continue;
          let pull = require(`../../textcommands/${dir}/${file}`);
          if (pull) await db.set(`${message.channel.id}_${pull.name}`, `false`), cms += pull.name
        }
      })
      let messages = [
        `${client.e.success} | Đã vô hiệu tất cả lệnh trong kênh!`,
        `${client.e.success} | Disabled All the Commands in this Channel!!`
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
          `${err} | Không tìm thấy lệnh ${args[i]}`,
          `${err} | Can't found any commands with ${args[i]}`
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