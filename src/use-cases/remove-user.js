import { makeUser } from '../user/index.js'

function makeRemoveUser ({ usersDb }) {
  return async function removeUser ({ id } = {}) {
    if (!id) {
      throw new Error('You must supply a user id.')
    }

    const userToDelete = await usersDb.findById({ id })

    if (!userToDelete) {
      return deleteNothing()
    }

    return hardDelete(userToDelete)
  }

  function deleteNothing () {
    return {
      deletedCount: 0,
      softDelete: false,
      message: 'User not found, nothing to delete.'
    }
  }

  async function hardDelete (user) {
    await usersDb.remove(user)
    return {
      deletedCount: 1,
      softDelete: false,
      message: 'User deleted.'
    }
  }
}

export {makeRemoveUser}