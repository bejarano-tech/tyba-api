function makeGetUsers ({ listUsers }) {
    return async function getUsers (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const postUsers = await listUsers({
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

export {makeGetUsers}