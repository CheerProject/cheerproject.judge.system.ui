import { RegistrationView } from './../../models/registration-view';
import { RegistrationsService } from './../../services/registrations.service';
import { REGISTRATIONS } from '../../models/mock-registrations';
import { Registration } from '../../models/registration';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { GetRegistrations, AddPending, AddOntime } from '../../store/actions/registration.actions';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @Select(state => state.registrations.registrations.ontime)
  ontime$: Observable<Registration[]>;

  @Select(state => state.registrations.registrations.pending)
  pending$: Observable<Registration[]>;

  @Select(state => state.registrations.registrations.completed)
  completed$: Observable<Registration[]>;

  constructor(
    private router: Router,
    private registrationsService: RegistrationsService,
    private store: Store,
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetRegistrations());
  }


  setPending(registration: Registration): void {
    this.store.dispatch(new AddPending(registration));
  }

  setCurrent(registration: Registration): void {
    this.store.dispatch(new AddOntime(registration));
  }

  getScoresheet(registration: Registration): void {
    this.router.navigate([
      '/scoresheets',
      registration.id
    ]);
  }
}
