function makeDeleteTransaction ({ removeTransaction }) {
    return async function deleteUser (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const deleted = await removeTransaction({ id: httpRequest.params.id })
        console.log("Delete transaction",deleted);
        return {
          headers,
          statusCode: deleted.deletedCount === 0 ? 404 : 200,
          body: { deleted }
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

export { makeDeleteTransaction }