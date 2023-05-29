const ascii = require("ascii-table");
const fs = require('node:fs');
const path = require('node:path');
// const client = require("../bot.js")
module.exports = async (client) => {
  const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
  let eventon = new ascii("Events");
  eventon.setHeading("Sự Kiện", "Trạng Thái");
  for (const file of eventFiles) {
    let pull = require(`../events/${file}`);
    if (pull.name) {
      eventon.addRow(file, "✅");
    }
    else {
      eventon.addRow(file, `error->missing a help.name,or help.name is not a string.`);
      continue;
    }
    // const event = require(`../events/${file}`);
    // const eventPath = path.join(__dirname, `events`)
    if (pull.once) {
      client.once(pull.name, (...args) => pull.execute(...args));
    }
    else {
      client.on(pull.name, (...args) => pull.execute(...args));
    }
  };
  console.log(eventon.toString().rainbow)
}


/*const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }

}*/