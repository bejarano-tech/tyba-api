function makeRefresh ({ refreshCase }) {
  return async function postRefresh (httpRequest) {
    try {
      const { source = {} } = httpRequest.body
      source.ip = httpRequest.ip
      source.browser = httpRequest.headers['User-Agent']
      const refreshed = await refreshCase({
        accessToken: httpRequest.headers['jwt'],
        source
      })

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(refreshed.modifiedOn).toUTCString()
        },
        statusCode: 201,
        body: { refreshed }
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

export { makeRefresh }