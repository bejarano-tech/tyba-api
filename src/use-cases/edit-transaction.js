import { makeTransaction } from '../transaction/index.js'
function makeEditTransaction ({ transactionsDb }) {
  return async function editTransaction ({ id, ...changes } = {}) {
    if (!id) {
      throw new Error('You must supply an id.')
    }

    const existing = await transactionsDb.findById({ id })

    if (!existing) {
      throw new RangeError('Transaction not found.')
    }
    const transaction = makeTransaction({ ...existing, ...changes, modifiedOn: null })
    if (transaction.getHash() === existing.hash) {
      return existing
    }

    const updated = await transactionsDb.update({
      id: transaction.getId(),
      modifiedOn: transaction.getModifiedOn(),
      from: transaction.getFrom(),
      to: transaction.getTo(),
      amount: transaction.getAmount(),
      payload: transaction.getPayload()
    })
    return { ...existing, ...updated }
  }
}

export {makeEditTransaction}