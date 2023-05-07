import db from '../config/db.js'

const schema = new db.Schema({
	_user: { type: db.Schema.Types.ObjectId, ref: 'User' },
	_recipe: { type: db.Schema.Types.ObjectId, ref: 'Recipe' },
	content: String
})

export default db.model('Comment', schema)
