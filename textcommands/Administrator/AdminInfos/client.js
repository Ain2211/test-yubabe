let Client = `<ref *1> Client {
  _events: [Object: null prototype] {
    shardDisconnect: [Function (anonymous)],
    ready: [Function (anonymous)],
    disconnect: [Function (anonymous)],
    reconnecting: [Function (anonymous)],
    guildCreate: [Function (anonymous)],
    interactionCreate: [Function (anonymous)],
    messageCreate: [Function (anonymous)],
    messageReactionAdd: [Function (anonymous)]
  },
  _eventsCount: 8,
  _maxListeners: undefined,
  options: {
    intents: 114687,
    partials: [
      3, 4, 0, 1,
      2, 6, 5
    ],
    allowedMentions: { parse: [Array], repliedUser: true },
    closeTimeout: 5000,
    waitGuildTimeout: 15000,
    shardCount: 1,
    makeCache: [Function (anonymous)],
    failIfNotExists: true,
    presence: { status: 'online', user: [Object] },
    sweepers: { threads: [Object] },
    ws: {
      large_threshold: 50,
      compress: false,
      properties: [Object],
      version: 10,
      presence: [Object]
    },
    rest: {
      agent: [Getter],
      api: 'https://discord.com/api',
      authPrefix: 'Bot',
      cdn: 'https://cdn.discordapp.com',
      headers: {},
      invalidRequestWarningInterval: 0,
      globalRequestsPerSecond: 50,
      offset: 50,
      rejectOnRateLimit: null,
      retries: 3,
      timeout: 15000,
      userAgentAppendix: 'Node.js v16.13.2',
      version: '10',
      hashSweepInterval: 14400000,
      hashLifetime: 86400000,
      handlerSweepInterval: 3600000
    },
    jsonTransformer: [Function: toSnakeCase],
    shards: [ 0 ]
  },
  rest: REST {
    _events: [Object: null prototype] {
      newListener: [Function (anonymous)],
      removeListener: [Function (anonymous)]
    },
    _eventsCount: 2,
    _maxListeners: undefined,
    cdn: CDN { base: 'https://cdn.discordapp.com' },
    requestManager: _RequestManager {
      _events: [Object: null prototype],
      _eventsCount: 4,
      _maxListeners: undefined,
      agent: [Agent],
      globalDelay: null,
      globalReset: 1666500199216,
      hashes: [Collection [Map]],
      handlers: [Collection [Map]],
      options: [Object],
      globalRemaining: 49,
      hashTimer: Timeout {
        _idleTimeout: 14400000,
        _idlePrev: [TimersList],
        _idleNext: [TimersList],
        _idleStart: 254,
        _onTimeout: [Function (anonymous)],
        _timerArgs: undefined,
        _repeat: 14400000,
        _destroyed: false,
        [Symbol(refed)]: false,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 10,
        [Symbol(triggerId)]: 1
      },
      handlerTimer: Timeout {
        _idleTimeout: 3600000,
        _idlePrev: [Timeout],
        _idleNext: [TimersList],
        _idleStart: 254,
        _onTimeout: [Function (anonymous)],
        _timerArgs: undefined,
        _repeat: 3600000,
        _destroyed: false,
        [Symbol(refed)]: false,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 11,
        [Symbol(triggerId)]: 1
      },
      [Symbol(kCapture)]: false
    },
    [Symbol(kCapture)]: false
  },
  ws: WebSocketManager {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    gateway: 'wss://gateway.discord.gg/',
    totalShards: 1,
    shards: Collection(1) [Map] { 0 => [WebSocketShard] },
    status: 0,
    destroyed: false,
    reconnecting: false,
    [Symbol(kCapture)]: false
  },
  actions: ActionsManager {
    client: [Circular *1],
    ApplicationCommandPermissionsUpdate: ApplicationCommandPermissionsUpdateAction { client: [Circular *1] },
    ChannelCreate: ChannelCreateAction { client: [Circular *1] },
    ChannelDelete: ChannelDeleteAction { client: [Circular *1] },
    ChannelUpdate: ChannelUpdateAction { client: [Circular *1] },
    GuildBanAdd: GuildBanAdd { client: [Circular *1] },
    GuildBanRemove: GuildBanRemove { client: [Circular *1] },
    GuildChannelsPositionUpdate: GuildChannelsPositionUpdate { client: [Circular *1] },
    GuildDelete: GuildDeleteAction { client: [Circular *1] },
    GuildEmojiCreate: GuildEmojiCreateAction { client: [Circular *1] },
    GuildEmojiDelete: GuildEmojiDeleteAction { client: [Circular *1] },
    GuildEmojiUpdate: GuildEmojiUpdateAction { client: [Circular *1] },
    GuildEmojisUpdate: GuildEmojisUpdateAction { client: [Circular *1] },
    GuildIntegrationsUpdate: GuildIntegrationsUpdate { client: [Circular *1] },
    GuildMemberRemove: GuildMemberRemoveAction { client: [Circular *1] },
    GuildMemberUpdate: GuildMemberUpdateAction { client: [Circular *1] },
    GuildRoleCreate: GuildRoleCreate { client: [Circular *1] },
    GuildRoleDelete: GuildRoleDeleteAction { client: [Circular *1] },
    GuildRoleUpdate: GuildRoleUpdateAction { client: [Circular *1] },
    GuildRolesPositionUpdate: GuildRolesPositionUpdate { client: [Circular *1] },
    GuildScheduledEventCreate: GuildScheduledEventCreateAction { client: [Circular *1] },
    GuildScheduledEventDelete: GuildScheduledEventDeleteAction { client: [Circular *1] },
    GuildScheduledEventUpdate: GuildScheduledEventUpdateAction { client: [Circular *1] },
    GuildScheduledEventUserAdd: GuildScheduledEventUserAddAction { client: [Circular *1] },
    GuildScheduledEventUserRemove: GuildScheduledEventUserRemoveAction { client: [Circular *1] },
    GuildStickerCreate: GuildStickerCreateAction { client: [Circular *1] },
    GuildStickerDelete: GuildStickerDeleteAction { client: [Circular *1] },
    GuildStickerUpdate: GuildStickerUpdateAction { client: [Circular *1] },
    GuildStickersUpdate: GuildStickersUpdateAction { client: [Circular *1] },
    GuildUpdate: GuildUpdateAction { client: [Circular *1] },
    InteractionCreate: InteractionCreateAction { client: [Circular *1] },
    InviteCreate: InviteCreateAction { client: [Circular *1] },
    InviteDelete: InviteDeleteAction { client: [Circular *1] },
    MessageCreate: MessageCreateAction { client: [Circular *1] },
    MessageDelete: MessageDeleteAction { client: [Circular *1] },
    MessageDeleteBulk: MessageDeleteBulkAction { client: [Circular *1] },
    MessageReactionAdd: MessageReactionAdd { client: [Circular *1] },
    MessageReactionRemove: MessageReactionRemove { client: [Circular *1] },
    MessageReactionRemoveAll: MessageReactionRemoveAll { client: [Circular *1] },
    MessageReactionRemoveEmoji: MessageReactionRemoveEmoji { client: [Circular *1] },
    MessageUpdate: MessageUpdateAction { client: [Circular *1] },
    PresenceUpdate: PresenceUpdateAction { client: [Circular *1] },
    StageInstanceCreate: StageInstanceCreateAction { client: [Circular *1] },
    StageInstanceDelete: StageInstanceDeleteAction { client: [Circular *1] },
    StageInstanceUpdate: StageInstanceUpdateAction { client: [Circular *1] },
    ThreadCreate: ThreadCreateAction { client: [Circular *1] },
    ThreadDelete: ThreadDeleteAction { client: [Circular *1] },
    ThreadListSync: ThreadListSyncAction { client: [Circular *1] },
    ThreadMemberUpdate: ThreadMemberUpdateAction { client: [Circular *1] },
    ThreadMembersUpdate: ThreadMembersUpdateAction { client: [Circular *1] },
    TypingStart: TypingStart { client: [Circular *1] },
    UserUpdate: UserUpdateAction { client: [Circular *1] },
    VoiceStateUpdate: VoiceStateUpdate { client: [Circular *1] },
    WebhooksUpdate: WebhooksUpdate { client: [Circular *1] }
  },
  voice: ClientVoiceManager { adapters: Map(0) {} },
  shard: ShardClientUtil {
    client: [Circular *1],
    mode: 'process',
    parentPort: null
  },
  users: UserManager {},
  guilds: GuildManager {},
  channels: ChannelManager {},
  sweepers: Sweepers {
    options: { threads: [Object] },
    intervals: {
      applicationCommands: null,
      bans: null,
      emojis: null,
      invites: null,
      guildMembers: null,
      messages: null,
      presences: null,
      reactions: null,
      stageInstances: null,
      stickers: null,
      threadMembers: null,
      threads: Timeout {
        _idleTimeout: 3600000,
        _idlePrev: [TimersList],
        _idleNext: [Timeout],
        _idleStart: 272,
        _onTimeout: [Function (anonymous)],
        _timerArgs: undefined,
        _repeat: 3600000,
        _destroyed: false,
        [Symbol(refed)]: false,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 12,
        [Symbol(triggerId)]: 1
      },
      users: null,
      voiceStates: null
    }
  },
  presence: ClientPresence {
    userId: null,
    guild: null,
    status: 'online',
    activities: [],
    clientStatus: null
  },
  user: ClientUser {
    id: '936872532932440065',
    bot: true,
    system: false,
    flags: UserFlagsBitField { bitfield: 65536 },
    username: 'Yubabe',
    discriminator: '7331',
    avatar: '5a472fe1da7ca00cc26d675a9ac25f13',
    banner: undefined,
    accentColor: undefined,
    verified: true,
    mfaEnabled: true
  },
  application: ClientApplication {
    id: '936872532932440065',
    name: null,
    description: null,
    icon: null,
    tags: [],
    installParams: null,
    customInstallURL: null,
    flags: ApplicationFlagsBitField { bitfield: 11300864 },
    cover: null,
    rpcOrigins: [],
    botRequireCodeGrant: null,
    botPublic: null,
    owner: null,
    commands: ApplicationCommandManager {
      permissions: [ApplicationCommandPermissionsManager]
    }
  },
  readyTimestamp: 1666499955988,
  commands: Collection(4) [Map] {
    'thanhtrung' => { data: [Object], execute: [AsyncFunction: execute] },
    'echo' => { data: [Object], execute: [AsyncFunction: execute] },
    'ywyinfo' => { data: [Object], execute: [AsyncFunction: execute] },
    'ping' => { data: [Object], execute: [AsyncFunction: execute] }
  },
  tcommands: Collection(6) [Map] {
    'additem' => {
      name: 'additem',
      description: [Array],
      aliases: [Array],
      usage: [Array],
      cooldown: 0,
      category: 'Admins',
      canuse: 'owners',
      errorcd: [Array],
      run: [AsyncFunction: run]
    },
    'banbot' => {
      name: 'banbot',
      description: [Array],
      aliases: [Array],
      usage: [Array],
      cooldown: 0,
      category: 'Admins',
      canuse: 'admins',
      errorcd: [Array],
      run: [AsyncFunction: run]
    },
    'addcus' => {
      name: 'addcus',
      description: [Array],
      aliases: [Array],
      usage: [Array],
      cooldown: 0,
      category: 'Admins',
      canuse: 'owners',
      errorcd: [Array],
      run: [AsyncFunction: run]
    },
    'test' => {
      name: 'test',
      description: [Array],
      aliases: [Array],
      usage: [Array],
      cooldown: 5000,
      category: 'Admins',
      canuse: 'admins',
      errorcd: [Array],
      run: [AsyncFunction: run]
    },
    'unbanbot' => {
      name: 'unbanbot',
      description: [Array],
      aliases: [Array],
      usage: [Array],
      cooldown: 0,
      category: 'Admins',
      canuse: 'admins',
      errorcd: [Array],
      run: [AsyncFunction: run]
    },
    'ping' => {
      name: 'ping',
      description: [Array],
      aliases: [Array],
      usage: [Array],
      cooldown: 10000,
      category: 'Utils',
      canuse: 'everyone',
      errorcd: [Array],
      run: [AsyncFunction: run]
    }
  },
  aliases: Collection(8) [Map] {
    'add' => 'additem',
    'thanhtrung' => 'banbot',
    'custom' => 'addcus',
    'example' => 'test',
    'anxa' => 'unbanbot',
    'ping' => 'ping',
    'pong' => 'ping',
    'uptime' => 'ping'
  },
  categories: [
    'OldFunctions.js',
    'commands.js',
    'embedHandlers.js',
    'events.js',
    'functions.js',
    'helperHandlers.js',
    'hunthandler.js'
  ],
  config: {
    hatgiong: {
      lua: '<:Yu_lua:953059348777672705>',
      khoaimi: '<:Yu_khoaimi:953059349637500968>',
      cachua: '<:Yu_cachua:953059348794470420>',
      caingot: '<:Yu_caingot:953059348731543592>',
      ot: '<:Yu_ot:953103262318477342>',
      carot: '<:Yu_carot:953103263895535626>',
      khoaitay: '<:Yu_khoaitay:953103263178305566>',
      mia: '<:Yu_mia:953103263476117584>',
      dautay: '<:Yu_DauTay:953375220935295047>',
      dao: '<:Yu_Dao:953375136134877294>',
      duagang: '<:Yu_DuaGang:953375173225091133>',
      mit: '<:Yu_Mit:953237141440327700>',
      r: '<:Yu_field:953050619558645820>',
      co: '<:Yu_co:953408530474475520>',
      ngo: '<:Yu_ngo:953971194565124186>',
      dua: '<:Yu_dua:953977710072455259>',
      cam: '<:Yu_cam:953975517143519272>',
      gacon: '<:Yu_GaCon:953394343148920902>',
      bocon: '<:Yu_BoCon:953394492503908362>',
      heocon: '<:Yu_HeoCon:953396171181817997>',
      ga: '<:Yu_Ga:953394305614094336>',
      bo: '<:Yu_ConBo:953394436086308934>',
      heo: '<:Yu_Heo:953394386165698610>'
    },
    admins: [
      '896739787392819240',
      '696893548863422494',
      '889835365517651998',
      '945071381182296144',
      '650516583738769428',
      '889832634056863774',
      '626811137035337758',
      '987995671732838420',
      '893688556965466152',
      '792636005915557948'
    ],
    emoji: {
      fail: '<:fail:1032637321448796232>',
      success: '<:success:1032637139961270323>'
    },
    owner: [ '896739787392819240', '696893548863422494' ]
  },
  e: {
    fail: '<:fail:1032637321448796232>',
    success: '<:success:1032637139961270323>'
  },
  admin: [
    '896739787392819240',
    '696893548863422494',
    '889835365517651998',
    '945071381182296144',
    '650516583738769428',
    '889832634056863774',
    '626811137035337758',
    '987995671732838420',
    '893688556965466152',
    '792636005915557948'
  ],
  owner: [ '896739787392819240', '696893548863422494' ],
  hg: {
    lua: '<:Yu_lua:953059348777672705>',
    khoaimi: '<:Yu_khoaimi:953059349637500968>',
    cachua: '<:Yu_cachua:953059348794470420>',
    caingot: '<:Yu_caingot:953059348731543592>',
    ot: '<:Yu_ot:953103262318477342>',
    carot: '<:Yu_carot:953103263895535626>',
    khoaitay: '<:Yu_khoaitay:953103263178305566>',
    mia: '<:Yu_mia:953103263476117584>',
    dautay: '<:Yu_DauTay:953375220935295047>',
    dao: '<:Yu_Dao:953375136134877294>',
    duagang: '<:Yu_DuaGang:953375173225091133>',
    mit: '<:Yu_Mit:953237141440327700>',
    r: '<:Yu_field:953050619558645820>',
    co: '<:Yu_co:953408530474475520>',
    ngo: '<:Yu_ngo:953971194565124186>',
    dua: '<:Yu_dua:953977710072455259>',
    cam: '<:Yu_cam:953975517143519272>',
    gacon: '<:Yu_GaCon:953394343148920902>',
    bocon: '<:Yu_BoCon:953394492503908362>',
    heocon: '<:Yu_HeoCon:953396171181817997>',
    ga: '<:Yu_Ga:953394305614094336>',
    bo: '<:Yu_ConBo:953394436086308934>',
    heo: '<:Yu_Heo:953394386165698610>'
  },
  gem: [Function (anonymous)],
  addgem: [Function (anonymous)],
  trugem: [Function (anonymous)],
  cash: [Function (anonymous)],
  cong: [Function (anonymous)],
  tru: [Function (anonymous)],
  tietkiem: [Function (anonymous)],
  ruttien: [Function (anonymous)],
  bank: [Function (anonymous)],
  send: [AsyncFunction (anonymous)],
  dms: [AsyncFunction (anonymous)],
  sendFile: [AsyncFunction (anonymous)],
  reply: [AsyncFunction (anonymous)],
  activatepassport: [Function (anonymous)],
  datepassport: [Function (anonymous)],
  checkpassport: [Function (anonymous)],
  sleep: [Function (anonymous)],
  timeout: [Function (anonymous)],
  cd: [Function (anonymous)],
  checkcd: [Function (anonymous)],
  newday: [AsyncFunction (anonymous)],
  [Symbol(kCapture)]: true
}
<ref *1> Message {
  channelId: '942015852310577162',
  guildId: '896744428100804688',
  id: '1033602251715002459',
  createdTimestamp: 1666500380210,
  type: 0,
  system: false,
  content: '-test',
  author: User {
    id: '896739787392819240',
    bot: false,
    system: false,
    flags: UserFlagsBitField { bitfield: 128 },
    username: 'YL ● Yukii Gene',
    discriminator: '7737',
    avatar: 'f14c5089dcd94df20aa9b362b7140a8a',
    banner: undefined,
    accentColor: undefined
  },
  pinned: false,
  tts: false,
  nonce: '1033602257091821568',
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
}`