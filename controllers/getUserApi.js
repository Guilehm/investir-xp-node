const https = require('../services/https')
const User = require('../database/models/User')

module.exports = (req, res) => {
    let userId = req.params.userId
    if (!userId) {
        res.status(400).json({
            error: 'user id is required'
        })
    }

    let endpoint = `https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=${userId}`

    res.setHeader('Content-Type', 'application/json')

    let handleSuccess = data => {
        User.create(data, (error, user) => {
            res.end(JSON.stringify({
                data
            }))
        })
    }

    let handleError = error => {
        res.end(JSON.stringify({
            error: error,
        }))
    }

    https(endpoint).then(handleSuccess, handleError)
}