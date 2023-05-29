const itemSchema = require('../../models/itemSchema')
const heroSchema = require('../../models/heroSchema')
module.exports = {
  name: 'ghep',
  cooldown: 0,
  description: "Ghép các mảnh tướng để trở thành anh hùng của riêng bạn!",
  aliases: ['kethop', 'g', 'combine'],
  usage: "Yghep + tên heroes",
  run: async (client, message, args) => {
    let type = args[0]
    if (type == `h` || type == `t` || type == `hero` || type == `tuong` || type == `manhtuong`) {
      let tuong = {
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
      let kethop = tuong[args[1]]
      if (kethop) {
        let soluong = 0
        let tuong = await itemSchema.findOne({ id: message.author.id, name: kethop })
        if (tuong) soluong = tuong.quanlity
        if (soluong < 10) return message.reply(`Bạn cần **${10 - soluong}** mảnh ${kethop} mới ghép thành tướng được!`)
        tuong.quanlity -= 10
        await tuong.save()
        let stat = checkstat(kethop)
        let tuongghep = await heroSchema.findOne({ id: message.author.id, name: kethop })
        if (!tuongghep) {
          tuongghep = new heroSchema({
            id: message.author.id,
            name: kethop,
            nguhanh: stat.nguhanh,
            hp: stat.hp,
            mana: stat.mana,
            def: stat.def,
            mdef: stat.mdef,
            agility: stat.agility,
            power: stat.power,
            gender: stat.gender,
            exp: 0,
            noitai: false,
            nhanhnhen: stat.nhanhnhen,
            skill1: stat.skill1,
            effect: stat.skill2,
            nokhi: 4
          })
          await tuongghep.save()
          await message.reply(`Chúc mừng bạn đã ghép thành công ${kethop}`)
        }
        else {
          return message.reply(`Bạn đã có tướng này rồi! Xin hãy để dành cho tính năng UP sao hoặc hiến tế sẽ ra mắt sau!`)
        }
      }
      else return message.reply(`Xin lỗi, tướng bạn muốn ghép không có! Xin hãy kiểm tra lại, viết thường không dấu!`)
    }
    else return message.reply(`Bạn phải chọn loại muốn ghép : Ví Dụ :
Yghep hero <tên hero>
Lệnh khác : Ykethop, Yg`)
  }
}
function checkstat(names) {
  if (names == `<:Hoa_HocGia_3sao:997053798876987403>`) {
    return { nguhanh: `hoa`, hp: 150, mana: 100, def: 2, mdef: 2, agility: 5, power: 5, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 1 }
  }
  else if (names == `<:Loi_DaoSy_3sao:997052886829772860>`) {
    return { nguhanh: `loi`, hp: 150, mana: 300, def: 3, mdef: 3, agility: 6, power: 3, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 1 }
  }
  else if (names == `<:Phong_TieuMy_3sao:997052870660718672>`) {
    return { nguhanh: `phong`, hp: 150, mana: 150, def: 3, mdef: 3, agility: 3, power: 6, gender: `nu`, skill1: 1, skill2: 1, nhanhnhen: 1 }
  }
  else if (names == `<:Thuy_ThuanBinh_3sao:997052852545519686>`) {
    return { nguhanh: `thuy`, hp: 250, mana: 100, def: 4, mdef: 3, agility: 3, power: 4, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 1 }
  }
  else if (names == `<:Thuy_CungBinh_2sao:997052999123881985>`) {
    return { nguhanh: `thuy`, hp: 200, mana: 50, def: 2, mdef: 2, agility: 1, power: 3, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 1 }
  }
  else if (names == `<:Loi_ThichKhach_2sao:997053035689812049>`) {
    return { nguhanh: `loi`, hp: 150, mana: 100, def: 2, mdef: 2, agility: 1, power: 3, gender: `nu`, skill1: 1, skill2: 1, nhanhnhen: 1 }
  }
  else if (names == `<:Phong_TieuHan_2sao:997053017213902860>`) {
    return { nguhanh: `phong`, hp: 150, mana: 100, def: 2, mdef: 3, agility: 3, power: 2, gender: `nu`, skill1: 1, skill2: 1, nhanhnhen: 1 }
  }
  else if (names == `<:Hoa_NoTy_2sao:997052978685038653>`) {
    return { nguhanh: `hoa`, hp: 150, mana: 100, def: 2, mdef: 3, agility: 3, power: 2, gender: `nu`, skill1: 1, skill2: 1, nhanhnhen: 1 }

  }
  else if (names == `<:Hoa_ChucDung:992760936530182194>`) {
    return { nguhanh: `hoa`, hp: 500, mana: 100, def: 5, mdef: 5, agility: 5, power: 10, gender: `nu`, skill1: 1, skill2: 1, nhanhnhen: 3 }

  }
  else if (names == `<:Hoa_VoHau:992760791285645323>`) {
    return { nguhanh: `hoa`, hp: 350, mana: 200, def: 4, mdef: 6, agility: 12, power: 3, gender: `nu`, skill1: 1, skill2: 1, nhanhnhen: 3 }

  }
  else if (names == `<:Hoa_TieuViem:992760692140691559>`) {
    return { nguhanh: `hoa`, hp: 520, mana: 100, def: 7, mdef: 3, agility: 6, power: 15, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 3 }

  }
  else if (names == `<:Hoa_PhanThien:992759800754602074>`) {
    return { nguhanh: `hoa`, hp: 300, mana: 200, def: 5, mdef: 6, agility: 13, power: 6, gender: `nu`, skill1: 1, skill2: 1, nhanhnhen: 3 }

  }
  else if (names == `<:Hoa_MyNuong:992760858398691408>`) {
    return { nguhanh: `hoa`, hp: 500, mana: 200, def: 4, mdef: 4, agility: 16, power: 6, gender: `nu`, skill1: 1, skill2: 1, nhanhnhen: 3 }

  }
  else if (names == `<:Thuy_VanQuan:993522705632591993>`) {
    return { nguhanh: `thuy`, hp: 450, mana: 300, def: 5, mdef: 5, agility: 14, power: 7, gender: `nu`, skill1: 1, skill2: 1, nhanhnhen: 2 }

  }
  else if (names == `<:Thuy_TieuHuan:993522906510397500>`) {
    return { nguhanh: `thuy`, hp: 450, mana: 300, def: 5, mdef: 5, agility: 14, power: 7, gender: `nu`, skill1: 1, skill2: 1, nhanhnhen: 2 }

  }
  else if (names == `<:Thuy_LyMongHoa:993522865838235768>`) {
    return { nguhanh: `thuy`, hp: 450, mana: 300, def: 5, mdef: 5, agility: 16, power: 7, gender: `nu`, skill1: 1, skill2: 1, nhanhnhen: 2 }

  }
  else if (names == `<:Thuy_TheDan:993522779372650526>`) {
    return { nguhanh: `thuy`, hp: 550, mana: 300, def: 5, mdef: 8, agility: 7, power: 15, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 2 }

  }
  else if (names == `<:Thuy_PhuongKy:993522759948832818>`) {
    return { nguhanh: `thuy`, hp: 450, mana: 300, def: 5, mdef: 5, agility: 17, power: 8, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 2 }

  }
  else if (names == `<:Phong_LyThuanPhong:995737059018948709>`) {
    return { nguhanh: `phong`, hp: 550, mana: 300, def: 7, mdef: 5, agility: 6, power: 14, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 5 }

  }
  else if (names == `<:Phong_TrinhGiaoKim:995737035308548196>`) {
    return { nguhanh: `phong`, hp: 700, mana: 200, def: 7, mdef: 7, agility: 3, power: 16, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 5 }

  }
  else if (names == `<:Phong_PhiYen:995737127046369320>`) {
    return { nguhanh: `phong`, hp: 500, mana: 200, def: 4, mdef: 6, agility: 13, power: 3, gender: `nu`, skill1: 1, skill2: 1, nhanhnhen: 5 }

  }
  else if (names == `<:Phong_BachKhoi:995737163700375653>`) {
    return { nguhanh: `phong`, hp: 700, mana: 200, def: 7, mdef: 7, agility: 12, power: 12, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 5 }

  }
  else if (names == `<:Phong_TrieuPhong:995737198919946351>`) {
    return { nguhanh: `phong`, hp: 500, mana: 200, def: 5, mdef: 5, agility: 3, power: 12, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 5 }

  }
  else if (names == `<:Loi_HuyenMinh:996015474078912522>`) {
    return { nguhanh: `loi`, hp: 500, mana: 400, def: 4, mdef: 7, agility: 18, power: 2, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 6 }
  }
  else if (names == `<:Loi_LoiChanTu:996015638231392256>`) {
    return { nguhanh: `loi`, hp: 700, mana: 300, def: 7, mdef: 7, agility: 9, power: 12, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 6 }
  }
  else if (names == `<:Loi_KeQuang:996015516915347536>`) {
    return { nguhanh: `loi`, hp: 600, mana: 300, def: 5, mdef: 6, agility: 16, power: 9, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 6 }
  }
  else if (names == `<:Loi_LoiChinh:996015575945969725>`) {
    return { nguhanh: `loi`, hp: 700, mana: 400, def: 7, mdef: 7, agility: 16, power: 14, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 6 }
  }
  else if (names == `<:Loi_GiaCatLuong:996015683844440144>`) {
    return { nguhanh: `loi`, hp: 500, mana: 500, def: 5, mdef: 5, agility: 20, power: 5, gender: `nam`, skill1: 1, skill2: 1, nhanhnhen: 6 }
  }
}


