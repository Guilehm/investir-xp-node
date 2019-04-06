module.exports = (req, res) => {
    let username = req.body.username
    if (!username) res.redirect('/')
    res.redirect(`/users/${username}/stats/`)
}