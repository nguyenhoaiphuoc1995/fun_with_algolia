const mockData = require("../mock-data/MOCK_DATA.json");
const {index} = require('./algolia');
const {v4} = require('uuid');

function buildCoordinate(mockData) {
  if (!JSON.stringify(mockData)) {
    throw new Error('Invalid data');
  }
  mockData.map(data => {
    if (!data.objectID) {
      data.objectID = data.id ? data.id : v4();
    }
    data['_geoloc'] = {
      lat: data.latitude ? +data.latitude : +process.env.DEFAULT_LATITUDE,
      lng: data.longitude ? +data.longitude : +process.env.DEFAULT_LOGITUDE,
    };
    return data;
  });
  return mockData;
}

/**
 * Proceed on syncing algolia process after having all the required data
 *  @param  {number} offset
 * @param  {number} limit
 * @param  {string} restaurantId?
 * @returns Promise
 */
function proceedUpdateAlgoliaRest() {
  buildCoordinate(mockData);
  return index.partialUpdateObjects(mockData, {
    createIfNotExists: true,
  });
}

module.exports = {
  proceedUpdateAlgoliaRest
}