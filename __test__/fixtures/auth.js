import faker from 'faker'
import cuid from 'cuid'
import crypto from 'crypto'

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
}

function makeFakeAuth (overrides) {
  const auth = {
    email: faker.internet.email(),
    createdOn: Date.now(),
    id: Id.makeId(),
    modifiedOn: Date.now(),
    password: faker.internet.password(),
  }
  auth.hash = md5(
    (auth.email || '') +
    (auth.password || '')
  )

  return {
    ...auth,
    ...overrides
  }
}

export {makeFakeAuth}