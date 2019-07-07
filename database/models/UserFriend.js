const mongoose = require('mongoose')

const UserFriendSchema = new mongoose.Schema({
    username: String,
    accountId: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    stats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserStats',
        require: false,
    },
})

const UserFriend = mongoose.model('UserFriend', UserFriendSchema)

module.exports = UserFriend