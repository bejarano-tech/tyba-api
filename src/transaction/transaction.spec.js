import {makeFakeTransaction} from '../../__test__/fixtures/transaction'
import {makeTransaction} from './'
describe('transaction', () => {
  it('must have a from', () => {
    const transaction = makeFakeTransaction({ from: null })
    expect(() => makeTransaction(transaction)).toThrow('Transaction must have a sender.')
  })
  it('must have a to', () => {
    const transaction = makeFakeTransaction({ to: null })
    expect(() => makeTransaction(transaction)).toThrow('Transaction must have a recipient.')
  })
  it('must have an amount', () => {
    const transaction = makeFakeTransaction({ amount: null })
    expect(() => makeTransaction(transaction)).toThrow('Transaction must have an amount.')
  })
  it('can have an id', () => {
    const transaction = makeFakeTransaction({ id: 'invalid' })
    expect(() => makeTransaction(transaction)).toThrow('Transaction must have a valid id.')
    const noId = makeFakeTransaction({ id: undefined })
    expect(() => makeTransaction(noId)).not.toThrow()
  })
  it('can create an id', () => {
    const noId = makeFakeTransaction({ id: undefined })
    const transaction = makeTransaction(noId)
    expect(transaction.getId()).toBeDefined()
  })
  it('is createdOn now in UTC', () => {
    const noCreationDate = makeFakeTransaction({ createdOn: undefined })
    expect(noCreationDate.createdOn).not.toBeDefined()
    const d = makeTransaction(noCreationDate).getCreatedOn()
    expect(d).toBeDefined()
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT')
  })
  it('is modifiedOn now in UTC', () => {
    const noModifiedOnDate = makeFakeTransaction({ modifiedOn: undefined })
    expect(noModifiedOnDate.modifiedOn).not.toBeDefined()
    const d = makeTransaction(noModifiedOnDate).getCreatedOn()
    expect(d).toBeDefined()
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT')
  })
  it('includes a hash', () => {
    const fakeTransaction = {
      from: 'Bruce Wayne',
      to: "iambatman@example.com",
      amount: 100,
      payload: {},
      source: {
        ip: '127.0.0.1',
        browser: 'Brave'
      }
    }
    // // // md5 from: http://www.miraclesalad.com/webtools/md5.php
    expect(makeTransaction(fakeTransaction).getHash()).toBe(
      '59e4fe0fef9aa59af5fcc25b7559bce9'
    )
  })
  it('must have a source', () => {
    const noSource = makeFakeTransaction({ source: undefined })
    expect(() => makeTransaction(noSource)).toThrow('Transaction must have a source.')
  })
  it('must have a source ip', () => {
    const noIp = makeFakeTransaction({ source: { ip: undefined } })
    expect(() => makeTransaction(noIp)).toThrow(
      'Transaction source must contain an IP.'
    )
  })
  it('can have a source browser', () => {
    const withBrowser = makeFakeTransaction()
    expect(
        makeTransaction(withBrowser)
        .getSource()
        .getBrowser()
    ).toBe(withBrowser.source.browser)
  })
})