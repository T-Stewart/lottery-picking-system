const mongoose = require('mongoose')

//Schema
const Schema = mongoose.Schema;
const lotteryEntrantSchema = Schema({
    name: String,
    ticketRequest: Number, 
})

//model
const LotteryEntrant = mongoose.model('LoteryEntrant', lotteryEntrantSchema);

module.exports = LotteryEntrant