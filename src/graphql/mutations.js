/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLixi = /* GraphQL */ `
  mutation CreateLixi(
    $input: CreateLixiInput!
    $condition: ModelLixiConditionInput
  ) {
    createLixi(input: $input, condition: $condition) {
      id
      name
      money
      year
      createdAt
      updatedAt
    }
  }
`;
export const updateLixi = /* GraphQL */ `
  mutation UpdateLixi(
    $input: UpdateLixiInput!
    $condition: ModelLixiConditionInput
  ) {
    updateLixi(input: $input, condition: $condition) {
      id
      name
      money
      year
      createdAt
      updatedAt
    }
  }
`;
export const deleteLixi = /* GraphQL */ `
  mutation DeleteLixi(
    $input: DeleteLixiInput!
    $condition: ModelLixiConditionInput
  ) {
    deleteLixi(input: $input, condition: $condition) {
      id
      name
      money
      year
      createdAt
      updatedAt
    }
  }
`;
