module.exports = (req, res) => {
    let userId = req.query.user_id
    if (!userId) {
        res.status(400).json({
            error: 'Param user is required'
        })
    }

    let endpoint = `https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=${userId}`
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
        user: userId,
        url: endpoint,
    }))
}
