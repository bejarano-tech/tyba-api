import app from './app.js'
import http from 'http'

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Server is listening on port ${app.get('port')}`)
})
// console.log "Express server listening on port " + app.get('port')


// import express from 'express'
// import bodyParser from 'body-parser'
// import dotenv from 'dotenv'
// import {
//   deleteUser,
//   getUsers,
//   postUser,
//   patchUser,
//   postSignup,
//   postLogin,
//   postRefresh,
//   postLogout,
//   postRecovery,
//   getPlaces,
//   getTransactions,
//   deleteTransaction,
//   postTransaction,
//   patchTransaction,
//   notFound
// } from './controllers/index.js'
// import {makeExpressCallback} from './express-callback/index.js'
// import {verify} from './middlewares/verify.js'

// dotenv.config()

// const apiRoot = process.env.TB_API_ROOT
// const app = express()
// app.use(bodyParser.json())
// app.use((_, res, next) => {
//   res.set({ Tk: '!' })
//   next()
// })

// // User Routes
// app.post(`${apiRoot}/users`, verify, makeExpressCallback(postUser))
// app.delete(`${apiRoot}/users/:id`, verify,  makeExpressCallback(deleteUser))
// app.delete(`${apiRoot}/users`, verify, makeExpressCallback(deleteUser))
// app.patch(`${apiRoot}/users/:id`, verify, makeExpressCallback(patchUser))
// app.patch(`${apiRoot}/users`, verify, makeExpressCallback(patchUser))
// app.get(`${apiRoot}/users`, verify, makeExpressCallback(getUsers))

// // Auth Routes
// app.post(`${apiRoot}/auth/signup`, makeExpressCallback(postSignup))
// app.post(`${apiRoot}/auth/login`, makeExpressCallback(postLogin))
// app.post(`${apiRoot}/auth/refresh`, makeExpressCallback(postRefresh))
// app.post(`${apiRoot}/auth/logout`, makeExpressCallback(postLogout))
// app.post(`${apiRoot}/auth/recovery`, makeExpressCallback(postRecovery))

// // Transaction Routes
// app.post(`${apiRoot}/transactions`, verify, makeExpressCallback(postTransaction))
// app.delete(`${apiRoot}/transactions/:id`, verify, makeExpressCallback(deleteTransaction))
// app.delete(`${apiRoot}/transactions`, verify, makeExpressCallback(deleteTransaction))
// app.patch(`${apiRoot}/transactions/:id`, verify, makeExpressCallback(patchTransaction))
// app.patch(`${apiRoot}/transactions`, verify, makeExpressCallback(patchTransaction))
// app.get(`${apiRoot}/transactions`, verify, makeExpressCallback(getTransactions))

// // Place Routes
// app.get(`${apiRoot}/places`, verify, makeExpressCallback(getPlaces))

// // Generic Routes
// app.use(makeExpressCallback(notFound))

// // listen for requests
// app.listen(process.env.PORT, () => {
//   console.log(`Server is listening on port ${process.env.PORT}`)
// })


// export default app