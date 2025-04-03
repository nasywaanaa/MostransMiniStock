import { TicketModel } from "../../../ModelDB/Mostrans/General/mt_master_ticket.ts";

export const TicketDataSource = {
  async getAllTickets() {
    return await TicketModel.findAll();
  },

  async getTicketById(ticket_id: number) {
    return await TicketModel.findByPk(ticket_id);
  },

  async createTicket(input: any) {
    return await TicketModel.create(input);
  },

  async updateTicket(ticket_id: number, input: any) {
    const ticket = await TicketModel.findByPk(ticket_id);
    if (!ticket) return null;
    await ticket.update(input);
    return ticket;
  },

  async deleteTicket(ticket_id: number) {
    const ticket = await TicketModel.findByPk(ticket_id);
    if (!ticket) return "Ticket not found";
    await ticket.destroy();
    return "Ticket deleted";
  },
};
