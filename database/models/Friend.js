const mongoose = require('mongoose')

const FriendSchema = new mongoose.Schema({
    accountId: {
        type: String,
        required: true,
        unique: true,
    },
    mainDevice: {
        type: String,
        required: true,
        enum: ['keyboardmouse', 'gamepad', 'touch']
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
})

const Friend = mongoose.model('Friend', FriendSchema)

module.exports = Friend
