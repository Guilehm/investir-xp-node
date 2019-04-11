const User = require('../../database/models/auth/User')

module.exports = (req, res) => {
    User.create(req.body, (err, user) => {
        if (err) {
            console.log(err)
            res.redirect('/auth/register/')
        }
        res.redirect('/')
    })
}