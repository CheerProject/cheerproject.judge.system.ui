import { RegistrationsService } from './services/registrations.service';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';

import { RegistrationsRoutingModule } from './registrations-routing.module';
import { HistoryComponent } from './components/history/history.component';

import { MatTabsModule } from '@angular/material/tabs';
import { RegistrationState } from './store/state/registration.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [
    RegistrationsRoutingModule,
    SharedModule,
    MatTabsModule,
    NgxsModule.forFeature([RegistrationState])
  ],
  declarations: [HistoryComponent],
  exports: [HistoryComponent],
  providers: [RegistrationsService]
})
export class RegistrationsModule { }
