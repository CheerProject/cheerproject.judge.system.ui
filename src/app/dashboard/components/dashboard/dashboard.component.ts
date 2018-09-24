import { DIVISIONS } from '../../models/mock-divisions';
import { Division } from '../../models/division';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { DivisionState } from '../../store/state/dashboard.state';
import { GetDivision } from '../../store/actions/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Select(DivisionState.divisions)
  divisions$: Observable<Division[]>;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetDivision());
  }

  getRegistrations(division: Division): void {
    this.router.navigate(['/registrations', division.id]);
  }
}
