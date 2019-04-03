const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    accountId: String,
    fnApiId: Number,
    epicName: String,
    seasonWindow: String,
    devices: [String],
    data: Object,
})

const User = mongoose.Schema('User', UserSchema)

module.exports = User
