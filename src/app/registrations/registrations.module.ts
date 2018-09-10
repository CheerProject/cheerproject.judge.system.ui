import { RegistrationsService } from './services/registrations.service';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';

import { RegistrationsRoutingModule } from './registrations-routing.module';
import { HistoryComponent } from './components/history/history.component';

import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [RegistrationsRoutingModule, SharedModule, MatTabsModule],
  declarations: [HistoryComponent],
  exports: [HistoryComponent],
  providers: [RegistrationsService]
})
export class RegistrationsModule {}
