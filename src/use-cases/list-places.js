function makeListPlaces ({ placesDb }) {
  return async function listPlaces ({location, limit, query, radius, near}) {
    console.log("Location",location);
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