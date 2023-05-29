const { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const itemSchema = require('../../models/itemSchema')
const heroSchema = require('../../models/heroSchema')
const teamSchema = require('../../models/teamSchema')
const skillSchema = require('../../models/skillSchema')
module.exports = {
  name: 'team',
  cooldown: 0,
  description: "Thêm tướng vào đội hình của bạn.",
  aliases: ['addteam', 'at'],
  usage: "Yghep + tên heroes",
  run: async (client, message, args) => {

    let hero = {
      "hocgia": "<:Hoa_HocGia_3sao:997053798876987403>",
      "daosy": "<:Loi_DaoSy_3sao:997052886829772860>",
      "tieumy": "<:Phong_TieuMy_3sao:997052870660718672>",
      "thuanbinh": "<:Thuy_ThuanBinh_3sao:997052852545519686>",
      "cungbinh": "<:Thuy_CungBinh_2sao:997052999123881985>",
      "thichkhach": "<:Loi_ThichKhach_2sao:997053035689812049>",
      "tieuhan": "<:Phong_TieuHan_2sao:997053017213902860>",
      "noty": "<:Hoa_NoTy_2sao:997052978685038653>",
      "chucdung": "<:Hoa_ChucDung:992760936530182194>",
      "vohau": "<:Hoa_VoHau:992760791285645323>",
      "tieuviem": "<:Hoa_TieuViem:992760692140691559>",
      "phanthien": "<:Hoa_PhanThien:992759800754602074>",
      "mynuong": "<:Hoa_MyNuong:992760858398691408>",
      "vanquan": "<:Thuy_VanQuan:993522705632591993>",
      "tieuhuan": "<:Thuy_TieuHuan:993522906510397500>",
      "lymonghoa": "<:Thuy_LyMongHoa:993522865838235768>",
      "thedan": "<:Thuy_TheDan:993522779372650526>",
      "phuongky": "<:Thuy_PhuongKy:993522759948832818>",
      "lythuanphong": "<:Phong_LyThuanPhong:995737059018948709>",
      "trinhgiaokim": "<:Phong_TrinhGiaoKim:995737035308548196>",
      "phiyen": "<:Phong_PhiYen:995737127046369320>",
      "bachkhoi": "<:Phong_BachKhoi:995737163700375653>",
      "trieuphong": "<:Phong_TrieuPhong:995737198919946351>",
      "huyenminh": "<:Loi_HuyenMinh:996015474078912522>",
      "loichantu": "<:Loi_LoiChanTu:996015638231392256>",
      "kequang": "<:Loi_KeQuang:996015516915347536>",
      "loichinh": "<:Loi_LoiChinh:996015575945969725>",
      "giacatluong": "<:Loi_GiaCatLuong:996015683844440144>"
    }
    if (args[0] == `add`) {
      if (!args[3]) return message.reply(`:x: | **${message.author.username}**, bạn phải nhập 3 anh hùng để add vào team!
vd : Yaddteam giacatluong huyenminh phanthien`)
      let name1 = hero[args[1]]
      let name2 = hero[args[2]]
      let name3 = hero[args[3]]
      let hero1 = await heroSchema.findOne({ id: message.author.id, name: name1 })
      let hero2 = await heroSchema.findOne({ id: message.author.id, name: name2 })
      let hero3 = await heroSchema.findOne({ id: message.author.id, name: name3 })
      if (!hero1) return message.reply(`Bạn chưa sở hữu ${hero1}`)
      if (!hero2) return message.reply(`Bạn chưa sở hữu ${hero2}`)
      if (!hero3) return message.reply(`Bạn chưa sở hữu ${hero3}`)
      
      await message.reply(`Add thành công ${hero1} ${hero2} ${hero3}`)
    }
    else {
      let team = await teamSchema.findOne({ id: message.author.id })
      if (!team) return message.channel.send(`Bạn chưa có team!`)
      let name1 = team.hero1.name.split("_")
      let nguhanh1 = checknguhanh(name1[0])
      let name2 = team.hero2.name.split("_")
      let nguhanh2 = checknguhanh(name2[0])
      let name3 = team.hero3.name.split("_")
      let nguhanh3 = checknguhanh(name3[0])
      let old1 = checkstat(team.hero1.name)
      let old2 = checkstat(team.hero2.name)
      let old3 = checkstat(team.hero3.name)
      let hp = team.hero1.hp + team.hero2.hp + team.hero3.hp;
      let mana = team.hero1.mana + team.hero2.mana + team.hero3.mana;
      let def = team.hero1.def + team.hero2.def + team.hero3.def;
      let mdef = team.hero1.mdef + team.hero2.mdef + team.hero3.mdef;
      let nhanhnhen = team.hero1.nhanhnhen + team.hero2.nhanhnhen + team.hero3.nhanhnhen;
      let power = team.hero1.power + team.hero2.power + team.hero3.power;
      let agility = team.hero1.power + team.hero2.power + team.hero3.power;
      let a = lucchien(hp, mana, power, agility, def, mdef, nhanhnhen)
      let teamembed = new EmbedBuilder()
        .setTitle(`Team của ${message.author.username}`)
        .setDescription(`
**Lực Chiến: __${a.toLocaleString('en-us')}__**

${nguhanh1 + ` ` + team.hero1.name} **__${old1.name}__**
<:health:968579051180662794> ${team.hero1.hp} <:mana:968579051113553991> ${team.hero1.mana}
<:power:968559497524154419> ${team.hero1.power} <:agility:968559498581143622> ${team.hero1.agility} <:nhanhnhen:984994431558107168> ${team.hero1.nhanhnhen}
<:def:984993472626970626> ${team.hero1.def} <:magicdef:984993497855713280> ${team.hero1.mdef}

${nguhanh2 + ` ` + team.hero2.name} **__${old2.name}__**
<:health:968579051180662794> ${team.hero2.hp} <:mana:968579051113553991> ${team.hero2.mana}
<:power:968559497524154419> ${team.hero2.power} <:agility:968559498581143622> ${team.hero2.agility} <:nhanhnhen:984994431558107168> ${team.hero2.nhanhnhen}
<:def:984993472626970626> ${team.hero2.def} <:magicdef:984993497855713280> ${team.hero2.mdef}

${nguhanh3 + ` ` + team.hero3.name} **__${old3.name}__**
<:health:968579051180662794> ${team.hero3.hp} <:mana:968579051113553991> ${team.hero3.mana}
<:power:968559497524154419> ${team.hero3.power} <:agility:968559498581143622> ${team.hero3.agility} <:nhanhnhen:984994431558107168> ${team.hero3.nhanhnhen}
<:def:984993472626970626> ${team.hero3.def} <:magicdef:984993497855713280> ${team.hero3.mdef}
`)
      await message.channel.send({ embeds: [teamembed] })
    }
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
/**
async function checkskill(names) {
  const skillSchema = require('../../models/skillSchema')
  if (names == `<:Hoa_HocGia_3sao:997053798876987403>`) {
    let add = new skillSchema({
      id: message.author.id,
      name: `<:Hoa_HocGia_3sao:997053798876987403>`,
      skill1: {
        level1: {
          active: true,
          name: `Vô Nhai`,
          stc: 50,
          dmg: 200,
          rateeffect: 30,
          effect: `Chuyển sát thương`,
          effectdmg: 100,
          cooldown: 2,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level2: {
          active: false,
          name: `Vô Nhai`,
          stc: 50,
          dmg: 400,
          rateeffect: 30,
          effect: `Chuyển sát thương`,
          effectdmg: 200,
          cooldown: 2,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level3: {
          active: false,
          name: `Vô Nhai`,
          stc: 50,
          dmg: 600,
          rateeffect: 30,
          effect: `Chuyển sát thương`,
          effectdmg: 300,
          cooldown: 1,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
      },
      skillpassive1: {
        level1: {
          active: true,
          name: `Học Bác`,
          stc: 0,
          bonusdmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 999,
          bonuspow: 0,
          bonusagi: 20 / 100,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level2: {
          active: false,
          name: `Học Bác`,
          stc: 0,
          bonusdmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 999,
          bonuspow: 0,
          bonusagi: 30 / 100,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level3: {
          active: false,
          name: `Học Bác`,
          stc: 0,
          bonusdmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 999,
          bonuspow: 0,
          bonusagi: 40 / 100,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
      },
      skillpassive2: {
        level1: {
          active: false,
          name: `Không Có`,
          stc: 0,
          bonusdmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level2: {
          active: false,
          name: `Không Có`,
          stc: 0,
          bonusdmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level3: {
          active: false,
          name: `Không Có`,
          stc: 0,
          bonusdmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
      },
      ulti: {
        level1: {
          active: false,
          name: `Không Có`,
          stc: 0,
          dmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level2: {
          active: false,
          name: `Không Có`,
          stc: 0,
          dmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level3: {
          active: false,
          name: `Không Có`,
          stc: 0,
          dmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
      },
    })
    await add.save()
    console.log(`${message.author.username} đã add Học Sỹ vào team!`)
  }
  else if (names == `<:Loi_DaoSy_3sao:997052886829772860>`) {
    let add = new skillSchema({
      id: message.author.id,
      name: `<:Loi_DaoSy_3sao:997052886829772860>`,
      skill1: {
        level1: {
          active: true,
          name: `Lôi Kích`,
          stc: 0,
          dmg: 200,
          rateeffect: 50,
          effect: `Choáng`,
          effectdmg: 100,
          cooldown: 2,
          stun: true,
          effectturn: 1,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level2: {
          active: false,
          name: `Lôi Kích`,
          stc: 0,
          dmg: 500,
          rateeffect: 50,
          effect: `Choáng`,
          effectdmg: 100,
          cooldown: 2,
          stun: true,
          effectturn: 1,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level3: {
          active: false,
          name: `Lôi Kích`,
          stc: 0,
          dmg: 800,
          rateeffect: 50,
          effect: `Choáng`,
          effectdmg: 100,
          cooldown: 1,
          stun: true,
          effectturn: 1,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
      },
      skillpassive1: {
        level1: {
          active: true,
          name: `Học Bác`,
          stc: 0,
          bonusdmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 999,
          bonuspow: 0,
          bonusagi: 20 / 100,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level2: {
          active: false,
          name: `Học Bác`,
          stc: 0,
          bonusdmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 999,
          bonuspow: 0,
          bonusagi: 30 / 100,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level3: {
          active: false,
          name: `Học Bác`,
          stc: 0,
          bonusdmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 999,
          bonuspow: 0,
          bonusagi: 40 / 100,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
      },
      skillpassive2: {
        level1: {
          active: false,
          name: `Không Có`,
          stc: 0,
          bonusdmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level2: {
          active: false,
          name: `Không Có`,
          stc: 0,
          bonusdmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level3: {
          active: false,
          name: `Không Có`,
          stc: 0,
          bonusdmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
      },
      ulti: {
        level1: {
          active: false,
          name: `Không Có`,
          stc: 0,
          dmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level2: {
          active: false,
          name: `Không Có`,
          stc: 0,
          dmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
        level3: {
          active: false,
          name: `Không Có`,
          stc: 0,
          dmg: 0,
          rateeffect: 0,
          effect: `Không Có`,
          effectdmg: 0,
          cooldown: 0,
          stun: false,
          effectturn: 0,
          bonuspow: 0,
          bonusagi: 0,
          bonusatk: 0,
          bonusdef: 0,
          bonusmdef: 0
        },
      },
    })
    await add.save()
    console.log(`${message.author.username} đã add Học Sỹ vào team!`)
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
**/
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
/**
const skillSchema = new mongoose.Schema({
  id: String,
  name: String,
  skill1: {
    name: String,
    dmg: Number,
    effect: String,
    effectdmg: Number,
    cooldown: Number,
    stun: Boolean,
    effectturn: Number,
    bonuspow: Number,
    bonusagi: Number,
    bonusatk: Number,
    bonusdef : Number,
    bonusmdef : Number
  },
  skillpassive1: {
    name: String,
    bonusdmg: Number,
    effect: String,
    effectdmg: Number,
    cooldown: Number,
    stun: Boolean,
    effectturn: Number,
    bonuspow: Number,
    bonusagi: Number,
    bonusatk: Number,
    bonusdef : Number,
    bonusmdef : Number
  },
  skillpassive2: {
    name: String,
    bonusdmg: Number,
    effect: String,
    effectdmg: Number,
    cooldown: Number,
    stun: Boolean,
    effectturn: Number,
    bonuspow: Number,
    bonusagi: Number,
    bonusatk: Number,
    bonusdef : Number,
    bonusmdef : Number
  },
  ulti: {
    name: String,
    dmg: Number,
    effect: String,
    effectdmg: Number,
    cooldown: Number,
    stun: Boolean,
    effectturn: Number,
    bonuspow: Number,
    bonusagi: Number,
    bonusatk: Number,
    bonusdef : Number,
    bonusmdef : Number
  },
})
**/
