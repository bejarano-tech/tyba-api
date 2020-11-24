function buildMakeUser ({ Id, md5, encrypt, compare, makeSource }) {
    return function makeUser ({
      name,
      email,
      password,
      refreshToken,
      createdOn = Date.now(),
      id = Id.makeId(),
      source,
      modifiedOn = Date.now(),
    } = {}) {

      if (!Id.isValidId(id)) {
        throw new Error('User must have a valid id.')
      }
      if (!name) {
        throw new Error('User must have a name.')
      }
      if (!email) {
        throw new Error('User must have a email.')
      }
      if (!source) {
        throw new Error('User must have a source.')
      }
      // TODO VALIDATE EMAIL
      if (!isValidEmail(email)) {
        throw new Error('User must contain a valid email.')
      }
    
      const validSource = makeSource(source)
      let hash
      let encryptPassword
      return Object.freeze({
        getName: () => name,
        getCreatedOn: () => createdOn,
        getHash: () => hash || (hash = makeHash()),
        getId: () => id,
        getModifiedOn: () => modifiedOn,
        getSource: () => validSource,
        getEmail: () => email,
        getRefreshToken: () => refreshToken,
        getPassword: () => encryptPassword || (encryptPassword = makeEncryptedPassword()),
        matchPassword: (pass) => makeMatchPassword(pass)
      })
  
      function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

      function makeHash () {
        return md5(
            (name || '') +
            (email || '')
        )
      }

      function makeMatchPassword(pass){
        return compare(pass, password);
      }

      function makeEncryptedPassword() {
        return encrypt(password);
      }
    }
  }

export { buildMakeUser }