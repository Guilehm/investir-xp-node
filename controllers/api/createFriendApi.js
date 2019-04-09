const Friend = require('../../database/models/Friend')

module.exports = async (req, res) => {
    let accountId = req.params.accountId
    let mainDevice = req.body.mainDevice

    let handleError = err => {
        res.status(400).end(JSON.stringify({
            err
        }))
    }

    let handleSuccess = rawData => {
        if (!rawData.lastErrorObject.updatedExisting) {
            res.status(201)
        }

        let data = rawData.value
        res.end(JSON.stringify(data))
    }

    await Friend.findOneAndUpdate({ accountId },
        { accountId, mainDevice }, {
            upsert: true, new: true, runValidators: true, rawResult: true
        }).then(handleSuccess, handleError)
}