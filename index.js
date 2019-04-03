const express = require('express')
const path = require('path')

const app = new express()

const getPlayerController = require('./controllers/getPlayer')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/layouts/base/base.html'))
})

app.get('/players', getPlayerController)

app.listen(4000, () => {
    console.log('App listening on port 4000...')
})
