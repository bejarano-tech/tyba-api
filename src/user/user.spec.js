import {makeFakeUser} from '../../__test__/fixtures/user'
import {makeUser} from './'
describe('user', () => {
  it('must have a name', () => {
    const user = makeFakeUser({ name: null })
    expect(() => makeUser(user)).toThrow('User must have a name.')
  })
  it('can have an id', () => {
    const user = makeFakeUser({ id: 'invalid' })
    expect(() => makeUser(user)).toThrow('User must have a valid id.')
    const noId = makeFakeUser({ id: undefined })
    expect(() => makeUser(noId)).not.toThrow()
  })
  it('can create an id', () => {
    const noId = makeFakeUser({ id: undefined })
    const user = makeUser(noId)
    expect(user.getId()).toBeDefined()
  })
  it('is createdOn now in UTC', () => {
    const noCreationDate = makeFakeUser({ createdOn: undefined })
    expect(noCreationDate.createdOn).not.toBeDefined()
    const d = makeUser(noCreationDate).getCreatedOn()
    expect(d).toBeDefined()
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT')
  })
  it('is modifiedOn now in UTC', () => {
    const noModifiedOnDate = makeFakeUser({ modifiedOn: undefined })
    expect(noModifiedOnDate.modifiedOn).not.toBeDefined()
    const d = makeUser(noModifiedOnDate).getCreatedOn()
    expect(d).toBeDefined()
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT')
  })
  it('includes a hash', () => {
    const fakeUser = {
      name: 'Bruce Wayne',
      email: "iambatman@example.com",
      source: {
        ip: '127.0.0.1',
        browser: 'Brave'
      }
    }
    // md5 from: http://www.miraclesalad.com/webtools/md5.php
    expect(makeUser(fakeUser).getHash()).toBe(
      '64af62aac85a059c4cba29803ff91438'
    )
  })
  it('must have a source', () => {
    const noSource = makeFakeUser({ source: undefined })
    expect(() => makeUser(noSource)).toThrow('User must have a source.')
  })
  it('must have a source ip', () => {
    const noIp = makeFakeUser({ source: { ip: undefined } })
    expect(() => makeUser(noIp)).toThrow(
      'User source must contain an IP.'
    )
  })
  it('can have a source browser', () => {
    const withBrowser = makeFakeUser()
    expect(
        makeUser(withBrowser)
        .getSource()
        .getBrowser()
    ).toBe(withBrowser.source.browser)
  })
})