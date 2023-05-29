const random = require("random-number-csprng");
const { MessageEmbed } = require('discord.js')
const check_game = new Set();
const hitemoji = "👊";
const stopemoji = "🛑"
const TwoSum = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

module.exports = {
  name: "blackjack",
  category: "🎯 Minigames",
  aliases: ["bj"],
  cooldown: 20000,
  usage: "<PREFIX>blackjack",
  description: "Lệnh đang sửa chữa",
  run: async (client, message, args) => {
    return message.channel.send(`Lệnh đang được sửa chữa`)
    const BanSchema = require('../../models/BanSchema')
    const ban = await BanSchema.findOne({ memberid: message.author.id })
    if (ban) {
      if (ban.memberid == message.author.id) return
    }
    let user = message.author;
    let bal = await client.cash(user.id);
    let money = parseInt(args[0]);
    let backcard = '<:backcard:954209816912486440>'
    let hide_deck = []
    let player_count = 0, bots_count = 0;
    let cards = require("../../config/cardemojis.json").cards
    if (parseInt(money) > 150000) money = 150000;
    if ((money) > 150000) money = 150000;
    if (!args[0]) return message.channel.send(`Đặt bao nhiêu?`);
    else if (args[0] == `all`) {
      money = bal
      if (money > 150000) money = 150000
    }
    if ((bal) < 1) return message.channel.send(`Bạn còn cái gì đâu mà all`)
    if (isNaN(money)) return message.channel.send(`Nhập cái quái gì vậy ?`);
    if (parseInt(money) > bal) return message.channel.send(`Làm gì đủ tiền mà đua đòi`);
    if ((money) > bal) return message.channel.send(`Làm gì đủ tiền mà đua đòi`);
    if ((money) < 0) return message.channel.send(`Người sống không chơi tiền âm bạn ơi !`);
    if ((money) > 10000000000) return message.channel.send(`không tiền nhập số bé thôi má`);
    let timeout = 15000
    let lastused = await client.cd(message.author.id, `hunt`)
    let used = client.checkcd(lastused, timeout)
    let cooldown = used.after
  if(!cooldown) {
    const delay = await message.channel.send(`${failicon} | **${message.author.username}**, bạn phải chờ : \`${used.h + `:` + used.m + `:` + used.s}s\` để hunt tiếp`)
      await client.sleep(timeout - (Date.now() - lastused))
      await delay.delete()
    }
    else {
      let result = ``
      await client.tru(message.author.id, money)
      let save_cards = []
      save_cards = cards
      check_game.add(message.author.id)
      let player_deck = [], bots_deck = []
      for (let i = 0; i < 2; i++) {
        player_deck.push(await randomCard(cards))
        cards = locbai(cards, player_deck)
      }
      while (tinhDiem(player_deck) < 13) {
        if (player_count < 13) {
          player_deck = []
          cards = save_cards;
        }
        for (let i = 0; i < 2; i++) {
          player_deck.push(await randomCard(cards))
          cards = locbai(cards, player_deck)
        }
        player_count = tinhDiem(player_deck)
      }
      player_count = tinhDiem(player_deck)
      bots_deck.push(await randomCard(cards))
      cards = locbai(cards, bots_deck)
      hide_deck.push(backcard)

      bots_count = tinhDiem(bots_deck)
      if (checkAutoWin(player_deck, bots_deck)) {
        bots_deck.push(await randomCard(cards))
        cards = locbai(cards, bots_deck)
        let bjEmbedss = new MessageEmbed()
          .setTitle(`${message.author.tag} đã cược ${money.toLocaleString('En-us')} Ycoin!`, message.author.displayAvatarURL())
          .setDescription(`**XÌ DZÁCHHHH ! CHÚC MỪNG BẠN!**`)
          .addField(`${message.author.username} [${player_count}]`, `${createembedfield(player_deck)}`, true)
          .addField(`${client.user.username} [${bots_count}]`, `${createembedfield(bots_deck)}`, true)
          .setColor("GREEN")
          .setFooter(`Bạn đã thắng +${money.toLocaleString('En-us')}Ycoin`)
        await client.cong(message.author.id, parseInt(money) * 3);
        return message.channel.send({content: `<@${message.author.id}>`, embeds : [bjEmbedss]})
      }
      let bjEmbed = new MessageEmbed()
        .setTitle(`${message.author.tag} đã cược ${money.toLocaleString('En-us')} Ycoin`, message.author.displayAvatarURL())
        .setColor("#ffcc00")
        .setDescription(`Nhấn 🃏 để bốc bài, ❌ để dằn bài!\n\`Dằn bài nhỏ hơn 16 chỉ có hòa hoặc thua!\``)
        .addField(`${message.author.username} [${player_count}]`, `${createembedfield(player_deck)}`, true)
        .addField(`${client.user.username} [${tinhDiem(bots_deck.slice(0, 1))}+?]`, `${createembedfield(bots_deck)}${createembedfield(hide_deck)}`, true)
        .setFooter("🃏 Trò chơi đang diễn ra")
      bots_deck.push(await randomCard(cards))
      cards = locbai(cards, bots_deck)
      let msg = await message.channel.send({content: `<@${message.author.id}>`, embeds : [bjEmbed]})
      await msg.react("🃏");
      await msg.react("❌");
      let filter = (reaction, user) => {
	return reaction.emoji.name === '🃏' && user.id === message.author.id 
};
      const re = await msg.awaitReactions({ filter, max: 4, time: 60000, errors: ['time'] })
	.then(collected => result = collected.emoji.name)
	.catch(collected => {
		console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
	});
      filter = result
      let em = filter;
      if (result === "🃏") {
        player_deck.push(await randomCard(cards))
        cards = locbai(cards, player_deck)
        player_count = tinhDiem(player_deck)
        //bots_deck.push(await randomCard(cards))
        //cards = locbai(cards, bots_deck)
        bots_count = tinhDiem(bots_deck)
        if (player_count > 21) {
          let ktra = player_deck.length - bots_deck.length
          bots_count = tinhDiem(bots_deck)
          while (player_deck.length == 2 && bots_count < player_count && player_count <= 21) {
            console.log("1 " + bots_count)
            console.log("autoMath " + autoMath(cards, player_deck, bots_deck, TwoSum))
            console.log("getcard " + getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)))
            bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
            cards = locbai(cards, bots_deck)
            bots_count = tinhDiem(bots_deck)
            console.log(player_count)
            console.log("2 " + bots_count)
          }
          while (ktra == 1 && bots_count < player_count && player_count <= 21) {
            console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
            bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
            cards = locbai(cards, bots_deck)
            bots_count = tinhDiem(bots_deck)
          }
          while (ktra == 2 && bots_count < player_count && player_count <= 21) {
            console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
            bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
            cards = locbai(cards, bots_deck)
            bots_count = tinhDiem(bots_deck)
          }
          while (ktra == 3 && bots_count < player_count && player_count <= 21) {
            console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
            bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
            cards = locbai(cards, bots_deck)
            bots_count = tinhDiem(bots_deck)
          }
          hide_deck = []
          let tile = await random(0, 1000) / 100
          return await stopGame(client, money, message, player_deck, bots_deck, player_count, bots_count, msg)
        }
        let bjEmbed2 = new MessageEmbed()
          .setTitle(`${message.author.tag} đã cược ${money.toLocaleString('En-us')} Ycoin`, message.author.displayAvatarURL())
          .setColor("#ffcc00")
          .setDescription(`Nhấn 🃏 để bốc bài, ❌ để dằn bài!\n\`Dằn bài nhỏ hơn 16 chỉ có hòa hoặc thua!\``)
          .addField(`${message.author.username} [${player_count}]`, `${createembedfield(player_deck)}`, true)
          .addField(`${client.user.username} [${tinhDiem(bots_deck.slice(0, 1))}+?]`, `${createembedfield(bots_deck.slice(0, 1))}${createembedfield(hide_deck)}`, true)
          .setFooter("🃏 Trò chơi đang diễn ra")
        msg.edit({content :`<@${message.author.id}>`, embeds : [bjEmbed2]})
        await msg.react("🃏");
      await msg.react("❌");
      let filter = (reaction, user) => {
	return reaction.emoji.name === '🃏' && user.id === message.author.id 
};
      const re = await msg.awaitReactions({ filter, max: 4, time: 60000, errors: ['time'] })
	.then(collected => result = collected.emoji.name)
	.catch(collected => {
		console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
	});
      filter = result
      let em = filter;
      if (result === "🃏") {
          player_deck.push(await randomCard(cards))
          cards = locbai(cards, player_deck)
          player_count = tinhDiem(player_deck)
          //bots_deck.push(await randomCard(cards))
          //cards = locbai(cards, bots_deck)
          bots_count = tinhDiem(bots_deck)
          if (player_count > 21) {
            let ktra = player_deck.length - bots_deck.length
            bots_count = tinhDiem(bots_deck)
            while (player_deck.length == 2 && bots_count < player_count && player_count <= 21) {
              console.log("1 " + bots_count)
              console.log("autoMath " + autoMath(cards, player_deck, bots_deck, TwoSum))
              console.log("getcard " + getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)))
              bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
              cards = locbai(cards, bots_deck)
              bots_count = tinhDiem(bots_deck)
              console.log(player_count)
              console.log("2 " + bots_count)
            }
            while (ktra == 1 && bots_count < player_count && player_count <= 21) {
              console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
              bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
              cards = locbai(cards, bots_deck)
              bots_count = tinhDiem(bots_deck)
            }
            while (ktra == 2 && bots_count < player_count && player_count <= 21) {
              console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
              bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
              cards = locbai(cards, bots_deck)
              bots_count = tinhDiem(bots_deck)
            }
            while (ktra == 3 && bots_count < player_count && player_count <= 21) {
              console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
              bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
              cards = locbai(cards, bots_deck)
              bots_count = tinhDiem(bots_deck)
            }
            hide_deck = []
            let tile = await random(0, 1000) / 100
            return await stopGame(client, money, message, player_deck, bots_deck, player_count, bots_count, msg)
          }
          let bjEmbed3 = new MessageEmbed()
            .setTitle(`${message.author.tag} đã cược ${money.toLocaleString('En-us')} Ycoin`, message.author.displayAvatarURL())
            .setColor("#ffcc00")
            .setDescription(`Nhấn 🃏 để bốc bài, ❌ để dằn bài!\n\`Dằn bài nhỏ hơn 16 chỉ có hòa hoặc thua!\``)
            .addField(`${message.author.username} [${player_count}]`, `${createembedfield(player_deck)}`, true)
            .addField(`${client.user.username} [${tinhDiem(bots_deck.slice(0, 1))}+?]`, `${createembedfield(bots_deck.slice(0, 1))}${createembedfield(hide_deck)}`, true)
            .setFooter("🃏 Trò chơi đang diễn ra")
          msg.edit({content :`<@${message.author.id}>`, embeds : [bjEmbed3]})
            await msg.react("🃏");
      await msg.react("❌");
      let filter = (reaction, user) => {
	return reaction.emoji.name === '🃏' && user.id === message.author.id 
};
      const re = await msg.awaitReactions({ filter, max: 4, time: 60000, errors: ['time'] })
	.then(collected => result = collected.emoji.name)
	.catch(collected => {
		console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
	});
      filter = result
      let em = filter;
      if (result === "🃏") {
            player_deck.push(await randomCard(cards))
            cards = locbai(cards, player_deck)
            player_count = tinhDiem(player_deck)
            //bots_deck.push(await randomCard(cards))
            //cards = locbai(cards, bots_deck)
            bots_count = tinhDiem(bots_deck)
            if (player_count > 21) {
              let ktra = player_deck.length - bots_deck.length
              bots_count = tinhDiem(bots_deck)
              while (player_deck.length == 2 && bots_count < player_count && player_count <= 21) {
                console.log("1 " + bots_count)
                console.log("autoMath " + autoMath(cards, player_deck, bots_deck, TwoSum))
                console.log("getcard " + getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)))
                bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
                cards = locbai(cards, bots_deck)
                bots_count = tinhDiem(bots_deck)
                console.log(player_count)
                console.log("2 " + bots_count)
              }
              while (ktra == 3 && bots_count < player_count && player_count <= 21) {
                console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
                bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
                cards = locbai(cards, bots_deck)
                bots_count = tinhDiem(bots_deck)
              }
              while (ktra == 2 && bots_count < player_count && player_count <= 21) {
                console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
                bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
                cards = locbai(cards, bots_deck)
                bots_count = tinhDiem(bots_deck)
              }
              while (ktra == 1 && bots_count < player_count && player_count <= 21) {
                console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
                bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
                cards = locbai(cards, bots_deck)
                bots_count = tinhDiem(bots_deck)
              }
              hide_deck = []
              let tile = await random(0, 1000) / 100
              return await stopGame(client, money, message, player_deck, bots_deck, player_count, bots_count, msg)
            } else if (player_count < 21) {
              bots_deck.push(await randomCard(cards))
              cards = locbai(cards, bots_deck)
              let NGULINHEMBED = new MessageEmbed()
                .setTitle(`${message.author.tag} đã cược ${money.toLocaleString('En-us')} Ycoin!`, message.author.displayAvatarURL())
                .setDescription(`**NGŨ LINH!!! CHÚC MỪNG BẠN ĐƯỢC X2 TIỀN**`)
                .addField(`${message.author.username} [${player_count}]`, `${createembedfield(player_deck)}`, true)
                .addField(`${client.user.username} [${bots_count}]`, `${createembedfield(bots_deck)}`, true)
                .setColor("GREEN")
                .setFooter(`Bạn đã thắng +${(money * 2).toLocaleString('En-us')}Ycoin`)
              await client.cong(message.author.id, (parseInt(money) * 4));
              return await msg.edit({content :`<@${message.author.id}>`, embeds : [NGULINHEMBED]})
            }
          }
          else {
            let ktra = player_deck.length - bots_deck.length
            bots_count = tinhDiem(bots_deck)
            while (player_deck.length == 2 && bots_count < player_count && player_count <= 21) {
              console.log("1 " + bots_count)
              console.log("autoMath " + autoMath(cards, player_deck, bots_deck, TwoSum))
              console.log("getcard " + getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)))
              bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
              cards = locbai(cards, bots_deck)
              bots_count = tinhDiem(bots_deck)
              console.log(player_count)
              console.log("2 " + bots_count)
            }
            while (ktra == 1 && bots_count < player_count && player_count <= 21) {
              console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
              bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
              cards = locbai(cards, bots_deck)
              bots_count = tinhDiem(bots_deck)
            }
            while (ktra == 2 && bots_count < player_count && player_count <= 21) {
              console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
              bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
              cards = locbai(cards, bots_deck)
              bots_count = tinhDiem(bots_deck)
            }
            while (ktra == 3 && bots_count < player_count && player_count <= 21) {
              console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
              bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
              cards = locbai(cards, bots_deck)
              bots_count = tinhDiem(bots_deck)
            }
            hide_deck = []
            let tile = await random(0, 1000) / 100
            await stopGame(client, money, message, player_deck, bots_deck, player_count, bots_count, msg)
          }
        }
        else {
          let ktra = player_deck.length - bots_deck.length
          bots_count = tinhDiem(bots_deck)
          while (player_deck.length == 2 && bots_count < player_count && player_count <= 21) {
            console.log("1 " + bots_count)
            console.log("autoMath " + autoMath(cards, player_deck, bots_deck, TwoSum))
            console.log("getcard " + getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)))
            bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
            cards = locbai(cards, bots_deck)
            bots_count = tinhDiem(bots_deck)
            console.log(player_count)
            console.log("2 " + bots_count)
          }
          while (ktra == 1 && bots_count < player_count && player_count <= 21) {
            console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
            bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
            cards = locbai(cards, bots_deck)
            bots_count = tinhDiem(bots_deck)
          }
          while (ktra == 2 && bots_count < player_count && player_count <= 21) {
            console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
            bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
            cards = locbai(cards, bots_deck)
            bots_count = tinhDiem(bots_deck)
          }
          while (ktra == 3 && bots_count < player_count && player_count <= 21) {
            console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
            bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
            cards = locbai(cards, bots_deck)
            bots_count = tinhDiem(bots_deck)
          }
          hide_deck = []
          let tile = await random(0, 1000) / 100
          await stopGame(client, money, message, player_deck, bots_deck, player_count, bots_count, msg)
        }
      }
      else {
        let ktra = player_deck.length - bots_deck.length
        bots_count = tinhDiem(bots_deck)
        while (player_deck.length == 2 && bots_count < player_count && player_count <= 21) {
          console.log("1 " + bots_count)
          console.log("autoMath " + autoMath(cards, player_deck, bots_deck, TwoSum))
          console.log("getcard " + getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)))
          bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
          cards = locbai(cards, bots_deck)
          bots_count = tinhDiem(bots_deck)
          console.log(player_count)
          console.log("2 " + bots_count)
        }
        while (ktra == 1 && bots_count < player_count && player_count <= 21) {
          console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
          bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
          cards = locbai(cards, bots_deck)
          bots_count = tinhDiem(bots_deck)
        }
        while (ktra == 2 && bots_count < player_count && player_count <= 21) {
          console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
          bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
          cards = locbai(cards, bots_deck)
          bots_count = tinhDiem(bots_deck)
        }
        while (ktra == 3 && bots_count < player_count && player_count <= 21) {
          console.log(autoMath(cards, player_deck, bots_deck, TwoSum))
          bots_deck.push(getCard(cards, autoMath(cards, player_deck, bots_deck, TwoSum)) || cards[await random(0, cards.length - 1)])
          cards = locbai(cards, bots_deck)
          bots_count = tinhDiem(bots_deck)
        }
        hide_deck = []
        let tile = await random(0, 1000) / 100
        await stopGame(client, money, message, player_deck, bots_deck, player_count, bots_count, msg)
      }
    }
  }
};
function getCard(cards, num) {
  let res = cards.find(e => e.replace(/(<:|(c|d|h|s):[0-9]{0,100}>)/g, "").includes(num.toString().replace(/10/g, "a").replace(/11/g, "a")))
  if (!res) return null
  return res
}
function autoMath(cards, player_deck, bots_deck, arr) {
  let a, b, res;
  let num = Math.floor(Math.random() * (24 - 18)) + 18;
  let num1 = tinhDiem(player_deck)//20
  let num2 = tinhDiem(bots_deck)//20
  if (num1 > num2) {
    for (i1 of arr) {
      a = num + i1
      if (a !== num && a <= num1) {
        b = num - i1
        res = i1
      }
    }
  }
  else if (num2 == num1) {
    for (i1 of arr) {
      a = num + i1
      if (a == num) {
        res = i1
      } else if (a !== num) {
        b = num - i1
        res = i1
      }
    }
  }
  if (!res) {
    let timbai = getCard(cards, num - num2)
    if (!timbai) {
      res = num - num2
    } else {
      res = Math.floor(Math.random() * (10 - 3)) + 3
    }
  }
  return res
}

