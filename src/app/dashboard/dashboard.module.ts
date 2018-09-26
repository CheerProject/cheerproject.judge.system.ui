import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardService } from './services/dashboard.service';
import { NgxsModule } from '@ngxs/store';
import { DivisionState } from './store/state/dashboard.state';

@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule,
    NgxsModule.forFeature([DivisionState])
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  providers: [DashboardService]
})
export class DashboardModule {}
