const voteSchema = require('./models/voteSchema')
const vipSchema = require('./models/vipSchema')
const path = require('node:path')
const init = async (client) => {
  console.log('[EXPRESS] STARTING SERVER')
  const express = require('express')
  const app = express()
  const Topgg = require('@top-gg/sdk')
  const { QuickDB } = require("quick.db")
  const db = new QuickDB()

  // add your top.gg webhook authorization (not bot token)
  const webhook = new Topgg.Webhook('thanhnamgene1')
  app.post("/yubabehook", webhook.listener(async vote => {
    try {
      console.log(vote)
      if (vote) {
        let pro = false
        let vip = false
        const provip = await client.provip2(client, vote.user)
        if (provip.vip) vip = true
        else if (provip.pro) pro = true
        //Cài đặt thời gian khi uservote để nhắc vote!
        await db.set(`${vote.user}.voteTimestamp`, Date.now())
        //Xóa key khi đã nhắc của lần trước!
        await db.delete(`${vote.user}.reminded`)
        let member = await client.users.cache.find(user => user.id === vote.user)
        let votes = 0
        let streaks = 0
        let user = await voteSchema.findOne({ memberid: vote.user })
        if (user) votes = user.vote, streaks = user.streak
        let timeout = 86400000
        let lastused = await client.cd(vote.user, `voting`)
        let used = client.checkcd(lastused, timeout)
        let cooldown = used.after
        let msg = ``
        if (pro) msg += `${client.e.pp} | `
        if (vip) msg += `${client.e.vp} | `
        if (!user) {
          let add = new voteSchema({
            memberid: vote.user, type: vote.type, isWeekend: vote.isWeekend, query: vote.query, vote: 1, streak: 1
          })
          await add.save()
          msg += `**${member.username}**, cảm ơn bạn đã vote cho Yubabe! `
        }
        else if (user && !cooldown) {
          user.vote += 1
          user.streak += 1
          await user.save()
          msg += `**${member.username}**, bạn đã vote liên tục cho Yubabe **${user.streak + 1}** lần. `
        }
        else if (user && cooldown) {
          user.vote += 1
          user.streak = 1
          await user.save()
          streaks = 0
          msg += `**${member.username}**, bạn đã bỏ lỡ streak điểm danh liên tục [24h]. `
        }
        await client.timeout(vote.user, `voting`)
        let VoteMoney = Math.floor(Math.random() * 2500);
        if (pro) VoteMoney += Math.floor(Math.random() * 2500);
        if (vip) VoteMoney += Math.floor(Math.random() * 5000);
        if (vote.isWeekend) VoteMoney += Math.floor(Math.random() * 2500);
        msg += `Bạn đã nhận được **__${VoteMoney.toLocaleString("en-us")}__** ${client.e.coin}, `
        let gb = 1
        if (pro) gb += 2
        if (vip) gb += 3
        if (vote.isWeekend) gb *= 2
        msg += `**${gb}** <:GEMBOX:982028743952441355>.`
        let pgb = 0
        if (pro) pgb += 1
        if (vip) pgb += 2
        if (vote.isWeekend) pgb *= 2
        msg += pro||vip ? `& **${pgb}** <:PRO_GEMBOX:982028744057298964>.` : ``
        let vgb = 0
        if (vip) vgb += 2
        if (vote.isWeekend) vgb *= 2
        msg += pro|| vip ? `& **${vgb}** <:VIP_GEMBOX:982028743889543278>.` : ``
        await client.addgem(member.id, `<:GEMBOX:982028743952441355>`, parseInt(gb), 0)
        await client.addgem(member.id, `<:PRO_GEMBOX:982028744057298964>`, parseInt(pgb), 0)
        await client.addgem(member.id, `<:VIP_GEMBOX:982028743889543278>`, parseInt(vgb), 0)
        await client.cong(vote.user, VoteMoney)
        await member.send(msg).catch(e => console.log("Khong The DMS"))
      }
      else return
    } catch (e) {
      console.log(e)
    }
  })) // attach the middlewar
  app.listen(80, () => console.log('SERVER READY'))
}
module.exports = init