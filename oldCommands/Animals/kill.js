
const { QuickDB } = require("quick.db")
const db = new QuickDB()


const { AttachmentBuilder,ButtonStyle,ActionRowBuilder,ButtonBuilder,ComponentType } = require("discord.js")
module.exports = {
  name: 'kill',
  cooldown: 0,
  description: "Giết thú để nhận tinh hoa sự sống",
  description2: "Kill animals to get Life Elite",
  aliases: [],
  cderror: 'đừng vội thế chứ, bạn vừa bắt thú mà',
  cderror2: 'don\'t rush, you\'ve just catch some animals',
  use2: "you hard-working hunter <3",
  use: 'nhé thợ săn chăm chỉ!',
  usage: "Ykill <rank>",
  usage2: "Ykill <rank>",
  run: async (client, message, args) => {
   const C = ["🐛", "🪱", "🐞", "🐌", "🦋"]
const U = ["🐭", "🐰", "🐱", "🐶", "🦊"]
const R = ["🐓", "🐖", "🐏", "🐄", "🐃"]
const SR = ["🦎", "🐢", "🦂", "🐍", "🐊"]
const E = ["🐒", "🦛", "🐆", "🐅", "🐘"]
const P = [
  "<a:Ybutterfly:911682101005398058>",
  "<a:Yizumilacmong:929738419930808430>",
  "<:Ynth:930032493065801758>",
  "<:Ykhatrapboi:918082945686851615>",
  "<:be_non:918932737543503912>",
  "<a:Yu_meobaymau:944351775597674558>",
  "<:Yquyxu:941244934797799434>",
  "<a:GG_hongchuyen:911309645681946685>"
]
const G = [
  "<:G_naisungtam:974392899536056401>",
  "<:G_kilan:974392813095616542>",
  "<:G_gautruc:974392721106149466>",
  "<:G_cho:974392664445308958>",
  "<:G_chim:974392505317597194>",
  "<:G_caoden:974392590029959188>",
  "<:G_bachtuoc:974392970931470347>"
]
const D = [
  "<:D_Chimera:985411852542562344>",
  "<:D_Hydra:985411855927349298>",
  "<:D_Medusa:985411858557202513>",
  "<:D_Minotaur:985411860922761276>",
  "<:D_Pegasus:985411864324358184>"
]
const V = [
  "<a:V_Cinderella:988149859745943592>",
  "<a:V_Sonic:988149031291215914>",
  "<a:V_Vanellope:988148591669440615>",
  "<a:V_Belle:988150258066423858>",
  "<a:V_BossBaby:988147327292276756>",
  "<a:V_Mikey:994182093183655966>"
]
    const animalSchema = require("../../models/animalSchema")
    const errorAnimals = [
      `Loại thú bạn nhập không đúng hoặc không đủ để hiến tế`,
      `You don't have any animals type ${args[0]} to get elite.`
    ]
    let types = {
      "c" : "C",
      "C" : "C",
      "common" : "C",
      "u" : "U",
      "U" : "U",
      "uncommon" : "U",
      "r" : "R",
      "R" : "R",
      "rare" : "R",
      "s" : "SR",
      "S" : "SR",
      "SR" : "SR",
      "sr" : "SR",
      "Sr" : "SR",
      "superrare" : "SR",
      "e" : "E",
      "E" : "E",
      "epic" : "E",
      "p" : "P",
      "P" : "P",
      "pro" : "P",
      "g" : "G",
      "G" : "G",
      "grand" : "G",
      "d" : "D",
      "D" : "D",
      "devil" : "D",
      "v" : "V",
      "V" : "V",
      "vip" : "V"
    }
      
    
    let killtype = types[args[0]]
    
    const selltype = await animalSchema.find({ id: message.author.id, type:killtype}).sort({ quanlity: -1 })
    if (args[0] == `all`) {
      let wait = [
        `<a:load02:902835678361047070> | Đợi một chút, tôi đang tính toán...`,
        `<a:load02:902835678361047070> | Wait a sec, I'm counting your animals...`,
      ]
      let a = await client.reply(client, message, wait, null)
      let types = [
        "C",
        "U",
        "R",
        "SR",
        "E",
"P",
        "D",
        "G",
"V"
      ]
      let amount = 0
      for (let t in types) {
        const selltype = await animalSchema.find({ id: message.author.id, type:types[t]}).sort({ quanlity: -1 })
        if (selltype[0]) {
            let sltb = 0
            let moneys = 0
            for (let a in selltype) {
              let thuban = selltype[a]
              let price = checkprice(C, U, R, SR, E, P, G, D, V, thuban.name)
              let sl = thuban.quanlity
              sltb += sl
              if (sl >= 1) moneys += price * sl
              if (sl < 1) moneys += 0
              thuban.quanlity = 0
              await thuban.save()
            }
            amount += moneys
        }
      }
await client.addgrow(message.author.id, "<:LifeElite:1029361004167037090>", amount, "elites")
      let soldSuccess = [
              `<:vvv:921536318062862396> | **${message.author.username}**, bạn đã hiến tế tất cả thú và thu được **${parseInt(amount).toLocaleString('En-Us')} <:LifeElite:1029361004167037090>**`,
              `<:vvv:921536318062862396> | **${message.author.username}**, you killed all animals and received **${parseInt(amount).toLocaleString('En-Us')} <:LifeElite:1029361004167037090>**`
            ]
            await client.send(client, message, soldSuccess, null)
      await a.delete()
    }
    else if (!selltype[0] || !args[0]) return client.reply(client,message,errorAnimals, null)
    else if (selltype[0]) {
            let sltb = 0
            let moneys = 0
            for (let a in selltype) {
              let thuban = selltype[a]
              let price = checkprice(C, U, R, SR, E, P, G, D, V, thuban.name)
              let sl = thuban.quanlity
              sltb += sl
              if (sl >= 1) moneys += price * sl
              if (sl < 1) moneys += 0
              thuban.quanlity = 0
              await thuban.save()
            }
            await client.addgrow(message.author.id, "<:LifeElite:1029361004167037090>", moneys, "elites")
            let soldSuccess = [
              `<:vvv:921536318062862396> | **${message.author.username}**, bạn đã hiến tế **${sltb}** thú loại **${args[0]}** và thu được **${parseInt(moneys).toLocaleString('En-Us')} <:LifeElite:1029361004167037090>**`,
              `<:vvv:921536318062862396> | **${message.author.username}**, you killed **${sltb}** type ${args[0]} animals and received **${parseInt(moneys).toLocaleString('En-Us')} <:LifeElite:1029361004167037090>**`
            ]
            await client.send(client, message, soldSuccess, null)
    }
   /* else {
      const buttonRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`${message.id}.C`).setLabel("Kill Commons").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`${message.id}.U`).setLabel("Kill Uncommons").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId(`${message.id}.R`).setLabel("Kill Rares").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId(`${message.id}.SR`).setLabel("Kill Superrares").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId(`${message.id}.E`).setLabel("Kill Epics").setStyle(ButtonStyle.Primary),
  );

  const sentMsg = await message.channel.send({
    content: "Bạn muốn hiến tế thú? Hãy click bên dưới!",
    components: [buttonRow],
  });

  if (!sentMsg) return;

  const btnInteraction = await channel
    .awaitMessageComponent({
      componentType: ComponentType.Button,
      filter: (i) => i.customId === "giveaway_btnSetup" && i.member.id === member.id && i.message.id === sentMsg.id,
      time: 20000,
    })
    .catch((ex) => {});

  if (!btnInteraction) return sentMsg.edit({ content: "No response received, cancelling setup", components: [] });
    }
*/
    }
  }

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

function checkprice(c, u, r, s, e, p, g, d, v, thu) {
  let result = 0
  if (c.includes(thu)) result = 1
  if (u.includes(thu)) result = 2
  if (r.includes(thu)) result = 3
  if (s.includes(thu)) result = 4
  if (e.includes(thu)) result = 5
  if (p.includes(thu)) result = 10
  if (g.includes(thu)) result = 6
  if (d.includes(thu)) result = 7
  if (v.includes(thu)) result = 20
  return result
}
