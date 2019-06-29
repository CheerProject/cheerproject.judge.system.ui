import { GetDivision } from '../../../groups/store/actions/dashboard.actions';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { DivisionState } from '../../../groups/store/state/dashboard.state';
import { Observable } from 'rxjs';
import { Division } from '../../../groups/models/division';
import { Router } from '@angular/router';

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

    @Select(DivisionState.divisions)
    divisions$: Observable<Division[]>;

    constructor(
        private router: Router,
        private store: Store
    ) { }

    ngOnInit() {
        this.store.dispatch(new GetDivision());
    }

}
