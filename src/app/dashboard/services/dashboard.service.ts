import { DIVISIONS } from './../models/mock-divisions';
import { DashboardModule } from './../dashboard.module';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: DashboardModule
})
export class DashboardService {
  constructor() {}

  getDashBoard() {
    return DIVISIONS;
  }
}
