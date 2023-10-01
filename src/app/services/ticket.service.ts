import { Injectable, EventEmitter } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { generateId } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private todoTickets: Ticket[] = [
    {
      id: generateId(10),
      title: 'Task 1',
      tags: ['UI', 'Bug'],
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: generateId(10),
      title: 'Task 2',
      tags: ['Backend', 'Feature'],
      startDate: new Date(),
      endDate: new Date(),
    },
  ];
  private progressTickets: Ticket[] = [
    {
      id: generateId(10),
      title: 'Task 3',
      tags: ['UI', 'Bug'],
      startDate: new Date(),
      endDate: new Date(),
    },
  ];
  private reviewTickets: Ticket[] = [
    {
      id: generateId(10),
      title: 'Task 4',
      tags: ['Backend', 'Feature'],
      startDate: new Date(),
      endDate: new Date(),
    },
  ];
  private qaTickets: Ticket[] = [
    {
      id: generateId(10),
      title: 'Task 5',
      tags: ['UI', 'Bug'],
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: generateId(10),
      title: 'Task 7',
      tags: ['UI', 'Bug'],
      startDate: new Date(),
      endDate: new Date(),
    },
  ];
  private completedTickets: Ticket[] = [
    {
      id: generateId(10),
      title: 'Task 6',
      tags: ['Backend', 'Feature'],
      startDate: new Date(),
      endDate: new Date(),
    },
  ];

  ticketAdded = new EventEmitter<void>();

  addTicket(ticket: Ticket) {
    if (!ticket || !ticket.title || !ticket.startDate || !ticket.endDate) {
      throw new Error('Invalid ticket');
    }

    this.todoTickets.push(ticket);
    this.ticketAdded.emit();
  }

  getTicketsForPanel(panel: string): Ticket[] {
    let tickets;
    switch (panel) {
      case 'todo':
        tickets = this.todoTickets;
        break;
      case 'progress':
        tickets = this.progressTickets;
        break;
      case 'review':
        tickets = this.reviewTickets;
        break;
      case 'qa':
        tickets = this.qaTickets;
        break;
      case 'completed':
        tickets = this.completedTickets;
        break;
      default:
        throw new Error('Invalid panel');
    }
    return [...tickets];
  }

  updateTickets(panel: string, tickets: Ticket[]) {
    if (!Array.isArray(tickets)) {
      throw new Error('Invalid tickets');
    }

    switch (panel) {
      case 'todo':
        this.todoTickets = [...tickets];
        break;
      case 'progress':
        this.progressTickets = [...tickets];
        break;
      case 'review':
        this.reviewTickets = [...tickets];
        break;
      case 'qa':
        this.qaTickets = [...tickets];
        break;
      case 'completed':
        this.completedTickets = [...tickets];
        break;
      default:
        throw new Error('Invalid panel');
    }
  }
}
