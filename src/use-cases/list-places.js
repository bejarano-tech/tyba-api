function makeListPlaces ({ placesDb }) {
  return async function listPlaces ({location, limit, query, radius, near}) {
    const places = await placesDb.findNearby({
      location,
      limit,
      query,
      radius,
      near
    })
    return places;
  }
}
  
  export {makeListPlaces}