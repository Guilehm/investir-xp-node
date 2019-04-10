const Friend = require('../../database/models/Friend')

module.exports = async (req, res) => {
    await Friend.find({}).populate({
        path: 'user',
        options: { sort: { 'dateAdded': -1 } }
    }).exec((error, friends) => {
        friendsData = []
        if (!error) {
            let obj
            friends.forEach((friend) => {
                obj = {}
                obj.epicName = friend.user[0].epicName
                obj.chartData = friend.user[0].data[friend.mainDevice]
                friendsData.push(obj)
            });
            return res.render('layouts/chart-list', {
                friendList: friendsData,
            })
        }
    })
}
