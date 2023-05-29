const { EmbedBuilder } = require('discord.js');
const itemSchema = require('../../models/itemSchema')
const houseSchema = require('../../models/houseSchema');
const ringSchema = require('../../models/ringSchema');
const number = require('../../config/number.json');
const gemSchema = require('../../models/gemSchema');
const invSchema = require('../../models/invSchema');
const gems1 = [
  '<:C_gem_01:982028743608533022>',
  '<:U_gem_01:982028744204103810>',
  '<:R_gem_01:982028744107655198>',
  '<:SR_gem_01:982028743960854598>',
  '<:E_gem_01:982028743595941938>',
  '<:P_gem_01:982028744191529010>',
  '<:G_gem_01:982028743629484082>'
];
const gems2 = [
  '<:C_gem_02:982028743537209424>',
  '<:U_gem_02:982028744061505606>',
  '<:R_gem_02:982028744124428428>',
  '<:SR_gem_02:982028743956652072>',
  '<:E_gem_02:982028743679827968>',
  '<:P_gem_02:982028743713366066>',
  '<:G_gem_02:982028743646265364>'
];
const gems3 = [
  '<:C_gem_03:982028743914696704>',
  '<:U_gem_03:982028743650463795>',
  '<:R_gem_03:982028743948247110>',
  '<:SR_gem_03:982028744124411924>',
  '<:E_gem_03:982028743805648926>',
  '<:P_gem_03:982028743960830032>',
  '<:G_gem_03:982028743537217588>'
];
const gems4 = [
  '<:C_gem_04:982028743570755624>',
  '<:U_gem_04:982028744187326494>',
  '<:R_gem_04:982028743822426152>',
  '<:SR_gem_04:982028743981817908>',
  '<:E_gem_04:982028743688212520>',
  '<:P_gem_04:982028743893721178>',
  '<:G_gem_04:982028744057294848>'
];
const plantSchema = require('../../models/plantSchema')
const farmSchema = require('../../models/farmSchema')
module.exports = {
  name: "inventory",
  description: "xem kho trang bị của bạn",
  aliases: ["inv", 'kho'],
  cooldown: 10000,
  usage: "Yinv",
  description2: "check your inventory",
  usage2: "Yinv",
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  run: async (client, message, args) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB()
    const lang = await db.get(`${message.guild.id}_languages`)
    if (lang == "vi") {
      let msgnhan = []
      let msgpassport = []
      let ringid = [
        '<:Yu_nhanco:951133679546159214>',
        '<:Yu_nhanbac:941435162728730675>',
        '<:Yu_nhanvang:941435163181727824>',
        '<:Yu_nhankimcuong:941435160883265556>',
        '<:Yu_nhanvangkc:951586992897024060>'
      ]
      let passportid = [
        "<:ProPassport:988093838348410930>",
        "<:VIPPassport:988093810955411456>"
      ]
      let arrayNhan = await invSchema.find({ memberid: message.author.id })
      if (arrayNhan[0]) {
        for (let r in arrayNhan) {
          let nhan = arrayNhan[r]
          if (nhan.type == `ring`) {
            let id = idnhan(ringid, nhan.name)
            msgnhan += `\`${id}\`${nhan.name}${toSmallNum(nhan.quanlity, 2)} - Giá Trị Hiện Tại: **${parseInt(nhan.price).toLocaleString('En-Us')}**\n`
          } else if (nhan.type == `passport`) {
            let id = idpassport(passportid, nhan.name)
            msgpassport += `\`${id}\`${nhan.name}${toSmallNum(nhan.quanlity, 2)}\n`
          }
        }
      }
      let gem = {
        '<:C_gem_01:982028743608533022>': '01',
        '<:U_gem_01:982028744204103810>': '05',
        '<:R_gem_01:982028744107655198>': '09',
        '<:SR_gem_01:982028743960854598>': '13',
        '<:E_gem_01:982028743595941938>': '17',
        '<:P_gem_01:982028744191529010>': '21',
        '<:G_gem_01:982028743629484082>': '25',
        '<:C_gem_02:982028743537209424>': '02',
        '<:U_gem_02:982028744061505606>': '06',
        '<:R_gem_02:982028744124428428>': '10',
        '<:SR_gem_02:982028743956652072>': '14',
        '<:E_gem_02:982028743679827968>': '18',
        '<:P_gem_02:982028743713366066>': '22',
        '<:G_gem_02:982028743646265364>': '26',
        '<:C_gem_03:982028743914696704>': '03',
        '<:U_gem_03:982028743650463795>': '07',
        '<:R_gem_03:982028743948247110>': '11',
        '<:SR_gem_03:982028744124411924>': '15',
        '<:E_gem_03:982028743805648926>': '19',
        '<:P_gem_03:982028743960830032>': '23',
        '<:G_gem_03:982028743537217588>': '27',
        '<:C_gem_04:982028743570755624>': '04',
        '<:U_gem_04:982028744187326494>': '08',
        '<:R_gem_04:982028743822426152>': '12',
        '<:SR_gem_04:982028743981817908>': '16',
        '<:E_gem_04:982028743688212520>': '20',
        '<:P_gem_04:982028743893721178>': '24',
        '<:G_gem_04:982028744057294848>': '28'
      };
      let arraydaren = {
        "<:DaXanh:992152828745371719>": "01",
        "<:DaDo:992152854238335016>": "02",
        "<:BanVeKhoangSan:987454288634712094>": "03",
        "<:Yu_da_lv1:987444740712710164>": "04",
        "<:Yu_dagranite_lv2:987444714133422120>": "05",
        "<:Yu_daonyx_lv3:987444715538481165>": "06",
        "<:Yu_dong_lv1:987449365255819295>": "07",
        "<:Yu_dong_lv2:987449367462023248>": "08",
        "<:Yu_dong_lv3:987450211184025712>": "09",
        "<:Yu_go_lv1:987441917795110981>": "10",
        "<:Yu_go_lv2:987440797781737512>": "11",
        "<:Yu_go_lv3:987440779003834448>": "12",
        "<:Yu_kimcuong_lv3:987438010587037797>": "13",
        "<:Yu_sat_lv1:987442725278339072>": "14",
        "<:Yu_sat_lv2:987443294252445736>": "15",
        "<:Yu_sat_lv3:987443291983327232>": "16",
        "<:Yu_thachanh_lv1:987663560446447646>": "17",
        "<:Yu_thachanh_lv2:987663600434970644>": "18",
        "<:Yu_thachanh_lv3:987663580860121159>": "19",
        "<:Yu_vang_lv1:987448320123363418>": "20",
        "<:Yu_vang_lv2:987448322182770719>": "21",
        "<:Yu_vang_lv3:987448317636124773>": "22",
        "<:Yu_bac_lv1:987451135776391199>": "23",
        "<:Yu_bac_lv2:987451133847031928>": "24",
        "<:Yu_bac_lv3:987451131460464680>": "25",
        "<:DaCuongHoa:989109642489638952>": "26",
        "<:DaTinhLuyen:989109963282587649>": "27",
        "<:ThanThach_DaTinhLuyen:989111520812232724>": "28",
        "<:DaTrangSuc:989110004718120990>": "29",
        "<:DaTrangBi:989110130324938803>": "30",
        "<:DaVuKhi:991629364846403654>": "31",
        "<:DaTrangSucTinhXao:989110096518852638>": "32",
        "<:DaTrangBiTinhXao:989110189422702612>": "33",
        "<:DaTrangBiTrungCap:989110275829559316>": "34",
        "<:DaVuKhiTrungCap:989110246519758888>": "35",
        "<:DaRenVuKhiChuyenDung:991632707744440460>": "35",
        "<:DaRenThanKhi:991632728602722324>": "36",
        "<:DaNguSac:989110158300958760>": "37",
      };
      const ngoc1 = await gemSchema
        .find({ memberid: message.author.id, type: 1 })
        .sort({ quanlity: -1 });
      const ngoc2 = await gemSchema
        .find({ memberid: message.author.id, type: 2 })
        .sort({ quanlity: -1 });
      const ngoc3 = await gemSchema
        .find({ memberid: message.author.id, type: 3 })
        .sort({ quanlity: -1 });
      const ngoc4 = await gemSchema
        .find({ memberid: message.author.id, type: 4 })
        .sort({ quanlity: -1 });
      let msg1 = ``;
      if (!ngoc1[0]) msg1 = `:x: | **${message.author.username}**, bạn chưa có ngọc tăng số lượng nào cả`;
      let msg2 = ``;
      if (!ngoc2[0]) msg2 = `:x: | **${message.author.username}**, bạn chưa có ngọc nhân đôi nào cả`;
      let msg3 = ``;
      if (!ngoc3[0]) msg3 = `:x: | **${message.author.username}**, bạn chưa có ngọc may mắn nào cả`;
      let msg4 = ``;
      if (!ngoc4[0]) msg4 = `:x: | **${message.author.username}**, bạn chưa có viên KingStone nào cả`;
      if (ngoc1[0]) {
        const max = ngoc1[0].quanlity;
        let digits = Math.trunc(Math.log10(max) + 1);
        for (g in ngoc1) {
          var n = ngoc1[g];
          var id = gem[n.typeS]
          var type = 1

          if (n) msg1 += `\`${id}\`${n.typeS}${toSmallNum(n.quanlity, digits)} `;
        }
      }
      if (ngoc2[0]) {
        const max = ngoc2[0].quanlity;
        let digits = Math.trunc(Math.log10(max) + 1);
        for (g in ngoc2) {
          var n = ngoc2[g];
          var id = gem[n.typeS]
          var type = 1

          if (n) msg2 += `\`${id}\`${n.typeS}${toSmallNum(n.quanlity, digits)} `;
        }
      }
      if (ngoc3[0]) {
        const max = ngoc3[0].quanlity;
        let digits = Math.trunc(Math.log10(max) + 1);
        for (g in ngoc3) {
          var n = ngoc3[g];
          var id = gem[n.typeS]
          var type = 1
          if (n) msg3 += `\`${id}\`${n.typeS}${toSmallNum(n.quanlity, digits)} `;
        }
      }
      if (ngoc4[0]) {
        const max = ngoc4[0].quanlity;
        let digits = Math.trunc(Math.log10(max) + 1);
        for (g in ngoc4) {
          var n = ngoc4[g];
          var id = gem[n.typeS]
          var type = 1
          if (n) msg4 += `\`${id}\`${n.typeS} ${toSmallNum(n.quanlity, digits)} `;
        }
      }
      const gembox = await gemSchema.find({ memberid: message.author.id, type: 0 }).sort({ quanlity: -1 })
      if (!gembox[0]) {
        const addgembox = new gemSchema({ memberid: message.author.id, typeS: `<:GEMBOX:982028743952441355>`, quanlity: 0, type: 0 })
        await addgembox.save()
        const addprogembox = new gemSchema({ memberid: message.author.id, typeS: `<:PRO_GEMBOX:982028744057298964>`, quanlity: 0, type: 0 })
        await addprogembox.save()
        const addvipgembox = new gemSchema({ memberid: message.author.id, typeS: `<:VIP_GEMBOX:982028743889543278>`, quanlity: 0, type: 0 })
        await addvipgembox.save()
      }
      let gemboxmsg = ``
      const max2 = gembox[0].quanlity;
      let digits2 = Math.trunc(Math.log10(max2) + 1);
      for (let g in gembox) {
        let gem = gembox[g]
        let name = gem.typeS
        let quanlity = gem.quanlity
        let id = ``
        if (name == `<:GEMBOX:982028743952441355>`) id = `29`
        if (name == `<:PRO_GEMBOX:982028744057298964>`) id = `32`
        if (name == `<:VIP_GEMBOX:982028743889543278>`) id = `33`
        gemboxmsg += `\`${id}\`${name}${toSmallNum(quanlity, digits2)}`
      }
      const daren = await itemSchema.find({ id: message.author.id, type: `daren` }).sort({ quanlity: -1 })
      let msgdaren = ``
      if (daren[0]) {
        const max = daren[0].quanlity;
        let digits = Math.trunc(Math.log10(max) + 1);
        for (let g in daren) {
          var n = daren[g];
          var id = arraydaren[n.name]
          if (g % 5 == 4) {
            msgdaren += `\`${id}\`${n.name} ${toSmallNum(n.quanlity, digits)}
`
            continue
          }
          msgdaren += `\`${id}\`${n.name} ${toSmallNum(n.quanlity, digits)}`
        }
      }
      const thuhon = await invSchema.findOne({ memberid: message.author.id, name: `<:ThuHon:991633698300624956>`, type: `th` })
      //if (n.typeS == `<:GEMBOX:982028743952441355>`) id = `29`
      let slth = 0
      if (thuhon) slth = thuhon.quanlity
      let maxth = Math.trunc(Math.log10(slth) + 1)
      let items = await itemSchema
        .find({ id: message.author.id, type: "mypham"})
        .sort({ quanlity: -1 })
      let msgitems = ``
      if (items[0]) {
        const max3 = items[0].quanlity;
        let digits3 = Math.trunc(Math.log10(max3) + 1);
        for (let i in items) {
          let a = items[i]
          let name = a.name
          let quanlity = a.quanlity
          msgitems += `\`${checkidmp(name)}\`${name}${toSmallNum(quanlity, digits3)}`
        }
      } else msgitems = `Bạn chưa có vật phẩm nào cả~`

      const itemembed = msgitems
      //const itemembed = ` <:ThuHon:991633698300624956>${toSmallNum(slth, maxth)}`

      const ngochuntembed = `<a:Ytim7mau:911681859275079732> **TÀI SẢN CỦA ${message.author.username}** <a:Ytim7mau:911681859275079732> 
**Ngọc : Yuse + <ID>**
${gemboxmsg}\n**Ngọc Số Lượng**\n${msg1}\n**Ngọc Nhân Đôi Thú**\n${msg2}\n**Ngọc May Mắn**\n${msg3}\n**KING STONE**\n${msg4}`
      
      const nhanembed = `<a:Ytim7mau:911681859275079732> **TÀI SẢN CỦA ${message.author.username}** <a:Ytim7mau:911681859275079732> 
<a:emoji_131:910626774638010378> Nhẫn :
${msgnhan}`
      const passportembed = `<a:Ytim7mau:911681859275079732> **TÀI SẢN CỦA ${message.author.username}** <a:Ytim7mau:911681859275079732> 
<a:emoji_131:910626774638010378> Passport :
${msgpassport}`

      const ringembed = new EmbedBuilder()
        .setAuthor({ name: `Kho của ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`KHO NHẪN`)
        .setDescription(nhanembed)
        .setColor("#303037")
        .setFooter({ text: "Cảm ơn bạn đã bên cạnh Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()
      const gemembed = new EmbedBuilder()
        .setAuthor({ name: `Kho Của ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`Kho Ngọc`)
        .setDescription(ngochuntembed)
        .setColor("#303037")
        .setFooter({ text: "Cảm ơn bạn đã bên cạnh Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()

      /**
        const houseembed = new EmbedBuilder()
        .setAuthor({ name: `Bất Động Sản Của ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`Bất Động Sản`)
        .setDescription(nhaembed)
        .setColor("#303037")
        .setFooter({ text: "Cảm ơn bạn đã bên cạnh Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()
  **/
      const heroesembed = new EmbedBuilder()
        .setAuthor({ name: `Kho Mảnh Tướng Của ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`Mảnh Tướng`)
        .setDescription(manhtuongembed)
        .setColor("#303037")
        .setFooter({ text: "Cảm ơn bạn đã bên cạnh Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()
      const stoneembed = new EmbedBuilder()
        .setAuthor({ name: `Kho Đá Của ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`Đá Rèn`)
        .setDescription(darenembed)
        .setColor("#303037")
        .setFooter({ text: "Cảm ơn bạn đã bên cạnh Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()
      const itemsembed = new EmbedBuilder()
        .setAuthor({ name: `Kho của ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`KHO VẬT PHẨM TIÊU HAO`)
        .setDescription(itemembed)
        .setColor("#303037")
        .setFooter({ text: "Cảm ơn bạn đã bên cạnh Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()
      const ppembed = new EmbedBuilder()
        .setAuthor({ name: `Kho của ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`KHO PASSPORT`)
        .setDescription(passportembed)
        .setColor("#303037")
        .setFooter({ text: "Cảm ơn bạn đã bên cạnh Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()

      let embeds = [ringembed, gemembed, heroesembed, stoneembed, itemsembed, ppembed]
      let a = await message.channel.send({ embeds: [embeds[0]] }).catch(e => console.log(e))
      await chuyen_trang(client, a, message.author.id, embeds).catch(e => console.log(e))

    }
    else if (lang == "en") {
      let msgnhan = []
      let msgpassport = []
      let ringid = [
        '<:Yu_nhanco:951133679546159214>',
        '<:Yu_nhanbac:941435162728730675>',
        '<:Yu_nhanvang:941435163181727824>',
        '<:Yu_nhankimcuong:941435160883265556>',
        '<:Yu_nhanvangkc:951586992897024060>'
      ]
      let passportid = [
        "<:ProPassport:988093838348410930>",
        "<:VIPPassport:988093810955411456>"
      ]
      let arrayNhan = await invSchema.find({ memberid: message.author.id })
      if (arrayNhan[0]) {
        for (let r in arrayNhan) {
          let nhan = arrayNhan[r]
          if (nhan.type == `ring`) {
            let id = idnhan(ringid, nhan.name)
            msgnhan += `\`${id}\`${nhan.name}${toSmallNum(nhan.quanlity, 2)} - Value nowaday: **${parseInt(nhan.price).toLocaleString('En-Us')}**\n`
          } else if (nhan.type == `passport`) {
            let id = idpassport(passportid, nhan.name)
            msgpassport += `\`${id}\`${nhan.name}${toSmallNum(nhan.quanlity, 2)}\n`
          }
        }
      }
      let gem = {
        '<:C_gem_01:982028743608533022>': '01',
        '<:U_gem_01:982028744204103810>': '05',
        '<:R_gem_01:982028744107655198>': '09',
        '<:SR_gem_01:982028743960854598>': '13',
        '<:E_gem_01:982028743595941938>': '17',
        '<:P_gem_01:982028744191529010>': '21',
        '<:G_gem_01:982028743629484082>': '25',
        '<:C_gem_02:982028743537209424>': '02',
        '<:U_gem_02:982028744061505606>': '06',
        '<:R_gem_02:982028744124428428>': '10',
        '<:SR_gem_02:982028743956652072>': '14',
        '<:E_gem_02:982028743679827968>': '18',
        '<:P_gem_02:982028743713366066>': '22',
        '<:G_gem_02:982028743646265364>': '26',
        '<:C_gem_03:982028743914696704>': '03',
        '<:U_gem_03:982028743650463795>': '07',
        '<:R_gem_03:982028743948247110>': '11',
        '<:SR_gem_03:982028744124411924>': '15',
        '<:E_gem_03:982028743805648926>': '19',
        '<:P_gem_03:982028743960830032>': '23',
        '<:G_gem_03:982028743537217588>': '27',
        '<:C_gem_04:982028743570755624>': '04',
        '<:U_gem_04:982028744187326494>': '08',
        '<:R_gem_04:982028743822426152>': '12',
        '<:SR_gem_04:982028743981817908>': '16',
        '<:E_gem_04:982028743688212520>': '20',
        '<:P_gem_04:982028743893721178>': '24',
        '<:G_gem_04:982028744057294848>': '28'
      };
      let arraydaren = {
        "<:DaXanh:992152828745371719>": "01",
        "<:DaDo:992152854238335016>": "02",
        "<:BanVeKhoangSan:987454288634712094>": "03",
        "<:Yu_da_lv1:987444740712710164>": "04",
        "<:Yu_dagranite_lv2:987444714133422120>": "05",
        "<:Yu_daonyx_lv3:987444715538481165>": "06",
        "<:Yu_dong_lv1:987449365255819295>": "07",
        "<:Yu_dong_lv2:987449367462023248>": "08",
        "<:Yu_dong_lv3:987450211184025712>": "09",
        "<:Yu_go_lv1:987441917795110981>": "10",
        "<:Yu_go_lv2:987440797781737512>": "11",
        "<:Yu_go_lv3:987440779003834448>": "12",
        "<:Yu_kimcuong_lv3:987438010587037797>": "13",
        "<:Yu_sat_lv1:987442725278339072>": "14",
        "<:Yu_sat_lv2:987443294252445736>": "15",
        "<:Yu_sat_lv3:987443291983327232>": "16",
        "<:Yu_thachanh_lv1:987663560446447646>": "17",
        "<:Yu_thachanh_lv2:987663600434970644>": "18",
        "<:Yu_thachanh_lv3:987663580860121159>": "19",
        "<:Yu_vang_lv1:987448320123363418>": "20",
        "<:Yu_vang_lv2:987448322182770719>": "21",
        "<:Yu_vang_lv3:987448317636124773>": "22",
        "<:Yu_bac_lv1:987451135776391199>": "23",
        "<:Yu_bac_lv2:987451133847031928>": "24",
        "<:Yu_bac_lv3:987451131460464680>": "25",
        "<:DaCuongHoa:989109642489638952>": "26",
        "<:DaTinhLuyen:989109963282587649>": "27",
        "<:ThanThach_DaTinhLuyen:989111520812232724>": "28",
        "<:DaTrangSuc:989110004718120990>": "29",
        "<:DaTrangBi:989110130324938803>": "30",
        "<:DaVuKhi:991629364846403654>": "31",
        "<:DaTrangSucTinhXao:989110096518852638>": "32",
        "<:DaTrangBiTinhXao:989110189422702612>": "33",
        "<:DaTrangBiTrungCap:989110275829559316>": "34",
        "<:DaVuKhiTrungCap:989110246519758888>": "35",
        "<:DaRenVuKhiChuyenDung:991632707744440460>": "35",
        "<:DaRenThanKhi:991632728602722324>": "36",
        "<:DaNguSac:989110158300958760>": "37",
      };
      const ngoc1 = await gemSchema
        .find({ memberid: message.author.id, type: 1 })
        .sort({ quanlity: -1 });
      const ngoc2 = await gemSchema
        .find({ memberid: message.author.id, type: 2 })
        .sort({ quanlity: -1 });
      const ngoc3 = await gemSchema
        .find({ memberid: message.author.id, type: 3 })
        .sort({ quanlity: -1 });
      const ngoc4 = await gemSchema
        .find({ memberid: message.author.id, type: 4 })
        .sort({ quanlity: -1 });
      let msg1 = ``;
      if (!ngoc1[0]) msg1 = `:x: | **${message.author.username}**, you have 0`;
      let msg2 = ``;
      if (!ngoc2[0]) msg2 = `:x: | **${message.author.username}**, you have 0`;
      let msg3 = ``;
      if (!ngoc3[0]) msg3 = `:x: | **${message.author.username}**, you have 0`;
      let msg4 = ``;
      if (!ngoc4[0]) msg4 = `:x: | **${message.author.username}**, you have 0`;
      if (ngoc1[0]) {
        const max = ngoc1[0].quanlity;
        let digits = Math.trunc(Math.log10(max) + 1);
        for (g in ngoc1) {
          var n = ngoc1[g];
          var id = gem[n.typeS]
          var type = 1

          if (n) msg1 += `\`${id}\`${n.typeS}${toSmallNum(n.quanlity, digits)} `;
        }
      }
      if (ngoc2[0]) {
        const max = ngoc2[0].quanlity;
        let digits = Math.trunc(Math.log10(max) + 1);
        for (g in ngoc2) {
          var n = ngoc2[g];
          var id = gem[n.typeS]
          var type = 1

          if (n) msg2 += `\`${id}\`${n.typeS}${toSmallNum(n.quanlity, digits)} `;
        }
      }
      if (ngoc3[0]) {
        const max = ngoc3[0].quanlity;
        let digits = Math.trunc(Math.log10(max) + 1);
        for (g in ngoc3) {
          var n = ngoc3[g];
          var id = gem[n.typeS]
          var type = 1
          if (n) msg3 += `\`${id}\`${n.typeS}${toSmallNum(n.quanlity, digits)} `;
        }
      }
      if (ngoc4[0]) {
        const max = ngoc4[0].quanlity;
        let digits = Math.trunc(Math.log10(max) + 1);
        for (g in ngoc4) {
          var n = ngoc4[g];
          var id = gem[n.typeS]
          var type = 1
          if (n) msg4 += `\`${id}\`${n.typeS} ${toSmallNum(n.quanlity, digits)} `;
        }
      }
      const gembox = await gemSchema.find({ memberid: message.author.id, type: 0 }).sort({ quanlity: -1 })
      if (!gembox[0]) {
        const addgembox = new gemSchema({ memberid: message.author.id, typeS: `<:GEMBOX:982028743952441355>`, quanlity: 0, type: 0 })
        await addgembox.save()
        const addprogembox = new gemSchema({ memberid: message.author.id, typeS: `<:PRO_GEMBOX:982028744057298964>`, quanlity: 0, type: 0 })
        await addprogembox.save()
        const addvipgembox = new gemSchema({ memberid: message.author.id, typeS: `<:VIP_GEMBOX:982028743889543278>`, quanlity: 0, type: 0 })
        await addvipgembox.save()
      }
      let gemboxmsg = ``
      const max2 = gembox[0].quanlity;
      let digits2 = Math.trunc(Math.log10(max2) + 1);
      for (let g in gembox) {
        let gem = gembox[g]
        let name = gem.typeS
        let quanlity = gem.quanlity
        let id = ``
        if (name == `<:GEMBOX:982028743952441355>`) id = `29`
        if (name == `<:PRO_GEMBOX:982028744057298964>`) id = `32`
        if (name == `<:VIP_GEMBOX:982028743889543278>`) id = `33`
        gemboxmsg += `\`${id}\`${name}${toSmallNum(quanlity, digits2)}`
      }
      const daren = await itemSchema.find({ id: message.author.id, type: `daren` }).sort({ quanlity: -1 })
      let msgdaren = ``
      if (daren[0]) {
        const max = daren[0].quanlity;
        let digits = Math.trunc(Math.log10(max) + 1);
        for (let g in daren) {
          var n = daren[g];
          var id = arraydaren[n.name]
          if (g % 5 == 4) {
            msgdaren += `\`${id}\`${n.name} ${toSmallNum(n.quanlity, digits)}
`
            continue
          }
          msgdaren += `\`${id}\`${n.name} ${toSmallNum(n.quanlity, digits)}`
        }
      }

      const thuhon = await invSchema.findOne({ memberid: message.author.id, name: `<:ThuHon:991633698300624956>`, type: `th` })
      //if (n.typeS == `<:GEMBOX:982028743952441355>`) id = `29`
      let slth = 0
      if (thuhon) slth = thuhon.quanlity
      let maxth = Math.trunc(Math.log10(slth) + 1)
      //const itemembed = ` <:ThuHon:991633698300624956>${toSmallNum(slth, maxth)}`
      let items = await itemSchema
        .find({ id: message.author.id, type: "mypham" })
        .sort({ quanlity: -1 })
      let msgitems
      if (items[0]) {
        const max3 = items[0].quanlity;
        let digits3 = Math.trunc(Math.log10(max3) + 1);
        for (let i in items) {
          let a = items[i]
          let name = a.name
          let quanlity = a.quanlity
          msgitems += `\`${checkidmp(name)}\`${name} : ${toSmallNum(quanlity, digits3)}`
        }
      } else msgitems = `You didn't have any items!~`

      const itemembed = msgitems
      const ngochuntembed = `<a:Ytim7mau:911681859275079732> **Properties of ${message.author.username}** <a:Ytim7mau:911681859275079732> 
**Gems : Yuse + <ID>**
${gemboxmsg}\n**Amount Gem**\n${msg1}\n**Double Gem**\n${msg2}\n**Lucky Gem**\n${msg3}\n**KING STONE**\n${msg4}`
      let msgmanhtuong = ``
      const manhtuong = await itemSchema.find({ id: message.author.id, type: `manhtuong` }).sort({ quanlity: -1 })
      if (manhtuong[0]) {
        const max = manhtuong[0].quanlity;
        let digits = Math.trunc(Math.log10(max) + 1);
        for (let g in manhtuong) {
          var n = manhtuong[g];
          if (n) msgmanhtuong += `${n.name} ${toSmallNum(n.quanlity, digits)} `;
        }
      }
      const manhtuongembed = `<:DaNguSac:989110158300958760>**Properties of ${message.author.username}**<:DaNguSac:989110158300958760>
**Shards of champions** : 
${msgmanhtuong}`
      const darenembed = `<:DaNguSac:989110158300958760>**Properties of ${message.author.username}**<:DaNguSac:989110158300958760>
**Item RPG** : 
${msgdaren}`
      const nhanembed = `<a:Ytim7mau:911681859275079732> **Properties of ${message.author.username}** <a:Ytim7mau:911681859275079732> 
<a:emoji_131:910626774638010378> Ring :
${msgnhan}`
      const passportembed = `<a:Ytim7mau:911681859275079732> **Properties of ${message.author.username}** <a:Ytim7mau:911681859275079732> 
<a:emoji_131:910626774638010378> Passport :
${msgpassport}`

      const ringembed = new EmbedBuilder()
        .setAuthor({ name: `Properties of ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`Rings`)
        .setDescription(nhanembed)
        .setColor("#303037")
        .setFooter({ text: "Thanks for chosing Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()
      const gemembed = new EmbedBuilder()
        .setAuthor({ name: `Properties of ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`Gems`)
        .setDescription(ngochuntembed)
        .setColor("#303037")
        .setFooter({ text: "Thanks for chosing Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()

      /**
        const houseembed = new EmbedBuilder()
        .setAuthor({ name: `Bất Động Sản Của ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`Bất Động Sản`)
        .setDescription(nhaembed)
        .setColor("#303037")
        .setFooter({ text: "Cảm ơn bạn đã bên cạnh Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()
  **/
      const heroesembed = new EmbedBuilder()
        .setAuthor({ name: `Champion Shards of ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`Champions Shards`)
        .setDescription(manhtuongembed)
        .setColor("#303037")
        .setFooter({ text: "Thanks for chosing Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()
      const stoneembed = new EmbedBuilder()
        .setAuthor({ name: `RPG Gems of ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`RPG GEMS`)
        .setDescription(darenembed)
        .setColor("#303037")
        .setFooter({ text: "Thanks for chosing Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()
      const itemsembed = new EmbedBuilder()
        .setAuthor({ name: `ITEMs of ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`Item RPG`)
        .setDescription(itemembed)
        .setColor("#303037")
        .setFooter({ text: "Thanks for chosing Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()
      const ppembed = new EmbedBuilder()
        .setAuthor({ name: `Properties of ${message.author.username}`, iconURL: `https://discordapp.com/channels/896744428100804688/942015852310577162/984313077187108865`, url: `https://discord.gg/yuland` })
        .setTitle(`PASSPORTs`)
        .setDescription(passportembed)
        .setColor("#303037")
        .setFooter({ text: "Thanks for chosing Yubabe", iconURL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
        .setTimestamp()

      let embeds = [ringembed, gemembed, heroesembed, stoneembed, itemsembed, ppembed]
      let a = await message.channel.send({ embeds: [embeds[0]] }).catch(e => console.log(e))
      await chuyen_trang(client, a, message.author.id, embeds).catch(e => console.log(e))

    }
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
function idnhan(array, item) {
  let result = ``
  if (item == array[0]) result = `001`
  if (item == array[1]) result = `002`
  if (item == array[2]) result = `003`
  if (item == array[3]) result = `004`
  if (item == array[4]) result = `005`
  return result
}
function idpassport(array, item) {
  let result = ``
  if (item == array[0]) result = `30`
  if (item == array[1]) result = `31`
  return result
}
async function chuyen_trang(client, message, authorid, embeds) {
  let currentPage = 0;
  const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
  let buttonrow1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji('<:ARROW1:874262374595588117>')
        .setCustomId('skip-page1'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('<:ARROW2:874262374733987860>')
        .setCustomId('back-page'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji('<:HOME:894217044013248532>')
        .setCustomId('home-page'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('<:ARROW3:874262374541049896>')
        .setCustomId('next-page'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji('<:ARROW4:874262374608150578>')
        .setCustomId('skip-page2')
    );

  if (embeds.length === 1) return message.edit({ embeds: [embeds[0]] })
  const queueEmbed = await message.edit(
    {
      content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
      components: [buttonrow1],
      embeds: [embeds[currentPage]]
    }
  )
  var collector = queueEmbed.createMessageComponentCollector({
    filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
  })
  collector.on("collect", (interaction) => {

    if (interaction.user.id !== authorid) return interaction.reply({ content: "Không phải nút dành cho bạn!", ephemeral: true })
    if (interaction.customId == "next-page") {
      interaction.deferUpdate()
      if (currentPage < embeds.length - 1) {
        currentPage++;
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      }
      else {
        currentPage = 0
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      }
    }
    else if (interaction.customId == "back-page") {
      interaction.deferUpdate()
      if (currentPage !== 0) {
        --currentPage;
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      } else {
        currentPage = embeds.length - 1
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      }
    }
    else if (interaction.customId == "skip-page1") {
      interaction.deferUpdate()
      currentPage = 0;
      // queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      // queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
    }
    else if (interaction.customId == "skip-page2") {
      interaction.deferUpdate()
      currentPage = embeds.length - 1;
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
    }
    else if (interaction.customId == "home-page") {
      interaction.deferUpdate()
      interaction.message.edit({ embeds: [embeds[0]], components: [buttonrow1] })
    }
  })
}
function checkidmp(m) {
  let arrmypham1 = {
    "m1": "<:Yu_daugoi:1025262281774346361>",
    "m2": "<:Yu_suatam:1025262293749092353>",
    "m3": "<:Yu_kemchongnang:1025262255601885234>",
    "m4": "<:Yu_kemduongda:1025262288254554183>",
    "m5": '<:Yu_sonmongtay:1025262260744093768>',
    "m6": "<:Yu_mascara:1025262266511269938>",
    "m7": "<:Yu_phanmat:1025262271817068575>",
    "m8": "<:Yu_serum:1025262244587642950>",
  }
  let result
  if (m == arrmypham1["m1"]) result = "m1"
  else if (m == arrmypham1["m2"]) result = "m2"
  else if (m == arrmypham1["m3"]) result = "m3"
  else if (m == arrmypham1["m4"]) result = "m4"
  else if (m == arrmypham1["m5"]) result = "m5"
  else if (m == arrmypham1["m6"]) result = "m6"
  else if (m == arrmypham1["m7"]) result = "m7"
  else if (m == arrmypham1["m8"]) result = "m8"
  return result
}