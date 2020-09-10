import gql from "graphql-tag";

const ROLES_QUERY = gql`
  query {
    roles {
      id
      name
    }
  }
`;

export { ROLES_QUERY };
