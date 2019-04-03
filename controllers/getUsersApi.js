const User = require('../database/models/User')

module.exports = (req, res) => {

    let handleError = error => {
        res.end(JSON.stringify({
            error: error,
        }))
    }

    let handleSuccess = data => {
        res.end(JSON.stringify({
            data
        }))
    }

    User.find({}, (err, user) => {
        if (err) return handleError(err)
        handleSuccess(user)
    });

}
