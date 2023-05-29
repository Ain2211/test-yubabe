const {AttachmentBuilder}= require("discord.js")
module.exports = {
  name: "crypto",
  aliases : ["cryp", "coins"],
  description: "Bảng thông tin crypto từ sàn chứng khoáng Yucrypto!",
  description2: "Information living board from Yucrypro Currency",
  usage: "Ycoins",
  usage2: "Ycoins",
  cderror: 'đừng vội thế chứ, bạn vừa gõ lệnh mà',
  use: "dùng lại nhé <3",
  cderror2: 'don\'t rush, you\'ve just use this command',
  use2: "to use again <3",
  run: async (client, message, args) => {
    let ThongTinChungKhoang = [
      "Giảm\© mạnh mẽ trong\nlần giao dịch trước",
      "Tăng\® đột biến trong\ncác giao dịch gần đây",
      "Có xu hướng Tăng\®",
      "Có xu hướng Giảm\©",
      "\™ Bất ổn và\ncó xu hướng Tăng",
      "\™ Bất ổn và\ncó xu hướng Giảm",
      "Công ty này có\ndấu hiệu làm ăn thua lỗ,\n dễ dẫn đến sự Suy giảm\©\n trong giá trị cổ phiếu và tiền ảo",
      "Hoàn toàn có khả năng\n khiến giá crypto\n bị rơi vào một cuộc đại hạ giá\©",
      "Rất dễ dẫn đến\n một cuộc suy thoái\© trong\n kinh tế nói chung \nvà chứng khoán nói riêng",
      "Thành công dựa vào cải cách,\n nâng cao\® giá trị cổ phần",
      "Có một sự đột phá\®\n mạnh mẽ trong Đồng Tiền Ảo",
    ]
    
    let chosen = ThongTinChungKhoang[Math.floor(Math.random()* ThongTinChungKhoang.length)]
    let {QuickDB} = require("quick.db")
    let db = new QuickDB()
    let Default = await db.get(`cophieuPrice`)
    let texxx = `${Default[0]} : ${Default[Default[0]]} Ycoin
    ${Default[0]} : ${Default[0]["Ycoin"]} Ycoin
    ${Default[0]} : ${Default[0]["CCoin"]} Ycoin
    ${Default[0]} : ${Default[0]["ECoin"]} Ycoin
    ${Default[0]} : ${Default[0]["FCoin"]} Ycoin`
    let keynew = await db.get(`ThongTinChungKhoang.now`)
    if(!keynew) await db.set(`ThongTinChungKhoang.now`, Date.now())
    let cophieu = await db.get(`ThongTinChungKhoang.now.news`)
    if (!cophieu|| !keynew || Date.now() - keynew > 1000*3600) await db.set(`ThongTinChungKhoang.now.news`, chosen)
    if (chosen.includes("©")) await message.reply("Cụm từ có \©")
    else if (chosen.includes("®")) await message.reply("Cụm từ có \®")
    else if (chosen.includes("™")) await message.reply("Cụm từ có \™")
    const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(400, 600)
const ctx = canvas.getContext('2d')

// Write "Awesome!"
ctx.font = '30px Arial'
ctx.rotate(0)
ctx.fillText(texxx, args[4], args[5])
// Draw line under text
var text = ctx.measureText("no")
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(args[6], args[7])
ctx.lineTo(args[8] + text.width, args[9])
ctx.stroke()

// Draw cat with lime helmet
loadImage('./iphone.png').then(async (image) => {
  ctx.drawImage(image, args[0], args[1], args[2], args[3])
  let img = canvas.toBuffer()
  let a = new AttachmentBuilder(img, { name: 'image.png' });
  await message.reply({content:chosen , files: [a]})
})
  
  } 
}