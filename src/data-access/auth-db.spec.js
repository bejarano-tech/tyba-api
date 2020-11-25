import {makeDb} from '../../__test__/fixtures/db.js'
import {makeAuthDb} from './auth-db.js'
import {makeFakeAuth} from '../../__test__/fixtures/auth'

describe('auth db', () => {
  let authDb

  beforeEach(async () => {
    authDb = makeAuthDb({ makeDb })
  })

  it('singup a user', async () => {
  })
  it('login a user', async () => {
  })
  it('logout a user', async () => {
  })
  it('refresh a user session', async () => {
  })
  it('verifies a user session', async () => {
  })
})
