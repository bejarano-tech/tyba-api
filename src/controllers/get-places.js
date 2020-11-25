function makeGetPlaces ({ listPlaces }) {
    return async function getUsers (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const places = await listPlaces({
          location: httpRequest.query.location,
          query: httpRequest.query.query || 'restaurant',
          limit: httpRequest.query.limit || 1,
          radius: httpRequest.query.radius || 50,
          near: httpRequest.query.near || undefined
        })
        if(!places) return {
          headers,
          statusCode: 404,
          body: {
            error: "Places near to you not found"
          }
        }
        return {
          headers,
          statusCode: 200,
          body: places
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

export {makeGetPlaces}