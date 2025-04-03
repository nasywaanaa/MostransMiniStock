import { TicketDataSource } from "../../../DataSource/Mostrans/General/mt_master_ticket.ts";

export default {
  Query: {
    getAllTickets: () => TicketDataSource.getAllTickets(),
  },
};
