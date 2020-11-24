function makeRemoveTransaction ({ transactionsDb }) {
  return async function removeTransaction ({ id } = {}) {
    if (!id) {
      throw new Error('You must supply a transaction id.')
    }

    const transactionToDelete = await transactionsDb.findById({ id })

    if (!transactionToDelete) {
      return deleteNothing()
    }

    return hardDelete(transactionToDelete)
  }

  function deleteNothing () {
    return {
      deletedCount: 0,
      softDelete: false,
      message: 'Transaction not found, nothing to delete.'
    }
  }

  async function hardDelete (transaction) {
    await transactionsDb.remove(transaction)
    return {
      deletedCount: 1,
      softDelete: false,
      message: 'Transaction deleted.'
    }
  }
}

export {makeRemoveTransaction}