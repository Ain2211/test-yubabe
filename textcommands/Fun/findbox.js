const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
   
module.exports = {
  name: "findbox",
  description: ["", ""],
  aliases: ["fb", "timhop"],
  usage:["{prefix} <> <> <>", "{prefix}add <> <> <>"],
  cooldown: 15000,
	category: "Fun",
  canuse: "everyone",
  errorcd : ["Thử lại sau {time}", "{Try again after {time}"],
  run: async (client, message, args) => {
    // Lấy thông tin ngôn ngữ
		const { QuickDB } = require("quick.db")
    const db = new QuickDB({table: "DB"})
    const lang = await db.get(`${message.guild.id}_languages`)
    let Boxes = [
      "<:so0:1037675460127113226>",
"<:so1:1037675506398658620>",
"<:so2:1037675570990952458>",
"<:so3:1037675602972508241>",
"<:so4:1037675631409897512>",
"<:so5:1037676087951507516>",
"<:so6:1037675670333046874>",
"<:so7:1037675704210427904>", 
"<:so8:1037675894359195658>",
"<:so9:1037675919629885442>"
    ]
    let cash = await client.cash(message.author.id)
    if (cash < 10000) return message
      .reply(`${lang == "vi" 
                ? `${client.e.fail} | Bạn không còn gì để đặt! Cần ít nhất 10.000 Ycoin để chơi!` 
                : `${client.e.fail} | You have no money to bet! You need at least 10.000 Ycoin to play!`}`)
    let bet = 10000
    if (!args[0]) bet = 10000
    else if (args[0] == "all" && cash >= 150000) bet = 150000
    else if (args[0] == "all" && cash < 150000) bet = cash
    else if (bet > 150000 && cash >= 150000 && bet < cash) bet = 150000
    else if (bet > cash) return message
      .reply(`${lang == "vi"
              ? `${client.e.fail} | Bạn không đủ tiền để đặt`
              : `${client.e.fail} | You don't have enough money to bet!`}`)
    else if (bet < cash && bet <= 150000 && bet >= 10000) bet = parseInt(args[0])
    else bet = 10000
    let Prizes = [
      bet,
      bet * 2,
      bet * 3,
      bet * 4,
      bet
    ]
    let startembed = new EmbedBuilder()
      .setAuthor({name: message.author.username, icon_url: message.author.displayAvatarURL()})
      .setDescription(`Mỗi chiếc hộp bên dưới có một giá trị bí ẩn!
Bạn hãy chọn chiếc hộp có giá trị cao nhất để sở hữu số tiền lời mình mong muốn nhé!    
`)
      
  let buttonrow1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(Boxes[0])
        .setCustomId('0'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(Boxes[1])
        .setCustomId('1'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(Boxes[2])
        .setCustomId('2'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(Boxes[3])
        .setCustomId('3'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(Boxes[4])
        .setCustomId('4')
    );
    let buttonrow2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(Boxes[5])
        .setCustomId('5'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(Boxes[6])
        .setCustomId('6'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(Boxes[7])
        .setCustomId('7'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(Boxes[8])
        .setCustomId('8'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(Boxes[9])
        .setCustomId('9')
    );
      let reply = await message.reply({ embeds: [startembed], components: [buttonrow1, buttonrow2] })
  var collector = reply.createMessageComponentCollector({
    filter: interaction => (interaction.isButton() 
                            && interaction.message.id == reply.id
                            && interaction.user.id == message.author.id
      && interaction.message.author.id == client.user.id)
  })
  collector.on("collect", async (interaction) =>{
    if (interaction.user.id !== message.author.id) {
      if (lang == "vi") {
        return interaction
          .reply({ content: `:x: | **${interaction.user.username}** , không phải nút dành cho bạn!`, ephemeral: true })
          .catch(e => console.log(e))
      } else if (lang == "en") {
        return interaction
          .reply({ content: `:x: | **${interaction.user.username}** , this interaction isn't for you!`, ephemeral: true })
          .catch(e => console.log(e))
      }
    }
    await interaction.deferUpdate()
      await reply.delete()
      let win = false
      let msg
      let rand = Math.floor(Math.random() * 99)
      if (rand <= 29) win = true
      if (win) prize = Prizes[Math.floor(Math.random()*Prizes.length)]
      if (win) await client.cong(message.author.id, prize - bet)
      else await client.tru(message.author.id, bet)
        let msh = await message.reply(`Bạn đã chọn chiếc hộp số ${interaction.customId}
        Kết quả là..... <a:yl_loading:1109041890667544678>`)
    await client.sleep(2000)
    let msh1 = await msh.edit("Và đó là...") 
    await client.sleep(1000)
    let msh2 = await msh1.edit("Và đó là ..")
    await client.sleep(1000)
    await msh2.edit(`${ win
? `🔥 | Chúc mừng bạn đã chọn trúng chiếc hộp có số tiền x${prize/bet} lần! 
      Bạn đã ăn được **__${parseInt(prize).toLocaleString("en-us")} Ycoin__**`
: `😭 | Rất tiếc, bạn đã chọn phải chiếc hộp rỗng, bạn đã mất **__${parseInt(bet).toLocaleString("en-us")} Ycoin__**` 
                           }`)   
  })
	}
             }
