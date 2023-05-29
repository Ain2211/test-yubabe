// Đây là file hỗ trợ thu gọn cách các Schema Hoạt Động!
const overrideWithinDay = false

const praySchema = require('../models/praySchema')

const vipSchema = require('../models/vipSchema')
const fishingbuff = require('../models/fishingbuff')
const powerfishing = require('../models/powerfishing')
const animalSchema = require('../models/animalSchema')
const cropSchema = require('../models/farmcrops')
const fishingSchema = require('../models/fishingSchema')
const fieldSchema = require('../models/fieldSchema')
const farmSchema = require('../models/farmSchema')
const factorySchema = require('../models/factorySchema')
const growSchema = require('../models/growSchema')
const cattleSchema = require('../models/farmanimals')



const BanSchema = require('../models/BanSchema')
const cooldownSchema = require('../models/cooldownSchema')
const userSchema = require('../models/userSchema')
const characterSchema = require('../models/characterSchema')
const badgeSchema = require('../models/badgeSchema')
const CONFIG = require('../config/config.json')
const DO = require('../config/do.json')
const items = require('../config/item.json')
const BJ = require('../config/blackjack.json')
const expSchema = require('../models/ExpSchema')
const levelSchema = require('../models/ExplvSchema')
const teamSchema = require('../models/teamSchema')
const heroSchema = require('../models/heroSchema')
const lifeSchema = require('../models/lifeSchema')
const client = require("../bot.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const itemSchema = require('../models/itemSchema')





client.echo = async function echo(content, message) {
  let result;
  if (!content) result = "Bạn phải nhập gì đó"
  else result = content
  await message.channel.send(result)
}
client.teamadd = async (id, name1, name2, name3) => {
  let hero1 = await heroSchema.findOne({ name: name1 })
  let hero2 = await heroSchema.findOne({ name: name2 })
  let hero3 = await heroSchema.findOne({ name: name3 })
  if (!hero1 || !hero2 || !hero3) return
  let team = await teamSchema.findOne({ id: id })
  if (!team
  ) {
    team = new teamSchema({
      id: id,
      hero1: {
        name: name1,
        nguhanh: hero1.nguhanh,
        hp: hero1.hp + (hero1.power * 2),
        mana: hero1.mana + (hero1.agility * 2),
        def: hero1.def + (hero1.power),
        mdef: hero1.mdef + hero1.agility,
        agility: hero1.agility,
        power: hero1.power,
        gender: hero1.gender,
        exp: 0,
        noitai: false,
        nhanhnhen: hero1.nhanhnhen,
        skill1: hero1.skill1,
        skill2: hero1.skill2,
        skill3: hero1.skill3,
        skill4: hero1.skill4
      },
      hero2: {
        name: name2,
        nguhanh: hero2.nguhanh,
        hp: hero2.hp + (hero2.power * 2),
        mana: hero2.mana + (hero2.agility * 2),
        def: hero2.def + (hero2.power),
        mdef: hero2.mdef + hero2.agility,
        agility: hero2.agility,
        power: hero2.power,
        gender: hero2.gender,
        exp: 0,
        noitai: false,
        nhanhnhen: hero2.nhanhnhen,
        skill1: hero2.skill1,
        skill2: hero2.skill2,
        skill3: hero2.skill3,
        skill4: hero2.skill4
      },
      hero3: {
        name: name3,
        nguhanh: hero3.nguhanh,
        hp: hero3.hp + (hero3.power * 2),
        mana: hero3.mana + (hero3.agility * 2),
        def: hero3.def + (hero3.power),
        mdef: hero3.mdef + hero3.agility,
        agility: hero3.agility,
        power: hero3.power,
        gender: hero3.gender,
        exp: 0,
        noitai: false,
        nhanhnhen: hero3.nhanhnhen,
        skill1: hero3.skill1,
        skill2: hero3.skill2,
        skill3: hero3.skill3,
        skill4: hero3.skill4
      }
    })
    await team.save()
  } else {
    await team.deleteOne({ id: id })
    let addteam = new teamSchema({
      id: id,
      hero1: {
        name: name1,
        nguhanh: hero1.nguhanh,
        hp: hero1.hp + (hero1.power * 2),
        mana: hero1.mana + (hero1.agility * 2),
        def: hero1.def + (hero1.power),
        mdef: hero1.mdef + hero1.agility,
        agility: hero1.agility,
        power: hero1.power,
        gender: hero1.gender,
        exp: 0,
        noitai: false,
        nhanhnhen: hero1.nhanhnhen,
        skill1: hero1.skill1,
        skill2: hero1.skill2,
        skill3: hero1.skill3,
        skill4: hero1.skill4
      },
      hero2: {
        name: name2,
        nguhanh: hero2.nguhanh,
        hp: hero2.hp + (hero2.power * 2),
        mana: hero2.mana + (hero2.agility * 2),
        def: hero2.def + (hero2.power),
        mdef: hero2.mdef + hero2.agility,
        agility: hero2.agility,
        power: hero2.power,
        gender: hero2.gender,
        exp: 0,
        noitai: false,
        nhanhnhen: hero2.nhanhnhen,
        skill1: hero2.skill1,
        skill2: hero2.skill2,
        skill3: hero2.skill3,
        skill4: hero2.skill4
      },
      hero3: {
        name: name3,
        nguhanh: hero3.nguhanh,
        hp: hero3.hp + (hero3.power * 2),
        mana: hero3.mana + (hero3.agility * 2),
        def: hero3.def + (hero3.power),
        mdef: hero3.mdef + hero3.agility,
        agility: hero3.agility,
        power: hero3.power,
        gender: hero3.gender,
        exp: 0,
        noitai: false,
        nhanhnhen: hero3.nhanhnhen,
        skill1: hero3.skill1,
        skill2: hero3.skill2,
        skill3: hero3.skill3,
        skill4: hero3.skill4
      }
    })
    await addteam.save()
  }

  function checkstat(names) {
    if (names == `<:Hoa_HocGia_3sao:997053798876987403>`) {
      return { nguhanh: `hoa`, hp: 150, mana: 100, def: 2, mdef: 2, agility: 5, power: 5, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
    }
    else if (names == `<:Loi_DaoSy_3sao:997052886829772860>`) {
      return { nguhanh: `loi`, hp: 150, mana: 300, def: 3, mdef: 3, agility: 6, power: 3, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
    }
    else if (names == `<:Phong_TieuMy_3sao:997052870660718672>`) {
      return { nguhanh: `phong`, hp: 150, mana: 150, def: 3, mdef: 3, agility: 3, power: 6, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
    }
    else if (names == `<:Thuy_ThuanBinh_3sao:997052852545519686>`) {
      return { nguhanh: `thuy`, hp: 250, mana: 100, def: 4, mdef: 3, agility: 3, power: 4, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
    }
    else if (names == `<:Thuy_CungBinh_2sao:997052999123881985>`) {
      return { nguhanh: `thuy`, hp: 200, mana: 50, def: 2, mdef: 2, agility: 1, power: 3, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
    }
    else if (names == `<:Loi_ThichKhach_2sao:997053035689812049>`) {
      return { nguhanh: `loi`, hp: 150, mana: 100, def: 2, mdef: 2, agility: 1, power: 3, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
    }
    else if (names == `<:Phong_TieuHan_2sao:997053017213902860>`) {
      return { nguhanh: `phong`, hp: 150, mana: 100, def: 2, mdef: 3, agility: 3, power: 2, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }
    }
    else if (names == `<:Hoa_NoTy_2sao:997052978685038653>`) {
      return { nguhanh: `hoa`, hp: 150, mana: 100, def: 2, mdef: 3, agility: 3, power: 2, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 0, nhanhnhen: 1 }

    }
    else if (names == `<:Hoa_ChucDung:992760936530182194>`) {
      return { nguhanh: `hoa`, hp: 500, mana: 100, def: 5, mdef: 5, agility: 5, power: 10, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 3 }

    }
    else if (names == `<:Hoa_VoHau:992760791285645323>`) {
      return { nguhanh: `hoa`, hp: 350, mana: 200, def: 4, mdef: 6, agility: 12, power: 3, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 3 }

    }
    else if (names == `<:Hoa_TieuViem:992760692140691559>`) {
      return { nguhanh: `hoa`, hp: 520, mana: 100, def: 7, mdef: 3, agility: 6, power: 15, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 3 }

    }
    else if (names == `<:Hoa_PhanThien:992759800754602074>`) {
      return { nguhanh: `hoa`, hp: 300, mana: 200, def: 5, mdef: 6, agility: 13, power: 6, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 3 }

    }
    else if (names == `<:Hoa_MyNuong:992760858398691408>`) {
      return { nguhanh: `hoa`, hp: 500, mana: 200, def: 4, mdef: 4, agility: 16, power: 6, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 3 }

    }
    else if (names == `<:Thuy_VanQuan:993522705632591993>`) {
      return { nguhanh: `thuy`, hp: 450, mana: 300, def: 5, mdef: 5, agility: 14, power: 7, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 2 }

    }
    else if (names == `<:Thuy_TieuHuan:993522906510397500>`) {
      return { nguhanh: `thuy`, hp: 450, mana: 300, def: 5, mdef: 5, agility: 14, power: 7, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 2 }

    }
    else if (names == `<:Thuy_LyMongHoa:993522865838235768>`) {
      return { nguhanh: `thuy`, hp: 450, mana: 300, def: 5, mdef: 5, agility: 16, power: 7, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 2 }

    }
    else if (names == `<:Thuy_TheDan:993522779372650526>`) {
      return { nguhanh: `thuy`, hp: 550, mana: 300, def: 5, mdef: 8, agility: 7, power: 15, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 2 }

    }
    else if (names == `<:Thuy_PhuongKy:993522759948832818>`) {
      return { nguhanh: `thuy`, hp: 450, mana: 300, def: 5, mdef: 5, agility: 17, power: 8, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 2 }

    }
    else if (names == `<:Phong_LyThuanPhong:995737059018948709>`) {
      return { nguhanh: `phong`, hp: 550, mana: 300, def: 7, mdef: 5, agility: 6, power: 14, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 5 }

    }
    else if (names == `<:Phong_TrinhGiaoKim:995737035308548196>`) {
      return { nguhanh: `phong`, hp: 700, mana: 200, def: 7, mdef: 7, agility: 3, power: 16, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 5 }

    }
    else if (names == `<:Phong_PhiYen:995737127046369320>`) {
      return { nguhanh: `phong`, hp: 500, mana: 200, def: 4, mdef: 6, agility: 13, power: 3, gender: `nu`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 5 }

    }
    else if (names == `<:Phong_BachKhoi:995737163700375653>`) {
      return { nguhanh: `phong`, hp: 700, mana: 200, def: 7, mdef: 7, agility: 12, power: 12, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 5 }

    }
    else if (names == `<:Phong_TrieuPhong:995737198919946351>`) {
      return { nguhanh: `phong`, hp: 500, mana: 200, def: 5, mdef: 5, agility: 3, power: 12, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 5 }

    }
    else if (names == `<:Loi_HuyenMinh:996015474078912522>`) {
      return { nguhanh: `loi`, hp: 500, mana: 400, def: 4, mdef: 7, agility: 18, power: 2, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 6 }
    }
    else if (names == `<:Loi_LoiChanTu:996015638231392256>`) {
      return { nguhanh: `loi`, hp: 700, mana: 300, def: 7, mdef: 7, agility: 9, power: 12, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 6 }
    }
    else if (names == `<:Loi_KeQuang:996015516915347536>`) {
      return { nguhanh: `loi`, hp: 600, mana: 300, def: 5, mdef: 6, agility: 16, power: 9, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 6 }
    }
    else if (names == `<:Loi_LoiChinh:996015575945969725>`) {
      return { nguhanh: `loi`, hp: 700, mana: 400, def: 7, mdef: 7, agility: 16, power: 14, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 6 }
    }
    else if (names == `<:Loi_GiaCatLuong:996015683844440144>`) {
      return { nguhanh: `loi`, hp: 500, mana: 500, def: 5, mdef: 5, agility: 20, power: 5, gender: `nam`, skill1: 1, skill2: 1, skill3: 0, skill4: 1, nhanhnhen: 6 }
    }
  }
}





//xem ngọc




// check tiền





