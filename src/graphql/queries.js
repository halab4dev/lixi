/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLixi = /* GraphQL */ `
  query GetLixi($id: ID!) {
    getLixi(id: $id) {
      id
      name
      money
      year
      createdAt
      updatedAt
    }
  }
`;
export const listLixis = /* GraphQL */ `
  query ListLixis(
    $filter: ModelLixiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLixis(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        money
        year
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listLixiByYear = /* GraphQL */ `
  query ListLixiByYear(
    $year: Int!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLixiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLixiByYear(
      year: $year
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        money
        year
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
