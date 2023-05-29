const { ClientUser, ReactionManager, ReactionEmoji, ReactionUserManager } = require("discord.js")
const client = require("../bot.js")
module.exports = {
  name: 'messageReactionAdd',
  async execute(react, user) {
    if (react.message.id == "1019760013331406848") {
      if (react._emoji.id == "941813661989761056") {
        let userId = user.id
     let rm = new ReactionUserManager(react)
        let member = rm.client.cache.fetch(userId)
await member.roles.add("941812653129596949")
      await member.send("Bạn đã được thêm role bầu cua")
    }
    }
  },
};
/**
Data client :
<ref *2> MessageReaction {
  message: <ref *1> Message {
    channelId: '942015852310577162',
    guildId: '896744428100804688',
    id: '1019738594627305513',
    createdTimestamp: 1663195026786,
    system: null,
    type: null,
    content: null,
    author: null,
    pinned: null,
    tts: null,
    nonce: null,
    embeds: [],
    components: [],
    attachments: Collection(0) [Map] {},
    stickers: Collection(0) [Map] {},
    editedTimestamp: null,
    reactions: ReactionManager { message: [Circular *1] },
    mentions: MessageMentions {
      everyone: false,
      users: Collection(0) [Map] {},
      roles: Collection(0) [Map] {},
      _members: null,
      _channels: null,
      _parsedUsers: null,
      crosspostedChannels: Collection(0) [Map] {},
      repliedUser: null
    },
    webhookId: null,
    groupActivityApplication: null,
    applicationId: null,
    activity: null,
    flags: MessageFlagsBitField { bitfield: 0 },
    reference: null,
    interaction: null
  },
  me: false,
  users: ReactionUserManager { reaction: [Circular *2] },
  _emoji: ReactionEmoji {
    animated: null,
    name: 'AngelWings2',
    id: '912284263947313162',
    reaction: [Circular *2]
  },
  count: null
}
*/
/*
Data message
User {
  id: '896739787392819240',
  bot: false,
  system: false,
  flags: UserFlagsBitField { bitfield: 128 },
  username: 'YL ● Yukii',
  discriminator: '9036',
  avatar: '80686fc26333aff5b11b84edf1642fa1',
  banner: undefined,
  accentColor: undefined
}
*/

