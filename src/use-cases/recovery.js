function makeRecovery ({ authDb }) {
    return async function recovery (userInfo) {
      // const user = makeAuth(userInfo)
      // const exists = await usersDb.findByHash({ hash: user.getHash() })
      // if (exists) {
      //   return exists
      // }
  
      // const userSource = user.getSource()
      // return usersDb.insert({
      //   name: user.getName(),
      //   email: user.getEmail(),
      //   createdOn: user.getCreatedOn(),
      //   hash: user.getHash(),
      //   id: user.getId(),
      //   modifiedOn: user.getModifiedOn(),
      //   source: {
      //     ip: userSource.getIp(),
      //     browser: userSource.getBrowser(),
      //     referrer: userSource.getReferrer()
      //   }
      // })
    }
  }
  
  export {makeRecovery}