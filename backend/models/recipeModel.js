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
		trim: true,
		default: 'placeholder.png'
	},
	author: {
		type: db.Schema.Types.ObjectId,
		ref: 'User',
		required: true
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
	// comments: [{ type: db.Schema.Types.ObjectId, ref: 'Comment' }],
	// likes: { type: db.Schema.Types.ObjectId, ref: 'Like' },
	private: {
		type: Boolean,
		default: false
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

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })

export default db.model('Recipe', schema)
