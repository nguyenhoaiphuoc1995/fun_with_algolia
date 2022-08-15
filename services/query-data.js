// import { AlgoliaConfiguration } from "../configurations/configuration";
const {
  AlgoliaConfiguration,
  AlgoliaIndexEnv,
} = require("../configurations/configuration");
const { ALGOLIA_FIELDS } = require("../configurations/constants");
// console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const { replicas } = AlgoliaIndexEnv[process.env.NODE_ENV];
const {isEmpty} = require('lodash');
// console.log('replicas', replicas);
function transformQueryToAlgoliaCondition(field, data, breakType, isBoolean) {
  // City/Suburb | Search Value | Dietary Filter | Cuisine Filter |  Type Filter (I still cant see the definition for this in the requirements) | Cost Filter
  /**
   * [
   *    {
   *      field: "city",
   *      value: "Sydney"
   *    },
   *
   *    {
   *      field: "Cuisine",
   *      value: ["Italian", "Vietnamese"],
   *      type: "AND"
   *    },
   *
   *    {
   *      field: "Dietary",
   *      value: ["vegan", "fastfood"]
   *      type: "AND"
   *    },
   * ]
   */
  let result = ``;
  let finalData;
  if (data) {
    if (Array.isArray(data)) {
      result = `(${data
        .map((v) => {
          if (isBoolean) {
            finalData = v;
          } else {
            finalData = `"${isString(v) ? +handleQuotes(v) : v}"`;
          }
          return `${field}: ${finalData}`;
        })
        .join(` ${breakType} `)})`;
    } else {
      if (isBoolean) {
        finalData = data;
      } else {
        finalData = `"${isString(data) ? handleQuotes(data) : data}"`;
      }
      result = `${field}:${finalData}`;
    }
  }

  return result;
}

/**
 * Build filters for algolia parameter filter https://www.algolia.com/doc/api-reference/api-parameters/filters/
 * @param  {BuildFilterAlgoliaDTO} query
 * @returns string
 */
function buildFilters(query) {
  // AND input: test = ["a", "b", "c"]; operator: and; output: "test:a AND test:b AND test:c"
  // OR input: test = ["a", "b", "c"]; operator: and; output: "test:a OR test:b OR test:c"
  // > < =
  /**
   * City = Sydney
   * SearchValue = Restaurant
   * Dietary = ["vegan", "fastfood"]
   * Cuisine = ["Vietnamese", "Australian"]
   * Type = ["a", b]
   * Cost = 1
   */
  // conditions from request query will always be "AND"
  // for example: ?name=Cool Restaurant&type=Luxury&type=cheap
  return query
    .map((inp) => {
      const { key, value, relationship, isBoolean } = inp;
      return transformQueryToAlgoliaCondition(
        key,
        value,
        relationship,
        isBoolean
      );
    })
    .join(" AND ");
}

/**
 * @param  {IAlgoliaSearchPayload} payload
 * @returns Promise
 */
async function search(payload) {
  try {
    const { selectedIndex, value, filters, limit, offset, searchOptions } =
      payload;
    console.log("payload", payload);
    if (!selectedIndex) throw new Error("Invalid index");
    const algoliaSettings = {
      paginationLimitedTo: AlgoliaConfiguration.PAGINATION_LIMITED_TO,
      attributesForFaceting: ALGOLIA_FIELDS,
      replicas,
    };
    const finalValue = value ?? '';

    selectedIndex.setSettings(algoliaSettings, {
      // Update algolia replicas (virtual / normal) when index is updated
      forwardToReplicas: true,
    });
    let finalFilters = {};
    if ( !isEmpty(filters)) {
      finalFilters = buildFilters(filters)
    }
    const finalSearchOptions = {
      ...searchOptions,
      filters: finalFilters,
      hitsPerPage: limit && !isNaN(limit) ? limit : 50,
      page: offset && !isNaN(offset) ? offset : 0,
      getRankingInfo: true,
    };
    console.log('finalSearchOptions', finalSearchOptions);
    const results = await selectedIndex.search(finalValue, finalSearchOptions);
    console.log("results", results);
    return results;
  } catch (err) {
    console.log('err', err);
    throw new Error('Algolia search error ', err)
  }
}

module.exports = {
  search,
};
