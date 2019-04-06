const UserData = require('../../database/models/UserData')

module.exports = (req, res) => {
    let username = req.params.username

    let handleError = error => {
        res.render('layouts/user-detail', {
            error
        })
    }

    let handleSuccess = user => {
        console.log(user)
        console.log('user acima?')
        res.render('layouts/user-detail', {
            user
        })
    }

    let regex = new RegExp('^' + username + '$');

    UserData.findOne({
        username: {
            $regex: regex,
            $options: 'i',
        }
    }, (err, user) => {
        if (err) return handleError(err)
        handleSuccess(user)
    });
}