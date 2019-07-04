const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    itemId: String,
    lastUpdate: Number,
    item: {
        name: String,
        description: String,
        cost: Number,
        type: String,
        rarity: String,
        upcoming: Boolean,
        costmeticId: String,
        images: Object,
        obtained: Date,
        obtained_type: String,
        ratings: Object,
        dateAdded: {
            type: Date,
            default: Date.now
        }
    }
})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item
