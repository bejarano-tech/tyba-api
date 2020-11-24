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

function makeFakeUser (overrides) {
  const user = {
    name: faker.name.findName(),
    createdOn: Date.now(),
    id: Id.makeId(),
    modifiedOn: Date.now(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    source: {
      ip: faker.internet.ip(),
      browser: faker.internet.userAgent()
    }
  }
  user.hash = md5(
    (user.name || '') +
    (user.email || '')
  )

  return {
    ...user,
    ...overrides
  }
}

export {makeFakeUser}