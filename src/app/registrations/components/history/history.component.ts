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
import { RegistrationStatsModel } from '../../../scoresheet/store/state/stats.state';
import { RegistrationStatus } from '../../enums/registration-status.enum';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    @Select(state => state.registrations.registrations)
    registratons$: Observable<Registration[]>;

    registrations: Registration[];

    status: any = RegistrationStatus;

    displayedColumns: string[] = ['Posicion', 'Nombre', 'Entrenador', 'Nivel', 'Division', 'Categoría', 'Genero', 'Estado', 'Puntos'];

    registrationsStat: Object = {};

    dataSource: MatTableDataSource<Registration>;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private router: Router,
        private store: Store
    ) {
        this.store.dispatch(new GetRegistrations());
    }

    ngOnInit() {
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
        this.store
            .select(state => state.registrations.registrations)
            .subscribe(reg => {
                this.dataSource = new MatTableDataSource(reg);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataSource.filterPredicate = (data, filter) => {

                    const dataStr = data.team.name +
                        data.id +
                        data.team.name.trim().toLowerCase() +
                        data.team.coach.trim().toLowerCase() + 
                        data.divisionGroup.level.name.trim().toLowerCase() + 
                        data.divisionGroup.division.name.trim().toLowerCase() + 
                        data.divisionGroup.category.name.trim().toLowerCase() + 
                        data.divisionGroup.gender.name.trim().toLowerCase() + 
                        data.status.name.trim().toLowerCase() +
                        data.points;
                    return dataStr.indexOf(filter) != -1;
                }
            });
    }

    applyFilter(filterValue: string) {
        let filter = filterValue.trim().toLowerCase();
        console.log(filter);
        this.dataSource.filter = filter;

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
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
