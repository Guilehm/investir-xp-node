const UserFriend = require('../../database/models/UserFriend')
const request = require('request')

module.exports = async (req, res) => {
    let handleSuccess = user => {
        // TODO: Add messages
        res.redirect('/user/friend/list')
    }

    let handleError = error => {
        // TODO: Add messages
        res.redirect('/user/friend/list')
    }

    let createFriend = data => {
        UserFriend.create({
            user: req.session.userId,
            accountId: JSON.parse(data).uid,
            ...req.body,
        }).then(handleSuccess, handleError)
    }

    let { username }  = req.body
    let URL = `https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=${username}`

    await request(URL, (error, response, body) => {
        if (error) handleError(error)
        createFriend(body)
    })
}
