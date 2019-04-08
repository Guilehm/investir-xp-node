const https = require('../../services/https')
const UserData = require('../../database/models/UserData')

module.exports = async (req, res) => {

    res.setHeader('Content-Type', 'application/json')

    let username = req.params.username

    let handleSuccess = data => {
        UserData.create(data)
        res.end(JSON.stringify(data))
    }

    let handleFailure = error => {
        res.end(JSON.stringify({
            error: error,
        }))
    }

    let endpoint = `https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=${username}`
    
    await https(endpoint).then(handleSuccess, handleFailure)

}