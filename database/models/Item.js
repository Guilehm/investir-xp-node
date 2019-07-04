const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    itemId: String,
    lastUpdate: Number,
    item: Object,
    dateAdded: {
        type: Date,
        default: Date.now
    },
})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item
