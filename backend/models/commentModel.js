import db from '../config/db.js'

const schema = new db.Schema({
	_user: { type: db.Schema.Types.ObjectId, ref: 'User' },
	_recipe: { type: db.Schema.Types.ObjectId, ref: 'Recipe' },
	content: String,
	created_at: {
		type: Date,
		default: Date.now()
	},
	updated_at: {
		type: Date
	}
})

schema.post('save', function (next) {
	this.updated_at = Date.now()
})

export default db.model('Comment', schema)
