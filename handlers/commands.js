const {
  readdirSync
} = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Category", "Lệnh", "Người Dùng");

//const client = require("../bot.js")
module.exports = async (client) => {
  try {
    readdirSync("./textcommands/").forEach((dir) => {
      const commands = readdirSync(`./textcommands/${dir}/`).filter((file) => file.endsWith(".js"));
      for (let file of commands) {
        let pull = require(`../textcommands/${dir}/${file}`);

        if (pull.name) {
          client.tcommands.set(pull.name, pull);
          if (pull.canuse == "everyone") table.addRow(pull.category, pull.name, "Everyone");
          else if (pull.canuse == "admins") table.addRow(pull.category, pull.name, "AD");
          else if (pull.canuse == "g-admins") table.addRow(pull.category, pull.name, "GAdmins")
          else table.addRow(pull.category, pull.name, "OWN");
        } else {
          table.addRow(pull.category, pull.name, `Error`);
          console.log(pull)
          continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
      }
    });
    console.log(table.toString().bold.brightGreen);
  }
  catch (e) {
    console.log(String(e.stack))
  }
}


