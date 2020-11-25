function buildMakeAuth ({ Id }) {
    return function makeAuth ({
      email,
      password,
      createdOn = Date.now(),
      id = Id.makeId(),
      modifiedOn = Date.now(),
    } = {}) {
      if (!Id.isValidId(id)) {
        throw new Error('User must have a valid id.')
      }
      if (!email) {
        throw new Error('User must provide a valid a email for authentication.')
      }
      if (!password) {
        throw new Error('User must provide a valid a valid password authentication.')
      }
      // TODO VALIDATE EMAIL
      // TODO VALIDATE PASSWORD
      let hash
  
      return Object.freeze({
        getEmail: () => email,
        getCreatedOn: () => createdOn,
        getHash: () => hash || (hash = makeHash()),
        getId: () => id,
        getModifiedOn: () => modifiedOn,
        getPassword: () => password
      })
  
      function makeHash () {
        return md5(
            (email || '') +
            (password || '')
        )
      }
    }
  }

export { buildMakeAuth }