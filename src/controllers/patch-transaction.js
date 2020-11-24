function makePatchTransaction ({ editTransaction }) {
    return async function patchUser (httpRequest) {
      try {
        const { source = {}, ...transactionInfo } = httpRequest.body
        source.ip = httpRequest.ip
        source.browser = httpRequest.headers['User-Agent']
        const toEdit = {
          ...transactionInfo,
          source,
          id: httpRequest.params.id
        }
        const patched = await editTransaction(toEdit)
        return {
          headers: {
            'Content-Type': 'application/json',
            'Last-Modified': new Date(patched.modifiedOn).toUTCString()
          },
          statusCode: 200,
          body: { patched }
        }
      } catch (e) {
        // TODO: Error logging
        console.log(e)
        if (e.name === 'RangeError') {
          return {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 404,
            body: {
              error: e.message
            }
          }
        }
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 400,
          body: {
            error: e.message
          }
        }
      }
    }
  }

export { makePatchTransaction }