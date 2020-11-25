import {makeDb} from '../../__test__/fixtures/db.js'
import {makeTransactionsDb} from './transactions-db.js'
import {makeFakeTransaction} from '../../__test__/fixtures/transaction'

describe('transactions db', () => {
  let transactionsDb

  beforeEach(async () => {
    transactionsDb = makeTransactionsDb({ makeDb })
  })

  it('lists transactions', async () => {
    const inserts = await Promise.all(
      [makeFakeTransaction(), makeFakeTransaction(), makeFakeTransaction()].map(
        transactionsDb.insert
      )
    )
    const found = await transactionsDb.findAll()
    expect.assertions(inserts.length)
    return inserts.forEach(insert => expect(found).toContainEqual(insert))
  })

  it('inserts a transaction', async () => {
    const transaction = makeFakeTransaction()
    const result = await transactionsDb.insert(transaction)
    return expect(result).toEqual(transaction)
  })

  it('finds a transaction by id', async () => {
    const transaction = makeFakeTransaction()
    await transactionsDb.insert(transaction)
    const found = await transactionsDb.findById(transaction)
    expect(found).toEqual(transaction)
  })

  it('updates a transaction', async () => {
    const transaction = makeFakeTransaction()
    await transactionsDb.insert(transaction)
    transaction.from = 'from-id-test'
    const updated = await transactionsDb.update(transaction)
    return expect(updated.from).toBe('from-id-test')
  })

  it('deletes a transaction', async () => {
    const transaction = makeFakeTransaction()
    await transactionsDb.insert(transaction)
    return expect(await transactionsDb.remove(transaction)).toBe(1)
  })
})
