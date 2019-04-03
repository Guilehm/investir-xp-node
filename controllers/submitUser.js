module.exports = (req, res) => {
    let userId = req.body.userId
    res.redirect(`/users/${userId}`)
}