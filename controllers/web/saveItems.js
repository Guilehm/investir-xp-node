const request = require('request')
const Item = require('../../database/models/Item')

module.exports = async (req, res) => {
    let token = process.env.TOKEN
    const URL = `https://fortnite-api.theapinetwork.com/items/list?token=${token}`

    let handleError = error => {
        res.end(error)
    }

    let saveItem = item => {
        Item.findOneAndUpdate({ itemId: item.itemId },
            item , {
                upsert: true, new: true, rawResult: true
            }
        ).catch(makeLogMessage)
    }

    let makeLogMessage = message => {
        console.log(message)
    }

    let handleSuccess = body => {
        let items = JSON.parse(body).data
        items.forEach(item => {
            saveItem(item)
        })
    }

    request(URL, (error, response, body) => {
        if (error) handleError(error)
        return handleSuccess(body)
    })
}