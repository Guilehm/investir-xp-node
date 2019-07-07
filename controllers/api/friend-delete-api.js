const Friend = require('../../database/models/Friend')

module.exports = async (req, res) => {
    let accountId = req.params.accountId

    let handleError = err => {
        res.status(500).end(JSON.stringify(err))
    }

    let handleSuccess = data => {
        if (!data) {
            res.status(404).end(JSON.stringify({
                error: 'Friend not found'
            }))
        }
        res.end(JSON.stringify(data))
    }

    await Friend.findOneAndRemove({
        accountId
    }).then(handleSuccess, handleError)
}