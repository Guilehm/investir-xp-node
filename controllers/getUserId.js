const https = require('../services/https')

module.exports = (req, res) => {
    let username = req.query.username
    if (!username) {
        res.status(400).json({
            error: 'user id is required'
        })
    }

    let endpoint = `https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=${username}`

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