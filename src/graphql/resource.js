import gql from "graphql-tag";

const VIDEO_UPLOAD_MUTATION = gql`
  mutation video_upload($file: Upload) {
    video_upload(file: $file) {
      id
      name
      content
    }
  }
`;

const RESOURCES_QUERY = gql`
  query resources($query: ResourceFilter) {
    resources(query: $query) {
      total
      current_page
      data {
        id
        name
        content
        resource_type {
          id
          name
        }
      }
    }
  }
`;
const RESOURCES_STAT_QUERY = gql`
  query {
    resources_stats {
      total_images
      total_videos
      total_storage
    }
  }
`;

export { VIDEO_UPLOAD_MUTATION, RESOURCES_QUERY, RESOURCES_STAT_QUERY };
