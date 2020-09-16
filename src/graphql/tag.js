import gql from "graphql-tag";

const TAGS_QUERY = gql`
  query {
    tags_all {
      id
      name
    }
  }
`;

export { TAGS_QUERY };
