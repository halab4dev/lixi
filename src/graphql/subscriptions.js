/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onLixiCreateByYear = /* GraphQL */ `
  subscription OnLixiCreateByYear($year: Int!) {
    onLixiCreateByYear(year: $year) {
      id
      name
      money
      year
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLixi = /* GraphQL */ `
  subscription OnCreateLixi($filter: ModelSubscriptionLixiFilterInput) {
    onCreateLixi(filter: $filter) {
      id
      name
      money
      year
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLixi = /* GraphQL */ `
  subscription OnUpdateLixi($filter: ModelSubscriptionLixiFilterInput) {
    onUpdateLixi(filter: $filter) {
      id
      name
      money
      year
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLixi = /* GraphQL */ `
  subscription OnDeleteLixi($filter: ModelSubscriptionLixiFilterInput) {
    onDeleteLixi(filter: $filter) {
      id
      name
      money
      year
      createdAt
      updatedAt
    }
  }
`;
