import gql from "graphql-tag";

const CATEGORIES_QUERY = gql`
  query {
    categories_all {
      id
      name
    }
  }
`;

export { CATEGORIES_QUERY };
