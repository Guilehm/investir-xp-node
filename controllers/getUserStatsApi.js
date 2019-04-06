const https = require('../services/https')

module.exports = async (req, res) => {

    res.setHeader('Content-Type', 'application/json')

    let userId = req.params.userId

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

    let endpoint = `https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=${userId}`

    await https(endpoint).then(handleSuccess, handleFailure)

}