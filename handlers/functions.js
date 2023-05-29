/*
Nơi Gọi NPM và Các Directory Path
/////////////////////////////////////
*/


module.exports = async function(client) {
	const { QuickDB } = require('quick.db');
	const db = new QuickDB({ table: "DB" });
	/*
	Các lối tắt
	/////////////////////////////////////
	*/
	const config = require("../config/config.json");
	client.config = config;
	client.e = config.emoji;
	client.emo = config.emoji
	client.admin = config.admins;
	client.owner = config.owner;
	client.hg = config.hatgiong;
	/*Các Functions*/
	/////////////////////////////////////
	///////////Hỗ Trợ Inventory//////////
	const buffSchema = require('../models/buffSchema')
	const itemSchema = require('../models/itemSchema')
	client.item = async (id, method, name, amount, type) => {
		let item = await itemSchema.findOne({ id: id, name: name })
		if (method == null) {
			if (!item) {
				let newitem = new itemSchema({
					id: id,
					name: name,
					quanlity: amount,
					type: type
				})
				await newitem.save()
				return item = amount
			}
			else return item = item.quanlity
		}
		else if (method == `cong`) {
			if (amount == null) amount = 1
			if (!item) {
				let newitem = new itemSchema({
					id: id,
					name: name,
					quanlity: amount,
					type: type
				})
				await newitem.save()
			}
			else {
				if (amount == null) amount = 1
				item.quanlity += amount
				await item.save()
				return item = item.quanlity
			}

		}
		else if (method == `tru`) {
			if (!item) return item = 0
			if (amount == null) amount = 1
			item.quanlity -= amount
			await item.save()
			return item = item.quanlity
		}
		return item
	}
	//xem buff
	client.buff = (memberid, type) => new Promise(async ful => {
		const data = await buffSchema.findOne({ memberid: memberid, type: type });
		if (!data) return ful(0);
		ful(data.quanlity);
	})
	//add buff
	client.addbuff = (memberid, type, quanlity, heso) => {
		buffSchema.findOne({ memberid, type }, async (err, data) => {
			if (err) throw err
			if (data) {
				data.quanlity += quanlity;
				data.heso = heso
			} else {
				data = new buffSchema({ memberid: memberid, quanlity: quanlity, type: type, heso: heso })
			}
			data.save();
		}
		);
	}
	//trừ buff
	client.trubuff = (memberid, type, quanlity) => {
		buffSchema.findOne({ memberid, type }, async (err, data) => {
			if (err) throw err
			if (data) {
				data.quanlity -= quanlity;
			} else {
				return
			}
			data.save();
		}
		);
	}
	///////////////Custom////////////////
	client.custom = async (id, types, args) => {
		let res = ""
		const customSchema = require("../models/customSchema")
		if (args) {
			const userId = args[0]
			const typed = args[1]
			let custom = await customSchema.findOne({ authorid: userId, type: typed })
			if (!custom) {
				let newcus = new customSchema({
					authorid: userId,
					content: args.slice(2).join(" "),
					type: typed
				})
				await newcus.save()
			}
			else {
				custom.content = args.slice(2).join(" ")
				await custom.save()
			}
		}
		else {
			let custom = await customSchema.findOne({ authorid: id, type: types })
			if (!custom) return res = false
			else if (custom) res = custom.content
			return res
		}
	}
	client.random = async (id, method, authors, authorURLs, titles, descriptions, thumbnails, images, colors, footers, footerURLs, content) => {
		let res = ""
		const randomSchema = require("../models/randomSchema")
		const custom = await randomSchema.findOne({ authorid: id })

		if (!custom) {
			let newCustom = new randomSchema({
				authorid: id,
				author: authors,
				authorURL: authorURLs,
				title: titles,
				description: descriptions,
				thumbnail: thumbnails,
				image: images,
				color: colors,
				footer: footers,
				footerURL: footerURLs,
			})
			await newCustom.save()
		} else {
			custom[method] = content
			await custom.save()
		}
	}
	/////////////////////////////////////
	const gemSchema = require('../models/gemSchema')
	client.gem = (memberid, typeS) => new Promise(async ful => {
		const data = await gemSchema.findOne({ memberid: memberid, typeS: typeS });
		if (!data) return ful(0);
		ful(data.quanlity);
	})
	//add ngọc
	client.addgem = (memberid, types, quanlity, type) => {
		gemSchema.findOne({ memberid: memberid, typeS: types }, async (err, data) => {
			if (err) throw err
			if (data) {
				data.quanlity += quanlity;
				data.type = type
			} else {
				data = new gemSchema({ memberid: memberid, typeS: types, quanlity: quanlity, type: type })
			}
			data.save();
		}
		);
	}
	//trừ ngọc
	client.trugem = (memberid, type, quanlity) => {
		gemSchema.findOne({ memberid, typeS: type }, async (err, data) => {
			if (err) throw err
			if (data) {
				data.quanlity -= quanlity;
			} else {
				return
			}
			data.save();
		}
		);
	}
	/////////////////////////////////////
	/////////////Economy Cash////////////
	const bankSchema = require('../models/bankSchema')
	const moneySchema = require('../models/moneySchema')
	//Check tiền
	client.cash = (id) => new Promise(async ful => {
		const data = await moneySchema.findOne({ id });
		if (!data) return ful(0);
		ful(data.coins);
	})
	// add tiền
	client.cong = (id, coins) => {
		moneySchema.findOne({ id }, async (err, data) => {
			if (err) throw err;
			if (data) {
				data.coins += coins;
			} else {
				data = new moneySchema({ id, coins })
			}
			data.save();
		})
	}
	// trừ tiền
	client.tru = (id, coins) => {
		moneySchema.findOne({ id }, async (err, data) => {
			if (err) throw err;
			if (data) {
				data.coins -= coins;
			} else {
				data = new moneySchema({ id, coins: -coins })
			}
			data.save();
		})
	}
	// gửi tiền
	client.tietkiem = (id, coins) => {
		bankSchema.findOne({ id }, async (err, data) => {
			if (err) throw err;
			if (data) {
				data.coins += coins;
			} else {
				data = new bankSchema({ id, coins: +coins })
			}
			data.save();
		})
	}
	// rút tiền
	client.ruttien = (id, coins) => {
		bankSchema.findOne({ id }, async (err, data) => {
			if (err) throw err;
			if (data) {
				data.coins -= coins;
			} else {
				data = new bankSchema({ id, coins: -coins })
			}
			data.save();
		})
	}
	// check bank
	client.bank = (id) => new Promise(async ful => {
		const data = await bankSchema.findOne({ id });
		if (!data) return ful(0);
		ful(data.coins);
	})
	/////////////////////////////////////
	///////Hệ thống ngôn ngữ en-vi textcommand///////
	client.send = async (client, message, content, embeds) => {
		const yukii = client.users.cache.find(u => u.id == `896739787392819240`)
		let language = await db.get(`${message.guild.id}_languages`)
		const region = message.guild.preferredLocale
		if (!language) {
			if (region == "vi") await db.set(`${message.guild.id}_languages`, "vi")
			else await db.set(`${message.guild.id}_languages`, "en")
			await yukii.send(`${message.guild.name} đã được set Region **${message.guild.preferredLocale}**`)
		}
		let msg
		if (embeds && content) {
			if (language == "vi") {
				msg = await message.channel.send({ content: content[0], embeds: [embeds[0]] })
			}
			else if (language == "en") {
				msg = await message.channel.send({ content: content[1], embeds: [embeds[1]] })
			}
		}
		else if (embeds == null) {
			if (language == "vi") {
				msg = await message.channel.send(content[0])
			}
			else if (language == "en") {
				msg = await message.channel.send(content[1])
			}
		}
		else if (content == null) {
			if (language == "vi") {
				msg = await message.channel.send({ embeds: [embeds[0]] })
			}
			else if (language == "en") {
				msg = await message.channel.send({ embeds: [embeds[1]] })
			}
		}
		return msg
	};
	client.dms = async (client, message, user, content, embeds, attachment) => {

		const yukii = client.users.cache.find(u => u.id == `896739787392819240`)
		let language = await db.get(`${message.guild.id}_languages`)
		const region = message.guild.preferredLocale
		if (!language) {
			if (region == "vi") await db.set(`${message.guild.id}_languages`, "vi")
			else await db.set(`${message.guild.id}_languages`, "en")
			await yukii.send(`${message.guild.name} đã được set Region **${message.guild.preferredLocale}**`)
		}
		let msg
		if (embeds && content && attachment) {
			if (language == "vi") {
				msg = await user.send({ content: content[0], embeds: [embeds[0]], files: [attachment] })
			}
			else if (language == "en") {
				msg = await user.send({ content: content[1], embeds: [embeds[1]], files: [attachment] })
			}
		}
		else if (embeds == null && content && attachment) {
			if (language == "vi") {
				msg = await user.send({ content: content[0], files: [attachment] })
			}
			else if (language == "en") {
				msg = await user.send({ content: content[1], files: [attachment] })
			}
		}
		else if (content == null && embeds && attachment) {
			if (language == "vi") {
				msg = await user.send({ embeds: [embeds[0]], files: [attachment] })
			}
			else if (language == "en") {
				msg = await user.send({ embeds: [embeds[1]], files: [attachment] })
			}
		}
		else if (attachment == null && embeds && content) {
			if (language == "vi") {
				msg = await user.send({ content: content[0], embeds: [embeds[0]] })
			}
			else if (language == "en") {
				msg = await user.send({ content: content[1], embeds: [embeds[1]] })
			}
		}
		else if (content == null && embeds == null) {
			msg = await user.send({ files: [attachment] })
		}
		else if (content == null && attachment == null) {
			if (language == "vi") {
				msg = await user.send({ embeds: [embeds[0]] })
			}
			else if (language == "en") {
				msg = await user.send({ embeds: [embeds[1]] })
			}
		}
		else if (embeds == null && attachment == null) {
			if (language == "vi") {
				msg = await user.send({ content: content[0] })
			}
			else if (language == "en") {
				msg = await user.send({ content: content[1] })
			}
		}

		return msg
	};
	client.sendFile = async (client, message, content, attachments) => {

		const yukii = client.users.cache.find(u => u.id == `896739787392819240`)
		let language = await db.get(`${message.guild.id}_languages`)
		const region = message.guild.preferredLocale
		if (!language) {
			if (region == "vi") await db.set(`${message.guild.id}_languages`, "vi")
			else await db.set(`${message.guild.id}_languages`, "en")
			await yukii.send(`${message.guild.name} đã được set Region **${message.guild.preferredLocale}**`)
		}
		let msg
		if (attachments && content) {
			if (language == "vi") {
				msg = await message.channel.send({ content: content[0], files: [attachments] })
			}
			else if (language == "en") {
				msg = await message.channel.send({ content: content[1], files: [attachments] })
			}
		}
		else if (attachments == null) {
			if (language == "vi") {
				msg = await message.channel.send(content[0])
			}
			else if (language == "en") {
				msg = await message.channel.send(content[1])
			}
		}
		else if (content == null) {
			if (language == "vi") {
				msg = await message.channel.send({ files: [attachments] })
			}
			else if (language == "en") {
				msg = await message.channel.send({ files: [attachments] })
			}
		}

		return msg
	};
	client.reply = async (client, message, content, embeds) => {
		const yukii = client.users.cache.find(u => u.id == `896739787392819240`)
		let language = await db.get(`${message.guild.id}_languages`)
		const region = message.guild.preferredLocale
		if (!language) {
			if (region == "vi") await db.set(`${message.guild.id}_languages`, "vi")
			else await db.set(`${message.guild.id}_languages`, "en")
			await yukii.send(`${message.guild.name} đã được set Region **${message.guild.preferredLocale}**`)
		}
		let msg
		if (embeds && content) {
			if (language == "vi") {
				msg = await message.reply({ content: content[0], embeds: [embeds[0]] })
			}
			else if (language == "en") {
				msg = await message.reply({ content: content[1], embeds: [embeds[1]] })
			}
		}
		else if (embeds == null) {
			if (language == "vi") {
				msg = await message.reply(content[0])
			}
			else if (language == "en") {
				msg = await message.reply(content[1])
			}
		}
		else if (content == null) {
			if (language == "vi") {
				msg = await message.reply({ embeds: [embeds[0]] })
			}
			else if (language == "en") {
				msg = await message.reply({ embeds: [embeds[1]] })
			}
		}
		return msg

	};
	/////////////////////////////////////
	///////Hệ thống ngôn ngữ en-vi slashcommand///////
	client.ireply = async (client, interaction, content, embeds) => {
		const yukii = client.users.cache.find(u => u.id == `896739787392819240`)
		let language = await db.get(`${message.guild.id}_languages`)
		const region = interaction.guild.preferredLocale
		if (!language) {
			if (region == "vi") await db.set(`${message.guild.id}_languages`, "vi")
			else await db.set(`${message.guild.id}_languages`, "en")
			await yukii.send(`${message.guild.name} đã được set Region **${message.guild.preferredLocale}**`)
		}
		let msg
		if (embeds && content) {
			if (language == "vi") {
				msg = await interaction.reply({ content: content[0], embeds: [embeds[0]] })
			}
			else if (language == "en") {
				msg = await interaction.reply({ content: content[1], embeds: [embeds[1]] })
			}
		}
		else if (embeds == null) {
			if (language == "vi") {
				msg = await interaction.reply(content[0])
			}
			else if (language == "en") {
				msg = await interaction.reply(content[1])
			}
		}
		else if (content == null) {
			if (language == "vi") {
				msg = await interaction.reply({ embeds: [embeds[0]] })
			}
			else if (language == "en") {
				msg = await interaction.reply({ embeds: [embeds[1]] })
			}
		}
		return msg

	};
	/////////////////////////////////////
	/////Check Passport và Premium///////
	//Kích hoạt Passport 
	const vipSchema = require('../models/vipSchema')
	client.activatepassport = (id, type) => {
		vipSchema.findOne({ memberid: id, type: type }, async (err, data) => {
			if (err) throw err
			if (data) {
				data.used = Date.now();
			} else {
				data = new vipSchema({ memberid: id, type: type, used: Date.now() })
			}
			data.save();
		}
		);
	};
	//Check thời gian bắt đầu sử dụng 
	client.datepassport = (id) => new Promise(async ful => {
		const data = await vipSchema.findOne({ memberid: `${id}` });
		if (!data) return ful(null);
		ful(data.used);
	});
	//Check xem passport đã hết hạn chưa 
	client.checkpassport = function(date) {
		let timeout = date + 2629743830;
		let temp = Math.trunc(((timeout - Date.now())) / 1000);
		let seconds = temp % 60;
		temp = Math.trunc(temp / 60);
		let minutes = temp % 60
		temp = Math.trunc(temp / 60);
		let hours = temp % 24;
		temp = Math.trunc(temp / 24);
		let days = temp;

		/* If there is no data */
		if (!date) return { after: true, s: seconds, m: minutes, h: hours, d: days };
		let diff = Date.now() - timeout
		/* Not past midnight */
		if (diff <= 0) return { after: false, diff: diff, s: seconds, m: minutes, h: hours, d: days };
		else return { after: true, diff: diff, withinDay: (overrideWithinDay || false), s: seconds, m: minutes, h: hours, d: days };
	};
	//check loại passport đang sử dụng
	client.provip = async (message) => {
		let vip = false
		let pro = false
		const provip = await vipSchema.findOne({ memberid: message.author.id })
		if (provip) {
			const date = await client.datepassport(message.author.id)
			const status = await client.checkpassport(date)
			let end = status.after
			if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
			if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
		}
		return { vip: vip, pro: pro }
	}
client.provip2 = async (client,id) => {
		let vip = false
		let pro = false
		const provip = await vipSchema.findOne ({ memberid: id })
		if (provip) {
			const date = await client.datepassport(id)
			const status = await client.checkpassport(date)
			let end = status.after
			if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
			if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
		}
		return { vip: vip, pro: pro }
	}
	
  /////////////////////////////////////
	client.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
	const cooldownSchema = require('../models/cooldownSchema')
	const overrideWithinDay = false
	/////////Time Out và Cooldown////////
	//Đặt lần cuối dùng lệnh
	client.timeout = (id, cmd) => {
		cooldownSchema.findOne({ key: `${id}.${cmd}` }, async (err, data) => {
			if (err) throw err
			if (data) {
				data.cooldown = Date.now();
			} else {
				data = new cooldownSchema({ key: `${id}.${cmd}`, cooldown: Date.now() })
			}
			data.save();
		}
		);
	}
	//Check lần cuối dùng lệnh
	client.cd = (id, cmd) => new Promise(async ful => {
		const data = await cooldownSchema.findOne({ key: `${id}.${cmd}` });
		if (!data) return ful(null);
		ful(data.cooldown);
	})
	//Check đã đủ thời gian từ khi gõ lệnh
	client.checkcd = function(date, cd) {
		let timeout = date + cd;
		let temp = Math.trunc(((timeout - Date.now())) / 1000);
		let seconds = temp % 60;
		temp = Math.trunc(temp / 60);
		let minutes = temp % 60
		temp = Math.trunc(temp / 60);
		let hours = temp % 24;
		temp = Math.trunc(temp / 24);
		let days = temp;

		/* If there is no data */
		if (!date) return { after: true, s: seconds, m: minutes, h: hours, d: days };
		let diff = Date.now() - timeout
		/* Not past midnight */
		if (diff <= 0) return { after: false, diff: diff, s: seconds, m: minutes, h: hours, d: days };
		else return { after: true, diff: diff, withinDay: (overrideWithinDay || false), s: seconds, m: minutes, h: hours, d: days };
	}
	//Check đã qua ngày mới từ lúc gõ lệnh chưa
	client.newday = async function(date) {
		let now = new Date(Date.now() + 25200000);
		let midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(Date.now() + 25200000));

		/* Calculate time until midnight */
		let temp = Math.trunc(((midnight - now) + 86400000) / 1000);
		let seconds = temp % 60;
		temp = Math.trunc(temp / 60);
		let minutes = temp % 60
		temp = Math.trunc(temp / 60);
		let hours = temp % 24;
		temp = Math.trunc(temp / 24);
		let days = temp;

		/* If there is no data */
		if (!date) return { after: true, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

		let pDate = new Date(date + 25200000);
		let diff = midnight - pDate;

		/* Not past midnight */
		if (diff <= 0) return { after: false, diff: diff, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

		/* Within 1 day */
		else if (diff <= 172810000) return { after: true, diff: diff, withinDay: true, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

		/* Over 1 full day */
		else return { after: true, diff: diff, withinDay: (overrideWithinDay || false), seconds: seconds, minutes: minutes, hours: hours, days: days, now };
	}
	client.sonho = function toSmallNum(array, count, digits) {
		var result = '';
		var num = count;
		if (count < 0) count = 0;
		for (i = 0; i < digits; i++) {
			var digit = count % 10;
			count = Math.trunc(count / 10);
			result = array.numbers[digit] + result;
		}
		return result;
	}
	client.checktienhg = async function(array, hg) {
		if (hg == array[0]) return result = 50
		if (hg == array[1]) return result = 50
		if (hg == array[2]) return result = 80
		if (hg == array[3]) return result = 80
		if (hg == array[4]) return result = 100
		if (hg == array[5]) return result = 100
		if (hg == array[6]) return result = 150
		if (hg == array[7]) return result = 150
		if (hg == array[8]) return result = 300
		if (hg == array[9]) return result = 300
		if (hg == array[10]) return result = 500
		if (hg == array[11]) return result = 500
		if (hg == array[12]) return result = 1
		if (hg == array[13]) return result = 7000
		if (hg == array[14]) return result = 11000
		if (hg == array[15]) return result = 15000
	}
	/////////////Hunt Thú///////////////
	const animalSchema = require('../models/animalSchema')
	const zoopointSchema = require('../models/zoopointSchema')
	const fishesSchema = require('../models/fishesSchema')
	const fishpointSchema = require('../models/fishpointSchema')
	// cái này là hunt thú
	client.animal = (id, name, quanlity, type) => {
		animalSchema.findOne({ id, name }, async (err, animals) => {
			if (err) throw err
			if (animals) {
				animals.quanlity += quanlity;
				await animals.save()
			} else {
				const addanimals = new animalSchema({ id: id, name: name, quanlity: quanlity, type: type })
				await addanimals.save()
			}

		}
		);
	}
	// cái này là bán thú
	client.banthu = (name, quanlity) => {
		animalSchema.findOne({ name }, async (err, data) => {
			if (err) throw err
			if (data) {
				data.quanlity -= quanlity;
			} else {
				return
			}
			data.save();
		}
		);
	}
	// cái này là xem zoo
	client.zoo = (name) => new Promise(async ful => {
		const data = await animalSchema.findOne({ name });
		if (!data) return ful(0)
		ful(data.quanlity);
	})
	//cộng point zoo
	client.addpoint = (zooid, quanlity) => {
		zoopointSchema.findOne({ zooid }, async (err, zoopoint) => {
			if (err) throw err
			if (zoopoint) {
				zoopoint.quanlity += quanlity;
			} else {
				zoopoint = new zoopointSchema({ zooid: zooid, quanlity: quanlity })
			}
			zoopoint.save();
		}
		);
	}
	//xem point zoo
	client.zoopoint = (zooid) => new Promise(async ful => {
		const data = await zoopointSchema.findOne({ zooid });
		if (!data) return ful(0);
		ful(data.quanlity);
	})
	// cái này là câu cá
	client.fishes = (id, name, quanlity, type) => {
		fishesSchema.findOne({ id, name }, async (err, animals) => {
			if (err) throw err
			if (animals) {
				animals.quanlity += quanlity;
				await animals.save()
			} else {
				const addanimals = new fishesSchema({ id: id, name: name, quanlity: quanlity, type: type })
				await addanimals.save()
			}

		}
		);
	}
	// cái này là bán cá
	client.banca = (name, quanlity) => {
		fishesSchema.findOne({ name }, async (err, data) => {
			if (err) throw err
			if (data) {
				data.quanlity -= quanlity;
			} else {
				return
			}
			data.save();
		}
		);
	}
	// cái này là xem tank
	client.tank = (name) => new Promise(async ful => {
		const data = await fishesSchema.findOne({ name });
		if (!data) return ful(0)
		ful(data.quanlity);
	})
	//cộng point tank
	client.addpointf = (zooid, quanlity) => {
		fishpointSchema.findOne({ zooid }, async (err, zoopoint) => {
			if (err) throw err
			if (zoopoint) {
				zoopoint.quanlity += quanlity;
			} else {
				zoopoint = new fishpointSchema({ zooid: zooid, quanlity: quanlity })
			}
			zoopoint.save();
		}
		);
	}
	//xem point tank
	client.zoopointf = (zooid) => new Promise(async ful => {
		const data = await fishpointSchema.findOne({ zooid });
		if (!data) return ful(0);
		ful(data.quanlity);
	})
	////////////////////////////////////
	///////////////FARM////////////////
	const farmSchema = require("../models/farmSchema")
	// XEM nông sản
	client.grow = (id, name) => new Promise(async ful => {
		const data = await farmSchema.findOne({ memberid: id, name: name });
		if (!data) return ful(0);
		ful(data.quanlity);
	})
	//THÊM Nông sản KHI MUA HOẶC THU HOẠCH
	client.addgrow = (id, name, quanlity, type) => {
		farmSchema.findOne({ memberid: id, name: name }, async (err, data) => {
			if (err) throw err
			if (data) {
				data.quanlity += quanlity;
			} else {
				data = new farmSchema({ memberid: id, name: name, quanlity: quanlity, type: type })
			}
			data.save();
		}
		);
	}
	//TRỪ nông sản
	client.trugrow = (id, name, quanlity, type) => {
		farmSchema.findOne({ memberid: id, name: name }, async (err, data) => {
			if (err) throw err
			if (data) {
				data.quanlity -= quanlity;
			} else {
				return
			}
			data.save();
		}
		);
	}
	////////////////////////////////////
	/////////Yuworld Functions//////////
	const lifeSchema = require("../models/lifeSchema")
	const praySchema = require("../models/praySchema")
	client.age = async (id, method, amount) => {
		let age = await lifeSchema.findOne({ authorid: id })
		if (!age) return age = 0
		if (method == null) {
			return age.me.age
		}
		else if (method == `cong`) {
			if (amount == null) amount = 1
			age.me.age += amount
			await age.save()
			return age = age.me.age
		}
		else if (method == `tru`) {
			if (amount == null) amount = 1
			age.me.age -= amount
			await age.save()
			return age = age.me.age
		}

	}
	// số pray
	client.prayed = (id) => new Promise(async ful => {
		const data = await praySchema.findOne({ id });
		if (!data) return ful(0);
		ful(data.prays);
	})
	// cộng pray
	client.pray = (id) => {
		praySchema.findOne({ id }, async (err, data) => {
			if (err) throw err;
			if (data) {
				data.prays += 1;
			} else {
				data = new praySchema({ id, prays: 1 })
			}
			data.save();
		})
	}
	client.curse = (id) => {
		praySchema.findOne({ id }, async (err, data) => {
			if (err) throw err;
			if (data) {
				data.prays -= 1;
			}
			else {
				data = new praySchema({ id, prays: -1 })
			}
			data.save();
		})

	}
	client.stat = async (id, method, stat, amount) => {
		let userProfile = await lifeSchema.findOne({ authorid: id })
		if (!userProfile) {
			let newUserProfile = new lifeSchema({
				authorid: id,
				stat: {
					health: 50,
					happiness: 50,
					appear: 50,
					iq: 50,
					fitness: 50,
					eq: 50,
				},
				me: {
					name: "Chưa có tên",
					gender: "Nam",
					age: 0,
					birthday: new Date(Date.now()).toLocaleString("vi", { timeZone: "Asia/Ho_Chi_Minh" }),
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
			return await newUserProfile.save()
		}
		let quanlity = 0
		if (method == "add" && !isNaN(amount)) quanlity = amount;
		if (method == "tru" && !isNaN(amount)) quanlity = -amount;
		if (stat == "health") userProfile.stat.health += quanlity
		else if (stat == "happiness") userProfile.stat.happiness += quanlity
		else if (stat == "appear") userProfile.stat.appear += quanlity
		else if (stat == "iq") userProfile.stat.iq += quanlity
		else if (stat == "fitness") userProfile.stat.fitness += quanlity
		else if (stat == "eq") userProfile.stat.eq += quanlity
		else if (method == "new" && stat == "name") userProfile.me.name = amount
		else if (method == "new" && stat == "gender") userProfile.me.gender = amount

		await userProfile.save()

	}
	//////////////////////////
	/////////Utils////////////
	client.chuyentrang1 = async function swap_pages1(client, message, embeds, seconds) {
		let currentPage = 0;
		const { MessageButton, MessageActionRow } = require("discord-buttons");
		let button1 = new MessageButton()
			.setStyle('green')
			.setLabel('First')
			.setID('first');
		let button2 = new MessageButton()
			.setStyle('blurple')
			.setLabel('Back')
			.setID('back');
		let button3 = new MessageButton()
			.setStyle('gray')
			.setLabel('Cancel')
			.setID('home');
		let button4 = new MessageButton()
			.setStyle('blurple')
			.setLabel('Next')
			.setID('next');
		let button5 = new MessageButton()
			.setStyle('green')
			.setLabel('Last')
			.setID('last');

		let buttonrow = new MessageActionRow()
			.addComponent(button1)
			.addComponent(button2)
			.addComponent(button3)
			.addComponent(button4)
			.addComponent(button5)

		if (embeds.length === 1) return message.channel.send({ embeds: [embeds[0]] })
		const queueEmbed = await message.channel.send(
			{
				content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
				component: buttonrow,
				embeds: [embeds[currentPage]]
			}
		);

		const collector = queueEmbed.createButtonCollector((button) => button.clicker.user.id === message.author.id, { time: seconds * 1000 })

		collector.on("collect", async (b) => {
			try {
				b.defer();
				if (b.id == "next") {
					if (currentPage < embeds.length - 1) {
						currentPage++;
						queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], component: buttonrow });
					} else {
						currentPage = 0
						queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], component: buttonrow });
					}
				} else if (b.id == "back") {
					if (currentPage !== 0) {
						--currentPage;
						queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], component: buttonrow });
					} else {
						currentPage = embeds.length - 1
						queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], component: buttonrow });
					}
				} else if (b.id == "first") {
					currentPage = 0;
					queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], component: buttonrow });
				} else if (b.id == "last") {
					currentPage = embeds.length - 1;
					queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], component: buttonrow });
				}
				else {
					button1 = new MessageButton()
						.setStyle('green')
						.setDisabled()
						.setLabel('First')
						.setID('first');
					button2 = new MessageButton()
						.setStyle('blurple')
						.setDisabled()
						.setLabel('Back')
						.setID('back');
					button3 = new MessageButton()
						.setStyle('gray')
						.setDisabled()
						.setLabel('Cancel')
						.setID('home');
					button4 = new MessageButton()
						.setStyle('blurple')
						.setLabel('Next')
						.setDisabled()
						.setID('next');
					button5 = new MessageButton()
						.setStyle('green')
						.setLabel('Last')
						.setDisabled()
						.setID('last');

					buttonrow = new MessageActionRow()
						.addComponent(button1)
						.addComponent(button2)
						.addComponent(button3)
						.addComponent(button4)
						.addComponent(button5)

					currentPage = 0
					queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], component: buttonrow });
				}
			} catch { }
		});
	}
	client.chuyentrang2 = async function swap_pages3(client, message, embeds) {
		let currentPage = 0;
		const { MessageButton, MessageActionRow } = require("discord.js");

		let buttonrow1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('PRIMARY')
					.setLabel('⏪')
					.setCustomId('first'),
				new MessageButton()
					.setStyle('SECONDARY')
					.setLabel('⬅️')
					.setCustomId('back'),
				new MessageButton()
					.setStyle('SUCCESS')
					.setLabel('❌')
					.setCustomId('home'),

				new MessageButton()
					.setStyle('SECONDARY')
					.setLabel('➡️')
					.setCustomId('next'),
				new MessageButton()
					.setStyle('PRIMARY')
					.setLabel('⏩')
					.setCustomId('last')
			);




		if (embeds.length === 1) return interaction.reply({ embeds: [embeds[0]] })
		const queueEmbed = await message.reply(
			{
				content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
				components: [buttonrow1],
				embeds: [embeds[currentPage]]
			}
		);



		const collector = queueEmbed.createMessageComponentCollector({
			filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
		})

		collector.on("collect", (interaction) => {





			if (interaction.customId == "next") {
				if (currentPage < embeds.length - 1) {
					currentPage++;
					queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
				} else {
					currentPage = 0
					queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
				}
			} else if (interaction.customId == "back") {

				if (currentPage !== 0) {
					--currentPage;
					queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
				} else {
					currentPage = embeds.length - 1
					queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
				}
			} else if (interaction.customId == "first") {

				currentPage = 0;
				queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
				queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
				queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });

			} else if (interaction.customId == "last") {

				currentPage = embeds.length - 1;
				queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });

			} else if (interaction.customId == "home") {

				interaction.message.delete()
			}


		})



	}
	client.chuyentrang3 = async function swap_pages2(client, message, embeds) {
		let currentPage = 0;
		const { MessageButton, MessageActionRow } = require("discord.js");

		let buttonrow1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('PRIMARY')
					.setEmoji('<:ARROW1:874262374595588117>')
					.setCustomId('skip-page1'),
				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('<:ARROW2:874262374733987860>')
					.setCustomId('back-page'),
				new MessageButton()
					.setStyle('SUCCESS')
					.setEmoji('<:HOME:894217044013248532>')
					.setCustomId('home-page'),
				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('<:ARROW3:874262374541049896>')
					.setCustomId('next-page'),
				new MessageButton()
					.setStyle('PRIMARY')
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
		)
		var collector = queueEmbed.createMessageComponentCollector({
			filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
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
	client.chuyentrangfull = async function chuyen_trang(client, message, author, embeds, home, menu) {
		let currentPage = 0;
		const { MessageButton, MessageActionRow } = require("discord.js");

		let buttonrow1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('PRIMARY')
					.setEmoji('<:ARROW1:874262374595588117>')
					.setCustomId('skip-page1'),
				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('<:ARROW2:874262374733987860>')
					.setCustomId('back-page'),
				new MessageButton()
					.setStyle('SUCCESS')
					.setEmoji('<:HOME:894217044013248532>')
					.setCustomId('home-page'),
				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('<:ARROW3:874262374541049896>')
					.setCustomId('next-page'),
				new MessageButton()
					.setStyle('PRIMARY')
					.setEmoji('<:ARROW4:874262374608150578>')
					.setCustomId('skip-page2')
			);

		if (embeds.length === 1) return message.edit({ embeds: [embeds[0]] })
		const queueEmbed = await message.edit(
			{
				content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
				components: [buttonrow1],
				embeds: [embeds[currentPage]]
			}
		)
		var collector = queueEmbed.createMessageComponentCollector({
			filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
		})
		collector.on("collect", (interaction) => {
			if (interaction.user.id !== author.id) return interaction.reply({ content: "Không phải nút dành cho bạn!", ephemeral: true })
			if (interaction.customId == "next-page") {
				if (currentPage < embeds.length - 1) {
					currentPage++;
					queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
				}
				else {
					currentPage = 0
					queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
				}
			}
			else if (interaction.customId == "back-page") {
				if (currentPage !== 0) {
					--currentPage;
					queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
				} else {
					currentPage = embeds.length - 1
					queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
				}
			}
			else if (interaction.customId == "skip-page1") {
				currentPage = 0;
				// queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
				// queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
				queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
			}
			else if (interaction.customId == "skip-page2") {
				currentPage = embeds.length - 1;
				queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]], components: [buttonrow1] });
			}
			else if (interaction.customId == "home-page") {
				interaction.message.edit({ embeds: [home], components: [menu] })
			}
		})
	}
	const levelSchema = require("../models/ExplvSchema")
	const expSchema = require("../models/ExpSchema")
	client.expchat = async function expchat(client, memberid, message) {
		let a = await client.cd(memberid, `expchat`)
		let data = await client.newday(a)
		let after = data.after
		let exp = await expSchema.findOne({ memberid })
		let lv = await levelSchema.findOne({ memberid })
		let quanlity = await expSchema.findOne({ memberid: `${memberid}.limitday` })
		if (!quanlity) {
			quanlity = new expSchema({ memberid: `${memberid}.limitday`, exp: 20 })
			await quanlity.save()
		}
		let limit = 20
		if (quanlity) limit = quanlity.exp
		if (limit > 0) {
			let plus = Math.floor(Math.random() * 99)
			if (!exp) {
				exp = new expSchema({ memberid, exp: plus })
				await exp.save()
			}
			else {
				exp.exp += plus
				await exp.save()
			}
			quanlity.exp -= 1
			await quanlity.save()

		}
		else if (after && limit <= 0) {
			let plus = Math.floor(Math.random() * 99)
			if (!exp) {
				exp = new expSchema({ memberid, exp: plus })
				await exp.save()
			}
			else {
				exp.exp += plus
				await exp.save()
			}
			quanlity.exp += 19
			await quanlity.save()
			await client.timeout(memberid, `expchat1`)

		}
		else {
			await client.timeout(memberid, `expchat1`)
		}

		let level
		if (!lv) {
			lv = new levelSchema({ memberid, level: 1 })
			await lv.save()
			level = 1
		}
		else {
			level = lv.level
		}
		let e = await client.exp(memberid, 'find', 0)
		let expes = e.exp
		let lvl = e.lv
		if (expes >= (lvl * lvl * 1000)) {
			lv.level += 1
			await lv.save()
			await client.cong(memberid, lvl + 1 * 1000)
			await message.channel.send(`<a:Yu_sao01:944346751505145896> | **${message.author.id}**, bạn đã lên **__${lvl + 1}__** và được thưởng **${((lvl + 1) * 1000).toLocaleString('en-us')}** Ycoin`)
		}

		console.log(after + message.author.username)
	}
	client.exp = async function exp(memberid, method, quanlity) {
		let experience = 1
		let level = 1
		let exp = await expSchema.findOne({ memberid })
		if (exp) experience = exp.exp
		let lv = await levelSchema.findOne({ memberid })
		if (lv) level = lv.level
		if (method == `add`) {
			if (!exp) {
				exp = new expSchema({ memberid, exp: quanlity })
				await exp.save()
			} else {
				exp.exp += quanlity
				await exp.save()
			}
		}
		else if (method == `tru`) {
			if (!exp) {
				exp = new expSchema({ memberid, exp: 0 })
			} else {
				exp.exp -= quanlity
			}
			await exp.save()
		}
		else if (method == `find`) {
			if (!exp) experience = 0
			else experience = exp.exp
			if (!lv) {
				lv = new levelSchema({ memberid, level: 1 })
				level = 1
			}
			else {
				level = lv.level
				let bypass = level * level * 1000
				console.log(bypass + `+` + experience)
				if (experience >= bypass) {
					lv.level += 1
					await lv.save()
					level += 1
				}
			}
		}

		return { exp: experience, lv: level }
	}
	//////////////////////////
	/////////Others////////////
	const characterSchema = require('../models/characterSchema')
	client.addcs = async function(id, name, loaichiso, soluong) {
		const data = await characterSchema.findOne({ memberid: id });
		if (loaichiso == `sucmanh`) {
			data.sucmanh += soluong
			await data.save()
		} else if (loaichiso == `nhanhnhen`) {
			data.nhanhnhen += soluong
			await data.save()
		} else if (loaichiso == `triluc`) {
			data.triluc += soluong
			await data.save()
		} else if (loaichiso == `maluc`) {
			data.maluc += soluong
			await data.save()
		} else if (loaichiso == `hapdan`) {
			data.hapdan += soluong
			await data.save()
		} else if (loaichiso == `theluc`) {
			data.theluc += soluong
			await data.save()
		} else if (loaichiso == `exp`) {
			data.exp += soluong
			await data.save()
		} else if (loaichiso == `level`) {
			data.level += soluong
			await data.save()
		} else if (loaichiso == `hp`) {
			data.hp += soluong
			await data.save()
		} else if (loaichiso == `mana`) {
			data.mana += soluong
			await data.save()
		} else if (loaichiso == `def`) {
			data.def += soluong
			await data.save()
		} else if (loaichiso == `magicdef`) {
			data.magicdef += soluong
			await data.save()
		}
		if (!data) {

			return result = false
		}
		return result = true

	}
	client.trucs = async function(id, name, loaichiso, soluong) {
		const data = await characterSchema.findOne({ memberid: id });
		if (loaichiso == `sucmanh`) {
			data.sucmanh -= soluong
			await data.save()
		} else if (loaichiso == `nhanhnhen`) {
			data.nhanhnhen -= soluong
			await data.save()
		} else if (loaichiso == `triluc`) {
			data.triluc -= soluong
			await data.save()
		} else if (loaichiso == `maluc`) {
			data.maluc -= soluong
			await data.save()
		} else if (loaichiso == `hapdan`) {
			data.hapdan -= soluong
			await data.save()
		} else if (loaichiso == `theluc`) {
			data.theluc -= soluong
			await data.save()
		} else if (loaichiso == `exp`) {
			data.exp -= soluong
			await data.save()
		} else if (loaichiso == `level`) {
			data.level -= soluong
			await data.save()
		} else if (loaichiso == `hp`) {
			data.hp -= soluong
			await data.save()
		} else if (loaichiso == `mana`) {
			data.mana -= soluong
			await data.save()
		} else if (loaichiso == `def`) {
			data.def -= soluong
			await data.save()
		} else if (loaichiso == `magicdef`) {
			data.magicdef -= soluong
			await data.save()
		}
		if (!data) {
			return result = false
		}
		return result = true

	}
	const userSchema = require('../models/userSchema')
	client.yuker = async function(id) {
		const data = await userSchema.findOne({ memberid: id });
		if (!data) {
			return { status: false, name: `Người Dùng Vô Danh`, vip: `Chưa Đăng Ký`, pro: `Chưa Đăng Ký`, about: `Không Có Danh Hiệu`, description: `Không Có Giới Thiệu` }
		}
		else {
			return { status: true, name: data.membername, vip: data.vip, pro: data.pro, about: data.about, description: data.description }
		}
	}
	client.adduser = async function(id, name) {
		const data = await userSchema.findOne({ memberid: id });
		if (!data) {
			const add = new userSchema({
				memberid: id,
				membername: name,
				vip: `Chưa Đăng Ký`,
				pro: `Chưa Đăng Ký`,
				avatar: ``,
				about: `Nông Dân Chăm Chỉ`,
				description: `Người Bạn Thân Thiện Của Yubabe`,
			})
			add.save()
			return result = true
		}
		else return result = false
	}
}
/////Đã Hết Các Functions }