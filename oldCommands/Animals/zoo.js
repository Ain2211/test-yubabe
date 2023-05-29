const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const number = require('../../config/number.json');
const thu = require('../../config/animal.json');
const BanSchema = require('../../models/BanSchema');
const animalSchema = require('../../models/animalSchema')
const zoopointSchema = require('../../models/zoopointSchema')
module.exports = {
  name: 'zoo',
  cooldown: 15000,
  description: 'Xem những con thú mà bạn đã săn được và khoe nó với bạn bè!',
  description2: 'Check your hunted animals and show it to your friends!',
  usage2: "Yz",
  aliases: ['z', 'animal'],
  cderror: "bạn mới vừa check zoo mà!",
  use: "check nhé!",
  cderror2: 'don\'t rush, you\'ve just check your animals',
  use2: "check again <3",
  usage: 'Yz',
  run: async (client, message, args) => {
    let name1 = `${thu.C[0]}`;
    let name2 = `${thu.C[1]}`;
    let name3 = `${thu.C[2]}`;
    let name4 = `${thu.C[3]}`;
    let name5 = `${thu.C[4]}`;

    let name6 = `${thu.U[0]}`;
    let name7 = `${thu.U[1]}`;
    let name8 = `${thu.U[2]}`;
    let name9 = `${thu.U[3]}`;
    let name10 = `${thu.U[4]}`;

    let name11 = `${thu.R[0]}`;
    let name12 = `${thu.R[1]}`;
    let name13 = `${thu.R[2]}`;
    let name14 = `${thu.R[3]}`;
    let name15 = `${thu.R[4]}`;

    let name16 = `${thu.SR[0]}`;
    let name17 = `${thu.SR[1]}`;
    let name18 = `${thu.SR[2]}`;
    let name19 = `${thu.SR[3]}`;
    let name20 = `${thu.SR[4]}`;

    let name21 = `${thu.E[0]}`;
    let name22 = `${thu.E[1]}`;
    let name23 = `${thu.E[2]}`;
    let name24 = `${thu.E[3]}`;
    let name25 = `${thu.E[4]}`;

    let name26 = `${thu.P[0]}`;
    let name27 = `${thu.P[1]}`;
    let name28 = `${thu.P[2]}`;
    let name29 = `${thu.P[3]}`;
    let name30 = `${thu.P[4]}`;
    let name31 = `${thu.P[5]}`;
    let name32 = `${thu.P[6]}`;
    let name33 = `${thu.P[7]}`;

    let name34 = `${thu.G[0]}`;
    let name35 = `${thu.G[1]}`;
    let name36 = `${thu.G[2]}`;
    let name37 = `${thu.G[3]}`;
    let name38 = `${thu.G[4]}`;
    let name39 = `${thu.G[5]}`;
    let name40 = `${thu.G[6]}`;
    let name41 = `${thu.D[0]}`;
    let name42 = `${thu.D[1]}`;
    let name43 = `${thu.D[2]}`;
    let name44 = `${thu.D[3]}`;
    let name45 = `${thu.D[4]}`;
    let name46 = `${thu.V[0]}`;
    let name47 = `${thu.V[1]}`;
    let name48 = `${thu.V[2]}`;
    let name49 = `${thu.V[3]}`;
    let name50 = `${thu.V[4]}`;
    let name51 = `${thu.V[5]}`;
    let ids = [name1, name2, name3, name4, name5, name6, name7, name8, name9, name10, name11, name12, name13, name14, name15, name16, name17, name18, name19, name20, name21, name22, name23, name24, name25, name26, name27, name28, name29, name30, name31, name32, name33, name34, name35, name36, name37, name38, name39, name40, name41, name42, name43, name44, name45, name46, name47, name48, name49, name50, name51]
    const array = await animalSchema.find(
      { id: message.author.id, name: { $in: ids } }
    ).sort({ quanlity: -1 })
    let errorZoo = [
      `:x: | **${message.author.username}**, bạn chưa có thú nào cả`,
      `:x: | **${message.author.username}**, you have no Animals!`
    ]
    if (!array[0]) return await client.send(client, message, errorZoo, null)
    const msg = []
    let zopo = 0
    let typeC = ``
    let typeU = ``
    let typeR = ``
    let typeSR = ``
    let typeE = ``
    let typeP = ``
    let typeG = ``
    let typeD = ``
    let typeV = ``

    const max = array[0].quanlity
    let digits = Math.trunc(Math.log10(max) + 1);

    for (a in array) {

      var o = array[a];
      i = o.quanlity

      if (o.type == `C`) {
        typeC += `${o.name}${toSmallNum(o.quanlity, digits)}`

      }
      else if (o.type == `U`) {
        typeU += `${o.name}${toSmallNum(o.quanlity, digits)}`

      }
      else if (o.type == `R`) {
        typeR += `${o.name}${toSmallNum(o.quanlity, digits)}`

      }
      else if (o.type == `SR`) {
        typeSR += `${o.name}${toSmallNum(o.quanlity, digits)}`

      }
      else if (o.type == `E`) {
        typeE += `${o.name}${toSmallNum(o.quanlity, digits)}`

      }
      else if (o.type == `P`) {
        typeP += `${o.name}${toSmallNum(o.quanlity, digits)}`

      }
      else if (o.type == `G`) {
        typeG += `${o.name}${toSmallNum(o.quanlity, digits)}`

      }
      else if (o.type == `D`) {
        typeD += `${o.name}${toSmallNum(o.quanlity, digits)}`

      } else if (o.type == `V`) {
        typeV += `${o.name}${toSmallNum(o.quanlity, digits)}`
      }
    }
    const zpoint = await client.zoopoint(message.author.id)
    await message.channel.send(`
<:thuC:974055213549891634> ${typeC}    

<:thuU:974055213772185621> ${typeU}

<:thuR:974055213566660669> ${typeR}

<:thuSR:974055213726064670> ${typeSR}

<:thuE:974055213495361546> ${typeE}

<:thuP:974055213189189653> ${typeP}

<:thug:974055213633790004> ${typeG}

<:thuD:974055213361139753> ${typeD}

<:thuV:974055213730234388> ${typeV}

\`Điểm zoo : ${zpoint}\`
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

//<a:Ypinkbutterfly:918857385299283968>
