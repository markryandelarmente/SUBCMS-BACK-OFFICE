import gql from "graphql-tag";

const CATEGORIES_QUERY = gql`
  query {
    categories_all {
      id
      name
    }
  }
`;

const CATEGORIES_PAGINATED_QUERY = gql`
  query categories($query: DefaultFilter) {
    categories(query: $query) {
      total
      current_page
      data {
        id
        name
        image {
          url
        }
      }
    }
  }
`;

export { CATEGORIES_QUERY, CATEGORIES_PAGINATED_QUERY };
