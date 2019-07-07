const UserFriend = require('../../database/models/UserFriend')

module.exports = async (req, res) => {

    let handleError = err => {
        // TODO: Add messages
        res.redirect('/user/friend/list')
    }

    let handleSuccess = data => {
        // TODO: Add messages
        res.redirect('/user/friend/list')
    }

    let username = req.params.username

    await UserFriend.findOneAndRemove({
        user: req.session.userId,
        username: username,
    }).then(handleSuccess, handleError)
}
