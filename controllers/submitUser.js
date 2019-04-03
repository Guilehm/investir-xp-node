module.exports = (req, res) => {
    let userId = req.body.userId
    if (!userId) res.redirect('/')
    res.redirect(`/api/users/${userId}/stats`)
}