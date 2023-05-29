const { EventEmitter } = require('node:events');
const { setTimeout, setInterval } = require('node:timers');
const { writeFile, readFile, access } = require('node:fs/promises');
const mongoose = require('mongoose');
const mongo_url = process.env.mongo_url
module.exports = {
  name: 'guildCreate',
  async execute(guild) {
    const client = require('../bot.js')
    console.log(`Tôi đã được mời vào GUILD ${guild.name}`)
    let g = client.guilds.cache.find(g => g.id == "995424086916350052")
    let cn =  g.channels.cache.find(c => c.id == "1024815539081723945")
    await cn
      .send(`<@896739787392819240> ơi, tôi đã được mời vào một server mới!
Guild ID : ${guild.id}
Guild name : ${guild.name}
Member : ${guild.members.cache.size}
ID OWNER :  ${guild.ownerId}
URL Tùy Chỉnh : ${guild.vanityURLUses ? guild.vanityURLUses : "Không Có"}
    `)
      .catch(e => console.log(e))
  }
}
/*
  Guild {
  id: '995424086916350052',
  name: 'YwY Team',
  icon: '4075b3c32fdcb2c87deb87fa4cec6fae',
  features: [],
  commands: <ref *1> GuildApplicationCommandManager {
    permissions: ApplicationCommandPermissionsManager {
      manager: [Circular *1],
      guild: [Circular *2],
      guildId: '995424086916350052',
      commandId: null
    },
    guild: [Circular *2]
  },
  members: GuildMemberManager { guild: [Circular *2] },
  channels: GuildChannelManager { guild: [Circular *2] },
  bans: GuildBanManager { guild: [Circular *2] },
  roles: RoleManager { guild: [Circular *2] },
  presences: PresenceManager {},
  voiceStates: VoiceStateManager { guild: [Circular *2] },
  stageInstances: StageInstanceManager { guild: [Circular *2] },
  invites: GuildInviteManager { guild: [Circular *2] },
  scheduledEvents: GuildScheduledEventManager { guild: [Circular *2] },
  splash: null,
  banner: null,
  description: null,
  verificationLevel: 0,
  vanityURLCode: null,
  nsfwLevel: 0,
  premiumSubscriptionCount: 0,
  available: true,
  discoverySplash: null,
  memberCount: 26,
  large: false,
  premiumProgressBarEnabled: false,
  applicationId: null,
  afkTimeout: 300,
  afkChannelId: '995431046311051306',
  systemChannelId: '995431321788760085',
  premiumTier: 0,
  widgetEnabled: null,
  widgetChannelId: null,
  explicitContentFilter: 0,
  mfaLevel: 0,
  joinedTimestamp: 1664405278859,
  defaultMessageNotifications: 1,
  systemChannelFlags: SystemChannelFlagsBitField { bitfield: 9 },
  maximumMembers: 500000,
  maximumPresences: null,
  maxVideoChannelUsers: 25,
  approximateMemberCount: null,
  approximatePresenceCount: null,
  vanityURLUses: null,
  rulesChannelId: null,
  publicUpdatesChannelId: null,
  preferredLocale: 'en-US',
  ownerId: '896739787392819240',
  emojis: GuildEmojiManager { guild: [Circular *2] },
  stickers: GuildStickerManager { guild: [Circular *2] },
  shardId: 0
}
*/