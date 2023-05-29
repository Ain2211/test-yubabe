const {
  Canvas,
  registerFont,
  createCanvas,
  loadImage
} = require('canvas')
const jimp = require('jimp');
const arialbold = require('@canvas-fonts/arial-bold');

module.exports = {
  name: "captcha",
  description: "Test Photo of Captcha",
  aliases: ["caps"],
  cooldown : 0,
  run: async (client, message, args) => {
    const captcha = `231298`
    const member = message.author
    const canvas = createCanvas(400, 200)
    const ctx = canvas.getContext('2d')
    let background = await jimp.read('https://t4.ftcdn.net/jpg/04/04/73/39/360_F_404733910_2mIXr6RbC5G3WZJFjopVsBaR3EOM6Bqy.jpg');
    let layer = await loadImage('https://media.discordapp.net/attachments/735118044145123348/735477847526998077/20200722_181613.png');
    background.blur(5);
    background = await background.getBufferAsync('image/png');

    const fixedbkg = await loadImage(background);

    ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(layer, 0, 0, canvas.width, canvas.height);

    let name = captcha;
    name = name.length > 12 ? name.substring(0, 12).trim() + '...' : name;

    ctx.font = `bold 22px Arial Bold`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'start';

    ctx.fillText(`CAPTCHA của
${member.username}#${member.discriminator}`, 150, 32);


    ctx.font = `bold 36px Arial Bold`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'start';
    ctx.strokeStyle = '#RANDOM';
    ctx.fillText(`${name}`, 160, 93);
    ctx.strokeText(`${name}`, 160, 93);

    ctx.font = `bold 14px Arial Bold`;
    ctx.fillStyle = 'RANDOM';
    ctx.fillText(`Hãy gõ trả lời tại kênh!`, 150, 129);
    let avatar = await jimp.read(
      `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.jpg`
    );
    avatar.resize(450, 450);
    avatar.circle();
    avatar = await avatar.getBufferAsync('image/png');
    avatar = await loadImage(avatar);

    ctx.drawImage(avatar, 1, 35, 140, 140);
    //files: [canvas.toBuffer()],
    await message.client.channels.cache.get(message.channel.id).send({
      files: [canvas.toBuffer()],
      content: `<:vngc_discord:917212352410177536> | <@!${member.id}>, hãy Nhập Captcha để xác minh!!!`
    });
  }
}
