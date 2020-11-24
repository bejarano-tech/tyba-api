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

  // it("finds a transaction by it's hash", async () => {
  //   // expect.assertions(2)
  //   const fakeTransactionOne = makeFakeTransaction()
  //   const fakeTransactionTwo = makeFakeTransaction()
  //   const insertedOne = await transactionsDb.insert(fakeTransactionOne)
  //   const insertedTwo = await transactionsDb.insert(fakeTransactionTwo)

  //   expect(await transactionsDb.findByHash(fakeTransactionOne)).toEqual(insertedOne)
  //   expect(await transactionsDb.findByHash(fakeTransactionTwo)).toEqual(insertedTwo)
  // })

  it('updates a transaction', async () => {
    const transaction = makeFakeTransaction()
    await transactionsDb.insert(transaction)
    transaction.from = 'from-id-test'
    const updated = await transactionsDb.update(transaction)
    return expect(updated.from).toBe('from-id-test')
  })

  // it('finds all transactions for a post', async () => {
  //   const transactionOnPostA = makeFakeTransaction()
  //   const transactionOnPostB = makeFakeTransaction({ replyToId: null })
  //   await Promise.all([transactionOnPostA, transactionOnPostB].map(transactionsDb.insert))

  //   expect(
  //     (await transactionsDb.findByPostId({
  //       postId: transactionOnPostA.postId,
  //       omitReplies: false
  //     }))[0]
  //   ).toEqual(transactionOnPostA)

  //   expect(
  //     (await transactionsDb.findByPostId({
  //       postId: transactionOnPostA.postId,
  //       omitReplies: true
  //     }))[0]
  //   ).not.toEqual(transactionOnPostA)

  //   return expect(
  //     (await transactionsDb.findByPostId({
  //       postId: transactionOnPostB.postId,
  //       omitReplies: true
  //     }))[0]
  //   ).toEqual(transactionOnPostB)
  // })

  // it('finds all replies to a transaction', async () => {
  //   const transaction = makeFakeTransaction()
  //   const firstReply = makeFakeTransaction({ replyToId: transaction.id })
  //   const secondReply = makeFakeTransaction({ replyToId: transaction.id })
  //   await Promise.all([transaction, firstReply, secondReply].map(transactionsDb.insert))
  //   const found = await transactionsDb.findReplies({ transactionId: transaction.id })
  //   expect(found).toContainEqual(firstReply)
  //   expect(found).toContainEqual(secondReply)
  //   expect(found).not.toContainEqual(transaction)
  // })

  it('deletes a transaction', async () => {
    const transaction = makeFakeTransaction()
    await transactionsDb.insert(transaction)
    return expect(await transactionsDb.remove(transaction)).toBe(1)
  })
})
