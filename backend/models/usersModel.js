// import connection
import db from '../config/db.js'

const schema = new db.Schema({
	login: {
		type: String,
		required: true,
		maxlength: 16,
		minlength: 4,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		maxlength: 255,
		minlength: 8,
		trim: true
	},
	email: {
		type: String,
		required: true,
		maxlength: 255,
		trim: true,
		unique: true,
		lowercase: true
	},
	role: {
		type: String,
		maxlength: 15,
		trim: true,
		default: 'Пользователь'
	},
	registration_IP: {
		type: String,
		maxlength: 15,
		minlength: 7
	},
	last_IP: {
		type: String,
		maxlength: 15,
		minlength: 7
	},
	rating: {
		type: Number,
		default: 0
	},
	birthday: {
		type: Date
	},
	country: {
		type: String,
		maxlength: 20,
		required: true
	},
	avatar: {
		type: String,
		maxlength: 45,
		default: ''
	},
	phone: {
		type: String,
		minlength: 8,
		maxlength: 13,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now(),
		immutable: true
	},
	updated_at: {
		type: Date
	}
})

schema.virtual('likes', {
	ref: 'Like',
	localField: '_id',
	foreignField: '_user'
})

schema.virtual('postsCount', {
	ref: 'Recipe',
	localField: '_id',
	foreignField: 'author',
	count: true
})

schema.pre('save', function (next) {
	this.updated_at = Date.now()
})

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })

export default db.model('User', schema)
