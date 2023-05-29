module.exports = {
  name: "calculator",
  description: ["Tính giùm bạn các phép tính cơ bản!", "Resolve your basic mathematics problem!"],
  aliases: ["cal", "cl", "m", "mt", "maytinh", "math", "cong", "tru", "nhan", "chia"],
  usage: ["{prefix} <> <> <>", "{prefix}add <> <> <>"],
  cooldown: 0,
  category: "Utils",
  canuse: "everyone",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args) => {
    const { EmbedBuilder } = require("discord.js");
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({table: "DB"})
    const lang = await db.get(`${message.guild.id}_languages`)
    const calc = require('ez-calculator');
    function replaceAll(str, find, replace) {
      var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
      return str.replace(new RegExp(escapedFind, 'g'), replace);
    }
    let problem = args.join("");
    let initialProblem = problem; //create initial problem so the response problem includes original syntax
    console.log(problem);
    //create exponents properly
    problem = replaceAll(problem, `^`, `**`);
    console.log(problem);
    var result = calc.calculate(problem);
    //prevents bold and italics in initial problem
    initialProblem = replaceAll(initialProblem, `*`, `\\*`);
    console.log(initialProblem);
    if (lang == "vi") await message.reply({
      embeds: [new EmbedBuilder()
        .setAuthor({ name: message.author.username })
        .setTitle(`🧮Máy Tính🧮`)
        .setFooter({ text: `Nhấn Giữ Kết Quả Để Copy!` })
        .addFields({ name: `Phép Tính: ${initialProblem} =`, value: `${result}` })
      ]
    });
    else if (lang == "en") await message.reply({
      embeds: [new EmbedBuilder()
        .setAuthor({ name: message.author.username })
        .setTitle(`🧮Calculator🧮`)
        .setFooter({ text: `Hold on the result to copy!` })
        .addFields({ name: `Phép Tính: ${initialProblem} =`, value: `${result}` })
      ]
    });
  }
}