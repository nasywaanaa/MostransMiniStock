import { gql } from "npm:apollo-server-core";

export default gql`
  type Ticket {
    ticket_id: Int
    ticket_number: String
    title: String
    description: String
    customer_name: String
    customer_email: String
    status_id: Int
    due_date: String
  }

  type Query {
    getAllTickets: [Ticket]
  }
`;
