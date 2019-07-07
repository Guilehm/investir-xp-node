const User = require('../../database/models/auth/User')

module.exports = async (req, res) => {

    let handleSuccess = user => {
        res.redirect('/')
    }

    let handleError = err => {
        let errors = err.errors
        let usernameError = false
        let passwordError = false
        let databaseError = false

        if (errors) {
            if (errors.username) usernameError = true
            if (errors.password) passwordError = true
        } else if (err && !errors) {
            databaseError = err
            console.log(err)
        }
        res.render('layouts/user-create.html', {
            usernameError,
            passwordError,
            databaseError,
        })
    }

    User.create(req.body).then(handleSuccess, handleError)
}