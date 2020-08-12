import gql from "graphql-tag";

const LOGIN_MUTATION = gql`
  mutation admin_login($input: AdminLoginInput) {
    admin_login(input: $input) {
      success
      token
      user {
        id
        username
        email
        firstname
        lastname
        created_at
        updated_at
      }
    }
  }
`;

const SELF_QUERY = gql`
  query {
    self {
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

export { LOGIN_MUTATION, SELF_QUERY };
