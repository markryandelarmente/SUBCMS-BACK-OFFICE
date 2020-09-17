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
        tags {
          id
          tag {
            id
            name
          }
        }
        categories {
          id
          name
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
      tags {
        id
        tag {
          id
          name
        }
      }
      categories {
        id
        name
      }
    }
  }
`;

const CONTENT_VIDEO_STORE = gql`
  mutation content_store($input: ContentInput) {
    content_store(input: $input) {
      id
      title
      content_type {
        name
      }
      image {
        id
        url
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
      tags {
        id
        tag {
          id
          name
        }
      }
      categories {
        id
        name
      }
    }
  }
`;
const CONTENT_VIDEO_UPDATE = gql`
  mutation content_update($input: ContentUpdateInput) {
    content_update(input: $input) {
      id
      title
      content_type {
        name
      }
      image {
        id
        url
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
      tags {
        id
        tag {
          id
          name
        }
      }
      categories {
        id
        name
      }
    }
  }
`;

export {
  CONTENTS_QUERY,
  CONTENT_QUERY,
  CONTENT_VIDEO_STORE,
  CONTENT_VIDEO_UPDATE,
};
