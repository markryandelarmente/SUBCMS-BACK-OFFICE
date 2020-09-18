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

const TAG_QUERY = gql`
  query tag($id: ID) {
    tag(id: $id) {
      id
      name
    }
  }
`;

const TAG_STORE_MUTATION = gql`
  mutation tag_store($input: TagInput) {
    tag_store(input: $input) {
      id
      name
    }
  }
`;

const TAG_UPDATE_MUTATION = gql`
  mutation tag_update($input: TagInput) {
    tag_update(input: $input) {
      id
      name
    }
  }
`;

const TAG_DELETE_MUTATION = gql`
  mutation tag_delete($ids: [ID]) {
    tag_delete(ids: $ids) {
      id
      name
    }
  }
`;

export {
  TAGS_QUERY,
  TAGS_PAGINATED_QUERY,
  TAG_QUERY,
  TAG_STORE_MUTATION,
  TAG_UPDATE_MUTATION,
  TAG_DELETE_MUTATION,
};
