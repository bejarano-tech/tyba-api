import { makeUser } from '../user/index.js'
function makeEditUser ({ usersDb }) {
  return async function editUser ({ id, ...changes } = {}) {
    if (!id) {
      throw new Error('You must supply an id.')
    }

    const existing = await usersDb.findById({ id })

    if (!existing) {
      throw new RangeError('User not found.')
    }
    const user = makeUser({ ...existing, ...changes, modifiedOn: null })
    if (user.getHash() === existing.hash) {
      return existing
    }

    const updated = await usersDb.update({
      id: user.getId(),
      modifiedOn: user.getModifiedOn(),
      name: user.getName(),
      email: user.getEmail(),
      hash: user.getHash()
    })
    return { ...existing, ...updated }
  }
}

export {makeEditUser}