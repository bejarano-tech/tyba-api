import faker, { fake } from 'faker'
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

function makeFakeTransaction (overrides) {
  const user = {
    from: faker.random.uuid(),
    to: faker.random.uuid(),
    amount: faker.random.float(),
    payload: faker.random.objectElement(),
    createdOn: Date.now(),
    id: Id.makeId(),
    modifiedOn: Date.now(),
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

export {makeFakeTransaction}