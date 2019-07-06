import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { DashboardService } from './services/dashboard.service';
import { SharedModule } from '../shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { DivisionState } from './store/state/dashboard.state';
import { GroupsComponent } from './components/groups/groups.component';
import { DivisionCurrentState } from './store/state/division.current.state';

@NgModule({
    declarations: [GroupsComponent],
    imports: [
        GroupsRoutingModule,
        SharedModule,
        NgxsModule.forFeature([DivisionState, DivisionCurrentState])
    ],
    providers: [DashboardService],
    exports: [GroupsComponent]
})
export class GroupsModule { }
