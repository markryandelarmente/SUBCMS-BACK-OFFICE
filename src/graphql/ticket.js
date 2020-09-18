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
  mutation ticket_delete($ids: [ID]) {
    ticket_delete(ids: $ids) {
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
`;

const TICKET_UPDATE_MUTATION = gql`
  mutation ticket_update($input: TicketInput) {
    ticket_update(input: $input) {
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
`;

export { TICKETS_QUERY, TICKET_DELETE_MUTATION, TICKET_UPDATE_MUTATION };
