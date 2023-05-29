module.exports = {
  name: "profiles",
  description: ["Xem thông tin Yulife của bạn!", "Your Yulife information"],
  aliases: ["me", "p5"],
  usage:["{prefix}me", "{prefix}me"],
  cooldown: 10000,
	category: "Yuworld",
	canuse: "everyone",
  errorcd : ["Xin hãy chờ **{time}** trước khi sử dụng lệnh tiếp tục!", "Please wait **{time}** before using this command again!"],
run: async (client, message, args) => {
    const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require("discord.js")
    const lifeSchema = require("../../models/lifeSchema")
    const _h = `<a:Yu_Health:1021741824630587392>`
    const _eq = `<a:Yu_EQ:1021741327005794394>`
    const _fit = `<a:Yu_FITNESS:1021741522397433867>`
    const _iq = `<a:Yu_IQ:1021741597488070746>`
    const _hpi = `<a:Yu_Happiness:1021741745442127874>`
    const _app = `<a:Yu_Appearance:1021741656631947316>`
    let author = message.author
    let userProfile = await lifeSchema.findOne({ authorid: author.id })
    if (args[0] == "name") {
    let name = args.slice(1).join("")
    await client.stat(message.author.id, "new", "name", name)
    let success = [
      `<a:8595checkblancoo:912284409976197131> **| ${message.author.username}, bạn đã đổi tên mới \`${name}\`!**`,
      `<a:8595checkblancoo:912284409976197131> **| ${message.author.username}, you have changed your name into : \`${name}\`!**`,
    ]
    await client.reply(client, message, success, null).catch(e => console.log(e))
    }
    else if (args[0] == "gender" || args[0] == "gioitinh") {
    let gioitinh = args[1]
    if (gioitinh == "0" || gioitinh == "female" || gioitinh == "girl") gioitinh = "Nữ"
    else gioitinh = "Nam"
    await client.stat(message.author.id, "new", "gender", gioitinh)
    let success = [
      `<a:8595checkblancoo:912284409976197131> **| ${message.author.username}, bạn đã đổi giới tính nhân vật thành : \`${gioitinh}\`!**`,
      `<a:8595checkblancoo:912284409976197131> **| ${message.author.username}, you have changed your character's gender into : \`${gioitinh}\`!**`,
    ]
    await client.reply(client, message, success, null).catch(e => console.log(e))
    }
    else {
    if (!userProfile) {
      let a = await message.reply("**Xin đợi một chút! Profile của bạn sẽ được tạo ngay**")
      let newUserProfile = new lifeSchema({
        authorid: author.id,
        stat: {
          health: 50,
          happiness: 50,
          appear: 50,
          iq: 50,
          fitness: 50,
          eq: 50,
        },
        me: {
          name: author.username,
          gender: "Nam",
          age: 0,
          birthday: new Date(Date.now()).toLocaleString("vi", {timeZone: "Asia/Ho_Chi_Minh"}),
          country: "Việt Nam",
          locate: "Việt Nam",
          sexual: "Chưa Xác Định"
        },
        bank: {
          doubt: 0,
        },
        CV: "Không có",
        crimes: "Không có",
        health: "Tốt",
        license: {
          A: false,
          B: false,
          C: false
        },
        education: {
          highschool: false,
          college: false,
          university: false,
        },
        degree: {
          kientrucsu: false,
          kinhte: false,
          giaovien: false,
          marketing: false,
          taichinh: false,
          kysu: false,
          luatsu: false,
          anninh: false,
          yte: false,
          amnhac: false,
          vantai: false,
          khoahoc: false,
          nganhang: false,
        },
      })
      await newUserProfile.save()
      client.sleep(3000)
      await a.edit({
        contents: "Đây là hồ sơ của bạn", embeds: [
          new EmbedBuilder()
            .setAuthor({ name: author.username + ` Profiles` })
            .setTitle(`Chỉ Số Cơ Bản`)
            .setDescription(`${_h} **Sức Khỏe**
${stat(50)} **50**
${_hpi} **Hạnh Phúc**
${stat(50)} **50**
${_app} **Ngoại Hình**          
${stat(50)} **50**
${_iq} **IQ**
${stat(50)} **50**
${_fit} **Thể Hình**
${stat(50)} **50**
${_eq} **Xã Giao**
${stat(50)} **50**`)
        ]
      })
    }
    else {
      let row1 = new ActionRowBuilder()
        .addComponents(
          new SelectMenuBuilder()
            .setCustomId(`${message.id}`)
            .setPlaceholder("Chọn thông tin bạn muốn xem")
            .addOptions([
              {
                label: 'Stats',
                description: 'Các chỉ số cơ bản của bạn',
                value: 'stat',
                emoji: '968579051180662794'
              },
              {
                label: 'Profile',
                description: 'Thông tin cá nhân của bạn',
                value: 'profile',
                emoji: '935592769039265832'
              },
              {
                label: 'Bank',
                description: 'Số nợ trong ngân hàng',
                value: 'bank',
                emoji: '968560440068157550'
              },
              {
                label: 'CV',
                description: 'Hồ sơ làm việc của bạn',
                value: 'cv',
                emoji: '912047017444913202'
              },
              {
                label: 'Tiền Án',
                description: 'Lịch sử tiền án của bạn',
                value: 'crimes',
                emoji: '968579051180662794'
              },
              {
                label: 'Bệnh Án',
                description: 'Lịch sử bệnh án của bạn',
                value: 'health',
                emoji: '933653485759660032'
              },
              {
                label: 'Chứng Chỉ',
                description: 'Bằng lái của bạn',
                value: 'license',
                emoji: '📜'
              },
              {
                label: 'Trình Độ',
                description: 'Trình Độ Giáo Dục của bạn',
                value: 'education',
                emoji: '🎓'
              },
              {
                label: 'Bằng Cấp',
                description: 'Bằng Cấp của bạn',
                value: 'degree',
                emoji: '📕'
              },
            ]))
      let messageOne = await message.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({ name: author.username + ` Profiles` })
            .setTitle(`Chỉ Số Cơ Bản`)
            .setDescription(`${_h} **Sức Khỏe**
${stat(userProfile.stat.health) + userProfile.stat.health}
${_hpi} **Hạnh Phúc**
${stat(userProfile.stat.happiness) + userProfile.stat.happiness}
${_app} **Ngoại Hình**
${stat(userProfile.stat.appear) + userProfile.stat.appear}
${_iq} **IQ**
${stat(userProfile.stat.iq) + userProfile.stat.iq}
${_fit} **Thể Hình**
${stat(userProfile.stat.fitness) + userProfile.stat.fitness}
${_eq} **Xã Giao**
${stat(userProfile.stat.eq) + userProfile.stat.eq}
            `)
        ],
        components: [
          row1
        ]
      })
      
      client.on('interactionCreate', async i => {
        if (!i.isSelectMenu() && i.customId !== `${messageOne.id}`) return;
        if(i.message.id !== messageOne.id) return 
        if(i.user.id !== message.author.id) return i.reply({
          content: `Đây không phải tương tác dành cho bạn!`, ephemeral: true
        })
        let options = i.values;
        const choose = options[0]
        if (choose === 'stat') {
          await i.deferUpdate()
          await messageOne.edit({
            embeds: [
              new EmbedBuilder()
                .setAuthor({ name: author.username + ` Profiles` })
                .setTitle(`Chỉ Số Cơ Bản`)
                .setDescription(`${_h} **Sức Khỏe**
${stat(userProfile.stat.health) + userProfile.stat.health}
${_hpi} **Hạnh Phúc**
${stat(userProfile.stat.happiness) + userProfile.stat.happiness}
${_app} **Ngoại Hình**
${stat(userProfile.stat.appear) + userProfile.stat.appear}
${_iq} **IQ**
${stat(userProfile.stat.iq) + userProfile.stat.iq}
${_fit} **Thể Hình**
${stat(userProfile.stat.fitness) + userProfile.stat.fitness}
${_eq} **Xã Giao**
${stat(userProfile.stat.eq) + userProfile.stat.eq}`)
                .setFooter({ text: "Các chỉ số phải luôn cao thì cuộc sống mới thuận lợi", iconURL: message.guild.iconURL() })
            ],
            components: [row1]
          })
        }
        else if (choose === 'profile') {
          await i.deferUpdate()
          await messageOne.edit({
            embeds: [
              new EmbedBuilder()
                .setAuthor({ name: author.username + ` Profiles` })
                .setTitle(`Thông tin cá nhân.`)
                .setDescription(`**Tên**: ${userProfile.me.name},
**Giới Tính**: ${userProfile.me.gender},
**Tuổi**: ${userProfile.me.age},
**Ngày Sinh**: ${userProfile.me.birthday},
**Quốc Tịch**: ${userProfile.me.country},
**Nơi Ở**: ${userProfile.me.locate},
                `)
                .setFooter({ text: "Giới tính có thể thay đổi bằng các Thẻ Giới Tính", iconURL: message.guild.iconURL() })
            ],
            components: [row1],
          })
        }
        else if (choose === 'bank') {
          await i.deferUpdate()
          await messageOne.edit({
            embeds: [
              new EmbedBuilder()
                .setAuthor({ name: "Nợ nần của " + author.username })
                .setTitle(`Nợ ngân hàng của bạn.`)
                .setDescription(`
                ${userProfile.bank.doubt == 0 ? `Bạn không có nợ` : `Bạn đang vay ngân hàng ${parseInt(userProfile.bank.doubt).toLocaleString("en-us")}`}
                `)
                .setFooter({ text: "Tối đa bạn có thể nợ ngân hàng = Lương x 20 lần.", iconURL: message.guild.iconURL() })
            ],
            components: [row1],
          })
        }
        else if (choose === 'cv') {
          await i.deferUpdate()
          await messageOne.edit({
            embeds: [
              new EmbedBuilder()
                .setAuthor({ name: 'Hồ sơ làm việc của ' + author.username })
                .setTitle(`Lịch sử làm việc của bạn.`)
                .setDescription(`${userProfile.CV}
                `)
                .setFooter({ text: "Các công việc của bạn sẽ được ghi chú ở đây", iconURL: message.guild.iconURL() })
            ],
            components: [row1],
          })
        }
        else if (choose === 'crimes') {
          await i.deferUpdate()
          await messageOne.edit({
            embeds: [
              new EmbedBuilder()
                .setAuthor({ name: "Tiền án tiền sự của " + author.username })
                .setTitle(`Lịch sử phạm tội của bạn.`)
                .setDescription(`${userProfile.crimes}
`)
                .setFooter({ text: "Có vài công việc yêu cầu tiền án của bạn phải sạch sẽ", iconURL: message.guild.iconURL() })
            ],
            components: [row1],
          })
        }
        else if (choose === 'health') {
          await i.deferUpdate()
          await messageOne.edit({
            embeds: [
              new EmbedBuilder()
                .setAuthor({ name: 'Hồ sơ bệnh án của ' + author.username })
                .setTitle(`Sức khỏe của bạn`)
                .setDescription(`${userProfile.health}
                `)
                .setFooter({ text: "Khám bệnh thường xuyên để chắc chắn bản thân không mắc bệnh.", iconURL: message.guild.iconURL() })
            ],
            components: [row1],
          })
        }
        else if (choose === 'license') {
          await i.deferUpdate()
          await messageOne.edit({
            embeds: [
              new EmbedBuilder()
                .setAuthor({ name: 'Chứng chỉ của ' + author.username })
                .setTitle(`Các bằng lái mà bạn sở hữu.`)
                .setDescription(`${userProfile.license.A ? `Bằng Phi Công : Đã Đạt` : `Bằng Phi Công: Chưa Có`}
                ${userProfile.license.B ? `Bằng Thủy Thủ : Đã Đạt` : `Bằng Thủy Thủ: Chưa Có`}
                ${userProfile.license.C ? `Bằng Lái Xe : Đã Đạt` : `Bằng Lái Xe: Chưa Có`}
                `)
                .setFooter({ text: "Các bằng lái của bạn sẽ được ghi chú ở đây", iconURL: message.guild.iconURL() })
            ],
            components: [row1],
          })
        }
        else if (choose === 'education') {
          await i.deferUpdate()
          await messageOne.edit({
            embeds: [
              new EmbedBuilder()
                .setAuthor({ name: 'Học vấn của ' + author.username })
                .setTitle(`Các trường bạn đã tốt nghiệp.`)
                .setDescription(`${userProfile.education.highschool ? 'Tốt Nghiệp Phổ Thông' : 'Chưa Học Phổ Thông'}
${userProfile.education.college ? 'Tốt Nghiệp Cao Đẳng' : 'Chưa Học Cao Đẳng'}
${userProfile.education.highschool ? 'Tốt Nghiệp Đại Học' : 'Chưa Học Đại Học'}
                `)
                .setFooter({ text: "Trình độ học vấn của bạn sẽ được ghi chú ở đây", iconURL: message.guild.iconURL() })
            ],
            components: [row1],
          })
        }
        else if (choose === 'degree') {
          await i.deferUpdate()
          await messageOne.edit({
            embeds: [
              new EmbedBuilder()
                .setAuthor({ name: 'Bằng cấp của ' + author.username })
                .setTitle(`Lịch sử làm việc của bạn.`)
                .setDescription(`${userProfile.degree.kientrucsu ? "Cử Nhân Kiến Trúc" : ""}
${userProfile.degree.kinhte ? "Cử Nhân Kinh Tế Học" : ""}
${userProfile.degree.giaovien ? "Cử Nhân Sư Phạm" : ""}
${userProfile.degree.marketing ? "Cử Nhân Marketing" : ""}
${userProfile.degree.taichinh ? "Cử Nhân Tài Chính" : ""}
${userProfile.degree.kysu ? "Kỹ Sư" : ""}
${userProfile.degree.luatsu ? "Luật Sư" : ""}
${userProfile.degree.anninh ? "Cử Nhân An Ninh" : ""}
${userProfile.degree.yte ? "Cử Nhân Y Học" : ""}
${userProfile.degree.amnhac ? "Cử Nhân Nhạc Viện" : ""}
${userProfile.degree.vantai ? "Kỹ Sư Vận Tải" : ""}
${userProfile.degree.khoahoc ? "Tiến Sỹ" : ""}
${userProfile.degree.nganhang ? "Cử Nhân Ngân Hàng" : ""}`)
                .setFooter({ text: "Các bằng cấp của bạn sẽ được ghi chú ở đây", iconURL: message.guild.iconURL() })
            ],
            components: [row1],
          })
        }
      })

    }
    }
  }
}
function stat(number) {
  let string = ""
  if (!number) string = "<:bar0:1018442176105033789><:bar0:1018442176105033789><:bar0:1018442176105033789><:bar0:1018442176105033789><:bar0:1018442176105033789><:bar0:1018442176105033789><:bar0:1018442176105033789><:bar0:1018442176105033789><:bar0:1018442176105033789><:bar0:1018442176105033789>  "
  let realNum = Math.trunc(number / 10)
  for (let i = 0; i < 10; i++) {
    if (realNum > 0) string += "<:bar1:1018449201731993681>"
    else if (realNum <= 0) string += "<:bar0:1018442176105033789>"
    realNum -= 1
  }
  return string
						 }