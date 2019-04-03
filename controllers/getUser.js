const https = require('../services/https')

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
        res.end(JSON.stringify({
            data
        }))
    }

    let handleFailure = error => {
        res.end(JSON.stringify({
            error: error,
        }))
    }

    https(endpoint).then(handleSuccess, handleFailure)
}