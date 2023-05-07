import config from './config.js'
import db from 'mongoose'
db.connect(config.DB_HOST + config.DB_NAME)

export default db
