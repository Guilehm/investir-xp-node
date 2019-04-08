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
})

const Friend = mongoose.model('Friend', FriendSchema)

module.exports = Friend
