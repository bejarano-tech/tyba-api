function makeGetTransactions ({ listTransactions }) {
    return async function getTransactions (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const transactions = await listTransactions({
          from: httpRequest.query.from,
          to: httpRequest.query.to,
          amount: httpRequest.query.amount,
          createOn: httpRequest.query.created
        })
        return {
          headers,
          statusCode: 200,
          body: transactions
        }
      } catch (e) {
        // TODO: Error logging
        console.log(e)
        return {
          headers,
          statusCode: 400,
          body: {
            error: e.message
          }
        }
      }
    }
  }

export {makeGetTransactions}