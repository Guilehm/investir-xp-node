const https = require('../services/https')

module.exports = (req, res) => {

    res.setHeader('Content-Type', 'application/json')

    let username = req.params.username
    if (!username) {
        res.status(400).json({
            error: 'username is required'
        })
    }

    let endpoint = `https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=${username}`

    https(endpoint).then(handleSuccess, handleFailure)

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

}