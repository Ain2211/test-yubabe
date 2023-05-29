const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
  id: String,
  hero1: {
    name: String,
    nguhanh: String,
    hp: Number,
    mana: Number,
    def: Number,
    mdef: Number,
    agility: Number,
    power: Number,
    gender: String,
    exp: Number,
    noitai: Boolean,
    nhanhnhen: Number,
    skill1: Number,
    effect: Number,
    nokhi: Number
  },
  hero2: {
    name: String,
    nguhanh: String,
    hp: Number,
    mana: Number,
    def: Number,
    mdef: Number,
    agility: Number,
    power: Number,
    gender: String,
    exp: Number,
    noitai: Boolean,
    nhanhnhen: Number,
    skill1: Number,
    effect: Number,
    nokhi: Number
  },
  hero3: {
    name: String,
    nguhanh: String,
    hp: Number,
    mana: Number,
    def: Number,
    mdef: Number,
    agility: Number,
    power: Number,
    gender: String,
    exp: Number,
    noitai: Boolean,
    nhanhnhen: Number,
    skill1: Number,
    effect: Number,
    nokhi: Number
  },
});

module.exports = mongoose.model('teamSchema', teamSchema);