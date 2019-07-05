const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
	itemId: {
		type: 'String'
	},
	lastUpdate: {
		type: 'Number'
	},
	item: {
		name: {
			type: 'String'
		},
		description: {
			type: 'String'
		},
		cost: {
			type: 'Number'
		},
		type: {
			type: 'String'
		},
		rarity: {
			type: 'String'
		},
		upcoming: {
			type: 'Boolean'
		},
		costmeticId: {
			type: 'String'
		},
		images: {
			icon: {
				type: 'String'
			},
			featured: {
				type: 'String'
			},
			background: {
				type: 'String'
			},
			information: {
				type: 'String'
			}
		},
		obtained: {
			type: 'Object'
		},
		obtained_type: {
			type: 'String'
		},
		ratings: {
			avgStars: {
				type: 'Number'
			},
			totalPoints: {
				type: 'Number'
			},
			numberVotes: {
				type: 'Number'
			}
		}
	}
})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item
