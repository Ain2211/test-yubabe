const itemSchema = require('../../models/itemSchema')
const BanSchema = require('../../models/BanSchema')
const vipSchema = require('../../models/vipSchema')
module.exports = {
  name: 'daokhoang',
  cooldown: 999999999999,
  description: "Tạo nhân vật và bắt đầu cuộc hành trình của bạn! Nhân Vật bao gồm các chỉ số : Sức Mạnh, Nhanh Nhẹn, Trí Lực, Ma Lực, Hấp Dẫn và Thể Lực",
  cderror:"lệnh này đang được sửa chữa",
  use:"sử dụng lại tính năng này nhé!",
  aliases: ['mine', 'd'],
  usage: "Ydaokhoang",
  run: async (client, message, args) => {
    
    const ban = await BanSchema.findOne({ memberid: message.author.id })
    if (ban) {
      if (ban.memberid == message.author.id) return
    }
    if(message.author.id!=="896739787392819240") return message.reply("Tính năng này tạm đóng phục vụ cho nâng cấp phiên bản sau! Xin đừng lo, mọi dữ liệu của bạn vẫn luôn còn!")
    const provip = await vipSchema.findOne({ memberid: message.author.id })
    let pro = false
    let vip = false
    let limit = 100
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true, limit = 50
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true, limit = 75
      if (end) {
        await vipSchema.deleteOne({ memberid: message.author.id })
        await message.reply(`Passport của bạn đã hết hạn! Cảm ơn bạn đã đồng hành cùng tôi trong suốt tháng qua! <3`)
      }
    }
    const a = Math.floor(Math.random() * 999)
    const b = Math.floor(Math.random() * 999)
    if (a + b < limit) {
      function randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
      }
      const Canvas = require('canvas');
      const Char_array = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const Char_length = Char_array.length;
      const canvasW = 150; // rộng
      const canvasH = 50; // cao
      const canvas = Canvas.createCanvas(canvasW, canvasH);
      const context = canvas.getContext('2d');
      // Background
      context.beginPath();
      context.rect(0, 0, canvasW, canvasH);
      context.fillStyle = '#000000'; // background màu đen
      context.fill();
      context.closePath();
      // End background
      const captchaLength = 6; // Best, max: 7 (độ dài captcha)
      const stringNumber = 3; // số đường kẻ
      const dotCount = 30; // số chấm nhiễu
      const result = []; // array chứa kết quả captcha (dạng ['a', 'b', 'c' ])
      for (let i = 0; i < captchaLength; i++) {
        const sIndex = Math.floor(Math.random() * Char_length);
        const sDeg = (Math.random() * 30 * Math.PI) / 180;
        const cTxt = Char_array[sIndex];
        result[i] = cTxt.toLowerCase();
        const x = 10 + i * 20;
        const y = 20 + Math.random() * 8;
        context.font = 'bold 23px noto'; // Font family custom
        context.translate(x, y);
        context.rotate(sDeg);
        context.fillStyle = randomColor();
        context.fillText(cTxt, 0, 0);
        context.rotate(-sDeg);
        context.translate(-x, -y);
      }
      for (let i = 0; i < stringNumber; i++) {
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvasW, Math.random() * canvasH);
        context.lineTo(Math.random() * canvasW, Math.random() * canvasH);
        context.stroke();
      }
      for (let i = 20; i < dotCount; i++) {
        context.strokeStyle = randomColor();
        context.beginPath();
        const x = Math.random() * canvasW;
        const y = Math.random() * canvasH;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
      }
      const attachment = new MessageAttachment(canvas.toBuffer('image/png'), 'profile-image.png'); const content = result.join('')
      console.log(content)
      await message.channel.send({ content: `<@${message.author.id}>, bạn có 30 giây, hãy nhập CAPTCHA bên dưới!`, files: [attachment] })
      const filter = m => m.author.id === message.author.id && m.content.toLowerCase() == content
      const collector = message.channel.createMessageCollector({ filter, time: 50_000 });
      collector.on('collect', m => {
        if (m.content.toLowerCase() == content) {
          message.reply(`Bạn đã nhập đúng! Bạn có thể sử dụng bot tiếp!`)
        }
      });
      collector.on('end', collected => {
        if (collected.size > 0) {
          return message.channel.send(`**${message.author.username}** Cảm ơn bạn đã xác nhận, chúc bạn hunt thú vui vẻ!`)
        }
        else if (collected.size < 1) {
          const banned = new BanSchema({ memberid: message.author.id, guildid: message.guild.id })
          banned.save()
          return message.author.send(`**${message.author.username}**! Bạn đã bị BAN vì treo auto`)
        }
      });
    }
    else {
    const cash = await client.cash(message.author.id)
    if (cash < 100) return message.reply(`Bạn không thể đào khoáng khi không có đồng nào! (100/lần)`)
    let vipitem = [
      "<:Yu_da_lv1:987444740712710164>",
      "<:Yu_dagranite_lv2:987444714133422120>",
      "<:Yu_dong_lv1:987449365255819295>",
      "<:Yu_dong_lv2:987449367462023248>",
      "<:Yu_go_lv1:987441917795110981>",
      "<:Yu_go_lv2:987440797781737512>",
      "<:Yu_sat_lv1:987442725278339072>",
      "<:Yu_sat_lv2:987443294252445736>",
      "<:Yu_thachanh_lv1:987663560446447646>",
      "<:Yu_thachanh_lv2:987663600434970644>",
      "<:Yu_vang_lv1:987448320123363418>",
      "<:Yu_vang_lv2:987448322182770719>",
      "<:Yu_bac_lv1:987451135776391199>",
      "<:Yu_bac_lv2:987451133847031928>",
      "<:BanVeKhoangSan:987454288634712094>",
      "<:Yu_da_lv1:987444740712710164>",
      "<:Yu_dagranite_lv2:987444714133422120>",
      "<:Yu_daonyx_lv3:987444715538481165>",
      "<:Yu_dong_lv1:987449365255819295>",
      "<:Yu_dong_lv2:987449367462023248>",
      "<:Yu_dong_lv3:987450211184025712>",
      "<:Yu_go_lv1:987441917795110981>",
      "<:Yu_go_lv2:987440797781737512>",
      "<:Yu_go_lv3:987440779003834448>",
      "<:Yu_kimcuong_lv3:987438010587037797>",
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      "<:Yu_sat_lv1:987442725278339072>",
      "<:Yu_sat_lv2:987443294252445736>",
      "<:Yu_sat_lv3:987443291983327232>",
      "<:Yu_thachanh_lv1:987663560446447646>",
      "<:Yu_thachanh_lv2:987663600434970644>",
      "<:Yu_thachanh_lv3:987663580860121159>",
      "<:Yu_vang_lv1:987448320123363418>",
      "<:Yu_vang_lv2:987448322182770719>",
      "<:Yu_vang_lv3:987448317636124773>",
      "<:Yu_bac_lv1:987451135776391199>",
      "<:Yu_bac_lv2:987451133847031928>",
      "<:Yu_bac_lv3:987451131460464680>",
      "<:Yu_da_lv1:987444740712710164>",
      "<:Yu_dong_lv1:987449365255819295>",
      "<:Yu_go_lv1:987441917795110981>",
      "<:Yu_sat_lv1:987442725278339072>",
      "<:Yu_thachanh_lv1:987663560446447646>",
      "<:Yu_vang_lv1:987448320123363418>",
      "<:Yu_bac_lv1:987451135776391199>",
      client.daren.daxanh,
      client.daren.dado,
      client.daren.cuonghoa,
      client.daren.tinhluyen,
      client.daren.trangbi,
      client.daren.vukhi,
      client.daren.ngusac
    ]
    let item = [
      "<:Yu_da_lv1:987444740712710164>",
      "<:Yu_dagranite_lv2:987444714133422120>",
      "<:Yu_daonyx_lv3:987444715538481165>",
      "<:Yu_dong_lv1:987449365255819295>",
      "<:Yu_dong_lv2:987449367462023248>",
      "<:Yu_dong_lv3:987450211184025712>",
      "<:Yu_go_lv1:987441917795110981>",
      "<:Yu_go_lv2:987440797781737512>",
      "<:Yu_go_lv3:987440779003834448>",
      "<:Yu_sat_lv1:987442725278339072>",
      "<:Yu_sat_lv2:987443294252445736>",
      "<:Yu_sat_lv3:987443291983327232>",
      "<:Yu_thachanh_lv1:987663560446447646>",
      "<:Yu_thachanh_lv2:987663600434970644>",
      "<:Yu_thachanh_lv3:987663580860121159>",
      "<:Yu_vang_lv1:987448320123363418>",
      "<:Yu_vang_lv2:987448322182770719>",
      "<:Yu_vang_lv3:987448317636124773>",
      "<:Yu_bac_lv1:987451135776391199>",
      "<:Yu_bac_lv2:987451133847031928>",
      "<:Yu_bac_lv3:987451131460464680>",
"<:Yu_da_lv1:987444740712710164>",
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      "<:Yu_dong_lv1:987449365255819295>",
      "<:Yu_go_lv1:987441917795110981>",
      "<:Yu_sat_lv1:987442725278339072>",
      "<:Yu_thachanh_lv1:987663560446447646>",
      "<:Yu_vang_lv1:987448320123363418>",
      "<:Yu_bac_lv1:987451135776391199>",
      "<:Yu_da_lv1:987444740712710164>",
      "<:Yu_dagranite_lv2:987444714133422120>",
      "<:Yu_dong_lv1:987449365255819295>",
      "<:Yu_dong_lv2:987449367462023248>",
      "<:Yu_go_lv1:987441917795110981>",
      "<:Yu_go_lv2:987440797781737512>",
      "<:Yu_sat_lv1:987442725278339072>",
      "<:Yu_sat_lv2:987443294252445736>",
      "<:Yu_thachanh_lv1:987663560446447646>",
      "<:Yu_thachanh_lv2:987663600434970644>",
      "<:Yu_vang_lv1:987448320123363418>",
      "<:Yu_vang_lv2:987448322182770719>",
      "<:Yu_bac_lv1:987451135776391199>",
      "<:Yu_bac_lv2:987451133847031928>",
"<:Yu_da_lv1:987444740712710164>",
      "<:Yu_dong_lv1:987449365255819295>",
      "<:Yu_go_lv1:987441917795110981>",
      "<:Yu_sat_lv1:987442725278339072>",
      "<:Yu_thachanh_lv1:987663560446447646>",
      "<:Yu_vang_lv1:987448320123363418>",
      "<:Yu_bac_lv1:987451135776391199>",
      "<:Yu_da_lv1:987444740712710164>",
      "<:Yu_dong_lv1:987449365255819295>",
      "<:Yu_go_lv1:987441917795110981>",
      "<:Yu_sat_lv1:987442725278339072>",
      "<:Yu_thachanh_lv1:987663560446447646>",
      "<:Yu_vang_lv1:987448320123363418>",
      "<:Yu_bac_lv1:987451135776391199>",
    ]
    let proitem = [
      "<:BanVeKhoangSan:987454288634712094>",
      "<:Yu_da_lv1:987444740712710164>",
      "<:Yu_dagranite_lv2:987444714133422120>",
      "<:Yu_daonyx_lv3:987444715538481165>",
      "<:Yu_dong_lv1:987449365255819295>",
      "<:Yu_dong_lv2:987449367462023248>",
      "<:Yu_dong_lv3:987450211184025712>",
      "<:Yu_go_lv1:987441917795110981>",
      "<:Yu_go_lv2:987440797781737512>",
      "<:Yu_go_lv3:987440779003834448>",
      "<:Yu_kimcuong_lv3:987438010587037797>",
      "<:Yu_sat_lv1:987442725278339072>",
      "<:Yu_sat_lv2:987443294252445736>",
      "<:Yu_sat_lv3:987443291983327232>",
      "<:Yu_thachanh_lv1:987663560446447646>",
      "<:Yu_thachanh_lv2:987663600434970644>",
      "<:Yu_thachanh_lv3:987663580860121159>",
      "<:Yu_vang_lv1:987448320123363418>",
      "<:Yu_vang_lv2:987448322182770719>",
      "<:Yu_vang_lv3:987448317636124773>",
      "<:Yu_bac_lv1:987451135776391199>",
      "<:Yu_bac_lv2:987451133847031928>",
      "<:Yu_bac_lv3:987451131460464680>",
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.daxanh,
      client.daren.dado,
      client.daren.cuonghoa,
      client.daren.tinhluyen,
      client.daren.trangbi,
      client.daren.vukhi,
      "<:Yu_da_lv1:987444740712710164>",
      "<:Yu_dagranite_lv2:987444714133422120>",
      "<:Yu_dong_lv1:987449365255819295>",
      "<:Yu_dong_lv2:987449367462023248>",
      "<:Yu_go_lv1:987441917795110981>",
      "<:Yu_go_lv2:987440797781737512>",
      "<:Yu_sat_lv1:987442725278339072>",
      "<:Yu_sat_lv2:987443294252445736>",
      "<:Yu_thachanh_lv1:987663560446447646>",
      "<:Yu_thachanh_lv2:987663600434970644>",
      "<:Yu_vang_lv1:987448320123363418>",
      "<:Yu_vang_lv2:987448322182770719>",
      "<:Yu_bac_lv1:987451135776391199>",
      "<:Yu_bac_lv2:987451133847031928>",
      "<:Yu_da_lv1:987444740712710164>",
      "<:Yu_dong_lv1:987449365255819295>",
      "<:Yu_go_lv1:987441917795110981>",
      "<:Yu_sat_lv1:987442725278339072>",
      "<:Yu_thachanh_lv1:987663560446447646>",
      "<:Yu_vang_lv1:987448320123363418>",
      "<:Yu_bac_lv1:987451135776391199>",
      "<:Yu_da_lv1:987444740712710164>",
      "<:Yu_dong_lv1:987449365255819295>",
      "<:Yu_go_lv1:987441917795110981>",
      "<:Yu_sat_lv1:987442725278339072>",
      "<:Yu_thachanh_lv1:987663560446447646>",
      "<:Yu_vang_lv1:987448320123363418>",
      "<:Yu_bac_lv1:987451135776391199>",
    ]
    let a = chonitem(item, proitem, vipitem, pro, vip)
    let inven = await itemSchema.findOne({ id: message.author.id, name: a })
    if (!inven) {
      let add = new itemSchema({ id: message.author.id, name: a, quanlity: 1, type: 'daren' })
      await add.save()
      await message.reply(`<:Yu_daoquang:987433859178192896> | ${message.author.username}, bạn đã đào được ${a}`)
    } else {
      inven.quanlity += 1
      await inven.save()
      await message.reply(`<:Yu_daoquang:987433859178192896> | ${message.author.username}, bạn đã đào được ${a}`)
    }

  }
}
}
function chonitem(array, arraypro, arrayvip, pro, vip,) {

  let item
  //4 logic khi hunt thú :
  if (pro) {
    item = arraypro[Math.floor(Math.random() * arraypro.length)]
  }
  else if (vip) {
    item = arrayvip[Math.floor(Math.random() * arrayvip.length)]
  }
  else {//logic khi ko dùng gì cả
    item = array[Math.floor(Math.random() * array.length)]
  }
  console.log(`PRO : ${pro} || VIP : ${vip}
${item}`)

  //CHAY CODE
  return item
}