// import express
import express from 'express'

import { verifyUserToken, IsAdmin } from '../middleware/auth.js'

// import function from controller
import {
	showRecipes,
	showRecipeById,
	createRecipe,
	updateRecipe,
	deleteRecipe,
	uploadPreview,
	setLike,
	deleteLike
} from '../controllers/recipes.js'
import { showIngredients } from '../controllers/ingredients.js'
import {
	showUsers,
	showUserById,
	showUserByEmail,
	showUserByLogin,
	updateUser,
	deleteUser,
	register,
	uploadAvatar,
	deleteAvatar,
	login,
	showProfileById
} from '../controllers/users.js'

// init express router
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/uploadAvatar', uploadAvatar)
router.post('/uploadPreview', uploadPreview)

// Get All Product
router.get('/users', showUsers)
router.get('/recipes', showRecipes)
router.get('/ingredients', showIngredients)

// Get Single Product
router.get('/recipes/id=:id', showRecipeById)
router.get('/users/id=:id', showUserById)
router.get('/users/profile=:id', showProfileById)
router.get('/users/login=:login', showUserByLogin)
router.get('/users/email=:email', showUserByEmail)

// Create New Product
router.post('/recipes', createRecipe)

// Update Product
router.put('/recipes/:id', verifyUserToken, updateRecipe)
router.put('/users/:id', verifyUserToken, IsAdmin, updateUser)

// Delete Product
router.delete('/recipes/:id', verifyUserToken, deleteRecipe)
router.delete('/users/:id', verifyUserToken, IsAdmin, deleteUser)
router.delete('/avatars/:id', deleteAvatar)

router.post('/likes/:id', setLike)
router.delete('/likes/:id', deleteLike)

// export default router
export default router
