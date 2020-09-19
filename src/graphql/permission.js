import gql from "graphql-tag";

const PERMISSIONS_QUERY = gql`
  query {
    permissions {
      id
      name
      group
    }
  }
`;

export { PERMISSIONS_QUERY };
