import { makeTransaction } from '../transaction/index.js'
function makeAddTransaction ({ transactionsDb }) {
  return async function addTransaction (transactionInfo) {
    const transaction = makeTransaction(transactionInfo)
    const exists = await transactionsDb.findByHash({ hash: transaction.getHash() })
    if (exists) {
      return exists
    }

    const transactionSource = transaction.getSource()
    return transactionsDb.insert({
      from: transaction.getFrom(),
      to: transaction.getTo(),
      amount: transaction.getAmount(),
      payload: transaction.getPayload(),
      id: transaction.getId(),
      modifiedOn: transaction.getModifiedOn(),
      source: {
        ip: transactionSource.getIp(),
        browser: transactionSource.getBrowser()
      }
    })
  }
}

export {makeAddTransaction}