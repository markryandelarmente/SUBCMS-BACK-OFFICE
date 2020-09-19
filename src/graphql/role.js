import gql from "graphql-tag";

const ROLES_QUERY = gql`
  query {
    roles {
      id
      name
      users_count
    }
  }
`;

const ROLE_QUERY = gql`
  query role($id: ID) {
    role(id: $id) {
      id
      name
      users_count
      permissions {
        id
        name
      }
    }
  }
`;

export { ROLES_QUERY, ROLE_QUERY };
