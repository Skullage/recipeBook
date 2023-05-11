// import connection
import db from '../config/db.js'

const schema = new db.Schema({
	title: {
		type: String,
		required: true,
		maxlength: 45,
		trim: true
	},
	desc: {
		type: String,
		required: true,
		maxlength: 255,
		trim: true
	},
	content: {
		type: String,
		required: true,
		get: function (data) {
			try {
				return JSON.parse(data)
			} catch (err) {
				return data
			}
		},
		set: function (data) {
			return JSON.stringify(data)
		}
	},
	previewImg: {
		type: String,
		default: 'placeholder.png'
	},
	author: {
		type: db.Schema.Types.ObjectId,
		ref: 'User'
	},
	ingredients: {
		type: String,
		required: true,
		get: function (data) {
			try {
				return JSON.parse(data)
			} catch (err) {
				return data
			}
		},
		set: function (data) {
			return JSON.stringify(data)
		}
	},
	private: {
		type: Boolean,
		default: false
	},
	created_at: {
		type: Date,
		default: Date.now()
	},
	updated_at: {
		type: Date
	}
})

schema.virtual('commentsCount', {
	ref: 'Comment',
	localField: '_id',
	foreignField: '_recipe',
	count: true
})

schema.virtual('comments', {
	ref: 'Comment',
	localField: '_id',
	foreignField: '_recipe'
})

schema.virtual('likeCount', {
	ref: 'Like',
	localField: '_id',
	foreignField: '_recipe',
	count: true
})

schema.virtual('likes', {
	ref: 'Like',
	localField: '_id',
	foreignField: '_recipe'
})

schema.post('save', function (next) {
	this.updated_at = Date.now()
})

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })

export default db.model('Recipe', schema)
