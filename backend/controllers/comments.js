import Comment from '../models/commentModel.js'

export const createComment = async (req, res) => {
	const postId = req.body.postId
	const userId = req.body.userId
	const content = req.body.content

	let data = { _user: userId, _recipe: postId, content: content }
	await Comment.create(data)
		.then(result => {
			res.json(result)
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const deleteComment = async (req, res) => {
	const commentId = req.params.id
	await Comment.findByIdAndRemove(commentId)
		.then(result => {
			res.json({ message: 'deleted' })
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const updateComment = async (req, res) => {
	const data = req.body
	const id = req.params.id

	await Comment.findByIdAndUpdate(id, data, { runValidators: true })
		.then(result => {
			res.json({ message: 'updated' })
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}
