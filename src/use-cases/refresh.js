import { makeUser } from '../user/index.js'
import jwt from 'jsonwebtoken'
function makeRefresh ({ usersDb }) {
  return async function refresh ({accessToken}) {
    if (!accessToken) {
      throw new Error('Token not provided')
    }

    let payload
    try{
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    }catch(e){
      throw new Error('Invalid Token')
    }

    const exists = await usersDb.findByEmail({ email: payload.email })
    if (!exists) {
      throw new Error('User does not exists.')
    }
    const user = makeUser(exists)
    
    //retrieve the refresh token from the users array
    let refreshToken = user.getRefreshToken()

    //verify the refresh token
    try{
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    }catch(e){
      throw new Error('Invalid Refresh Token')
    }

    let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256"
    })

    return newToken;

  }
}
  
export {makeRefresh}