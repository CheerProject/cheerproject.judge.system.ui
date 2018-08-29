import { REGISTRATIONS } from '../../models/mock-registrations';
import { Registration } from '../../models/registration';
import { Component, OnInit } from '@angular/core';
import { RegistrationStatus } from '../../enums/registration-status.enum';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

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

  setPending(registration: Registration): void {
    this.actual = this.actual.filter(r => r !== registration);
    this.pendiente.push(registration);
  }

  setCurrent(registration: Registration): void {
    this.pendiente = this.pendiente.filter(r => r !== registration);
    this.actual.push(registration);
  }

  getScoresheet(registration: Registration): void {
    console.log('getting scoresheets');
    this.router.navigate([
      '/registrations',
      registration.divisionGroup.division.id,
      'scoresheets'
    ]);
  }
}
