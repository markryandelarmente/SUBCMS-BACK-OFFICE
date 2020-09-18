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

const CATEGORY_QUERY = gql`
  query category($id: ID) {
    category(id: $id) {
      id
      name
      image {
        id
        url
      }
    }
  }
`;

const CATEGORY_STORE_MUTATION = gql`
  mutation category_store($input: CategoryInput) {
    category_store(input: $input) {
      id
      name
      image {
        id
        url
      }
    }
  }
`;
const CATEGORY_UPDATE_MUTATION = gql`
  mutation category_update($input: CategoryInput) {
    category_update(input: $input) {
      id
      name
      image {
        id
        url
      }
    }
  }
`;
export {
  CATEGORIES_QUERY,
  CATEGORIES_PAGINATED_QUERY,
  CATEGORY_QUERY,
  CATEGORY_STORE_MUTATION,
  CATEGORY_UPDATE_MUTATION,
};
