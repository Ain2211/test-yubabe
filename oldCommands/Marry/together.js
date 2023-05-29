
const userReg = RegExp(/<@!?(\d+)>/)
const marrySchema = require('../../models/marrySchema');
module.exports = {
  name: 'yeuem',
  cooldown: 300000,
  description: "Tình cảm nồng đậm...",
  aliases: ['yeuanh', 'iuem', 'iuanh', 'loveyou', 'iuxop'],
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  run: async (client, message, args) => {
    const BanSchema = require('../../models/BanSchema')
    const ban = await BanSchema.findOne({ memberid: message.author.id })
    if (ban) {
      if (ban.memberid == message.author.id) return
    }
    const husband = message.author
    const data = await marrySchema.findOne({ authorid: message.author.id })
    const error = [ 
      `Yêu thì cưới đi chời! Nói suông...`,
      `You said love to...?`
    ]
    if (!data) return await client.send(client, message, error, null)
    const vkid = data.wifeid
    const lovedata = await marrySchema.findOne({ authorid: vkid })
    const thanmatck = data.together || 0
    data.together += 1
    await data.save()
    if (lovedata) lovedata.together = thanmatck + 1
    await lovedata.save()
    if (message.author.id === "715020568017109122") {
      await message.channel.send(`>>> **Òi oi, <@${husband.id}> đã thơm má <@${vkid}> được __${thanmatck + 1}__ lần gòi kìa !**`).catch(e => console.log(e))
    }
    else if (message.author.id === "696893548863422494") {
      await message.channel.send(`u là trời, <@${husband.id}> đã vừa đấm vừa xoa <@${vkid}> được **__${thanmatck + 1}__** lần rồi kìa !`).catch(e => console.log(e))
    }
    else if (message.author.id === "620860299356143657") {
      await message.channel.send(`>>> **Òi oi, <@${husband.id}> đã thơm má <@${vkid}> được __${thanmatck + 1}__ lần gòi kìa !**`).catch(e => console.log(e))
    }
    else if (message.author.id === "623762304668008451") {
      await message.channel.send(`Thật lãng mạn! <@${husband.id}> đã ngủ chung với <@${vkid}> được **__${thanmatck + 1}__** đêm rồi. <a:2947_pepe_sleep:1023833099328569364>`)

    }
    else if (message.author.id == "722763606772547626") {
      await message.channel.send(`<a:Ylove:923743440032907304> ** | Anh đã có gắng đi làm kiếm tiền nhưng chỉ kiếm được về cho em <a:MR_Dc_redrose:911683432151666728> __${thanmatck + 1}__<a:MR_Dc_redrose:911683432151666728> nghìn $ ** <a:Yiuem:923504311932166185>`)
    }
    else {
      let content = [
        `Dữ vậy chời... <@${husband.id}> đã nói lời yêu với <@${vkid}>! Hai bạn được **${thanmatck + 1}** điểm thân mật~ <a:ctim2:912046879662030969> `,
        `So romantic... <@${husband.id}> says lovely words to <@${vkid}>! You guys just gain **${thanmatck + 1}** love points~ <a:ctim2:912046879662030969> `
      ]
      let custom = await client.custom(message.author.id, "love", false)
      if (custom) {
        const u1 = message.author.username
        const u2 = await client.users.cache.find(e => e.id == vkid)
        const u3 = u2.username
        let startContent = custom
        let moneyText = "{love}"
        console.log(startContent)
        if (!startContent.includes(moneyText)) startContent += "{love}"
        let newcontent = startContent
          .replaceAll(/\\n/g, "\n")
          .replaceAll(/{wife}/g, `<@${vkid}>`)
          .replaceAll(/{wifename}/g, u3)
          .replaceAll(/{husband}/g, `<@${husband.id}>`)
          .replaceAll(/{husbandname}/g, u1)
          .replaceAll(/{love}/g, `${thanmatck + 1}`)
        content = [
          newcontent,
          newcontent
        ]
      }
      await client.send(client, message, content, null).catch(e => console.log(e))
    }
  }
}