var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const nunjucks = require('nunjucks')

VIEWS_DIR = './views/'

const app = new express()

mongoose.connect('mongodb://localhost:27017/xp', { useNewUrlParser: true })
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


const getUserIdApiController = require('./controllers/getUserIdApi')
const getUserStatsApiController = require('./controllers/getUserStatsApi')
const createUserStatsApiController = require('./controllers/createUserStatsApi')

app.get('/', (req, res) => {
    res.render('layouts/index.html')
})

app.get('/api/users/:username/', getUserIdApiController)
app.get('/api/users/:userId/stats/', getUserStatsApiController)

app.post('/api/users/:userId/', createUserStatsApiController)

app.listen(4000, () => {
    console.log('App listening on port 4000...')
})
