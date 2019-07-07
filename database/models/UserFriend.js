const mongoose = require('mongoose')

const UserFriendSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    username: String,
    accountId: String,
    stats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserStats',
        require: false,
    },
})

const UserFriend = mongoose.model('UserFriend', UserFriendSchema)

module.exports = UserFriend