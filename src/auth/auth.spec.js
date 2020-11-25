import {makeFakeAuth} from '../../__test__/fixtures/auth'
import {makeAuth} from './'
describe('auth', () => {
  it('must singup a user', () => {
    const auth = makeFakeAuth({ email: null })
    expect(() => makeAuth(auth)).toThrow('User must provide a valid a email for authentication.')
  })
  it('must login a uesr', () => {
    const auth = makeFakeAuth({ id: 'invalid' })
    expect(() => makeAuth(auth)).toThrow('User must have a valid id.')
    const noId = makeFakeAuth({ id: undefined })
    expect(() => makeAuth(noId)).not.toThrow()
  })
  it('must recover password to a user', () => {
    const noId = makeFakeAuth({ id: undefined })
    const auth = makeAuth(noId)
    expect(auth.getId()).toBeDefined()
  })

})