import express from 'express'
import config from './config.js'
import routes from './routes.js'

const app = express();

// Configure
config(app)
// Routes
routes(app)

export default app 