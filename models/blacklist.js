const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
  clientID: String,
  users: [String],
  guilds: [String]
});

module.exports = mongoose.model("blacklists", blacklistSchema);
