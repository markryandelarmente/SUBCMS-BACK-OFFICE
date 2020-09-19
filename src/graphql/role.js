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
const ROLE_UPDATE_PERMISSIONS_MUTATION = gql`
  mutation role_update_permissions($id: ID, $permission_ids: [ID]) {
    role_update_permissions(id: $id, permission_ids: $permission_ids) {
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

export { ROLES_QUERY, ROLE_QUERY, ROLE_UPDATE_PERMISSIONS_MUTATION };
