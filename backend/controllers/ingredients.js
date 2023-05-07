import Ingredient from '../models/ingredientsModel.js'

export const showIngredients = async (req, res) => {
	let results = []
	try {
		results = await Ingredient.find({})
		res.json(results)
	} catch (error) {
		throw error
	}
}
