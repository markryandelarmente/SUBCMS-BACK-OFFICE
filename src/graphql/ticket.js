import gql from "graphql-tag";

const TICKETS_QUERY = gql`
  query tickets($query: DefaultFilter) {
    tickets(query: $query) {
      total
      current_page
      data {
        id
        content
        status
        created_at
        ticket_category {
          id
          name
        }
      }
    }
  }
`;

const TICKET_DELETE_MUTATION = gql`
  mutation user_delete($ids: [ID]) {
    user_delete(ids: $ids) {
      id
      username
      email
    }
  }
`;

export { TICKETS_QUERY, TICKET_DELETE_MUTATION };
