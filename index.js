var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const nunjucks = require('nunjucks')

VIEWS_DIR = './views/'

const app = new express()

const env = process.env.NODE_ENV || 'development'
const mongoConfig = require('./config/mongo')[env]
const envUrl = process.env[mongoConfig.use_env_variable]
const DevUrl = `mongodb://${mongoConfig.host}/${mongoConfig.database}`
const mongoUrl = envUrl ? envUrl : DevUrl

mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .then(() => console.log('Connected to Mongo'))
    .catch(e => console.log('Something went wrong', e))

app.use(express.static(path.join(__dirname, 'views/public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'html');
let nunjucksOptions = {
    autoescape: true,
    express: app
};
nunjucks.configure(VIEWS_DIR, nunjucksOptions)


const getUserIdApiController = require('./controllers/api/getUserIdApi')
const getUserStatsApiController = require('./controllers/api/getUserStatsApi')
const createUserStatsApiController = require('./controllers/api/createUserStatsApi')

const getUserStatsController = require('./controllers/web/getUserStats')
const getUserStatsSubmitController = require('./controllers/web/getUserStatsSubmit')


app.get('/', (req, res) => {
    res.render('layouts/index.html')
})

app.get('/api/users/:username/', getUserIdApiController)
app.get('/api/users/:userId/stats/', getUserStatsApiController)

app.post('/api/users/:userId/', createUserStatsApiController)

app.get('/users/:username/stats/', getUserStatsController)
app.post('/users/stats/submit/', getUserStatsSubmitController)


let port = process.env.PORT || 000
app.listen(port, () => {
    console.log('App listening on port 4000...')
})
