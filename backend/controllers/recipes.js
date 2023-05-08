import Recipe from '../models/recipeModel.js'
import Like from '../models/likeModel.js'

export const showRecipes = async (req, res) => {
	await Recipe.find({})
		.populate({ path: 'author', select: 'login' })
		.populate('likeCount')
		.populate({
			path: 'likes',
			populate: {
				path: '_user',
				select: 'login'
			}
		})
		.exec()
		.then(result => {
			res.json(result)
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const setLike = async (req, res) => {
	const postId = req.params.id
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

export const deleteRecipe = async (req, res) => {
	const id = req.params.id
	await Recipe.findByIdAndRemove(id)
		.then(result => {
			res.json({ message: 'deleted' })
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const uploadPreview = async (req, res) => {
	const file = req.files.file
	const filename = req.files.file.name + '.jpg'
	file.mv('static/recipes_images/' + filename)
	res.status(200).send('Ok')
}

export const showRecipeById = async (req, res) => {
	const id = req.params.id
	await Recipe.findById(id)
		.populate({ path: 'author', select: 'login' })
		.populate('likeCount')
		.populate({
			path: 'likes',
			populate: {
				path: '_user',
				select: 'login'
			}
		})
		.exec()
		.then(result => {
			res.json(result)
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const createRecipe = async (req, res) => {
	const data = req.body

	await Recipe.create(data)
		.then(result => {
			res.json(result)
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const updateRecipe = async (req, res) => {
	const data = req.body
	const id = req.params.id

	await Recipe.findByIdAndUpdate(id, data, { runValidators: true })
		.then(result => {
			res.json({ message: 'updated' })
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}
