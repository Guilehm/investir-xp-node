const UserStats = require('../../database/models/UserStats')
const UserFriend = require('../../database/models/UserFriend')
const request = require('request')

module.exports = async (req, res) => {

    let createUserStats = async friend => {
        let accountId = friend.accountId
        let endpoint = 
            `https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=${accountId}`

        await request(endpoint, (err, response, body) => {
            if (!err) {
                UserStats.create({body}, (err, stats) => {
                    if (!err) {
                        friend.stats = stats._id
                        friend.save()
                    }
                })
            }
        })
        
    }

    UserFriend.find({ 
        user: req.session.userId,
        accountId: {$ne: null}
    }).exec((err, friends) => {
        if (!err) {
            friends.forEach(friend => {
                createUserStats(friend)
            })
        }
    })

    res.redirect('/')
}