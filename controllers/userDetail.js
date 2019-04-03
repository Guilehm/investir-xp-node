const User = require('../database/models/User')

module.exports = (req, res) => {
    let epicName = req.params.epicName


    let handleError = error => {
        res.render('layouts/user-detail.html', {
            error: true,
        })
    }

    let handleSuccess = data => {
        res.render('layouts/user-detail.html', {
            user: data,
        })
    }

    User.findOne({ 'epicName': epicName }, (err, user) => {
        if (!user || err) {
            // FIXME: Handle 404
            return handleError(err || user)
        }
        handleSuccess(user)
    });
    
}