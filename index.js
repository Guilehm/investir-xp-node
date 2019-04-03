const express = require('express')
const path = require('path')

const app = new express()

const getUserController = require('./controllers/getUser')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/layouts/base/base.html'))
})

// app.get('/players', getPlayerController)
app.get('/users/:userId', getUserController)

app.listen(4000, () => {
    console.log('App listening on port 4000...')
})
