  
import { Id } from '../Id/index.js'

function makeTransactionsDb ({ makeDb }) {
  return Object.freeze({
    findAll,
    findById,
    findByHash,
    findByFrom,
    findByTo,
    insert,
    remove,
    update
  })
  async function findAll () {
    const db = await makeDb()
    const result = await db.collection('transactions').find()
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
  async function findById ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('transactions').find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }
  async function findByFrom ({ from }) {
    const db = await makeDb()
    const result = await db.collection('transactions').find({ from })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }
  async function findByTo ({ to }) {
    const db = await makeDb()
    const result = await db.collection('transactions').find({ to })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }
  async function insert ({ id: _id = Id.makeId(), ...transactionInfo }) {
    const db = await makeDb()
    const result = await db
      .collection('transactions')
      .insertOne({ _id, ...transactionInfo })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }

  async function update ({ id: _id, ...transactionInfo }) {
    const db = await makeDb()
    const result = await db
      .collection('transactions')
      .updateOne({ _id }, { $set: { ...transactionInfo } })
    return result.modifiedCount > 0 ? { id: _id, ...transactionInfo } : null
  }
  async function remove ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('transactions').deleteOne({ _id })
    return result.deletedCount
  }
  async function findByHash (transaction) {
    const db = await makeDb()
    const result = await db.collection('transactions').find({ hash: transaction.hash })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...insertedInfo } = found[0]
    return { id, ...insertedInfo }
  }
}

export {makeTransactionsDb}