const request = require('request')

module.exports = async (req, res) => {
    let token = process.env.TOKEN
    const URL = `https://fortnite-api.theapinetwork.com/items/list?token=${token}`

    let handleError = error => {
        res.render('layouts/item-list', {
            error
        })
    }

    let handleSuccess = body => {
        res.render('layouts/item-list', {
            items: JSON.parse(body).data,
        })
    }

    request(URL, (error, response, body) => {
        if (error) handleError(error)
        return handleSuccess(body)
    })

}
