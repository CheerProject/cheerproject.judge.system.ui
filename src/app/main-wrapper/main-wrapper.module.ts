import { NgModule } from '@angular/core';


import { SharedModule } from '../shared/shared.module';
import { DashboardService } from '../groups/services/dashboard.service';
import { NgxsModule } from '@ngxs/store';
import { DivisionState } from '../groups/store/state/dashboard.state';
import { MainWrapperComponent } from './components/main/main-wrapper.component';

@NgModule({
    imports: [SharedModule],
    declarations: [MainWrapperComponent],
    exports: [MainWrapperComponent]
})
export class MainWrapper { }
