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

export { USERS_QUERY };
