// import express
import express from 'express'
// import cors
import cors from 'cors'
// import routes
import Router from './routes/routes.js'
import path from 'path'
import { fileURLToPath } from 'url'

import fileUpload from 'express-fileupload'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 5000

// init express
const app = express()

// use express json
app.use(express.json())

app.use(fileUpload({}))
app.use('/avatars', express.static(`${__dirname}/static/avatars`))
app.use('/recipes_images', express.static(`${__dirname}/static/recipes_images`))

// use cors
app.use(cors())

// use router
app.use(Router)

app.listen(PORT, () =>
	console.log(
		'HTTPS Server running on port ' +
			PORT +
			'\n Открыть: http://localhost:' +
			PORT
	)
)
