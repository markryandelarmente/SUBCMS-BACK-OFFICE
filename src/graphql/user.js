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
      id
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

const USER_UPDATE_MUTATION = gql`
  mutation user_update($input: UserInput) {
    user_update(input: $input) {
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

const USER_DELETE_MUTATION = gql`
  mutation user_delete($ids: [ID]) {
    user_delete(ids: $ids) {
      id
      username
      email
    }
  }
`;

export {
  USERS_QUERY,
  USER_QUERY,
  USER_STORE_MUTATION,
  USER_UPDATE_MUTATION,
  USER_DELETE_MUTATION,
};
