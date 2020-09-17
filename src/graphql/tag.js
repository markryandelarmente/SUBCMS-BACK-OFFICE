import gql from "graphql-tag";

const TAGS_QUERY = gql`
  query {
    tags_all {
      id
      name
    }
  }
`;

const TAGS_PAGINATED_QUERY = gql`
  query tags($query: DefaultFilter) {
    tags(query: $query) {
      total
      current_page
      data {
        id
        name
      }
    }
  }
`;

export { TAGS_QUERY, TAGS_PAGINATED_QUERY };
