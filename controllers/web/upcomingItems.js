const request = require('request')

module.exports = (req, res) => {
    const URL = 'https://fortnite-public-api.theapinetwork.com/prod09/upcoming/get'

    let handleError = error => {
        res.render('layouts/upcoming-items', {
            error
        })
    }

    let handleSuccess = data => {
        res.render('layouts/upcoming-items', {
            data: data.items
        })
    }

    request(URL, (error, response, body) => {
        if (error) handleError(error)
        return handleSuccess(body)
    })
}
