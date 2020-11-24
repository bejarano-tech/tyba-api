import { makeUser } from '../user/index.js'
import jwt from 'jsonwebtoken'
function makeLogin ({ usersDb }) {
    return async function login ({email, password}) {
      if (!email) {
        throw new Error('Email not provided')
      }

      if (!password) {
        throw new Error('Password not privided')
      }

      const exists = await usersDb.findByEmail({ email })
      if (!exists) {
        throw new Error('User does not exists.')
      }
      const user = makeUser(exists)

      if (!user.matchPassword(password)) {
        throw new Error('Password not match')
      }

      let payload = {email: user.getEmail()}
      //create the access token with the shorter lifespan
      let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: 120
      })

      //create the refresh token with the longer lifespan
      let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: 86400
      })

      await usersDb.update({
        id: user.getId(),
        refreshToken: refreshToken
      })

      return accessToken
    }
  }
  
  export {makeLogin}