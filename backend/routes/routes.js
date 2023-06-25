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
	uploadPreview
} from '../controllers/recipes.js'

import {
	createComment,
	deleteComment,
	updateComment
} from '../controllers/comments.js'
import { setLike, deleteLike } from '../controllers/likes.js'
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

router.post('/user/register', register)
router.post('/user/login', login)
router.post('/user/uploadAvatar', uploadAvatar)
router.post('/recipe/uploadPreview', uploadPreview)
router.post('/recipe/create', createRecipe)
router.post('/like/create', setLike)
router.post('/comment/create', createComment)

// Get All Product
router.get('/users', showUsers)
router.get('/recipes', showRecipes)
router.get('/ingredients', showIngredients)

// Get Single Product
router.get('/recipe/:id', showRecipeById)
router.get('/user/:id', showUserById)
router.get('/user/profile=:id', showProfileById)
router.get('/user/login=:login', showUserByLogin)
router.get('/user/email=:email', showUserByEmail)

// Update Product
router.put('/recipe/:id/update', verifyUserToken, updateRecipe)
router.put('/user/:id/update', verifyUserToken, IsAdmin, updateUser)
router.put('/comment/:id/update', updateComment)

// Delete Product
router.delete('/recipe/:id/delete', deleteRecipe)
router.delete('/user/:id/delete', verifyUserToken, IsAdmin, deleteUser)
router.delete('/user/avatar/:id/delete', deleteAvatar)
router.delete('/like/:id/delete', deleteLike)
router.delete('/comment/:id/delete', verifyUserToken, deleteComment)

// export default router
export default router
