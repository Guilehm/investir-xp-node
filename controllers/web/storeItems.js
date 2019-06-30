const request = require('request')

module.exports = (req, res) => {
    let token = process.env.TOKEN
    const URL = `https://fortnite-api.theapinetwork.com/store/get?token=${token}`

    let handleError = error => {
        res.render('layouts/store-items', {
            error
        })
    }

    let handleSuccess = body => {
        res.render('layouts/store-items', {
            items: JSON.parse(body).data,
        })
    }

    request(URL, (error, response, body) => {
        if (error) handleError(error)
        return handleSuccess(body)
    })
}