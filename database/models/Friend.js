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
})

FriendSchema.virtual('user', {
    ref: 'UserStats',
    localField: 'accountId',
    foreignField: 'accountId',
    options: { sort: { dateAdded: -1 } }
})

const Friend = mongoose.model('Friend', FriendSchema)

module.exports = Friend
