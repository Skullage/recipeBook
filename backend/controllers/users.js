// Import function from Product Model
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import { unlinkSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import User from '../models/usersModel.js'

export const showUsers = async (req, res) => {
	await User.find({})
		.then(result => {
			res.json(result)
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const showUserById = async (req, res) => {
	const id = req.params.id

	await User.findById(id)
		.populate({ path: 'likes', populate: { path: '_recipe', select: 'title' } })
		.populate('postsCount')
		.exec()
		.then(result => {
			res.json(result)
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const showProfileById = async (req, res) => {
	const id = req.params.id

	await User.findById(
		id,
		'login email role postsCount rating birthday country avatar'
	)
		.exec()
		.then(result => {
			res.json(result)
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const showUserByLogin = async (req, res) => {
	const login = req.body.login

	await User.find({ login: login })
		.then(result => {
			res.json(result[0])
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const showUserByEmail = async (req, res) => {
	const email = req.body.email

	await User.find({ email: email })
		.then(result => {
			res.json(result[0])
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const updateUser = async (req, res) => {
	const data = req.body
	const id = req.params.id
	await User.findByIdAndUpdate(id, data, { runValidators: true })
		.then(result => {
			res.json({ message: 'updated' })
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const deleteUser = async (req, res) => {
	const id = req.params.id
	await User.findByIdAndRemove(id)
		.then(result => {
			res.json({ message: 'deleted' })
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const uploadAvatar = async (req, res) => {
	const file = req.files.file
	const user = req.files.file.name
	const avatarName = `${user}_${uuidv4()}.jpg`
	file.mv('static/avatars/' + avatarName)

	await User.findByIdAndUpdate(user, { avatar: avatarName })
		.then(result => {
			res.send({ avatar: avatarName })
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const deleteAvatar = async (req, res) => {
	const id = req.body.id
	const avatarName = req.body.avatarName
	await User.findByIdAndUpdate(id, { avatar: '' })
		.then(result => {
			res.json({ message: 'updated' })
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
	await unlinkSync('static/avatars/' + avatarName)
}

export const register = async (req, res) => {
	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(req.body.password, salt)

	const data = {
		email: req.body.email,
		login: req.body.login,
		password: hashPassword,
		role: req.body.role,
		registration_IP: req.body.registration_IP,
		last_IP: req.body.registration_IP,
		birthday: req.body.birthday,
		country: req.body.country,
		phone: req.body.phone
	}
	await User.create(data)
		.then(result => {
			let payload = {
				id: result._id,
				isAdmin: req.body.role == 'Администратор' || 0
			}
			const token = jwt.sign(payload, config.TOKEN_SECRET)
			res.status(200).send({ token })
		})
		.catch(error => {
			console.log(error)
			res.send(error)
		})
}

export const login = async (req, res) => {
	const login = req.body.login
	const password = req.body.password
	try {
		const results = await User.find({ login: login })
		if (results) {
			const result = results[0]
			const validPass = await bcrypt.compare(password, result.password)
			if (!validPass) return res.status(401).send('Неверный логин или пароль')

			let payload = {
				id: result.id,
				isAdmin: result.role == 'Администратор'
			}
			const token = jwt.sign(payload, config.TOKEN_SECRET)
			const user = {
				id: result.id,
				avatar: result.avatar,
				login: result.login
			}
			res
				.status(200)
				.header('auth-token', token)
				.send({ token: token, user: user })
		} else {
			res.status(401).send('Пользователь с таким логином не существует')
		}
	} catch (error) {
		console.log(error)
		res.send(error)
	}
}
