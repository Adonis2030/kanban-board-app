import { Component } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Ticket } from './models/ticket.model';
import { TicketService } from './services/ticket.service';
import { generateId } from './utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  form: FormGroup;
  loading = false;
  newTicket: Partial<Ticket> = {};
  tags: string[] = [];
  tagInput = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.ticketService.ticketAdded.subscribe(() => {
      this.form.reset();
      this.tags = [];
    });
  }

  addTag() {
    const tag = this.tagInput.value;
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
    }
    this.tagInput.setValue('');
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  async createNewTicket() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const ticket: Ticket = {
      id: generateId(10),
      title: this.form.value.title,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      tags: this.tags,
    };

    try {
      setTimeout(() => {
        this.loading = false;
        this.ticketService.addTicket(ticket);
      }, 1000);
      this.form.reset();
      this.tags = [];
    } catch (error) {
      console.error(error);
    }
  }
}
