function makeSignup ({ signupCase }) {
  return async function postSignup (httpRequest) {
    try {
      const { source = {}, ...userInfo } = httpRequest.body
      source.ip = httpRequest.ip
      source.browser = httpRequest.headers['User-Agent']
      console.log(userInfo)
      const posted = await signupCase({
        ...userInfo,
        source
      })
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(posted.modifiedOn).toUTCString()
        },
        statusCode: 201,
        body: { posted }
      }
    } catch (e) {
      // TODO: Error logging
      console.log(e)

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

export { makeSignup }