function makeListUsers ({ usersDb }) {
  return async function listUsers ({email}) {
      const users = await usersDb.findAll({})
      return users;
    }
  }

export {makeListUsers}