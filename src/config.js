import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()

function config(app) {
  app.use(bodyParser.json())
  app.set('port', process.env.PORT || 3000)
  // DNT compliance.
  app.use((_, res, next) => {
    res.set({ Tk: '!' })
    next()
  })
}

export default config






// express = require 'express'
// config = (app) ->

//   # Configuration
//   app.set 'port', process.env.PORT || 3000
//   app.use express.favicon()
//   app.use express.methodOverride() # Allows the use of HTTP 'DELETE' AND 'PUT' methods.
//   app.use express.logger()
//   app.use app.router
//   app.use express.errorHandler()

// module.exports = config