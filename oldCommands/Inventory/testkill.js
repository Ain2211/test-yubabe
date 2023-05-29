const invSchema = require('../../models/invSchema')
const thu = require('../../config/animal.json');
const { QuickDB } = require('quick.db')
const db = new QuickDB()
const animalSchema = require('../../models/animalSchema')
const farmSchema = require('../../models/farmSchema')
const ranks = {};
const animals = require('../../config/animal.json');

module.exports = {
  name: "kill",
  cooldown: 2000,
  description: "● Bán Thú : Ysell <thu | t | a | animal> [C,U,R,SR,E,P,G] [số lượng | all (nếu bán bằng ICON)] | Ysell thu all\n● Bán Nhẫn : Ysell <nhan | ring | r> <ID Nhẫn>\n● Bán Nông Sản : Ysell <nongsan | ns | hg | hatgiong> <Tên hoặc ID> <số lượng | all> | Ysell ns all",
  aliases: [],
  usage: `Ysell <type> <name> [quanlity]`,
  run: async (client, message, args) => {
    let msg = message
    let name = undefined;
    let count = 1;
    let ranks;
    const { isInt, validRank, getAllRanks } = require("../../textcommands/Animals/animalUtils/animalsFunctions")
    // Nếu ko nhập gì đằng sau lệnh!
    if (args.length == 0) {
      let errorLength = [
        `${client.e.fail} | **${msg.author.username}**, xin hãy đề cập rank/thú cần kill !`,
        `${client.e.fail} | **${msg.author.username}**, please mention rank/animal to kill !`
      ]
      client.send(client, message, errorLength, null);
      return
    }
    // Nếu arg0 là số */
    else if (args.length == 2 && (isInt(args[0]) || args[0].toLowerCase() == "all")) {
      if (args[0].toLowerCase() != "all") count = parseInt(args[0]);
      else count = "all";
      name = args[1];
    }
    // Nếu arg1 là số (or not) */
    else if (args.length == 2 && (isInt(args[1]) || args[1].toLowerCase() == "all")) {
      if (args[1].toLowerCase() != "all") count = parseInt(args[1]);
      else count = "all";
      name = args[0];
    }
    // Chỉ có 1 arg
    else if (args.length == 1) {
      if (args[0].toLowerCase() == "all")
        ranks = getAllRanks();
      else
        name = args[0];
    }
    // nhiều ranks
    else {
      ranks = {}
      for (i = 0; i < args.length; i++) {
        let tempRank = validRank(args[i].toLowerCase());
        if (!tempRank) {
          let errorRank = [
            `${client.e.fail} | **${msg.author.username}**, bạn nhập các rank hoặc thú không hợp lệ!`,
            `${client.e.fail} | **${msg.author.username}**, you've text the wrong ranks or animals!`,
          ]
          await client.send(client, message, errorRank, null);
          return;
        }
        if (!(tempRank in ranks)) {
          ranks[tempRank.rank] = tempRank;
        }
      }
    }

    if (name) name = name.toLowerCase();
  }
}
function sellAnimal(msg, con, animal, count, send, global, p) {
  if (count != "all" && count <= 0) {
    send("**🚫 |** You need to sell more than 1 silly~", 3000);
    return;
  }
  let sql = "UPDATE cowoncy NATURAL JOIN animal SET money = money + " + (count * animal.price) + ", count = count - " + count + ", sellcount = sellcount + " + count + " WHERE id = " + msg.author.id + " AND name = '" + animal.value + "' AND count >= " + count + ";";
  if (count == "all") {
    sql = "SELECT count FROM animal WHERE id = " + msg.author.id + " AND name = '" + animal.value + "';";
    sql += "UPDATE cowoncy NATURAL JOIN animal SET money = money + (count*" + animal.price + "), sellcount = sellcount + count, count = 0 WHERE id = " + msg.author.id + " AND name = '" + animal.value + "' AND count >= 1;";
  }
  con.query(sql, function(err, result) {
    if (err) { console.error(err); return; }
    if (count == "all") {
      if (result[1].affectedRows <= 0) {
        send("**🚫 | " + msg.author.username + "**, You don't have enough animals! >:c", 3000);
      } else {
        count = result[0][0].count;
        send("**🔪 | " + msg.author.username + "** sold **" + global.unicodeAnimal(animal.value) + "x" + count + "** for a total of **<:cowoncy:416043450337853441> " + (global.toFancyNum(count * animal.price)) + "**");
        p.logger.incr(`cowoncy`, count * animal.price, { type: 'sell' }, p.msg);
        // TODO neo4j
      }
    } else if (result.affectedRows > 0) {
      send("**🔪 | " + msg.author.username + "** sold **" + global.unicodeAnimal(animal.value) + "x" + count + "** for a total of **<:cowoncy:416043450337853441> " + (global.toFancyNum(count * animal.price)) + "**");
      p.logger.incr(`cowoncy`, count * animal.price, { type: 'sell' }, p.msg);
      // TODO neo4j
    } else {
      send("**🚫 | " + msg.author.username + "**, You can't sell more than you have silly! >:c", 3000);
    }
  });
}

