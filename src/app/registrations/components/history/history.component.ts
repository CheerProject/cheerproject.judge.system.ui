import { REGISTRATIONS } from './../../models/mock-registrations';
import { Registration } from './../../models/registration';
import { Component, OnInit } from '@angular/core';
import { RegistrationStatus } from '../../enums/registration-status.enum';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  registrations: Registration[] = REGISTRATIONS;
  actual: Registration[] = [];
  pendiente: Registration[] = [];
  historial: Registration[] = [];

  constructor() {}

  ngOnInit() {
    this.processRegistration();
  }

  processRegistration(): void {
    this.registrations.forEach(registration => {
      switch (registration.status.name) {
        case RegistrationStatus.OnTime:
          this.actual.push(registration);
          break;
        case RegistrationStatus.Pending:
          this.pendiente.push(registration);
          break;
        case RegistrationStatus.Finished:
          this.historial.push(registration);
          break;
      }
    });
  }
}
