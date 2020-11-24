import { makeUser } from '../user/index.js'
function makeAddUser ({ usersDb }) {
  return async function addUser (userInfo) {
    const user = makeUser(userInfo)
    const exists = await usersDb.findByHash({ hash: user.getHash() })
    if (exists) {
      return exists
    }

    const userSource = user.getSource()
    return usersDb.insert({
      name: user.getName(),
      email: user.getEmail(),
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

export {makeAddUser}