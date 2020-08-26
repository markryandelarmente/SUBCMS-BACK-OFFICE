import gql from "graphql-tag";

const USERS_QUERY = gql`
  query users($query: UserFilter) {
    users(query: $query) {
      total
      current_page
      data {
        id
        profile_image
        username
        email
        firstname
        lastname
        created_at
      }
    }
  }
`;

const USER_STORE = gql`
  mutation user_store($input: UserInput) {
    user_store(input: $input) {
      id
      username
      email
      firstname
      lastname
      created_at
      updated_at
    }
  }
`;

export { USERS_QUERY, USER_STORE };
