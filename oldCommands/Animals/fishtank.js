const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const number = require('../../config/number.json');
const thu = require('../../config/animal.json');
const BanSchema = require('../../models/BanSchema');
const animalSchema = require('../../models/animalSchema')
const zoopointSchema = require('../../models/zoopointSchema')
module.exports = {
  name: 'tank',
  cooldown: 15000,
  description: "Săn thú và sở hữu khối tài sản khổng lồ của riêng bạn! Sử dụng ngọc để boost sức mạnh thợ săn của mình! JOB chuyên dùng : THỢ SĂN",
  description2: "Hunting and get your self a huge amount of cash, using gems to boost your hunter power!",
  aliases: ['fishtank', 'hoca'],
  cderror: 'đừng vội thế chứ, bạn vừa đi câu mà',
  cderror2: 'don\'t rush, you\'ve just catch some fishes',
  use2: "you hard-working fisher <3",
  use: 'nhé!',
  usage: "Ycc",
  usage2: "Yfs",
  run: async (client, message, args) => {
    const fishes = [
      "🐟",
      "🐠",
      "🐡",
      "🦐",
      "🦑",
      "🐙",
      "🦞",
      "🦀",
      "🐊",
      "🐬",
      "<:Ynth:930032493065801758>",
      "🦭",
      "🐳",
      "⚓",
      "🪝",
      "<:10:1029696302159761418>"
    ]
    const array = await animalSchema.find(
      { id: message.author.id, type: "fish" }
    ).sort({ quanlity: -1 })
    let errorZoo = [
      `:x: | **${message.author.username}**, bạn chưa có cá nào cả`,
      `:x: | **${message.author.username}**, you have no fishes!`
    ]
    if (!array[0]) return await client.send(client, message, errorZoo, null)
    const max = array[0].quanlity
    let digits = Math.trunc(Math.log10(max) + 1);
    let msg = ``
    for (a in array) {
      var o = array[a];
      i = o.quanlity
      msg += `${o.name}${toSmallNum(o.quanlity, digits)} `
    }
    await message.channel.send(`<a:Yvayduoi:924665374589481040><a:Yhoa:945619719355002881> | Ao Cá của **__${message.author.username}__**| <a:Yhoa:945619719355002881><a:Yvayduoi1:924665323578359888>
${msg}
`).catch(e => console.log(e))
    function toSmallNum(count, digits) {
      var result = '';
      var num = count;
      if (count < 0) count = 0;
      for (i = 0; i < digits; i++) {
        var digit = count % 10;
        count = Math.trunc(count / 10);
        result = number.numbers[digit] + result;
      }
      return result;
    }
  }
}