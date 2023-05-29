const BanSchema = require('../../models/BanSchema')
module.exports = {
  name: "withdraw",
  description: ["Rút tiền từ ngân hàng về ví của bạn!", "Withdraw money from bank to your balance!"],
  aliases: ["rut", "rt", "ruttien", "wdr"],
  usage: ["{prefix}rut <soluong>", "{prefix}wdr <amount>"],
  cooldown: 3000,
  category: "Eco",
  canuse: "everyone",
  errorcd: ["Từ từ nào! Hãy chờ **{time}** sau đó thử lại nhé! ", "Please wait for **{time}** before using this command again!"],
run: async (client, message, args) => {
  let timeout = 3000
  let lastused = await client.cd(message.author.id, `ruttien`)
  let used = client.checkcd(lastused, timeout)
  let cooldown = used.after
  if (!cooldown) {
    const DelayMSG = [
      `${client.e.fail} | **${message.author.username}**, bạn check dms đi ạ...`,
      `${client.e.fail} | **${message.author.username}**, please check your DMS to see the money! If your DMS not open, please text me at least once...`
    ]
    const delay = await client.send(client, message, DelayMSG, null).catch(e => console.log(e))
    await client.sleep(timeout - (Date.now() - lastused))
    await delay.delete()
  }
  else {
    await client.timeout(message.author.id, `ruttien`)

    let member = message.author;


    let all = await client.bank(member.id);

    if (args[0] === "all") args[0] = all

    const errorAmount = [
      `**Bạn muốn rút bao nhiêu?**`,
      `**Missing the Amount to Withdraw?**`
    ]
    if (!args[0]) {
      return await client.send(client, message, errorAmount, null).catch(e => console.log(e))
    }
    const errorAmountLessThanZero = [
      `**Không thể nhập số âm!**`,
      `**The amount must be greater than Zero?**`
    ]
    if (args[0] < 0) return await client.send(client, message, errorAmountLessThanZero, null).catch(e => console.log(e))
    const errorBankLessThanZero = [
      `**Ngân hàng của bạn đang âm, xin vui lòng nạp thêm tiền và thử lại !!**`,
      `**Your bank is less than 0? Please deposit more and retry **`
    ]
    if (all < 0) return await client.send(client, message, errorBankLessThanZero, null).catch(e => console.log(e))

    const errorNumber = [
      `**Số không hợp lệ!**`,
      `**The amount must be an Integer!**`
    ]

    if (isNaN(args[0])) return await client.send(client, message, errorNumber, null).catch(e => console.log(e))

    const errorBankNotEnough = [
      `**Ngân hàng của bạn không đủ, xin vui lòng nạp thêm tiền và thử lại !!**`,
      `**Your bank isn't enough! Please deposit more and retry **`
    ]
    if (parseInt(args[0]) > all) return await client.send(client, message, errorBankNotEnough, null).catch(e => console.log(e))

    const banking = parseInt(args[0])
    client.ruttien(member.id, banking);
    await client.cong(member.id, banking);
    const bankBal = await client.bank(member.id);
    const money = await client.cash(member.id)
    let Success = [
      `<a:Yu_cassh:942212732642537502> | **${message.author.username}**, bạn rút tiền thành công : **${parseInt(args[0]).toLocaleString('En-us')}**, bạn đang có : **${parseInt(args[0]).toLocaleString('En-us')} Ycoin**`,
      `<a:Yu_cassh:942212732642537502> | **${message.author.username}**, your transaction was Successful, you've withdrawed : **${parseInt(args[0]).toLocaleString('En-us')}**, your pocket's now having : **${parseInt(args[0]).toLocaleString('En-us')} Ycoin**`
    ]
    await client.dms(client, message, message.author, Success, null, null).catch(async e => {
      console.log(e)
      await client.reply(client, message, Success, null)
    })
  }
}
}