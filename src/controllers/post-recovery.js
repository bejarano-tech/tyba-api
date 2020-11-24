function makeRecovery ({ login }) {
    return async function postRecovery (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const postUsers = await login({
          email: httpRequest.query.email
        })
        return {
          headers,
          statusCode: 200,
          body: postUsers
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

export {makeRecovery}