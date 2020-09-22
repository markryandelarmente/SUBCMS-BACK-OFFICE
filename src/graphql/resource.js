import gql from "graphql-tag";

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

const VIDEO_UPLOAD_MUTATION = gql`
  mutation video_upload($file: Upload) {
    video_upload(file: $file) {
      id
      name
      content
    }
  }
`;

const UPLOAD_RESOURCES = gql`
  mutation upload_resources($files: [Upload]) {
    upload_resources(files: $files) {
      id
      name
      content
    }
  }
`;

export {
  RESOURCES_QUERY,
  RESOURCES_STAT_QUERY,
  VIDEO_UPLOAD_MUTATION,
  UPLOAD_RESOURCES,
};
