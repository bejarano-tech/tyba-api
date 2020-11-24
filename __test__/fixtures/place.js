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

function makeFakePlace (overrides) {
  const place = {
  }

  return {
    ...place,
    ...overrides
  }
}

export {makeFakePlace}