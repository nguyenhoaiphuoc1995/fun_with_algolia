const { proceedUpdateAlgoliaRest } = require("../services/sync-data");
const { search } = require("../services/query-data");
const { AlgoliaIndexEnv } = require("../configurations/configuration");
const { client } = require("../services/algolia");
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
const { replicas } = AlgoliaIndexEnv[process.env.NODE_ENV];
console.log("replicas", replicas);
async function getQuery(req, resp) {
  try {
    const { limit, offset, lat, lng, value } = req;
    const selectedReplica = replicas[0];
    const selectedIndex = client.initIndex(selectedReplica);
    const finalLimit = limit ? +limit : 100;
    const finalOffset = offset ? +offset : 0;
    const finalLat = lat ? +lat : +process.env.DEFAULT_LATITUDE;
    const finalLng = lng ? +lng : +process.env.DEFAULT_LONGITUDE;
    const finalFilter = value ?? {};
    await search({
      limit: finalLimit,
      offset: finalOffset,
      lat: finalLat,
      lng: finalLng,
      filters: finalFilter,
      selectedIndex: selectedIndex,
    });
  } catch (err) {
    console.log("err", err);
    return resp.status(500).send("Error");
  }
}

async function postSyncDataToAlgolia(req, resp) {
  try {
    await proceedUpdateAlgoliaRest();
    return resp.status(200).send("Success");
  } catch (err) {
    console.log("err", err);
    return resp.status(500).send("Error");
  }
}

module.exports = {
  getQuery,
  postSyncDataToAlgolia,
};
