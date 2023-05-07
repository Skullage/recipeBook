// import connection
import db from '../config/db.js'

const schema = new db.Schema({
	login: {
		type: String,
		required: true,
		maxlength: 16,
		minlength: 4,
		trim: true,
		unique: true
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
		unique: true
	},
	role: {
		type: String,
		maxlength: 15,
		trim: true,
		default: 'Пользователь'
	},
	postsCount: {
		type: Number,
		trim: true,
		default: 0
	},
	registration_IP: {
		type: String,
		maxlength: 15,
		minlength: 7,
		trim: true
	},
	last_IP: {
		type: String,
		maxlength: 15,
		minlength: 7,
		trim: true
	},
	rating: {
		type: Number,
		trim: true,
		default: 0
	},
	birthday: {
		type: Date,
		trim: true
	},
	country: {
		type: String,
		maxlength: 20,
		required: true,
		trim: true
	},
	avatar: {
		type: String,
		maxlength: 45,
		trim: true,
		default: ''
	},
	phone: {
		type: String,
		minlength: 8,
		maxlength: 13,
		required: true,
		trim: true
	},
	created_at: {
		type: Date,
		default: Date.now(),
		trim: true
	},
	updated_at: {
		type: Date,
		default: Date.now(),
		trim: true
	}
})

export default db.model('User', schema)
