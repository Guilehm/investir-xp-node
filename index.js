const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const nunjucks = require('nunjucks')
const connectMongo = require('connect-mongo')
const expressSession = require('express-session')
const cache = require('./services/cache')
const morgan = require('morgan')
const helmet = require('helmet')

VIEWS_DIR = './views/'
const DEBUG = process.env.DEBUG

const env = process.env.NODE_ENV || 'development'
const mongoConfig = require('./config/mongo')[env]
const envUrl = process.env[mongoConfig.use_env_variable]
const DevUrl = `mongodb://${mongoConfig.host}/${mongoConfig.database}`
const mongoUrl = envUrl ? envUrl : DevUrl

const app = new express()

mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .then(() => console.log('Connected to Mongo'))
    .catch(e => console.log('Something went wrong', e))

const mongoStore = connectMongo(expressSession)
app.use(expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))


app.use(express.static(path.join(__dirname, 'views/public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(morgan('short'))
app.use(helmet())

app.set('view engine', 'html')
let nunjucksOptions = {
    autoescape: true,
    express: app
}
let envNunjucks = nunjucks.configure(VIEWS_DIR, nunjucksOptions)

app.use('*', (req, res, next) => {
    envNunjucks.addGlobal('isAuthenticated', req.session.userId)
    next()
})

const getUserIdApiController = require('./controllers/api/user-id-get-api')
const getUserStatsApiController = require('./controllers/api/user-stats-get-api')
const createUserStatsApiController = require('./controllers/api/user-stats-create-api')
const createFriendApiController = require('./controllers/api/friend-create-api')
const deleteFriendApiController = require('./controllers/api/friend-delete-api')

const indexController = require('./controllers/web/index-controller')

const upcomingItemsController = require('./controllers/web/item-upcoming')
const itemDetailController = require('./controllers/web/item-detail')
const storeItemsController = require('./controllers/web/item-store')
const itemsListController = require('./controllers/web/item-list')
const itemsSaveController = require('./controllers/web/item-list-save')

const getUserStatsController = require('./controllers/web/get-user-stats')
const getUserStatsSubmitController = require('./controllers/web/get-user-stats-submit')
const getChartsController = require('./controllers/web/get-charts-controller')
const getChartsOverallController = require('./controllers/web/get-charts-overall-controller')
const getChartsFriendsOverallController = require('./controllers/web/get-charts-friends-overall-controller')

const userFriendListController = require('./controllers/web/user-friend-list')
const userFriendAddController = require('./controllers/web/user-friend-add')
const userFriendDeleteController = require('./controllers/web/user-friend-delete')
const userFriendUpdateStatsController = require('./controllers/web/user-friend-update-stats')

const loginController = require('./controllers/auth/login-controller')
const loginUserController = require('./controllers/auth/user-login-controller')
const createUserController = require('./controllers/auth/user-create-controller')
const storeUserController = require('./controllers/auth/user-store-controller')
const logoutUserController = require('./controllers/auth/user-logout-controller')


app.get('/', indexController)

app.get('/api/users/:username/', getUserIdApiController)
app.get('/api/users/:userId/stats/', getUserStatsApiController)
app.post('/api/users/:userId/', createUserStatsApiController)

app.post('/api/users/friends/:accountId/add/', createFriendApiController)
app.delete('/api/users/friends/:accountId/delete/', deleteFriendApiController)

app.get('/users/:username/stats/', getUserStatsController)
app.post('/users/stats/submit/', getUserStatsSubmitController)
app.get('/charts/', getChartsController)
app.get('/charts/overall/', getChartsOverallController)
app.get('/charts/overall/friends/', getChartsFriendsOverallController)
app.get('/items/upcoming/', upcomingItemsController)
app.get('/items/store/', storeItemsController)
app.get('/items/list/', itemsListController)
app.get('/items/save/', itemsSaveController)
app.get('/items/:id/', itemDetailController)

app.get('/user/friend/list/', userFriendListController)
app.post('/user/friend/add/', userFriendAddController)
app.get('/user/friend/:username/delete/', userFriendDeleteController)
app.get('/user/friend/stats/update/', userFriendUpdateStatsController)

app.get('/auth/login/', loginController)
app.post('/auth/login/', loginUserController)
app.get('/auth/register/', createUserController)
app.post('/auth/register/', storeUserController)
app.get('/auth/logout/', logoutUserController)


let port = process.env.PORT || 4000
app.listen(port, () => {
    let message = DEBUG ? 'Starting development server on port' : 'App listening on port'
    console.log(message, `${port}...`)
})
