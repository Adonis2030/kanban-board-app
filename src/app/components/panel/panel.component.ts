import { Component, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  @Input() panelId!: string;
  @Input() panelTitle!: string;
  @Input() color!: string;
  @Input() connectedTo: string[] = [];
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.tickets = this.ticketService.getTicketsForPanel(this.panelId);
    this.ticketService.ticketAdded.subscribe(() => {
      this.tickets = this.ticketService.getTicketsForPanel(this.panelId);
    });
  }

  drop(event: CdkDragDrop<Ticket[]>) {
    const panelOrder = ['todo', 'progress', 'review', 'qa', 'completed'];
    const chosenTicket: Ticket = event.item.data;
    const previousIndex = event.previousContainer.data.findIndex(
      (ticket) => ticket.id === chosenTicket.toString()
    );
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, previousIndex, event.currentIndex);
    } else {
      const prevPanelIndex = panelOrder.indexOf(event.previousContainer.id);
      const currPanelIndex = panelOrder.indexOf(this.panelId);
      if (
        currPanelIndex - prevPanelIndex === 1 ||
        currPanelIndex - prevPanelIndex < 0
      ) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          previousIndex,
          event.currentIndex
        );
      }
    }

    this.ticketService.updateTickets(this.panelId, this.tickets);
    if (event.previousContainer !== event.container) {
      this.ticketService.updateTickets(
        event.previousContainer.id,
        event.previousContainer.data
      );
    }
  }
}
