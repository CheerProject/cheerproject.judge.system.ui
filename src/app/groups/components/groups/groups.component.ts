import { Division } from '../../models/division';
import { Component, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { DivisionState } from '../../store/state/dashboard.state';
import { GetDivision } from '../../store/actions/dashboard.actions';
import { map } from 'rxjs/operators';
import { SetDivision } from '../../store/actions/division.current.actions';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, AfterContentInit {


    @Select(DivisionState.divisions)
    divisions$: Observable<Division[]>;

    public divisionSelected: boolean[] = [];

    private id: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store
    ) {

        this.store
            .select(state => state.divisions.divisions)
            .pipe(
                map(division => this.getDivisionState(division))
            ).subscribe(divisionState => {
                this.divisionSelected = divisionState;
            });

        this.store.select(state => state.currentDivision.currentDivision)
            .subscribe(currentDivision => {
                console.log('constructr: ' + currentDivision);
                if (currentDivision) {

                    this.getRegistrations(currentDivision);
                }
            });



    }

    ngOnInit() {
        this.store.dispatch(new GetDivision());
    }

    ngAfterContentInit() {
        console.log('after content init');
    }
    getRegistrations(division: Division): void {

        this.store.dispatch(new SetDivision(division)).subscribe(() => {
            this.setActiveDivision(division);
            this.router.navigate(['/groups/', division.id]);
        });
    }

    getDivisionState(divisions: Division[]): boolean[] {
        divisions.forEach(division => {
            this.divisionSelected[division.id] = false;
        });
        return this.divisionSelected;
    }

    setActiveDivision(selectedDivision: Division) {

        for (const key in this.divisionSelected) {
            if (this.divisionSelected[key]) {
                this.divisionSelected[key] = false;
            }
        }

        this.divisionSelected[selectedDivision.id] = true;
    }

    divisionStatus(division: Division) {
        if (this.divisionSelected[division.id]) {
            return 'division-selected';
        } else {
            return 'division';
        }
    }





}
