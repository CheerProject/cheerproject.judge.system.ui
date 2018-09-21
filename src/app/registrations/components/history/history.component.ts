import { RegistrationView } from './../../models/registration-view';
import { RegistrationsService } from './../../services/registrations.service';
import { REGISTRATIONS } from '../../models/mock-registrations';
import { Registration } from '../../models/registration';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { GetRegistrations, AddPending, AddOntime } from '../../store/actions/registration.actions';
import { Observable } from 'rxjs';
import { Stat } from '../../../scoresheet/models/stat';
import { map } from 'rxjs/operators';
import { RegistrationStatsModel } from '../../../scoresheet/store/state/stats.state';
import { StatsModel } from '../../../scoresheet/store/actions/stats.actions';
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

  registrationsStat: Object = {}

  constructor(
    private router: Router,
    private store: Store,
  ) {

    this.store.select((state) => state.stats)
      .subscribe((stats: RegistrationStatsModel) => {
        for (const item of stats.stats) {
          this.registrationsStat[item.registrationId] = item.stats[item.stats.length-1].subTotal;
        }
        console.log(this.registrationsStat);
      });

  }

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

  fromPendingToOntime(registration: Registration): void {
    this.store.dispatch(new AddOntime(registration))
      .subscribe(() => this.router.navigate([
        '/scoresheets',
        registration.id
      ]));
  }


}
