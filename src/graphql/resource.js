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

export { VIDEO_UPLOAD_MUTATION };
