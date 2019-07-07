const UserData = require('../../database/models/UserData')
const https = require('../../services/https')
const request = require('request')

module.exports = async (req, res) => {
    const username = req.params.username

    let postToUserStatsApi = accountId => {
        let hostname = req.headers.host
        let protocol = req.connection.encrypted ? 'https' : 'http'
        let path = `${protocol}://${hostname}/api/users/${accountId}/`
        request.post(path)
    }

    let getUserStats = async uid => {
        postToUserStatsApi(uid)
        let endpoint = `https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=${uid}`
        return await https(endpoint)
    }

    let handleError = error => {
        res.render('layouts/user-stats-detail', {
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

        res.render('layouts/user-stats-detail', {
            userStats: userStats,
            userData: data,
        })
    }


    let handleNotFound = async () => {
        let endpoint = `https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=${username}`

        let handleUserFound = data => {
            UserData.create(data)
            return handleSuccess(data)
        }

        return https(endpoint).then(handleUserFound, handleError)
    }

    let regex = new RegExp('^' + username + '$')

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