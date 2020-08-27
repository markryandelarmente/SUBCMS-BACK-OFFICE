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

const USER_QUERY = gql`
  query user($id: ID) {
    user(id: $id) {
      firstname
      lastname
      username
      email
      profile_image
      gender
      age
      birthdate
      address
      city
      postal_code
      country
    }
  }
`;

const USER_STORE_MUTATION = gql`
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

export { USERS_QUERY, USER_STORE_MUTATION, USER_QUERY };
