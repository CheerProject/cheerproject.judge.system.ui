import { DIVISIONS } from '../../models/mock-divisions';
import { Division } from '../../models/division';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  divisions: Division[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.divisions = this.getProgress();
  }

  getProgress(): Division[] {
    DIVISIONS.forEach(division => {
      const progress = (division.pending * 100) / division.teams;
      division.progress = progress;
    });
    return DIVISIONS;
  }

  getRegistrations(division: Division): void {
    this.router.navigate(['/registrations', division.id]);
  }
}
