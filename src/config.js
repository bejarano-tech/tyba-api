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