function makeListTransactions ({ transactionsDb }) {
  return async function listTransactions ({from, to, created}) {
      const transactions = await transactionsDb.findAll({from, to, created})
      return transactions;
    }
  }

export {makeListTransactions}