const mongoose = require('mongoose')

const UserStatsSchema = new mongoose.Schema({
    username: String,
    accountId: String,
    fnApiId: Number,
    epicName: String,
    seasonWindow: String,
    devices: [String],
    data: Object,
    overallData: Object,
    dateAdded: {
        type: Date,
        default: Date.now
    },
})

const UserStats = mongoose.model('UserStats', UserStatsSchema)

module.exports = UserStats
