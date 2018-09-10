import { RegistrationView } from './../../models/registration-view';
import { RegistrationsService } from './../../services/registrations.service';
import { REGISTRATIONS } from '../../models/mock-registrations';
import { Registration } from '../../models/registration';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  actual: Registration[] = [];
  pendiente: Registration[] = [];
  historial: Registration[] = [];

  constructor(
    private router: Router,
    private registrationsService: RegistrationsService
  ) {}

  ngOnInit() {
    this.processRegistration();
  }

  processRegistration() {
    this.registrationsService.getRegistrations().subscribe(registrations => {
      this.actual = registrations.ontime;
      this.pendiente = registrations.pending;
      this.historial = registrations.completed;
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
