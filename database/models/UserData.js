const mongoose = require('mongoose')

const UserDataSchema = new mongoose.Schema({
	uid: String,
	username: String,
	platforms: [String],
	seasons: [String],
    dateAdded: {
        type: Date,
        default: Date.now
    },
})

const UserData = mongoose.model('UserData', UserDataSchema)

module.exports = UserData
