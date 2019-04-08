const mongoose = require('mongoose')

const FriendSchema = new mongoose.Schema({
    accountId: {
        type: String,
        required: true,
        unique: true,
    },
    mainMode: {
        type: String,
        required: true,
        enum: ['keyboardmouse', 'gamepad']
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
})

const Friend = mongoose.model('Friend', FriendSchema)

module.exports = Friend
