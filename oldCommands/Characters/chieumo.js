
module.exports = {
  name: 'chieumo',
  cooldown: 0,
  description: "Tạo nhân vật và bắt đầu cuộc hành trình của bạn! Nhân Vật bao gồm các chỉ số : Sức Mạnh, Nhanh Nhẹn, Trí Lực, Ma Lực, Hấp Dẫn và Thể Lực",
  aliases: ['cm', 'summon'],
  usage: "Ycm",
  run: async (client, message, args) => {

    await chieu_mo(client, message, message.author.id)

  }
}
async function chieu_mo(client, message, authorid) {
  let gifs = [
    "https://media.discordapp.net/attachments/903334630646755339/997273481546825789/aac958db1d32b18fd7dad1a29e4ba5-unscreen.gif",
    "https://media.discordapp.net/attachments/995649273746182185/996867299535495228/b06df32830b664037a7eea3fc59330-unscreen.gif"

  ]
  let gif = gifs[Math.floor(Math.random() * gifs.length)]
  const { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder } = require("discord.js");
  const itemSchema = require('../../models/itemSchema')
  let buttonrow1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(`<:LenhBaiChieuMo:991633427168231505>`)
        .setLabel(`1 lần`)
        .setCustomId('cmt1'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`<:LenhBaiChieuMo:991633427168231505>`)
        .setLabel(`10 lần`)
        .setCustomId('cmt10'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setEmoji(`<:LenhBaiChieuMoCaoCap:991633411166978068>`)
        .setLabel(`Cao Cấp`)
        .setCustomId('caocap')
        .setDisabled(true),
    );
  let buttonrow2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(`<:LenhBaiChieuMoCaoCap:991633411166978068>`)
        .setLabel(`1 lần`)
        .setCustomId('cmcc1'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`<:LenhBaiChieuMoCaoCap:991633411166978068>`)
        .setLabel(`10 lần`)
        .setCustomId('cmcc10'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setEmoji(`<:LenhBaiChieuMo:991633427168231505>`)
        .setLabel(`Thường`)
        .setCustomId('thuong'),
    );
  let startembed = new EmbedBuilder()
    .setAuthor({ name: message.author.username })
    .setTitle(`Điểm Tướng Đài`)
    .setDescription(`<:LenhBaiChieuMo:991633427168231505> *Xin mời bạn nhấp vào nút bên dưới để chiêu mộ!* <:LenhBaiChieuMo:991633427168231505>`)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL())
  let caocapembed = new EmbedBuilder()
    .setAuthor({ name: message.author.username })
    .setTitle(`Danh Tướng Đài`)
    .setDescription(`<:LenhBaiChieuMoCaoCap:991633411166978068> *Xin mời bạn nhấp vào nút bên dưới để chiêu mộ!* <:LenhBaiChieuMoCaoCap:991633411166978068>`)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL())

  let reply = await message.reply({ embeds: [startembed], components: [buttonrow1, /**buttonrow2**/] })

  var collector = reply.createMessageComponentCollector({
    filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
  })
  collector.on("collect", async (interaction) => {
    if (interaction.user.id !== authorid) return interaction.reply({ content: `:x: | **${interaction.user.username}** , không phải nút dành cho bạn!`, ephemeral: true }).then(async msg => {
      await client.sleep(5000)
      await msg.delete()
    }
    ).catch(e => console.log(e))
    if (interaction.customId == `cmt1`) {
      await interaction.deferUpdate()
      let soluong = 0
      let lenhbai = await itemSchema.findOne({ id: message.author.id, name: `<:LenhBaiChieuMo:991633427168231505>` })
      if (lenhbai) soluong = lenhbai.quanlity
      if (soluong < 1) return message.channel.send(`**${message.author.username}**, bạn không còn thẻ chiêu mộ <:LenhBaiChieuMo:991633427168231505> nào cả!`).then(async m => {
        await client.sleep(3000)
        await m.delete()
      })
      lenhbai.quanlity -= 1
      await lenhbai.save()
      let thuong = [
        "<:Hoa_HocGia_3sao:997053798876987403>",
        "<:Loi_DaoSy_3sao:997052886829772860>",
        "<:Phong_TieuMy_3sao:997052870660718672>",
        "<:Thuy_ThuanBinh_3sao:997052852545519686>",
        "<:Thuy_CungBinh_2sao:997052999123881985>",
        "<:Loi_ThichKhach_2sao:997053035689812049>",
        "<:Phong_TieuHan_2sao:997053017213902860>",
        "<:Hoa_NoTy_2sao:997052978685038653>",
      ]
      let tuong = [
        "<:Hoa_ChucDung:992760936530182194>",
        "<:Hoa_VoHau:992760791285645323>",
        "<:Hoa_TieuViem:992760692140691559>",
        "<:Hoa_PhanThien:992759800754602074>",
        "<:Hoa_MyNuong:992760858398691408>",
        "<:Thuy_VanQuan:993522705632591993>",
        "<:Thuy_TieuHuan:993522906510397500>",
        "<:Thuy_LyMongHoa:993522865838235768>",
        "<:Thuy_TheDan:993522779372650526>",
        "<:Thuy_PhuongKy:993522759948832818>",
        "<:Phong_LyThuanPhong:995737059018948709>",
        "<:Phong_TrinhGiaoKim:995737035308548196>",
        "<:Phong_PhiYen:995737127046369320>",
        "<:Phong_BachKhoi:995737163700375653>",
        "<:Phong_TrieuPhong:995737198919946351>",
        "<:Loi_HuyenMinh:996015474078912522>",
        "<:Loi_LoiChanTu:996015638231392256>",
        "<:Loi_KeQuang:996015516915347536>",
        "<:Loi_LoiChinh:996015575945969725>",
        "<:Loi_GiaCatLuong:996015683844440144>"
      ]
      let mayman = Math.floor(Math.random() * 999)
      let tuongduocchon
      if (mayman > 900) tuongduocchon = tuong[Math.floor(Math.random() * tuong.length)]
      if (mayman <= 900) tuongduocchon = thuong[Math.floor(Math.random() * thuong.length)]
      let tuongtrongtui = await itemSchema.findOne({ id: message.author.id, name: tuongduocchon })
      if (!tuongtrongtui) {
        let add = new itemSchema({
          id: message.author.id,
          name: tuongduocchon,
          quanlity: 1,
          type: `manhtuong`
        });
        await add.save()
      }
      else {
        tuongtrongtui.quanlity += 1
        await tuongtrongtui.save()
      }
      let abc = new EmbedBuilder()
        .setTitle(`Đang Triệu Hồi Anh Hùng Từ Cánh Cửa Tinh Linh`)
        .setImage(gif)
      let bcd = new EmbedBuilder()

        .setDescription(tuongduocchon)
      let a = await message.reply({ embeds: [abc] })
      await client.sleep(3000)
      await a.edit({ embeds: [bcd] })
    }
    else if (interaction.customId == `cmt10`) {
      await interaction.deferUpdate()
      let soluong = 0
      let lenhbai = await itemSchema.findOne({ id: message.author.id, name: `<:LenhBaiChieuMo:991633427168231505>` })
      if (lenhbai) soluong = lenhbai.quanlity
      if (soluong < 10) return message.channel.send(`**${message.author.username}**, bạn không đủ thẻ chiêu mộ <:LenhBaiChieuMo:991633427168231505>`).then(async m => {
        await client.sleep(3000)
        await m.delete()
      })
      lenhbai.quanlity -= 10
      await lenhbai.save()
      let thuong = [
        "<:Hoa_HocGia_3sao:997053798876987403>",
        "<:Loi_DaoSy_3sao:997052886829772860>",
        "<:Phong_TieuMy_3sao:997052870660718672>",
        "<:Thuy_ThuanBinh_3sao:997052852545519686>",
        "<:Thuy_CungBinh_2sao:997052999123881985>",
        "<:Loi_ThichKhach_2sao:997053035689812049>",
        "<:Phong_TieuHan_2sao:997053017213902860>",
        "<:Hoa_NoTy_2sao:997052978685038653>",
      ]
      let tuong = [
        "<:Hoa_ChucDung:992760936530182194>",
        "<:Hoa_VoHau:992760791285645323>",
        "<:Hoa_TieuViem:992760692140691559>",
        "<:Hoa_PhanThien:992759800754602074>",
        "<:Hoa_MyNuong:992760858398691408>",
        "<:Thuy_VanQuan:993522705632591993>",
        "<:Thuy_TieuHuan:993522906510397500>",
        "<:Thuy_LyMongHoa:993522865838235768>",
        "<:Thuy_TheDan:993522779372650526>",
        "<:Thuy_PhuongKy:993522759948832818>",
        "<:Phong_LyThuanPhong:995737059018948709>",
        "<:Phong_TrinhGiaoKim:995737035308548196>",
        "<:Phong_PhiYen:995737127046369320>",
        "<:Phong_BachKhoi:995737163700375653>",
        "<:Phong_TrieuPhong:995737198919946351>",
        "<:Loi_HuyenMinh:996015474078912522>",
        "<:Loi_LoiChanTu:996015638231392256>",
        "<:Loi_KeQuang:996015516915347536>",
        "<:Loi_LoiChinh:996015575945969725>",
        "<:Loi_GiaCatLuong:996015683844440144>"
      ]

      let arraytuong = []
      for (let i = 0; i < 10; i++) {
        let lucky = Math.floor(Math.random() * 999)
        let tuongduocchon
        if (lucky >= 900) tuongduocchon = tuong[Math.floor(Math.random() * tuong.length)]
        if (lucky < 900) tuongduocchon = thuong[Math.floor(Math.random() * thuong.length)]
        arraytuong[i] = tuongduocchon
      }
      let count = {}
      arraytuong.forEach(thu => {
        if (count[thu]) {
          count[thu] += 1
          return
        }
        count[thu] = 1
      })
      for (let item in count) {
        let tuongtrongtui = await itemSchema.findOne({ id: message.author.id, name: item })
        if (!tuongtrongtui) {
          let add = new itemSchema({
            id: message.author.id,
            name: item,
            quanlity: count[item],
            type: `manhtuong`
          });
          await add.save()
        }
        else {
          tuongtrongtui.quanlity += count[item]
          await tuongtrongtui.save()
        }
      }

      let abc = new EmbedBuilder()
        .setTitle(`Đang Triệu Hồi Anh Hùng Từ Cánh Cửa Tinh Linh`)
        .setImage(gif)
      let bcd = new EmbedBuilder()

        .setDescription(arraytuong.join(' '))
      let a = await message.reply({ embeds: [abc] })
      await client.sleep(3000)
      await a.edit({ embeds: [bcd] })
    }

  })
}