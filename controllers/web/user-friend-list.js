const UserFriend = require('../../database/models/UserFriend')

module.exports = async (req, res) => {
    let handleSuccess = friends => {
        return res.render('layouts/user-friend-list', {
            friends
        })
    }
    let handleError = error => {
        return res.render('layouts/user-friend-list', {
            error
        })
    }

    friends = await UserFriend.find({
        user: req.session.userId
    }).populate('stats').then(handleSuccess, handleError)
}
