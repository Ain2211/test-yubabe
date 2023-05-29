//Đang sửa chữa, vui lòng không sử dụng hay chỉnh sửa lệnh này!

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const itemSchema = require('../../models/itemSchema')
const heroSchema = require('../../models/heroSchema')
const teamSchema = require('../../models/teamSchema')
const mongo = require('mongoose')
module.exports = {
  name: 'battle',
  cooldown: 0,
  description: "Chiến đấu với các đội khác.",
  aliases: ['b', 'fight'],
  usage: "Yghep + tên heroes",
  run: async (client, message, args) => {
    
  }
}
function checknguhanh(name) {
  let result
  if (name == `<:Hoa`) result = `🔥`
  else if (name == `<:Thuy`) result = `💧`
  else if (name == `<:Loi`) result = `⚡`
  else if (name == `<:Phong`) result = `🌀`
  return result
}
function checkstat(names) {
  if (names == `<:Hoa_HocGia_3sao:997053798876987403>`) {
    return { name: `Học Giả`, nguhanh: `hoa`, hp: 150, mana: 100, def: 2, mdef: 2, agility: 5, power: 5, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
  }
  else if (names == `<:Loi_DaoSy_3sao:997052886829772860>`) {
    return { name: `Đạo Sỹ`, nguhanh: `loi`, hp: 150, mana: 300, def: 3, mdef: 3, agility: 6, power: 3, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
  }
  else if (names == `<:Phong_TieuMy_3sao:997052870660718672>`) {
    return { name: `Tiểu Mỹ`, nguhanh: `phong`, hp: 150, mana: 150, def: 3, mdef: 3, agility: 3, power: 6, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
  }
  else if (names == `<:Thuy_ThuanBinh_3sao:997052852545519686>`) {
    return { name: `Thuẫn Binh`, nguhanh: `thuy`, hp: 250, mana: 100, def: 4, mdef: 3, agility: 3, power: 4, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
  }
  else if (names == `<:Thuy_CungBinh_2sao:997052999123881985>`) {
    return { name: `Cung Binh`, nguhanh: `thuy`, hp: 200, mana: 50, def: 2, mdef: 2, agility: 1, power: 3, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
  }
  else if (names == `<:Loi_ThichKhach_2sao:997053035689812049>`) {
    return { name: `Thích Khách`, nguhanh: `loi`, hp: 150, mana: 100, def: 2, mdef: 2, agility: 1, power: 3, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
  }
  else if (names == `<:Phong_TieuHan_2sao:997053017213902860>`) {
    return { name: `Tiểu Hân`, nguhanh: `phong`, hp: 150, mana: 100, def: 2, mdef: 3, agility: 3, power: 2, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
  }
  else if (names == `<:Hoa_NoTy_2sao:997052978685038653>`) {
    return { name: `Nô Tỳ`, nguhanh: `hoa`, hp: 150, mana: 100, def: 2, mdef: 3, agility: 3, power: 2, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }

  }
  else if (names == `<:Hoa_ChucDung:992760936530182194>`) {
    return { name: `Chúc Dung`, nguhanh: `hoa`, hp: 500, mana: 100, def: 5, mdef: 5, agility: 5, power: 10, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 3 }

  }
  else if (names == `<:Hoa_VoHau:992760791285645323>`) {
    return { name: `Võ Hậu`, nguhanh: `hoa`, hp: 350, mana: 200, def: 4, mdef: 6, agility: 12, power: 3, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 3 }

  }
  else if (names == `<:Hoa_TieuViem:992760692140691559>`) {
    return { name: `Tiêu Viêm`, nguhanh: `hoa`, hp: 520, mana: 100, def: 7, mdef: 3, agility: 6, power: 15, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 3 }

  }
  else if (names == `<:Hoa_PhanThien:992759800754602074>`) {
    return { name: `Phần Thiên`, nguhanh: `hoa`, hp: 300, mana: 200, def: 5, mdef: 6, agility: 13, power: 6, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 3 }

  }
  else if (names == `<:Hoa_MyNuong:992760858398691408>`) {
    return { name: `Mỵ Nương`, nguhanh: `hoa`, hp: 500, mana: 200, def: 4, mdef: 4, agility: 16, power: 6, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 3 }

  }
  else if (names == `<:Thuy_VanQuan:993522705632591993>`) {
    return { name: `Văn Quân`, nguhanh: `thuy`, hp: 450, mana: 300, def: 5, mdef: 5, agility: 14, power: 7, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 2 }

  }
  else if (names == `<:Thuy_TieuHuan:993522906510397500>`) {
    return { name: `Tiểu Huân`, nguhanh: `thuy`, hp: 450, mana: 300, def: 5, mdef: 5, agility: 14, power: 7, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 2 }

  }
  else if (names == `<:Thuy_LyMongHoa:993522865838235768>`) {
    return { name: `Lý Mộng Hoa`, nguhanh: `thuy`, hp: 450, mana: 300, def: 5, mdef: 5, agility: 16, power: 7, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 2 }

  }
  else if (names == `<:Thuy_TheDan:993522779372650526>`) {
    return { name: `Thế Dân`, nguhanh: `thuy`, hp: 550, mana: 300, def: 5, mdef: 8, agility: 7, power: 15, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 2 }

  }
  else if (names == `<:Thuy_PhuongKy:993522759948832818>`) {
    return { name: `Phương Kỳ`, nguhanh: `thuy`, hp: 450, mana: 300, def: 5, mdef: 5, agility: 17, power: 8, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 2 }

  }
  else if (names == `<:Phong_LyThuanPhong:995737059018948709>`) {
    return { name: `Lý Thuần Phong`, nguhanh: `phong`, hp: 550, mana: 300, def: 7, mdef: 5, agility: 6, power: 14, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 5 }

  }
  else if (names == `<:Phong_TrinhGiaoKim:995737035308548196>`) {
    return { name: `Trình Giảo Kim`, nguhanh: `phong`, hp: 700, mana: 200, def: 7, mdef: 7, agility: 3, power: 16, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 5 }

  }
  else if (names == `<:Phong_PhiYen:995737127046369320>`) {
    return { name: `Phi Yến`, nguhanh: `phong`, hp: 500, mana: 200, def: 4, mdef: 6, agility: 13, power: 3, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 5 }

  }
  else if (names == `<:Phong_BachKhoi:995737163700375653>`) {
    return { name: `Bạch Khởi`, nguhanh: `phong`, hp: 700, mana: 200, def: 7, mdef: 7, agility: 12, power: 12, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 5 }

  }
  else if (names == `<:Phong_TrieuPhong:995737198919946351>`) {
    return { name: `Triệu Phong`, nguhanh: `phong`, hp: 500, mana: 200, def: 5, mdef: 5, agility: 3, power: 12, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 5 }

  }
  else if (names == `<:Loi_HuyenMinh:996015474078912522>`) {
    return { name: `Huyễn Minh`, nguhanh: `loi`, hp: 500, mana: 400, def: 4, mdef: 7, agility: 18, power: 2, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 6 }
  }
  else if (names == `<:Loi_LoiChanTu:996015638231392256>`) {
    return { name: `Lôi Chấn Tử`, nguhanh: `loi`, hp: 700, mana: 300, def: 7, mdef: 7, agility: 9, power: 12, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 6 }
  }
  else if (names == `<:Loi_KeQuang:996015516915347536>`) {
    return { name: `Kế Quang`, nguhanh: `loi`, hp: 600, mana: 300, def: 5, mdef: 6, agility: 16, power: 9, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 6 }
  }
  else if (names == `<:Loi_LoiChinh:996015575945969725>`) {
    return { name: `Lôi Chính`, nguhanh: `loi`, hp: 700, mana: 400, def: 7, mdef: 7, agility: 16, power: 14, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 6 }
  }
  else if (names == `<:Loi_GiaCatLuong:996015683844440144>`) {
    return { name: `Gia Cát Lượng`, nguhanh: `loi`, hp: 500, mana: 500, def: 5, mdef: 5, agility: 20, power: 5, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 6 }
  }
}
function checkava(names) {
  let result
  if (names == `<:Hoa_HocGia_3sao:997053798876987403>`) {
    result = `https://media.discordapp.net/attachments/997052347308068964/997102973282951259/1657484011919.png?width=384&height=607`
  }
  else if (names == `<:Loi_DaoSy_3sao:997052886829772860>`) {
    result = `https://media.discordapp.net/attachments/997052347308068964/997104876842659840/1657533622159.png?width=445&height=608`
  }
  else if (names == `<:Phong_TieuMy_3sao:997052870660718672>`) {
    result = `https://media.discordapp.net/attachments/997052347308068964/997104174678409366/1657532727923.png?width=305&height=608`
  }
  else if (names == `<:Thuy_ThuanBinh_3sao:997052852545519686>`) {
    result = `https://media.discordapp.net/attachments/997052347308068964/997101066111950868/1657483306137.png?width=585&height=607`
  }
  else if (names == `<:Thuy_CungBinh_2sao:997052999123881985>`) {
    result = `https://media.discordapp.net/attachments/997052347308068964/997054923659296858/1657482994769.png?width=485&height=608`
  }
  else if (names == `<:Loi_ThichKhach_2sao:997053035689812049>`) {
    result = `https://media.discordapp.net/attachments/997052347308068964/997099832932061195/1657533049616.png?width=329&height=607`
  }
  else if (names == `<:Phong_TieuHan_2sao:997053017213902860>`) {
    result = `https://media.discordapp.net/attachments/997052347308068964/997098442088263730/1657532451288.png?width=364&height=608`
  }
  else if (names == `<:Hoa_NoTy_2sao:997052978685038653>`) {
    result = `https://media.discordapp.net/attachments/997052347308068964/997056810634711140/1657483675934.png?width=440&height=607`

  }
  else if (names == `<:Hoa_ChucDung:992760936530182194>`) {
    result = `https://media.discordapp.net/attachments/992765363626455151/992765551740989520/1656763753131.png?width=588&height=607`

  }
  else if (names == `<:Hoa_VoHau:992760791285645323>`) {
    result = `https://media.discordapp.net/attachments/992780114729369670/992784680883593326/1656768534836.png?width=418&height=607`
  }
  else if (names == `<:Hoa_TieuViem:992760692140691559>`) {
    result = `https://media.discordapp.net/attachments/992798379966992484/992809251732992031/1656773735373.png?width=671&height=607`

  }
  else if (names == `<:Hoa_PhanThien:992759800754602074>`) {
    result = `https://media.discordapp.net/attachments/992814932687061093/992821066865066055/1656777311182.png?width=364&height=608`

  }
  else if (names == `<:Hoa_MyNuong:992760858398691408>`) {
    result = `https://media.discordapp.net/attachments/992828104328356000/992832355339358308/1656779964649.png?width=548&height=607`

  }
  else if (names == `<:Thuy_VanQuan:993522705632591993>`) {
    result = `https://media.discordapp.net/attachments/993522358931431475/993528275127238777/1656945401296.png?width=439&height=607`

  }
  else if (names == `<:Thuy_TieuHuan:993522906510397500>`) {
    result = `https://media.discordapp.net/attachments/994501648309305355/995894901201961091/1657460625447.png?width=560&height=608`
  }
  else if (names == `<:Thuy_LyMongHoa:993522865838235768>`) {
    result = `https://media.discordapp.net/attachments/995654806704246834/995655357147910144/1657452932673.png?width=359&height=608`
  }
  else if (names == `<:Thuy_TheDan:993522779372650526>`) {
    result = `https://media.discordapp.net/attachments/995673777650282566/995675385704497182/1657457142095.png?width=395&height=607`
  }
  else if (names == `<:Thuy_PhuongKy:993522759948832818>`) {
    result = `https://media.discordapp.net/attachments/995725460782723082/995725736906338424/1657469778462.png?width=529&height=607`

  }
  else if (names == `<:Phong_LyThuanPhong:995737059018948709>`) {
    result = `https://media.discordapp.net/attachments/995736890126893086/995739606295257249/1657472888802.png?width=669&height=608`

  }
  else if (names == `<:Phong_TrinhGiaoKim:995737035308548196>`) {
    result = `https://media.discordapp.net/attachments/995744744716124183/995747118838972416/1657474867563.png?width=685&height=607`

  }
  else if (names == `<:Phong_PhiYen:995737127046369320>`) {

    result = `https://media.discordapp.net/attachments/995986257811341342/995991200890896434/1657533077721.png?width=635&height=607`
  }
  else if (names == `<:Phong_BachKhoi:995737163700375653>`) {
    result = `https://media.discordapp.net/attachments/995995088620638289/996007206124269658/1657536870856.png?width=556&height=607`
  }
  else if (names == `<:Phong_TrieuPhong:995737198919946351>`) {
    result = `https://cdn.discordapp.com/attachments/996010483876368464/996245424996372571/1657538083145.png?width=575&height=607`

  }
  else if (names == `<:Loi_HuyenMinh:996015474078912522>`) {
    result = `https://media.discordapp.net/attachments/996014424320118867/996017450137157742/1657472029651.png?width=419&height=607`
  }
  else if (names == `<:Loi_LoiChanTu:996015638231392256>`) {
    result = `https://media.discordapp.net/attachments/996022895388151878/996029124395147325/1657542065301.png?width=654&height=607`
  }
  else if (names == `<:Loi_KeQuang:996015516915347536>`) {
    result = `https://media.discordapp.net/attachments/996036366083293225/996038576896749628/1657544310547.png?width=678&height=608`
  }
  else if (names == `<:Loi_LoiChinh:996015575945969725>`) {
    result = `https://media.discordapp.net/attachments/996042287614279690/996043935958978620/1657545685941.png?width=545&height=607`
  }
  else if (names == `<:Loi_GiaCatLuong:996015683844440144>`) {
    result = `https://media.discordapp.net/attachments/996047416174329977/996050007218212974/1657547101797.png?width=621&height=607`
  }
  return result
}
function checkskill(names, round, skill1, skill2, skill3, skill4, hp, mana, power, agility, def, mdef, nhanhnhen, enemyhp) {
  if (names == `<:Hoa_HocGia_3sao:997053798876987403>`) {
    let myteam = {}
    myteam["hero1-hp"] = hp
    myteam["hero1-hpbonus"] = 0
    myteam["hero1-mana"] = mana
    myteam["hero1-genderdmg"] = 0
    myteam["hero1-power"] = power
    myteam["hero1-powerbonus"] = 0
    myteam["hero1-agility"] = agility
    myteam["hero1-agilitybonus"] = 0
    myteam["hero1-attack"] = myteam["hero1-power"] * 10
    myteam["hero1-attack-nguhanh"] = 0
    myteam["hero1-attack-bonuspower"] = 0
    myteam["hero1-attack-bonusagility"] = (skill2 + 1) / 10 * myteam["hero1-agility"]
    //0 - - 3 - - 6 - - 9
    if (round % 3 == 0) myteam["hero1-attack-bonusagility"] = (20 / 100 * myteam["hero1-agility"]) * skill1
    let number = Math.floor(Math.random() * 10)
    myteam["hero1-attack-satthuongchuan"] = 0
    if (round % 3 == 0 && number <= 3) myteam["hero1-attack-satthuongchuan"] = (10 / 100) * hp
    myteam["hero1-def"] = def
    myteam["hero1-def-bonushp"] = 0
    myteam["hero1-def-bonusdef"] = 0
    myteam["hero1-def-bonus"] = 0
    myteam["hero1-mdef"] = mdef
    myteam["hero1-mdef-bonushp"] = 0
    myteam["hero1-mdef-bonusdef"] = 0
    myteam["hero1-mdef-bonus"] = 0
    myteam["hero1-skill1-dmg"] = 0
    myteam["hero1-skill1-crit"] = 0
    myteam["hero1-skill1-effect"] = 0
    myteam["hero1-skill1-effect-turn"] = 0
    myteam["hero1-skill2-effect"] = 0
    myteam["hero1-skill2-effect-turn"] = 0
    myteam["hero1-skill3-effect"] = 0
    myteam["hero1-skill3-effect-turn"] = 0
    myteam["hero1-skill4-dmg"] = 0
    myteam["hero1-skill4-crit"] = 0
    myteam["hero1-skill4-effect"] = 0
    myteam["hero1-skill4-effect-turn"] = 0
    myteam["hero1-hoimau"] = 0
    myteam["hero1-nhanhnhen"] = nhanhnhen
    myteam["hero1-stun-turn"] = 0
    return myteam
  }
  else if (names == `<:Loi_DaoSy_3sao:997052886829772860>`) {
    let myteam = {}
    myteam["hero1-hp"] = hp
    myteam["hero1-hpbonus"] = 0
    myteam["hero1-mana"] = mana
    myteam["hero1-genderdmg"] = 0
    myteam["hero1-power"] = power
    myteam["hero1-powerbonus"] = 0
    myteam["hero1-agility"] = agility
    myteam["hero1-agilitybonus"] = 0
    myteam["hero1-attack"] = myteam["hero1-power"] * 10
    myteam["hero1-attack-nguhanh"] = 0
    myteam["hero1-attack-bonuspower"] = 0
    myteam["hero1-attack-bonusagility"] = 0
    //0 - - 3 - - 6 - - 9 - - 12 - - 15
    if (round % 3 == 0) myteam["hero1-attack-bonusagility"] = (((skill1 + 1) * 10) / 100 * myteam["hero1-agility"]) // skill 1
    let number = Math.floor(Math.random() * 10)
    myteam["hero1-attack-satthuongchuan"] = 0
    myteam["hero1-def"] = def
    myteam["hero1-def-bonushp"] = 0
    myteam["hero1-def-bonusdef"] = 0
    myteam["hero1-def-bonus"] = 0
    myteam["hero1-mdef"] = mdef
    myteam["hero1-mdef-bonushp"] = 0
    myteam["hero1-mdef-bonusdef"] = 0
    myteam["hero1-mdef-bonus"] = 0
    myteam["hero1-skill1-dmg"] = 0
    myteam["hero1-skill1-crit"] = 0
    let number2 = Math.floor(Math.random() * 10)
    myteam["hero1-skill1-effect"] = 0
    myteam["hero1-skill1-effect-turn"] = 0
    if (number2 <= 5 && round % 3 == 0) myteam["hero1-skill1-effect-turn"] = 1 //choáng 50%
    myteam["hero1-skill2-effect"] = 0
    if (round % 6 == 0) myteam["hero1-skill2-effect"] = myteam["hero1-attack-bonusagility"] //mỗi làn dùng skill 3 lần thì x2 dmg
    myteam["hero1-skill2-effect-turn"] = 0
    myteam["hero1-skill3-effect"] = 0
    myteam["hero1-skill3-effect-turn"] = 0
    myteam["hero1-skill4-dmg"] = 0
    myteam["hero1-skill4-crit"] = 0
    myteam["hero1-skill4-effect"] = 0
    myteam["hero1-skill4-effect-turn"] = 0
    myteam["hero1-hoimau"] = 0
    myteam["hero1-nhanhnhen"] = nhanhnhen
    myteam["hero1-stun-turn"] = 0
    return myteam
  }
  else if (names == `<:Phong_TieuMy_3sao:997052870660718672>`) {
    let myteam = {}
    myteam["hero1-hp"] = hp
    myteam["hero1-hpbonus"] = 0
    myteam["hero1-mana"] = mana
    myteam["hero1-genderdmg"] = 0
    myteam["hero1-power"] = power
    myteam["hero1-powerbonus"] = 0
    myteam["hero1-agility"] = agility
    myteam["hero1-agilitybonus"] = 0
    myteam["hero1-attack"] = myteam["hero1-power"] * 10
    myteam["hero1-attack-nguhanh"] = 0
    myteam["hero1-attack-bonuspower"] = 0
    myteam["hero1-attack-bonusagility"] = 0
    //0 - - 3 - - 6 - - 9 - - 12 - - 15
    if (round % 3 == 0) myteam["hero1-attack-bonusagility"] = (((skill1 + 1) * 10) / 100 * myteam["hero1-agility"]) // skill 1
    let number = Math.floor(Math.random() * 10)
    myteam["hero1-attack-satthuongchuan"] = 0
    myteam["hero1-def"] = def
    myteam["hero1-def-bonushp"] = 0
    myteam["hero1-def-bonusdef"] = 0
    myteam["hero1-def-bonus"] = 0
    myteam["hero1-mdef"] = mdef
    myteam["hero1-mdef-bonushp"] = 0
    myteam["hero1-mdef-bonusdef"] = 0
    myteam["hero1-mdef-bonus"] = 0
    myteam["hero1-skill1-dmg"] = 0
    myteam["hero1-skill1-crit"] = 0
    let number2 = Math.floor(Math.random() * 10)
    myteam["hero1-skill1-effect"] = 0
    myteam["hero1-skill1-effect-turn"] = 0
    if (number2 <= 5 && round % 3 == 0) myteam["hero1-skill1-effect-turn"] = 1 //choáng 50%
    myteam["hero1-skill2-effect"] = 0
    if (round % 6 == 0) myteam["hero1-skill2-effect"] = (3 / 100) * enemyhp //mỗi làn dùng skill 3 lần thì đối thủ mất 3% máu tối đa
    myteam["hero1-skill2-effect-turn"] = 0
    myteam["hero1-skill3-effect"] = 0
    myteam["hero1-skill3-effect-turn"] = 0
    myteam["hero1-skill4-dmg"] = 0
    myteam["hero1-skill4-crit"] = 0
    myteam["hero1-skill4-effect"] = 0
    myteam["hero1-skill4-effect-turn"] = 0
    myteam["hero1-hoimau"] = 0
    myteam["hero1-nhanhnhen"] = nhanhnhen
    myteam["hero1-stun-turn"] = 0
    return myteam
  }
  else if (names == `<:Thuy_ThuanBinh_3sao:997052852545519686>`) {
    // sửa tới đây
    let myteam = {}
    myteam["hero1-hp"] = hp
    myteam["hero1-hpbonus"] = 0
    myteam["hero1-mana"] = mana
    myteam["hero1-genderdmg"] = 0
    myteam["hero1-power"] = power
    myteam["hero1-powerbonus"] = 0
    myteam["hero1-agility"] = agility
    myteam["hero1-agilitybonus"] = 0
    myteam["hero1-attack"] = myteam["hero1-power"] * 10
    myteam["hero1-attack-nguhanh"] = 0
    myteam["hero1-attack-bonuspower"] = 0
    myteam["hero1-attack-bonusagility"] = 0
    //0 - - 3 - - 6 - - 9 - - 12 - - 15
    if (round % 3 == 0) myteam["hero1-attack-bonusagility"] = (((skill1 + 1) * 10) / 100 * myteam["hero1-agility"]) // skill 1
    let number = Math.floor(Math.random() * 10)
    myteam["hero1-attack-satthuongchuan"] = 0
    myteam["hero1-def"] = def
    myteam["hero1-def-bonushp"] = 0
    myteam["hero1-def-bonusdef"] = 0
    myteam["hero1-def-bonus"] = 0
    myteam["hero1-mdef"] = mdef
    myteam["hero1-mdef-bonushp"] = 0
    myteam["hero1-mdef-bonusdef"] = 0
    myteam["hero1-mdef-bonus"] = 0
    myteam["hero1-skill1-dmg"] = 0
    myteam["hero1-skill1-crit"] = 0
    let number2 = Math.floor(Math.random() * 10)
    myteam["hero1-skill1-effect"] = 0
    myteam["hero1-skill1-effect-turn"] = 0
    if (number2 <= 5 && round % 3 == 0) myteam["hero1-skill1-effect-turn"] = 1 //choáng 50%
    myteam["hero1-skill2-effect"] = 0
    if (round % 6 == 0) myteam["hero1-skill2-effect"] = (3 / 100) * enemyhp //mỗi làn dùng skill 3 lần thì đối thủ mất 3% máu tối đa
    myteam["hero1-skill2-effect-turn"] = 0
    myteam["hero1-skill3-effect"] = 0
    myteam["hero1-skill3-effect-turn"] = 0
    myteam["hero1-skill4-dmg"] = 0
    myteam["hero1-skill4-crit"] = 0
    myteam["hero1-skill4-effect"] = 0
    myteam["hero1-skill4-effect-turn"] = 0
    myteam["hero1-hoimau"] = 0
    myteam["hero1-nhanhnhen"] = nhanhnhen
    myteam["hero1-stun-turn"] = 0
    return myteam
  }
  else if (names == `<:Thuy_CungBinh_2sao:997052999123881985>`) {
    let stun = false
    let giamsatthuong = 0
    let addpower = 0
    let skill1 = {}
    if (level1 == 1) {
      skill1["name"] = "Xạ Tiễn"
      skill1["dmg"] = (power + parseInt((10 * power) / 100)) * 10
      skill1["effect"] = false
      skill1["effectdmg"] = 0
      skill1["msg"] = `${names} đã dùng ${skill1["name"]} và gây **__${skill1["dmg"] + skill1["effectdmg"]}__** cho ${enemyname}`
      if (round !== 0 && round % 3 !== 0) {
        skill1["name"] = "Xạ Tiễn"
        skill1["dmg"] = 0
        skill1["effect"] = false
        skill1["effectdmg"] = 0
        skill1["msg"] = ``

      }
    }
    else if (level1 == 2) {
      skill1["name"] = "Xạ Tiễn"
      skill1["dmg"] = (power + parseInt((20 * power) / 100)) * 10
      skill1["effect"] = false
      skill1["effectdmg"] = 0
      skill1["msg"] = `${names} đã dùng ${skill1["name"]} và gây **__${skill1["dmg"] + skill1["effectdmg"]}__** cho ${enemyname}`
      if (round !== 0 && round % 3 !== 0) {
        skill1["name"] = "Xạ Tiễn"
        skill1["dmg"] = 0
        skill1["effect"] = false
        skill1["effectdmg"] = 0
        skill1["msg"] = ``

      }
    }
    else if (level1 == 3) {
      skill1["name"] = "Xạ Tiễn"
      skill1["dmg"] = (power + parseInt((30 * power) / 100)) * 10
      skill1["effect"] = false
      skill1["effectdmg"] = 0
      skill1["msg"] = `${names} đã dùng ${skill1["name"]} và gây **__${skill1["dmg"] + skill1["effectdmg"]}__** cho ${enemyname}`
      if (round !== 0 && round % 3 !== 0) {
        skill1["name"] = "Xạ Tiễn"
        skill1["dmg"] = 0
        skill1["effect"] = false
        skill1["effectdmg"] = 0
        skill1["msg"] = ``

      }
    }
    let skill2 = {}
    if (level2 == 1) addpower = 0.1
    if (level2 == 2) addpower = 0.2
    if (level2 == 3) addpower = 0.3
    skill2["name"] = "Nhắm Chuẩn"
    skill2["dmg"] = 0
    skill2["effect"] = false
    skill2["effectdmg"] = 0
    skill2["msg"] = `${names} đã dùng ${skill2["name"]} nhận thêm ${addpower} Power`

    let skill3 = {}
    skill3["name"] = "Không Có"
    skill3["dmg"] = 0
    skill3["effect"] = false
    skill3["effectdmg"] = 0
    skill3["msg"] = ``
    let skill4 = {}
    skill3["name"] = "Không Có"
    skill3["dmg"] = 0
    skill3["effect"] = false
    skill3["effectdmg"] = 0
    skill3["msg"] = ``

    let hoimau = 0
    return { skill1: skill1, skill2: skill2, skill3: skill3, skill4: skill4, stun: stun, giamsatthuong: giamsatthuong, addpower: addpower, addagility: 0, hoimau: hoimau }
  }
  else if (names == `<:Loi_ThichKhach_2sao:997053035689812049>`) {
    let stun = false
    let giamsatthuong = 0
    let addpower = 0
    let skill1 = {}
    if (level1 == 1) {
      skill1["name"] = "Tập Kích"
      skill1["dmg"] = (power + parseInt((20 * power) / 100)) * 10
      skill1["effect"] = false
      let number = Math.floor(Math.random() * 10)
      if (level1 == 1 && number <= 2 || level1 == 2 && number <= 3 || level1 == 3 && number <= 4) skill1["effect"] = true
      skill1["effectdmg"] = 0
      if (level1 == 1 && number <= 2 || level1 == 2 && number <= 3 || level1 == 3 && number <= 4) skill1["dmg"] *= 1.5
      skill1["msg"] = `${names} đã dùng ${skill1["name"]} và gây **__${skill1["dmg"]}__** cho ${enemyname}`
      if (round !== 0 && round % 3 !== 0) {
        skill1["name"] = "Tập Kích"
        skill1["dmg"] = 0
        skill1["effect"] = false
        skill1["effectdmg"] = 0
        skill1["msg"] = ``

      }
    }
    else if (level1 == 2) {
      skill1["name"] = "Tập Kích"
      skill1["dmg"] = (power + parseInt((30 * power) / 100)) * 10
      skill1["effect"] = false
      let number = Math.floor(Math.random() * 10)
      if (level1 == 1 && number <= 2 || level1 == 2 && number <= 3 || level1 == 3 && number <= 4) skill1["effect"] = true
      skill1["effectdmg"] = 0
      if (level1 == 1 && number <= 2 || level1 == 2 && number <= 3 || level1 == 3 && number <= 4) skill1["dmg"] *= 1.5
      skill1["msg"] = `${names} đã dùng ${skill1["name"]} và gây **__${skill1["dmg"]}__** cho ${enemyname}`
      if (round !== 0 && round % 3 !== 0) {
        skill1["name"] = "Tập Kích"
        skill1["dmg"] = 0
        skill1["effect"] = false
        skill1["effectdmg"] = 0
        skill1["msg"] = ``

      }
    }
    else if (level1 == 3) {
      skill1["name"] = "Tập Kích"
      skill1["dmg"] = (power + parseInt((40 * power) / 100)) * 10
      skill1["effect"] = false
      let number = Math.floor(Math.random() * 10)
      if (level1 == 1 && number <= 2 || level1 == 2 && number <= 3 || level1 == 3 && number <= 4) skill1["effect"] = true
      skill1["effectdmg"] = 0
      if (level1 == 1 && number <= 2 || level1 == 2 && number <= 3 || level1 == 3 && number <= 4) skill1["dmg"] *= 1.5
      skill1["msg"] = `${names} đã dùng ${skill1["name"]} và gây **__${skill1["dmg"]}__** cho ${enemyname}`
      if (round !== 0 && round % 3 !== 0) {
        skill1["name"] = "Tập Kích"
        skill1["dmg"] = 0
        skill1["effect"] = false
        skill1["effectdmg"] = 0
        skill1["msg"] = ``

      }
    }
    let skill2 = {}
    if (level2 == 1) addpower = 0.1
    if (level2 == 2) addpower = 0.2
    if (level2 == 3) addpower = 0.3
    if (level2 == 1 && level1 == 1 && number <= 3 || level2 == 1 && level1 == 1 && number <= 5 || level2 == 1 && level1 == 1 && number <= 6) skill1["effect"] = true
    if (level2 == 1 && level1 == 1 && number <= 3 || level2 == 1 && level1 == 1 && number <= 5 || level2 == 1 && level1 == 1 && number <= 6) skill1["dmg"] *= 1.5
    skill2["name"] = "Sắc Bén"
    skill2["dmg"] = 0
    skill2["effect"] = false
    skill2["effectdmg"] = 0
    skill2["msg"] = `${names} đã dùng ${skill2["name"]} nhận thêm ${addpower} Power`

    let skill3 = {}
    skill3["name"] = "Không Có"
    skill3["dmg"] = 0
    skill3["effect"] = false
    skill3["effectdmg"] = 0
    skill3["msg"] = ``
    let skill4 = {}
    skill3["name"] = "Không Có"
    skill3["dmg"] = 0
    skill3["effect"] = false
    skill3["effectdmg"] = 0
    skill3["msg"] = ``
    let hoimau = 0
    return { skill1: skill1, skill2: skill2, skill3: skill3, skill4: skill4, stun: stun, giamsatthuong: giamsatthuong, addpower: addpower, addagility: 0, hoimau: hoimau }
  }
  else if (names == `<:Phong_TieuHan_2sao:997053017213902860>`) {
    let stun = false
    let giamsatthuong = 0
    let addpower = 0
    let addagility = 0
    let hoimau = 0
    let skill1 = {}
    if (level1 == 1) {
      skill1["name"] = "Nhõng Nhẽo"
      skill1["dmg"] = 0
      hoimau = 0.2 * agility
      skill1["effect"] = false
      skill1["effectdmg"] = 0
      skill1["msg"] = `${names} đã dùng ${skill1["name"]} và hồi **__${hoimau}__** cho bản thân!`
      if (round !== 0 && round % 4 !== 0) {
        skill1["name"] = "Nhõng Nhẽo"
        skill1["dmg"] = 0
        hoimau = 0
        skill1["effect"] = false
        skill1["effectdmg"] = 0
        skill1["msg"] = ``

      }
    }
    else if (level1 == 2) {
      skill1["name"] = "Nhõng Nhẽo"
      skill1["dmg"] = 0
      hoimau = 0.3 * agility
      skill1["effect"] = false
      skill1["effectdmg"] = 0
      skill1["msg"] = `${names} đã dùng ${skill1["name"]} và hồi **__${hoimau}__** cho bản thân!`
      if (round !== 0 && round % 4 !== 0) {
        skill1["name"] = "Nhõng Nhẽo"
        skill1["dmg"] = 0
        hoimau = 0
        skill1["effect"] = false
        skill1["effectdmg"] = 0
        skill1["msg"] = ``

      }
    }
    else if (level1 == 3) {
      skill1["name"] = "Nhõng Nhẽo"
      skill1["dmg"] = 0
      hoimau = 0.4 * agility
      skill1["effect"] = false
      skill1["effectdmg"] = 0
      skill1["msg"] = `${names} đã dùng ${skill1["name"]} và hồi **__${hoimau}__** cho bản thân!`
      if (round !== 0 && round % 4 !== 0) {
        skill1["name"] = "Nhõng Nhẽo"
        skill1["dmg"] = 0
        hoimau = 0
        skill1["effect"] = false
        skill1["effectdmg"] = 0
        skill1["msg"] = ``

      }
    }
    let skill2 = {}
    if (level2 == 1) addagility = 0.1
    if (level2 == 2) addagility = 0.2
    if (level2 == 3) addagility = 0.3
    skill1["effectdmg"] = agility * 10
    skill2["name"] = "Khả Ái"
    skill2["dmg"] = 0
    skill2["effect"] = false
    skill2["effectdmg"] = 0
    skill2["msg"] = `${names} đã dùng ${skill2["name"]} gây x2 lần sát thương`

    let skill3 = {}
    skill3["name"] = "Không Có"
    skill3["dmg"] = 0
    skill3["effect"] = false
    skill3["effectdmg"] = 0
    skill3["msg"] = ``
    let skill4 = {}
    skill3["name"] = "Không Có"
    skill3["dmg"] = 0
    skill3["effect"] = false
    skill3["effectdmg"] = 0
    skill3["msg"] = ``

    return { skill1: skill1, skill2: skill2, skill3: skill3, skill4: skill4, stun: stun, giamsatthuong: giamsatthuong, addpower: addpower, addagility: addagility, hoimau: hoimau }
  }
  else if (names == `<:Hoa_NoTy_2sao:997052978685038653>`) {
    let stun = false
    let giamsatthuong = 0
    let addpower = 0
    let addagility = 0
    let hoimau = 0
    let skill1 = {}
    if (level1 == 1) {
      skill1["name"] = "Tiểu Hỏa Cầu"
      skill1["dmg"] = (agility + (agility * 20) / 100) * 10
      skill1["effect"] = false
      skill1["effectdmg"] = 0
      skill1["msg"] = `${names} đã dùng ${skill1["name"]} và gây **__${skill1["dmg"]}__** cho ${enemyname}!`
      if (round !== 0 && round % 3 !== 0) {
        skill1["name"] = "Tiểu Hỏa Cầu"
        skill1["dmg"] = 0
        hoimau = 0
        skill1["effect"] = false
        skill1["effectdmg"] = 0
        skill1["msg"] = ``

      }
    }
    else if (level1 == 2) {
      skill1["name"] = "Tiểu Hỏa Cầu"
      skill1["dmg"] = (agility + (agility * 30) / 100) * 10
      skill1["effect"] = false
      skill1["effectdmg"] = 0
      skill1["msg"] = `${names} đã dùng ${skill1["name"]} và gây **__${skill1["dmg"]}__** cho ${enemyname}!`
      if (round !== 0 && round % 3 !== 0) {
        skill1["name"] = "Tiểu Hỏa Cầu"
        skill1["dmg"] = 0
        hoimau = 0
        skill1["effect"] = false
        skill1["effectdmg"] = 0
        skill1["msg"] = ``

      }
    }
    else if (level1 == 3) {
      skill1["name"] = "Tiểu Hỏa Cầu"
      skill1["dmg"] = (agility + (agility * 40) / 100) * 10
      skill1["effect"] = false
      skill1["effectdmg"] = 0
      skill1["msg"] = `${names} đã dùng ${skill1["name"]} và gây **__${skill1["dmg"]}__** cho ${enemyname}!`
      if (round !== 0 && round % 2 !== 0) {
        skill1["name"] = "Tiểu Hỏa Cầu"
        skill1["dmg"] = 0
        hoimau = 0
        skill1["effect"] = false
        skill1["effectdmg"] = 0
        skill1["msg"] = ``

      }
    }
    let skill2 = {}
    if (level2 == 1) addagility = 0.1
    if (level2 == 2) addagility = 0.2
    if (level2 == 3) addagility = 0.3
    skill2["name"] = "Khả Ái"
    skill2["dmg"] = 0
    skill2["effect"] = false
    skill2["effectdmg"] = 0
    skill2["msg"] = ``

    let skill3 = {}
    skill3["name"] = "Không Có"
    skill3["dmg"] = 0
    skill3["effect"] = false
    skill3["effectdmg"] = 0
    skill3["msg"] = ``
    let skill4 = {}
    skill3["name"] = "Không Có"
    skill3["dmg"] = 0
    skill3["effect"] = false
    skill3["effectdmg"] = 0
    skill3["msg"] = ``

    return { skill1: skill1, skill2: skill2, skill3: skill3, skill4: skill4, stun: stun, giamsatthuong: giamsatthuong, addpower: addpower, addagility: addagility, hoimau: hoimau }

  }
  else {
    return
  }
  /**
else if (names == `<:Hoa_ChucDung:992760936530182194>`) {
  result = `https://media.discordapp.net/attachments/992765363626455151/992765551740989520/1656763753131.png?width=588&height=607`

}
else if (names == `<:Hoa_VoHau:992760791285645323>`) {
  result = `https://media.discordapp.net/attachments/992780114729369670/992784680883593326/1656768534836.png?width=418&height=607`
}
else if (names == `<:Hoa_TieuViem:992760692140691559>`) {
  result = `https://media.discordapp.net/attachments/992798379966992484/992809251732992031/1656773735373.png?width=671&height=607`

}
else if (names == `<:Hoa_PhanThien:992759800754602074>`) {
  result = `https://media.discordapp.net/attachments/992814932687061093/992821066865066055/1656777311182.png?width=364&height=608`

}
else if (names == `<:Hoa_MyNuong:992760858398691408>`) {
  result = `https://media.discordapp.net/attachments/992828104328356000/992832355339358308/1656779964649.png?width=548&height=607`

}
else if (names == `<:Thuy_VanQuan:993522705632591993>`) {
  result = `https://media.discordapp.net/attachments/993522358931431475/993528275127238777/1656945401296.png?width=439&height=607`

}
else if (names == `<:Thuy_TieuHuan:993522906510397500>`) {
  result = `https://media.discordapp.net/attachments/994501648309305355/995894901201961091/1657460625447.png?width=560&height=608`
}
else if (names == `<:Thuy_LyMongHoa:993522865838235768>`) {
  result = `https://media.discordapp.net/attachments/995654806704246834/995655357147910144/1657452932673.png?width=359&height=608`
}
else if (names == `<:Thuy_TheDan:993522779372650526>`) {
  result = `https://media.discordapp.net/attachments/995673777650282566/995675385704497182/1657457142095.png?width=395&height=607`
}
else if (names == `<:Thuy_PhuongKy:993522759948832818>`) {
  result = `https://media.discordapp.net/attachments/995725460782723082/995725736906338424/1657469778462.png?width=529&height=607`

}
else if (names == `<:Phong_LyThuanPhong:995737059018948709>`) {
  result = `https://media.discordapp.net/attachments/995736890126893086/995739606295257249/1657472888802.png?width=669&height=608`

}
else if (names == `<:Phong_TrinhGiaoKim:995737035308548196>`) {
  result = `https://media.discordapp.net/attachments/995744744716124183/995747118838972416/1657474867563.png?width=685&height=607`

}
else if (names == `<:Phong_PhiYen:995737127046369320>`) {

  result = `https://media.discordapp.net/attachments/995986257811341342/995991200890896434/1657533077721.png?width=635&height=607`
}
else if (names == `<:Phong_BachKhoi:995737163700375653>`) {
  result = `https://media.discordapp.net/attachments/995995088620638289/996007206124269658/1657536870856.png?width=556&height=607`
}
else if (names == `<:Phong_TrieuPhong:995737198919946351>`) {
  result = `https://cdn.discordapp.com/attachments/996010483876368464/996245424996372571/1657538083145.png?width=575&height=607`

}
else if (names == `<:Loi_HuyenMinh:996015474078912522>`) {
  result = `https://media.discordapp.net/attachments/996014424320118867/996017450137157742/1657472029651.png?width=419&height=607`
}
else if (names == `<:Loi_LoiChanTu:996015638231392256>`) {
  result = `https://media.discordapp.net/attachments/996022895388151878/996029124395147325/1657542065301.png?width=654&height=607`
}
else if (names == `<:Loi_KeQuang:996015516915347536>`) {
  result = `https://media.discordapp.net/attachments/996036366083293225/996038576896749628/1657544310547.png?width=678&height=608`
}
else if (names == `<:Loi_LoiChinh:996015575945969725>`) {
  result = `https://media.discordapp.net/attachments/996042287614279690/996043935958978620/1657545685941.png?width=545&height=607`
}
else if (names == `<:Loi_GiaCatLuong:996015683844440144>`) {
  result = `https://media.discordapp.net/attachments/996047416174329977/996050007218212974/1657547101797.png?width=621&height=607`
}
**/
}
function lucchien(hp, mana, power, agility, def, mdef, nhanhnhen) {
  let a = (hp * 2 + mana) / 2
  let b = (power + agility + nhanhnhen) * 10
  let c = (def + mdef) * 5
  let result = parseInt(a + b + c)
  return result
}
async function chuyen_trang(client, message, authorid, embeds) {
  let currentPage = 0;
  const { MessageButton, MessageActionRow } = require("discord.js");

  let buttonrow1 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setStyle('PRIMARY')
        .setEmoji('<:ARROW1:874262374595588117>')
        .setCustomId('skip-page1'),
      new MessageButton()
        .setStyle('SECONDARY')
        .setEmoji('<:ARROW2:874262374733987860>')
        .setCustomId('back-page'),
      new MessageButton()
        .setStyle('SUCCESS')
        .setEmoji('<:HOME:894217044013248532>')
        .setCustomId('home-page'),
      new MessageButton()
        .setStyle('SECONDARY')
        .setEmoji('<:ARROW3:874262374541049896>')
        .setCustomId('next-page'),
      new MessageButton()
        .setStyle('PRIMARY')
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
    interaction.deferReply({ ephemeral: true })
    if (interaction.customId == "next-page") {

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

      if (currentPage !== 0) {
        --currentPage;
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      } else {
        currentPage = embeds.length - 1
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      }
    }
    else if (interaction.customId == "skip-page1") {

      currentPage = 0;
      // queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      // queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
    }
    else if (interaction.customId == "skip-page2") {

      currentPage = embeds.length - 1;
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
    }
    else if (interaction.customId == "home-page") {

      interaction.message.edit({ embeds: [embeds[0]], components: [buttonrow1] })
    }
  })
}