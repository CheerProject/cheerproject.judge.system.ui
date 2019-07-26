import { Registration } from '../../models/registration';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import {
    GetRegistrations,
    UpdateRegistration,
    PendingRegistration,
    CompletedRegistration,
    OnTimeRegistration
} from '../../store/actions/registration.actions';
import { Observable } from 'rxjs';
import { Stat } from '../../../scoresheet/models/stat';
import { map } from 'rxjs/operators';
import { RegistrationStatsModel } from '../../../scoresheet/store/state/stats.state';
import { StatsModel } from '../../../scoresheet/store/actions/stats.actions';
import { RegistrationStatus } from '../../enums/registration-status.enum';
import { RegistrationState } from '../../store/state/registration.state';
import { MatSort } from '@angular/material';
@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    @Select(state => state.registrations.registrations)
    registratons$: Observable<Registration[]>;

    status: any = RegistrationStatus;

    displayedColumns: string[] = ['Posicion', 'Nombre', 'Entrenador', 'Nivel', 'Division', 'Categoría', 'Genero', 'Estado', 'Puntos'];

    registrationsStat: Object = {};


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store
    ) {
        this.store
            .select(state => state.stats)
            .subscribe((stats: RegistrationStatsModel) => {
                if (stats && stats.stats) {
                    for (const item of stats.stats) {
                        const st = item.stats[item.stats.length - 1].subTotal;
                        this.registrationsStat[item.registrationId] = st;
                    }
                }
            });
    }

    ngOnInit() {
        this.store.dispatch(new GetRegistrations());
    }


    update(registration: Registration): void {
        this.store.dispatch(new UpdateRegistration(registration));
        console.log(registration);
    }

    getScoresheet(registration: Registration): void {
        console.log(registration);
        if (registration.status.name === RegistrationStatus.Finished) {

        } else {
            this.setOk(registration);
            this.router.navigate(['/scoresheets', registration.id]);
        }

    }
    onRowClicked(row) {
        console.log('Row clicked: ', row);
    }

    setPending(registration: Registration) {
        this.store.dispatch(new PendingRegistration(registration));
    }

    setOk(registration: Registration) {
        this.store.dispatch(new OnTimeRegistration(registration));
    }

    setCompleted(registration: Registration) {
        this.store.dispatch(new CompletedRegistration(registration));
    }


    getRowStatus(row: Registration) {
        if (row.status.name === this.status.Finished) {
            return 'completed';
        } else if (row.status.name === this.status.Pending) {
            return 'pending';
        }
    }

    getSubTotal(registrationId: number) {
        const sub = this.registrationsStat[registrationId];
        return sub ? sub : 0;
    }
}
