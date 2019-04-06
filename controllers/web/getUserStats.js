const UserData = require('../../database/models/UserData')
const https = require('../../services/https')

module.exports = (req, res) => {
    const username = req.params.username

    const getUserStats = async uid => {
        let endpoint = `https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=${uid}`
        return https(endpoint)
    }

    let handleError = error => {
        res.render('layouts/user-detail', {
            error
        })
    }

    let handleSuccess = async data => {

        let handleRequestSuccess = stats => {
            return stats
        }

        let uid = data.uid
        let userStats = await getUserStats(uid)
            .then(handleRequestSuccess, handleError)

        res.render('layouts/user-detail', {
            userStats: userStats,
            userData: data,
        })
    }


    let handleNotFound = async () => {
        let endpoint = `https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=${username}`

        let handleSuccess = data => {
            UserData.create(data)
            return data
        }

        await https(endpoint).then(handleSuccess, handleError)
    }

    let regex = new RegExp('^' + username + '$');

    UserData.findOne({
        username: {
            $regex: regex,
            $options: 'i',
        }
    }, (err, data) => {
        if (err) return handleError(err)
        if (!data) return handleNotFound()
        handleSuccess(data)
    });
}