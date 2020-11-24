function buildMakeTransaction ({ Id, md5, encrypt, compare, makeSource }) {
    return function makeTransaction ({
      from,
      to,
      amount,
      payload,
      createdOn = Date.now(),
      id = Id.makeId(),
      source,
      modifiedOn = Date.now(),
    } = {}) {

      if (!Id.isValidId(id)) {
        throw new Error('Transaction must have a valid id.')
      }
      if (!from) {
        throw new Error('Transaction must have a sender.')
      }
      if (!to) {
        throw new Error('Transaction must have a recipient.')
      }
      if (!amount) {
        throw new Error('Transaction must have an amount.')
      }
      if (!payload) {
        throw new Error('Transaction must have a payload.')
      }
      if (!source) {
        throw new Error('Transaction must have a source.')
      }
    
      const validSource = makeSource(source)
      let hash
      let encryptPayload
      return Object.freeze({
        getFrom: () => from,
        getTo: () => to,
        getAmount: () => amount,
        getPayload: () => payload,
        getId: () => id,
        getModifiedOn: () => modifiedOn,
        getCreatedOn: () => createdOn,
        getSource: () => validSource,
        getHash: () => hash || (hash = makeHash()),
      })

      function makeHash () {
        return md5(
            (from || '') +
            (to || '') +
            (amount || '')
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

export { buildMakeTransaction }