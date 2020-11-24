function makeLogout ({ logoutCase }) {
    return async function logout (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const postUsers = await logoutCase({
          token: httpRequest.headers['jwt']
        })
        console.log("Post Logout", postUsers);
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

export {makeLogout}