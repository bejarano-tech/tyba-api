import { makeUser } from '../user/index.js'

function makeSignup ({ usersDb }) {
    return async function signup (userInfo) {
      if (!userInfo.password) {
        throw new Error('User must have a password.')
      }
      const user = await makeUser(userInfo)
      const exists = await usersDb.findByEmail({ email: user.getEmail() })
      if (exists) {
        throw new Error('User already exists.')
      }
      const userSource = user.getSource()
      return usersDb.insert({
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        createdOn: user.getCreatedOn(),
        hash: user.getHash(),
        id: user.getId(),
        modifiedOn: user.getModifiedOn(),
        source: {
          ip: userSource.getIp(),
          browser: userSource.getBrowser()
        }
      })
    }
  }
  
  export {makeSignup}