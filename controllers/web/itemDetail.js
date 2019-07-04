const request = require('request')

module.exports = async (req, res) => {
    let itemId = req.params.id
    let token = process.env.TOKEN
    const URL = `https://fortnite-api.theapinetwork.com/item/get?id=${itemId}`

    let handleError = error => {
        res.render('layouts/item-detail', {
            error
        })
    }

    let handleSuccess = body => {
        res.render('layouts/item-detail', {
            data: JSON.parse(body).data,
        })
    }

    const options = {
        url: URL,
        headers: { 'Authorization': token }
      }

    request(options, (error, response, body) => {
        if (error) handleError(error)
        return handleSuccess(body)
    })

}
