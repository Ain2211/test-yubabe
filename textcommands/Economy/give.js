const { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const lifeSchema = require("../../models/lifeSchema")

module.exports = {
  name: "give",
  description: ["Chuyển tiền của bạn cho người khác!", "Transfer your money to another one!"],
  aliases: ["transfer", "tf", "chuyentien", "send", "ct"],
  usage:["{prefix}give <user> <money>", "{prefix}give <user> <money>"],
  cooldown: 0,
	category: "Eco",
	canuse: "everyone",
  errorcd : ["Bạn vội quá, đợi **{time}** rồi hãy tiếp tục nha", "Please wait for **{time}** and retry!"],
  run: async (client, message, args) => {
const user = message.mentions.members.first() || client.users.cache.find(u => u.id == args[0] || u.id == args[1]);
    let timeout = 2000
    let lastused = await client.cd(message.author.id, `giveto_${user.id}`)
    let used = client.checkcd(lastused, timeout)
    let cooldown = used.after
    if (!cooldown) {
      const giveToFast = [
        `${client.emo.fail} | **${message.author.username}**, bạn ơi give chậm thôi..`,
        `${client.emo.fail} | **${message.author.username}**, please slow down, you're making me confused...`
      ]
      const delay = await client.send(client, message, giveToFast, null)
      await client.sleep(timeout - (Date.now() - lastused))
      await delay.delete()
    }
    else {
      await client.timeout(message.author.id, `give`)
      const user = message.mentions.members.first() || client.users.cache.find(u => u.id == args[0] || u.id == args[1]);
      const userProfile = await lifeSchema.findOne({ authorid: user.id })
      let errorUser = [
        "**Bạn muốn chuyển cho ai?**",
        "**Neh.. who? Please mention someone!**"
      ]
      if (!user) return await client.reply(client, message, errorUser, null).catch(e => console.log(e))
      let errorSendToYourSelf = [
        "**Không làm muốn có ăn? Buff tiền hay gì...**",
        "**Neh.. silly! It's your, no need to send!**"
      ]
      if (user.id == message.author.id || message.mentions.members.first() == message.author) return await client.reply(client, message, errorSendToYourSelf, null).catch(e => console.log(e))

      let coinsToGive = args[1]
      if (args[1].includes(user.id)) coinsToGive = args[0]
      let errorCoinsToGive = [
        "**Bạn muốn chuyển bao nhiêu nè...**",
        "**Yoooo! Missing amount...**"
      ]
      if (!coinsToGive)
        return await client.reply(client, message, errorCoinsToGive, null).catch(e => console.log(e))
      let errorCoinsIsNaN = [
        "**Số tiền không hợp lệ...**",
        "**Yoooo! The amount must be an integer...**"
      ]
      if (isNaN(coinsToGive))
        return await client.reply(client, message, errorCoinsIsNaN, null).catch(e => console.log(e))
      let errorZero = [
        "**Bạn không thể nhập số âm...**",
        "**Yoooo! The amount must be an integer that greater than 0...**"
      ]
      if ((parseInt(coinsToGive) <= 0))
        return await client.reply(client, message, errorZero, null).catch(e => console.log(e))


      const convertedGive = parseInt(coinsToGive);
      let errorEnough = [
        "Ehem... Đỗ nghèo khỉ... check tiền lại đi!",
        "Ehem... Poor little one... check your balance first!"
      ]
      if ((await client.cash(message.author.id)) < convertedGive)
        return await client.reply(client, message, errorEnough, null).catch(e => console.log(e))
      await client.tru(message.author.id, convertedGive);
      await client.cong(user.id, convertedGive);

      let custom = await client.custom(message.author.id, "give", false)
      let content = [
        `<a:banking:937082483466448896> **| ${message.author.username}**, bạn đã chuyển **${convertedGive.toLocaleString('En-us')} Ycoin** cho **${user.username ? user.username : user.user.username}**`,
        `<a:banking:937082483466448896> **| ${message.author.username}**, you've sent **${convertedGive.toLocaleString('En-us')} Ycoin** to **${user.username ? user.username : user.user.username}**`
      ]
      if (custom) {
        let startContent = custom
        let moneyText = "{money}"
        let userText = "{author}"
        let userTag = "{author.tag}"
        let giveTo = "{member}"
        let giveTag = "{member.tag}"
        console.log(startContent)
        if (!startContent.includes(moneyText) || !startContent.includes(userText) && !startContent.includes(userTag) || !startContent.includes(giveTo) && !startContent.includes(giveTag)) startContent = "{author} give {money} to {member}"
        let newcontent = startContent
          .replaceAll(/\\n/g, "\n")
          .replaceAll(/{author}/g, message.author.username)
          .replaceAll(/{author.tag}/g, `<@${message.author.id}>`)
          .replaceAll(/{money}/g, `${convertedGive.toLocaleString("en-us")} <:Yu_Ycoin:953323682246316082>`)
          .replaceAll(/{member}/g, `${user.username ? user.username : user.user.username}`)
          .replaceAll(/{member.tag}/g, `<@${user.id}>`)
        content = [
          newcontent,
          newcontent
        ]
      }
      await client.reply(client, message, content, null).catch((e) => console.log(e))
      if (!userProfile || userProfile.stat.happiness > 98) return
    userProfile.stat.happiness += 2
    await userProfile.save()
    }
  }
}