import Like from '../models/likeModel.js'

export const setLike = async (req, res) => {
	const postId = req.body.postId
	const userId = req.body.userId
	let data = { _user: userId, _recipe: postId }
	await Like.create(data)
		.then(result => {
			res.json(result)
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const deleteLike = async (req, res) => {
	const likeId = req.params.id
	await Like.findByIdAndRemove(likeId)
		.then(result => {
			res.json({ message: 'deleted' })
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}
