const UserFriend = require('../../database/models/UserFriend')

module.exports = async (req, res) => {
    let handleSuccess = user => {
        // TODO: Add messages
        res.redirect('/user/friend/list')
    }

    let handleError = error => {
        // TODO: Add messages
        res.redirect('/user/friend/list')
    }

    UserFriend.create({
        user: req.session.userId,
        ...req.body,
    }).then(handleSuccess, handleError)
}
