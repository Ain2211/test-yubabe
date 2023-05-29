// const client = require("../bot.js")
module.exports = async (client) => {
const giveawayModel = require("../models/giveawaySchema")
const { GiveawaysManager } = require('discord-giveaways');
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    // This function is called when the manager needs to get all giveaways which are stored in the database.
    async getAllGiveaways() {
        // Get all giveaways from the database. We fetch all documents by passing an empty condition.
        return await giveawayModel.find().lean().exec();
    }

    // This function is called when a giveaway needs to be saved in the database.
    async saveGiveaway(messageId, giveawayData) {
        // Add the new giveaway to the database
        await giveawayModel.create(giveawayData);
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be edited in the database.
    async editGiveaway(messageId, giveawayData) {
        // Find by messageId and update it
        await giveawayModel.updateOne({ messageId }, giveawayData).exec();
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be deleted from the database.
    async deleteGiveaway(messageId) {
        // Find by messageId and delete it
        await giveawayModel.deleteOne({ messageId }).exec();
        // Don't forget to return something!
        return true;
    }
};
const manager = new GiveawayManagerWithOwnDatabase(client, {
    // storage: './giveaways.json',
    options: {
      giveaway : "💝💝Give Away💝💝",
      forceUpdateEvery: 1,
      endedGiveawaysLifetime: 43200000
    }, 
    default: {
        botsCanWin: false,
        embedColor: '#FFCC00',
        embedColorEnd: '#000000',
        reaction: '💝'
    },
    
});
client.giveawaysManager = manager;
manager.on('giveawayEnded', (giveaway, winners) => {
  const {EmbedBuilder} = require("discord.js")
 giveaway.channel.send({content: 'Chúc mừng: ' + winners + ', bạn đã trúng ga **' + giveaway.prize , embeds : [
   new EmbedBuilder()
  .setDescription(`[Đi Đến Giveaways](${giveaway.URL})`)]});
});
}