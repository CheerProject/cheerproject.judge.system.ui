import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule, MatProgressBarModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  providers: [DashboardService]
})
export class DashboardModule {}
