const express = require('express');
const path = require('path');

const app = new express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log('chegou aqui')
    console.log(path.resolve(__dirname, ))
    res.sendFile(path.resolve(__dirname, 'views/layouts/base/base.html'))
})

app.listen(4000, () => {
    console.log('App listening on port 4000...');
})
