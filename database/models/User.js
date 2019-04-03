const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    accountId: String,
    fnApiId: Number,
    epicName: String,
    seasonWindow: String,
    devices: [String],
    data: Object,
})

const User = mongoose.model('User', UserSchema)

module.exports = User
