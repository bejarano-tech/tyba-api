import { Id } from '../Id/index.js'

function makePlacesDb ({ makeService }) {
  return Object.freeze({
    findNearby
  })
  async function findNearby ({ 
    location,
    limit,
    query,
    radius,
    near }) {

    const service = await makeService()
    const url = process.env.PLACES_API_URL
    const paramsRequest = {
      client_id: process.env.PLACES_CLIENT_ID,
      client_secret: process.env.PLACES_CLIENT_SECRET,
      v: process.env.PLACES_VERSION,
      ll: location,
      query: query,
      limit: limit,
      radius: radius
    }
    console.log("Params: ",paramsRequest)
    if(near){ paramsRequest.near = near}
    if(radius){ paramsRequest.radius = radius}

      // .replace('CLIENT_ID', process.env.PLACES_CLIENT_ID)
      // .replace('CLIENT_SECRET', process.env.PLACES_CLIENT_SECRET)
      // .replace('VERSION', process.env.PLACES_VERSION)
      // .replace('LOCATION', location)
      // .replace('LIMIT', limit || 1)
      // .replace('QUERY', query || 'coffe')}`

    let body
    try {
      body = await service.get(url, {params: paramsRequest})
      return (await body.data.response.venues).map(({ ...found }) => ({
        ...found
      }))
    } catch (error) {
      console.log('Error', error.message);
    }
  }
}

export {makePlacesDb}