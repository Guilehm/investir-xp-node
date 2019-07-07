const UserFriend = require('../../database/models/UserFriend')

module.exports = async (req, res) => {
    

    let handleError = error => {
        res.render('layouts/chart-friends-overall-list', {
            error,
        })
    }


    let handleSuccess = friends => {
        if (!Object.keys(friends).length) {
            return res.redirect('/user/friend/list/')
        }
        res.render('layouts/chart-friends-overall-list', {
            friendList: friends,
        })
    }

    UserFriend.find({user: req.session.userId, accountId: {$ne: null}})
        .populate('stats')
        .exec((err, friends) => {
            if (err) handleError(err)
            handleSuccess(friends)
        })
}