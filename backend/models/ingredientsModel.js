import db from '../config/db.js'

const schema = new db.Schema({
	title: {
		type: String,
		required: true,
		maxlength: 255,
		minlength: 2,
		trim: true
	}
})

export default db.model('Ingredient', schema)
