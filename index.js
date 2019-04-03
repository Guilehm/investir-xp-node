const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = new express()

const getUserController = require('./controllers/getUser')
const submitUserController = require('./controllers/submitUser')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/layouts/base/base.html'))
})

app.get('/users', getUserController)
app.post('/users/submit', submitUserController)
app.get('/users/:userId', getUserController)

app.listen(4000, () => {
    console.log('App listening on port 4000...')
})