async function randomCard(cards) {
  if (!Array.isArray(cards)) return null;
  return cards[await random(0, cards.length - 1)]
}
function locbai(listOfCard, deck) {
  if (!Array.isArray(listOfCard) || !Array.isArray(deck)) return null;
  return listOfCard.filter(item => !deck.includes(item))
}
function createembedfield(deck) {
  if (!Array.isArray(deck)) return null;
  let line = ""
  deck.forEach(card => {
    line += card
  })
  return line
}
const allEqual = arr => arr.every(val => val === arr[0]);
function tinhDiem(arr) {
  let diem = 0
  arr = arr.map(e => e.replace(/(<a:|(c|d|h|s):[0-9]{0,100}>)/g, ""))
  if (arr.includes("a") && !allEqual(arr)) {
    arr = removeItemOnce(arr, "a")
    for (i1 of arr) {
      diem += parseInt(i1.replace(/(j|q|k)/g, "10").replace(/a/g, "1"))
    }
    if (diem > 11) {
      diem += 1
    } else if (diem <= 11) {
      diem += 11
    }
  } else if (arr.includes("a") && allEqual(arr)) {
    for (i3 of arr) {
      diem += 10
    }
  } else {
    for (i2 of arr) {
      diem += parseInt(i2.replace(/(<:a|(c|d|h|s):[0-9]{0,100}>)/g, "").replace(/(j|q|k)/g, "10"))
    }
  }
  return diem
}
function checkWin(arr1, arr2) {
  let pcount = tinhDiem(arr1)
  let bcount = tinhDiem(arr2)
  let res;
  if (pcount > 21 && bcount <= 21) {
    res = "thua"
  } else if (pcount > 21 && bcount > 21) {
    res = "hoa"
  } else if (pcount >= 15 && pcount <= 21 && bcount > 21) {
    res = "thang"
  } else if (pcount > bcount && pcount <= 21) {
    res = "thang"
  } else if (pcount == bcount) {
    res = "hoa"
  } else if (pcount < bcount) {
    res = "thua"
  } else if (pcount <= 15 && bcount <= 21 && botcount > 15) {
    res = "thua"
  } else if (pcount < 15 && bcount < 15) {
    res = "hoa"
  } else if (pcount < 15 && bcount > 15 && bcount <= 21) {
    res = "thua"
  } else if (pcount < 15 && bcount > 21) {
    res = "hoa"
  }

  return res
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

async function stopGame(client, amount, message, player_deck, bots_deck, player_count, bots_count, msg) {
  let ketqua = checkWin(player_deck, bots_deck)
  let bjEmbeds = new MessageEmbed()
    .setTitle(`${message.author.tag} đã cược ${amount.toLocaleString('En-us')} Ycoin`, message.author.displayAvatarURL())
    .addField(`${message.author.username} [${player_count}]`, `${createembedfield(player_deck)}`, true)
    .addField(`${client.user.username} [${bots_count}]`,
      `${createembedfield(bots_deck)}`, true)
  switch (ketqua) {
    case "thang":
      await client.cong(message.author.id, parseInt(amount)*2);
      bjEmbeds.setColor("GREEN")
      bjEmbeds.setFooter(`Bạn đã thắng +${amount.toLocaleString('En-us')}Ycoin`)
      await msg.edit({content :`<@${message.author.id}>`, embeds : [bjEmbeds]})
      break;
    case "thua":
      
      bjEmbeds.setColor("RED")
      bjEmbeds.setFooter(`Bạn đã thua -${amount.toLocaleString('En-us')}Ycoin`)
      await msg.edit({content :`<@${message.author.id}>`, embeds : [bjEmbeds]})
      break;
    case "hoa":
      await client.cong(message.author.id, parseInt(amount))
      bjEmbeds.setColor("#757575")
      bjEmbeds.setFooter(`Bạn đã hòa`)
      await msg.edit({content :`<@${message.author.id}>`, embeds : [bjEmbeds]})
      break;
  }
  console.log(ketqua)
}
let twoSum = (array, sum) => {
  let hashMap = {},
    results = []

  for (let i = 0; i < array.length; i++) {
    if (hashMap[array[i]]) {
      results.push([hashMap[array[i]], array[i]])
    } else {
      hashMap[sum - array[i]] = array[i];
    }
  }
  return results;
}
function checkAutoWin(arr1, arr2) {
  let kq1 = tinhDiem(arr1)
  let kq2 = tinhDiem(arr2)
  let check = false
  if (kq1 == 21) {
    if (kq2 < 21) {
      check = true
    }
  }
  if (kq1 == kq2) check = false
  return check
}

