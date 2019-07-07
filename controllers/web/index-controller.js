const Friend = require('../../database/models/Friend')
const request = require('request')

module.exports = async (req, res) => {

    let postToUserStatsApi = accountId => {
        let hostname = req.headers.host
        let protocol = req.connection.encrypted ? 'https' : 'http'
        let path = `${protocol}://${hostname}/api/users/${accountId}/`
        request.post(path)
    }

    let createFriendStats = () => {
        Friend.find({}).select(
            'accountId -_id'
        ).exec((err, friends) => {
            if (!err) {
                friends.forEach(friend => {
                    postToUserStatsApi(friend.accountId)
                });
            }
        }) 
    }

    createFriendStats()

    res.render('layouts/index.html')
}