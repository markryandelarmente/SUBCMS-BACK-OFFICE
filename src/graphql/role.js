import gql from "graphql-tag";

const ROLES_QUERY = gql`
  query {
    roles {
      id
      name
    }
  }
`;

const ROLE_QUERY = gql`
  query role($id: ID) {
    role(id: $id) {
      id
      name
      permissions {
        id
        name
      }
    }
  }
`;

export { ROLES_QUERY, ROLE_QUERY };
