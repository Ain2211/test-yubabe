const {
  readdirSync
} = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Category", "Lệnh", "Người Dùng");

//const client = require("../bot.js")
module.exports = async (client) => {
  try {
    readdirSync("./commands").forEach((dir) => {
      const commands = readdirSync(`./commands/`).filter((file) => file.endsWith(".js"));
      for (let file of commands) {
        let pull = require(`../commands/${file}`);
        if (pull.data.name) {
          client.commands.set(pull.data.name, pull.data);

          table.addRow(pull.data.name, `Done`);
        } else {
          table.addRow(file, `Error`);
          continue;
        }
      }
    });
    console.log(table.toString().bold.brightGreen);
  }
  catch (e) {
    console.log(String(e.stack))
  }
	
}


