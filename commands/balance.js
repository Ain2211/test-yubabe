const { SlashCommandBuilder, } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('balance')
	.setDescription('Check tiền của bạn!'),
	async execute(interaction) {
		let memberid = interaction.user.id
    let cash = await client.cash(memberid)
		let content = [
`<:Yu_Ycoin:953323682246316082> **|** **${message.author.username}** , bạn đang có **${cash.toLocaleString('En-us')} Ycoin**`,
          `<:Yu_Ycoin:953323682246316082> **|** **${message.author.username}** , you're now having **${cash.toLocaleString('En-us')} Ycoin**`
        ]
    if (custom)
    {
      let startContent = custom
      let moneyText = "{money}"
      console.log(startContent) 
        if(!startContent.includes(moneyText)) startContent += "{money}"
      let newcontent = startContent
      .replaceAll(/\\n/g, "\n")
      .replaceAll(/{name}/g, message.author.username)
      .replaceAll(/{tag}/g, `<@${message.author.id}>`)
      .replaceAll(/{money}/g, `${cash.toLocaleString("en-us")} <:Yu_Ycoin:953323682246316082>`)
   console.log(newcontent)               
  content = [
      newcontent,
      newcontent
    ]    
  }
    await client.ireply(client, interaction, content, null).catch((e) => console.log(e))
	},
};