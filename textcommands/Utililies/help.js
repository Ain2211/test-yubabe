const {
  EmbedBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  ButtonStyle,
  ButtonBuilder
} = require("discord.js");
module.exports = {
  name: "help",
  description: ["Trả về hướng dẫn sử dụng bot", "Returns all Commmands, or one specific command"],
  aliases: ["h", "commandinfo", "commands", "cuutuivoi"],
  usage: ["{prefix}help <command>", "{prefix}help <command>"],
  cooldown: 5000,
  category: "Utils",
  canuse: "everyone",
  errorcd: ["{time}", "{time}"],
  run: async (client, message, args, guildData, player, prefix) => {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({ table: "DB" })
    const lang = await db.get(`${message.guild.id}_languages`)
    if (lang == "vi") {
      if (args[0]) {
        let embed = new EmbedBuilder()
          .setColor('#ffcc00')
        if (args[0].length === 0) return;
        let command =
          client.tcommands.get(args[0]) ||
          client.tcommands.find((command) => command.aliases && command.aliases.includes(args[0]));
        if (!command || command.category == "Admins" || command.canuse !== 'everyone') return message.channel.send(`:x: | Không tìm thấy commands này!`);
        if (command.name) embed.addFields({ name: `**Command name**`, value: `\`${command.name}\`` });
        if (command.name) embed.setTitle(`Thông tin chi tiết | \`${command.name}\``);
        if (command.category) embed.addFields({ name: "**Category**", value: `\`${command.category}\`` });
        if (command.description) embed.addFields({ name: "**Giới thiệu**", value: `\`${command.description[0]}\`` });
        if (command.aliases) try {
          embed.addFields({ name: "**Aliases**", value: command.aliases.length > 0 ? command.aliases.map(a => "`" + a + "`").join("\n") : "Không Aliases" })
        } catch { }
        if (command.usage) {
          embed.addFields({ name: "**Cách dùng**", value: `\`${command.usage[0]}\`` });
          embed.setFooter({ text: "Syntax: <> = bắt buộc, [] = tùy chọn" });
        }
        if (command.cooldown !== 0) embed.addFields({ name: `**Cooldown**`, value: `\`${ms(command.cooldown)}\`` });
        return message.channel.send({ embeds: [embed] }).catch(e => console.log(e));
      }
      let helpmenu = new EmbedBuilder()
        .setTitle(`YUBABE COMMAND HELP`)
        .setDescription(`
**Xin chào ${message.author}, tôi là ${client.user}**.
**Bot Fun Economy Được Phát Triển Bởi Yuland Team**      
** <:vngc_discord:917212352410177536> Các lệnh help liên quan**

**<:G_bachtuoc:974392970931470347> \`:\` Animals**
**<a:load02:902835678361047070> \`:\` Config**
**<a:Yu_cassh:942212732642537502> \`:\` Economy**
**<:Ymoon:922599051269111909> \`:\` Fun**
**<:box:974069616093560852> \`:\` Inventory**
**<:Yu_shopping:953322964764487690> \`:\` Shop**
**<:Yu_nhanvangkc:951586992897024060> \`:\` Marry**
**<a:Yu_flowerne:1021474673994780752> \`:\` Actions**

[Invite](${`https://discord.com/api/oauth2/authorize?client_id=936872532932440065&permissions=431174843457&scope=bot`}) ● [Support Server](${`http://discord.gg/yuland`}) 
 `)

        .setFooter({ text: `Prefix của bot là Y`, iconURL: `https://media.discordapp.net/attachments/978011752610557972/983694683760902204/910622798584643646.gif` })
        .setColor(`#303037`)

      const row = new ActionRowBuilder()
        .addComponents(
          new SelectMenuBuilder()
            .setCustomId(`${message.id}`)
            .setPlaceholder('❯ Yubabe Help Menu!')
            .addOptions([
              {
                label: 'Animals',
                description: 'Các lệnh hunt thú và xem zoo',
                value: 'first',
                emoji: '<:G_bachtuoc:974392970931470347>'
              },
              {
                label: 'Config',
                description: 'Kích hoạt hoặc vô hiệu lệnh trong kênh...',
                value: 'second',
                emoji: '<a:load02:902835678361047070>'
              },
              {
                label: 'Economy',
                description: 'Các lệnh liên quan đến Ycoin!',
                value: 'third',
                emoji: "<a:Yu_cassh:942212732642537502>"
              },
              {
                label: 'Fun',
                description: 'Các lệnh Fun, black jack v.v',
                value: 'fifth',
                emoji: "<:Ymoon:922599051269111909>"
              },
              {
                label: 'Inventory',
                description: 'Các lệnh xem túi đồ!',
                value: 'sixth',
                emoji: "<:box:974069616093560852> "
              },
              {
                label: 'Shop',
                description: 'Lệnh Shop!',
                value: 'seventh',
                emoji: "<:Yu_shopping:953322964764487690>"
              },
              {
                label: 'Marry',
                description: 'Lệnh Marry !',
                value: 'eighth',
                emoji: "<:Yu_nhanvangkc:951586992897024060>"
              },
              {
                label: 'Actions',
                description: 'Các lệnh hành động !',
                value: 'night',
                emoji: '<a:Yu_flowerne:1021474673994780752>'
              }
            ])
        )
      await message.channel.send({ embeds: [helpmenu], components: [row] }).catch(e => console.log(e))
      client.on('interactionCreate', async interaction => {
        console.log(`HELPMENUID : ${interaction.customId}`)
        if (!interaction.isSelectMenu() || interaction.customId !== message.id || interaction.user.id !== message.author.id) return;
        let options = interaction.values;
        const funny = options[0]
        if (funny === 'first') {
          const embed1 = new EmbedBuilder().setThumbnail(`https://media.discordapp.net/attachments/942015852310577162/983698397452193872/59b3e7c9da97700f3e629fe73714f1b2.webp`)
            .setDescription(`🐱 **Animals** - (5)\n\`hunt\`, \`zoo\`, \`fish\`, \`tank\`, \`kill\`\n\n● [Support Server](${`https://discord.gg/yuland`})\n● Giết Thú : \`Ykill [C,U,R,SR,E,P,G]\` | \`Ykill all\`\n● Bán Ring : \`Ysell <ID Nhẫn>\`\n● Bán Tinh Hoa : \`Ysell <f | l | p | plant | life | food> <số lượng | all>\``)
            .addFields({ name: `Cách Dùng : Yhunt`, value: `Săn thú, rút gọn : \`h\`` })
            .addFields({ name: `Cách dùng : Yzoo`, value: `Xem zoo, rút gọn : \`z\`` })
            .addFields({ name: `Cách dùng : Yfish`, value: `Câu cá, rút gọn : \`cc, c, fs\`` })
            .addFields({ name: `Cách dùng : Ytank`, value: `Xem hồ cá, rút gọn : \`t, hoca\`` })
            .setColor("#303037")
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed1], ephemeral: true })
          return
        }
        else if (funny === 'second') {
          const embed2 = new EmbedBuilder()
            .setThumbnail(`https://media.discordapp.net/attachments/942015852310577162/983698397452193872/59b3e7c9da97700f3e629fe73714f1b2.webp`)
            .setDescription(`📛 **Config** - (4) \`enable\`, \`disable\`, \`prefix\`, \`languages\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields(
              { name: `Usage : \`Ydisable + command\``, value: `Disable commands, lệnh khác : \`ds, dc\`` },
              { name: `Usage : \`Yenable + command\``, value: `Enable commands, lệnh khác : \`en, ec\`` },
              { name: `Usage : \`Yprefix + prefix\``, value: `Thay đổi prefix, Y luôn có thể sử dụng vì là thương hiệu bot! lệnh khác : \`Không có\`` },
              { name: `Usage : \`Ylanguages + set + en|vi\``, value: `Thay đổi ngôn ngữ, lệnh khác : \`lang\`` },
            )
            .setColor('#303037')
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed2], ephemeral: true })
          return
        }
        else if (funny === 'fourth') {
          const embed3 = new EmbedBuilder()
            .setThumbnail(`https://media.discordapp.net/attachments/942015852310577162/983698397452193872/59b3e7c9da97700f3e629fe73714f1b2.webp`)
            .setDescription(`🌾 **Farm** - (7)\n\`ruong\`, \hatgiong\`, \`trongcay\`, \`thuhoach\`,\`nuoi\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: `● Nếu là người chơi mới, bạn gõ \`Yruong\` để nhận field`, value: `● Sau đó mua hạt giống theo ID và trồng cây bằng lệnh \`Ytc lua\`.\nBạn có thể xem ID bằng lệnh Yruong, id có thể là tên trái cây!` })
            .addFields({ name: `Cách Dùng : \`Yruong\``, value: `Xem các cây trồng hoặc thú nuôi bạn đang nuôi-trồng, rút gọn : \`field, r\`` })
            .addFields({ name: `Cách Dùng : \`Yhatgiong\``, value: `Xem các nông sản bạn nuôi-trồng để bán, hiện tại bot đang bảo trì tính năng sell hạt giống, rút gọn : \`crop, hg\`` })

            .addFields({ name: `Cách Dùng : \`Ytrongcay + id || Ythuhoach + id || Ynuoi + ga/bo/heo\``, value: `Trồng cây, thu hoạch và cho thú ăn, bạn có thể mua cám heo, cỏ và thóc bằng lệnh Ybuy + co/thoc/camheo + soluong, rút gọn : \`Ytc, Yth, Yn\`` })
            .setColor('#303037')
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed3], ephemeral: true })
          return

        }
        else if (funny === 'fifth') {

          const embed4 = new EmbedBuilder()
            .setThumbnail(`https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif`)
            .setDescription(`🎮 **Fun** - (5)\n\`slot\`, \`cophieu\`, \`coinflip\`, \`cothay\`, \`pray\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: "● Cách dùng : `Yslot + <tiền đặt> | Ycp + <tiền đặt> | Ycf + <tiền đặt> <n/u> | Ypray | Ycothay + <câu hỏi>`", value: `Chơi cổ phiếu, coinflip, slot, pray và đặt câu hỏi!` })
            .setColor('#303037')
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed4], ephemeral: true })
          return

        }
        else if (funny === 'third') {

          const embed5 = new EmbedBuilder()
            .setThumbnail(`https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif `)
            .setDescription(`💴 **Economy** - (7)\n\`cash\`, \`bank\`, \`guitietkiem\`, \`ruttien\`, \`daily\`, \`give\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: "● Cách dùng : `Ycash | Ydaily`", value: `Xem tiền bạn đang có và nhận tiền daily, rút gọn : \`Ybal, Ycash, Ymoney, Ycoin\`` })
            .addFields({ name: "● Cách dùng : `Ybank`", value: `Xem tiền bạn đang có trong ngân hàng, hãy check DMS, bot sẽ inb riêng cho bạn!` })
            .addFields({ name: "● Cách dùng : `Ytietkiem + tiền | Yruttien + tiền`", value: `Gửi tiết kiệm hoặc rút tiền từ bank! Rút gọn : \`tk, gtk, rt, rut\`, hãy check DMS, bot sẽ inb riêng cho bạn!` })
            .addFields({ name: "● Cách dùng : `Ygive + <user> + <số tiền>`, lệnh khác : `ct, tf`", value: `Give tiền cho người khác.` })

            .setColor('#303037')
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed5], ephemeral: true })
          return

        }
        else if (funny === 'sixth') {
          const embed6 = new EmbedBuilder()
            .setThumbnail(`https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif `)
            .setDescription(`📦 **Inventory** - (3)\n\`inventory\`, \`use\`, \`sell\`,\`buy\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: "● Cách dùng : `Yinventory`", value: `Xem kho vật phẩm bạn đang có (ngọc, cần câu, nhà, nhẫn), lệnh khác \`inv, kho\`` })
            .addFields({ name: "● Cách dùng : `Yuse + id`", value: `Dùng ngọc, xem ID ngọc trong Inventory` })
            .addFields({ name: "● Cách dùng : `Ysell`", value: `Hiện tại bạn có thể bán thú, nhẫn : \`Ysell <thu | nhan> <all | icon thú | loại thú>\` , lệnh khác : s, thu, nhan có thể thay bằng : animal, a, t và n, r, ring` })
            .setColor('#303037')
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed6], ephemeral: true })
          return
        }
        else if (funny === 'seventh') {
          const embed6 = new EmbedBuilder()
            .setThumbnail(`https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif `)
            .setDescription(`💰 Shop - (2)\n\`buy\`,\`shop\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: "● Cách dùng : `Ybuy + ID`", value: `Bạn có thể mua nhẫn với các ID : 001,002,003,004,005, các loại cần câu : cc1,cc2,cc3, các loại thức ăn thú nuôi : co, thoc, camheo` })
            .addFields({ name: "● Cách dùng : `Yshop`", value: `Truy cập vào danh sách các item trong tiệm tạp hóa YUBABE để mua!` })
            .addFields({ name: "● Cách dùng : `Ybuy + <ID> + [số lượng]`", value: `Mua các item trong tiệm tạp hóa YUBABE!` })
            .setColor('#303037')
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed6], ephemeral: true })
          return
        }
        else if (funny === 'eighth') {
          const embed6 = new EmbedBuilder()
            .setThumbnail(`https://cdn.discordapp.com/emojis/951586992897024060.png`)
            .setDescription(`💟 Marry - (5)\n\`anhcuoi\`,\`lyhon\`,\`marry\`,\`promise\`,\`together\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: "● Cách dùng : `Yanhcuoi + link`", value: `Thay đổi ảnh nền cho embed marry` })
            .addFields({ name: "● Cách dùng : `Ymarry + tag + ID nhẫn`", value: `Cưới một người, bạn có thể gõ Ymarry sau khi kết hôn để xem Bằng Chứng Đính Hôn của mình!` })
            .addFields({ name: "● Cách dùng : `Ylyhon`", value: `Ý nghĩa như tên...` })
            .addFields({ name: "● Cách dùng : `Yloihua + lời hứa`", value: `Set lời hứa trên EMBED` })
            .addFields({ name: "● Cách dùng : `Yloveyou`", value: `Cày điểm thân mật` })
            .setColor('#303037')
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed6], ephemeral: true })
          return
        }
        else if (funny === 'night') {
          const embed7 = new EmbedBuilder()
            .setThumbnail(`https://cdn.discordapp.com/emojis/951586992897024060.png`)
            .setDescription(`🤸‍♀️ Actions - (10)\n\`cry\`,\`cuddle\`,\`hug\`,\`kiss\`,\`lick\`,\`neko\`,\`ponk\`,\`punch\`,\`slap\`,\`waifu\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: "● Cách dùng : `Yhug @tag`", value: `Bày tỏ cảm xúc bằng hình ảnh động.` })
            .setColor('#303037')
            .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed7], ephemeral: true })
          return
        }
        else return
      })
    }
    else if (lang == "en") {
      if (args[0]) {
        let embed = new EmbedBuilder()
          .setColor('#ffcc00')
        if (args[0].length === 0) return;
        let command =
          client.tcommands.get(args[0]) ||
          client.tcommands.find((command) => command.aliases && command.aliases.includes(args[0]));
        if (!command || command.category == "Admins" || command.canuse !== 'everyone') return message.channel.send(`:x: | Can't find this command!`);
        if (command.name) embed.addFields({ name: `**Command name**`, value: `\`${command.name}\`` });
        if (command.name) embed.setTitle(`Information | \`${command.name}\``)
        if (command.category) embed.addFields({ name: "**Category**", value: `\`${command.category}\`` });
        if (command.description) embed.addFields({ name: "**Description**", value: `\`${command.description[1]}\`` });
        if (command.aliases) try {
          embed.addFields({ name: "**Aliases**", value: command.aliases.length > 0 ? command.aliases.map(a => "`" + a + "`").join("\n") : "No Aliases" })
        } catch { }
        if (command.usage) {
          embed.addFields({ name: "**Usage**", value: `\`${command.usage[1]}\`` });
          embed.setFooter({ text: "Syntax: <> = force, [] = option" });
        }
        return message.channel.send({ embeds: [embed] }).catch(e => console.log(e));
      }
      let helpmenu = new EmbedBuilder()
        .setTitle(`YUBABE COMMAND HELP`)
        .setDescription(`
**Hello ${message.author}, I'm ${client.user}**.
**An YwY team developed Bot - With advance Economy System**      
** <:vngc_discord:917212352410177536> Related Help Menus**

**<:G_bachtuoc:974392970931470347> \`:\` Animals**
**<a:load02:902835678361047070> \`:\` Config**
**<a:Yu_cassh:942212732642537502> \`:\` Economy**
**<:Yu_field:953050619558645820> \`:\` Farm**
**<:Ymoon:922599051269111909> \`:\` Fun**
**<:box:974069616093560852> \`:\` Inventory**
**<:Yu_shopping:953322964764487690> \`:\` Shop**
**<:Yu_nhanvangkc:951586992897024060> \`:\` Marry**
**<a:Yu_flowerne:1021474673994780752> \`:\` Actions**


[Invite](${`https://discord.com/api/oauth2/authorize?client_id=936872532932440065&permissions=431174843457&scope=bot`}) ● [Support Server](${`http://discord.gg/yuland`}) 
 `)

        .setFooter({ text: `My default prefix is Y`, iconURL: `https://media.discordapp.net/attachments/978011752610557972/983694683760902204/910622798584643646.gif` })
        .setColor(`#303037`)

      const row = new ActionRowBuilder()
        .addComponents(
          new SelectMenuBuilder()
            .setCustomId(`${message.id}`)
            .setPlaceholder('❯ Yubabe Help Menu!')
            .addOptions([
              {
                label: 'Animals',
                description: 'Hunt animals and check zoo',
                value: 'first',
                emoji: '<:G_bachtuoc:974392970931470347>'
              },
              {
                label: 'Config',
                description: 'Set commands and bot configurations...',
                value: 'second',
                emoji: '<a:load02:902835678361047070>'
              },
              {
                label: 'Economy',
                description: 'Economy system and your Balance!',
                value: 'third',
                emoji: "<a:Yu_cassh:942212732642537502>"
              },
              {
                label: 'Farm',
                description: 'Farming commands.',
                value: 'fourth',
                emoji: "<:Yu_field:953050619558645820>"
              },
              {
                label: 'Fun',
                description: 'Relax with these commands',
                value: 'fifth',
                emoji: "<:Ymoon:922599051269111909>"
              },
              {
                label: 'Inventory',
                description: 'Check your estates!',
                value: 'sixth',
                emoji: "<:box:974069616093560852> "
              },
              {
                label: 'Shop',
                description: 'View shops!',
                value: 'seventh',
                emoji: "<:Yu_shopping:953322964764487690>"
              },
              {
                label: 'Marry',
                description: 'Marriage!',
                value: 'eighth',
                emoji: "<:Yu_nhanvangkc:951586992897024060>"
              },
              {
                label: 'Actions',
                description: 'Acions !',
                value: 'night',
                emoji: '<a:Yu_flowerne:1021474673994780752>'
              }
            ])
        )
      await message.channel.send({ embeds: [helpmenu], components: [row] }).catch(e => console.log(e))
      client.on('interactionCreate', async interaction => {

        console.log(`HELPMENUID : ${interaction.user.id + `ID ` + message.author.id}`)
        if (!interaction.isSelectMenu() || interaction.customId !== message.id || interaction.user.id !== message.author.id) return;
        let options = interaction.values;
        const funny = options[0]
        if (funny === 'first') {
          const embed1 = new EmbedBuilder().setThumbnail(`https://media.discordapp.net/attachments/942015852310577162/983698397452193872/59b3e7c9da97700f3e629fe73714f1b2.webp`)
            .setDescription(`🐱 **Animals** - (5)\n\`hunt\`, \`zoo\`, \`fish\`, \`tank\`, \`kill\`\n\n● [Support Server](${`https://discord.gg/yuland`})\n● Kill Animals : \`Ykill [C,U,R,SR,E,P,G]\` | \`Ykill all\`\n● Sell Ring : \`Ysell <Ring ID>\`\n● Sell Elite : \`Ysell <f | l | p | plant | life | food> <amount | all>\``)
            .addFields({ name: `Usage : Yhunt`, value: `Hunt animas, aliases : \`h\`` })
            .addFields({ name: `Usage : Yzoo`, value: `Check zoo, aliases : \`z\`` })
            .addFields({ name: `Usage : Yfish`, value: `Fishing, aliases : \`cc, c, fs\`` })
            .addFields({ name: `Usage : Ytank`, value: `Check tank, aliases : \`t, hoca\`` })
            .setColor("#303037")
            .setFooter({ text: "Thank for choosing Yubabe!", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed1], ephemeral: true })
          return
        }
        else if (funny === 'second') {
          const embed2 = new EmbedBuilder()
            .setThumbnail(`https://media.discordapp.net/attachments/942015852310577162/983698397452193872/59b3e7c9da97700f3e629fe73714f1b2.webp`)
            .setDescription(`📛 **Config** - (4) \`enable\`, \`disable\`, \`prefix\`, \`languages\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields(
              { name: `Usage : \`Ydisable + command\``, value: `Disable channel's commands, aliases : \`ds, dc\`` },
              { name: `Usage : \`Yenable + command\``, value: `Enable channel's commands, aliases : \`en, ec\`` },
              { name: `Usage : \`Yprefix + prefix\``, value: `Change prefixes, Y always available due to bot's name! aliases : \`No aliases\`` },
              { name: `Usage : \`Ylanguages + set + en|vi\``, value: `Change languages, aliases : \`lang\`` },
            )
            .setColor('#303037')
            .setFooter({ text: "Thank for choosing Yubabe!", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed2], ephemeral: true })
          return
        }
        else if (funny === 'fourth') {
          const embed3 = new EmbedBuilder()
            .setThumbnail(`https://media.discordapp.net/attachments/942015852310577162/983698397452193872/59b3e7c9da97700f3e629fe73714f1b2.webp`)
            .setDescription(`🌾 **Farm** - (6)\n\`field\`, \crop\`, \`plant\`, \`feed\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: `● If you're new here, type \`Yfield\` to see which plant or cattle is available`, value: `● After that buy crops and plant it with : \`Yp wheat\`.\nID maybe name or number!` })
            .addFields({ name: `Usage : \`Yfield\``, value: `Check for fields and farms, aliases : \`field, f\`` })
            .addFields({ name: `Usage : \`Ycrop\``, value: `Check your farm products` })
            .addFields({ name: `Usage : \`Yplant + id || Yfeed + chicken/cow/pig\``, value: `Planting, growing crops and cattle, you can buy Paddy, Grass, Pran by typing : Ybuy + grass/paddy/pran + amount, aliases : \`Yp, Yfeed\`` })
            .setColor('#303037')
            .setFooter({ text: "Thank for choosing Yubabe!", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed3], ephemeral: true })
          return

        }
        else if (funny === 'fifth') {

          const embed4 = new EmbedBuilder()
            .setThumbnail(`https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif`)
            .setDescription(`🎮 **Fun** - (5)\n\`slot\`, \`stock\`, \`coinflip\`, \`cothay\`, \`pray\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: "● Usage : `Yslot + <bet> | Ycp + <bet> | Ycf + <bet> <n/u> | Ypray | Y8ball + <question>`", value: `Buy Stockings, coinflip, slot, pray and 8ball!` })
            .setColor('#303037')
            .setFooter({ text: "Thank for choosing Yubabe!", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed4], ephemeral: true })
          return

        }
        else if (funny === 'third') {

          const embed5 = new EmbedBuilder()
            .setThumbnail(`https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif `)
            .setDescription(`💴 **Economy** - (7)\n\`cash\`, \`bank\`, \`deposit\`, \`withdraw\`, \`daily\`, \`give\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: "● Usage : `Ycash | Ydaily`", value: `Check cash and receive Daily rewards, aliases : \`Ybal, Ycash, Ymoney, Ycoin\`` })
            .addFields({ name: "● Usage : `Ybank`", value: `Check your bank account, try to check your DMS, all banks are privated!` })
            .addFields({ name: "● Usage : `Ydeposit + amount | Ywithdraw + amount`", value: `Deposit or Withdraw from bank! aliases : \`dps, wdr\`, check your DMS, all banks are privated!` })
            .addFields({ name: "● Usage : `Ygive + <user> + <amount`, aliases : `ct, tf`", value: `Give money to someone.` })

            .setColor('#303037')
            .setFooter({ text: "Thank for choosing Yubabe!", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed5], ephemeral: true })
          return

        }
        else if (funny === 'sixth') {
          const embed6 = new EmbedBuilder()
            .setThumbnail(`https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif `)
            .setDescription(`📦 **Inventory** - (3)\n\`inventory\`, \`use\`, \`sell\`,\`buy\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: "● Usage : `Yinventory`", value: `Check your inventory , aliases \`inv, kho\`` })
            .addFields({ name: "● Usage : `Yuse + id`", value: `Use gem, check inv for item to Use` })
            .addFields({ name: "● Usage : `Ysell`", value: `You can now selling: Animals, ring : \`Ysell <animal | ring> <all | emoji | type animals>\` , aliases : s, animal, ring can be replace : animal, a and r, ring` })
            .setColor('#303037')
            .setFooter({ text: "Thank for choosing Yubabe!", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed6], ephemeral: true })
          return
        }
        else if (funny === 'seventh') {
          const embed6 = new EmbedBuilder()
            .setThumbnail(`https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif `)
            .setDescription(`💰 Shop - (2)\n\`buy\`,\`shop\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: "● Usage : `Ybuy + ID`", value: `You can buy ring with ID : 001,002,003,004,005, fishing rod : cc1,cc2,cc3, animal's food : grass, paddy, pran` })
            .addFields({ name: "● Usage : `Yshop`", value: `Open shop!` })
            .addFields({ name: "● Usage : `Ybuy + <ID> + [amount]`", value: `Buy Items!` })
            .setColor('#303037')
            .setFooter({ text: "Thank for choosing Yubabe!", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed6], ephemeral: true })
          return
        }
        else if (funny === 'eighth') {
          const embed6 = new EmbedBuilder()
            .setThumbnail(`https://cdn.discordapp.com/emojis/951586992897024060.png`)
            .setDescription(`💟 Marry - (5)\n\`background\`,\`lyhon\`,\`marry\`,\`promise\`,\`together\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: "● Usage : `Ybackground + link`", value: `Change marry background Pics` })
            .addFields({ name: "● Usage : `Ymarry + tag + ID ring`", value: `Marry some one!` })
            .addFields({ name: "● Usage : `Ydivorce`", value: `As the name...` })
            .addFields({ name: "● Usage : `Ypromise + content`", value: `Set your promises on marry embed` })
            .addFields({ name: "● Usage : `Yloveyou`", value: `To gain love points` })
            .setColor('#303037')
            .setFooter({ text: "Thank for choosing Yubabe!", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed6], ephemeral: true })
          return
        }
        else if (funny === 'night') {
          const embed7 = new EmbedBuilder()
            .setThumbnail(`https://cdn.discordapp.com/emojis/951586992897024060.png`)
            .setDescription(`🤸‍♀️ Actions - (10)\n\`cry\`,\`cuddle\`,\`hug\`,\`kiss\`,\`lick\`,\`neko\`,\`ponk\`,\`punch\`,\`slap\`,\`waifu\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
            .addFields({ name: "● Usage : `Yhug @tag`", value: `Express fellings with animation!` })
            .setColor('#303037')
            .setFooter({ text: "Thanks for choosing Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
            .setTimestamp()
          interaction.reply({ embeds: [embed7], ephemeral: true })
          return
        }
        else return
      })
    }
  }
}
async function swap_pages2(client, message, embeds) {
  let currentPage = 0;
  const { ButtonBuilder, ButtonStyle,
    ActionRowBuilder } = require("discord.js");

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

  if (embeds.length === 1) return message.channel.send({ embeds: [embeds[0]] })
  const queueEmbed = await message.channel.send(
    {
      content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
      components: [buttonrow1],
      embeds: [embeds[currentPage]]
    }
  ).then(msg => {
    const collector = msg.createMessageComponentCollector({
      filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
    })
  })

  collector.on("collect", (interaction) => {
    if (interaction.customId == "next-page") {
      if (currentPage < embeds.length - 1) {
        currentPage++;
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      } else {
        currentPage = 0
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1, buttonrow2] });
      }
    } else if (interaction.customId == "back-page") {
      if (currentPage !== 0) {
        --currentPage; to
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      } else {
        currentPage = embeds.length - 1
        queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      }
    } else if (interaction.customId == "skip-page1") {
      currentPage = 0;
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
    } else if (interaction.customId == "skip-page2") {
      currentPage = embeds.length - 1;
      queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
    } else if (interaction.customId == "home-page") {
      interaction.message.delete()
    }
  })
}