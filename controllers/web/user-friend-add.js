const UserFriend = require('../../database/models/UserFriend')
const request = require('request')

module.exports = async (req, res) => {
    let handleSuccess = user => {
        // TODO: Add messages

        let hostname = req.headers.host
        let protocol = req.connection.encrypted ? 'https' : 'http'
        let path = `${protocol}://${hostname}/user/friend/stats/update/`
        request.get(path)
        res.redirect('/user/friend/list')
    }

    let handleError = error => {
        // TODO: Add messages
        res.redirect('/user/friend/list')
    }

    let createFriend = data => {
        UserFriend.findOneAndUpdate({ username: req.body.username },
            { user: req.session.userId, accountId: JSON.parse(data).uid }, {
                upsert: true, new: true, runValidators: true, rawResult: true
            }
        ).then(handleSuccess, handleError)
    }

    let { username } = req.body
    let URL = `https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=${username}`

    await request(URL, (error, response, body) => {
        if (error) handleError(error)
        createFriend(body)
    })
}
