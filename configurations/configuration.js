function checkKeys() {
    const requiredEnv = [
        "PORT",
        "ALGOLIA_APP_ID",
        "ALGOLIA_ADMIN_KEY",
        "ALGOLIA_INDEX_NAME",
        'NODE_ENV'
    ];
    
    const listMissingKeys = [];
    Object.keys(process.env).forEach(key => {
        if (requiredEnv.includes(key) && !process.env[key]) listMissingKeys.push(key);
    });
    
    if (listMissingKeys?.length) {
        listMissingKeys.forEach(key => console.log(`Missing ENV key: ${key}`));
        process.exit(1);
    }
} 

// TODO: Rating
const AlgoliaCustomRankingEnum = {
  DEFAULT : `ReplicaNameAsc`,
  DISTANCE_ASC : `ReplicaDistanceAsc`,
  DISTANCE_DESC : `ReplicaDistanceDesc`,
  PRICE_ASC : `ReplicaPriceRangeAsc`,
  PRICE_DESC : `ReplicaPriceRangeDesc`,
  RATING_DESC : `ReplicaRatingDesc`,
  RATING_ASC : `ReplicaRatingAsc`,
}


// Because nest-algolia understands index name by class name
// So we have to define restaurant index by env
const algoliaCustomRankingEnumValues = Object.keys(
    AlgoliaCustomRankingEnum,
  ).map((key) => AlgoliaCustomRankingEnum[key]);
  const replicas = algoliaCustomRankingEnumValues.map((val) => {
    return `virtual(${process.env.NODE_ENV}${val})`;
  });

  const AlgoliaIndexEnv = {
    local: {
      index: 'restaurantslocal',
      replicas,
    },
    development: {
      index: 'restaurantsdev',
      replicas,
    },
    staging: {
      index: 'restaurantsstaging',
      replicas,
    },
    testing: {
      index: 'restaurantstesting',
      replicas,
    },
    production: {
      index: 'restaurantsproduction',
      replicas,
    },
  };

const AlgoliaConfiguration = {
    RADIUS: 5000, // 5 kilometers,
    PAGINATION_LIMITED_TO: 5000,
    DEFAULT_LOCATION: process.env.DEFAULT_LOCATION ?? '-33.865143, 151.209900', // Sydney
    CONFIG: {
      applicationId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
    },
  };

module.exports = {
    checkKeys,
    AlgoliaConfiguration,
    AlgoliaIndexEnv
};