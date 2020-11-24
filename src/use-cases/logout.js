function makeLogout ({ authDb }) {
  return async function logout ({token}) {
    const session = authDb.insert({
      token
    })
    return session
  }
}

export {makeLogout}