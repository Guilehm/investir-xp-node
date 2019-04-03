const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const nunjucks = require('nunjucks')

VIEWS_DIR = './views/'

const app = new express()

mongoose.connect('mongodb://localhost:27017/xp', { useNewUrlParser: true })
    .then(() => console.log('Connected to Mongo'))
    .catch(e => console.log('Something went wrong', e))

const getUsersController = require('./controllers/getUsers')
const getUserController = require('./controllers/getUser')
const getUserIdController = require('./controllers/getUserId')
const submitUserController = require('./controllers/submitUser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

let nunjucksOptions = {
    autoescape: true,
    express: app
};
nunjucks.configure(VIEWS_DIR, nunjucksOptions)

app.get('/', (req, res) => {
    res.render('layouts/base.html')
})

app.get('/users', getUsersController)
app.get('/users/id', getUserIdController)
app.get('/users/:userId/stats', getUserController)
app.post('/users/submit', submitUserController)

app.listen(4000, () => {
    console.log('App listening on port 4000...')
})