function sellRank(msg, rank, price, config) {
  const animalSchema = require("../../models/animalSchema")
  let animals
  let ranksIcon = [
    config.ranks.common,
    config.ranks.uncommon,
    config.ranks.rare,
    config.ranks.superrare,
    config.ranks.epic,
    config.ranks.pro,
    config.ranks.glory,
    config.ranks.devil,
    config.ranks.vip,
  ]
  let ranks = {}
  for (let r in rank) {
    let array = await animalSchema.findOne({type : rank[r]})
    ranks += {
      rank[r]: rank
    }
  }
  
  con.query(sql, function(err, result) {
    if (err) { console.error(err); return; }
    if (result[1].affectedRows <= 0) {
      send("**🚫 | " + msg.author.username + "**, You don't have enough animals! >:c", 3000);
    } else {
      count = result[0][0].total;
      send("**🔪 | " + msg.author.username + "** sold **" + rank.emoji + "x" + count + "** for a total of **<:cowoncy:416043450337853441> " + (global.toFancyNum(count * rank.price)) + "**");
      p.logger.incr(`cowoncy`, count * rank.price, { type: 'sell' }, p.msg);
      // TODO neo4j
    }
  });
}

async function sellRanks(msg, con, ranks, send, global, p) {
  let sold = "", total = 0;
  for (i in ranks) {
    let rank = ranks[i];
    let animals = "('" + rank.animals.join("','") + "')";
    let sql = "SELECT SUM(count) AS total FROM animal WHERE id = " + msg.author.id + " AND name IN " + animals + ";";
    sql += "UPDATE animal INNER JOIN cowoncy ON animal.id = cowoncy.id INNER JOIN (SELECT COALESCE(SUM(count),0) AS sum FROM animal WHERE id = " + msg.author.id + " AND name IN " + animals + ") s SET money = money + (s.sum*" + rank.price + "), sellcount = sellcount + count, count = 0 WHERE animal.id = " + msg.author.id + " AND name IN " + animals + " AND count > 0;";

    try {
      let result = await p.query(sql);
      let sellCount = result[0][0].total;
      if (sellCount > 0) {
        sold += rank.emoji + "x" + result[0][0].total + " ";
        total += sellCount * rank.price;
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (sold != "") {
    sold = sold.slice(0, -1);
    send("**🔪 | " + msg.author.username + "** sold **" + sold + "** for a total of **<:cowoncy:416043450337853441> " + (global.toFancyNum(total)) + "**");
    p.logger.incr(`cowoncy`, total, { type: 'sell' }, p.msg);
    // TODO neo4j
  } else {
    send("**🚫 | " + msg.author.username + "**, You don't have enough animals! >:c", 3000);
  }
}
