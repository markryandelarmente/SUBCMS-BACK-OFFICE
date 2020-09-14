import gql from "graphql-tag";

const CONTENTS_QUERY = gql`
  query contents($query: ContentFilter) {
    contents(query: $query) {
      total
      current_page
      data {
        id
        title
        description
        is_free
        image {
          id
          url
        }
        content_type {
          id
          name
        }
        content_resource_types {
          id
          name
          content_resources {
            id
            title
            order
            resource {
              id
              content
              updated_at
              resource_type {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;
const CONTENT_QUERY = gql`
  query content($id: ID) {
    content(id: $id) {
      id
      title
      description
      is_free
      image {
        id
        url
      }
      content_type {
        id
        name
      }
      content_resource_types {
        id
        name
        content_resources {
          id
          title
          order
          resource {
            id
            content
            updated_at
            resource_type {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export { CONTENTS_QUERY, CONTENT_QUERY };
