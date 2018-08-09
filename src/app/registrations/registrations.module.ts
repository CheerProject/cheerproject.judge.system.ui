import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationsRoutingModule } from './registrations-routing.module';
import { HistoryComponent } from './components/history/history.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule,
    RegistrationsRoutingModule,
    SharedModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule
  ],
  declarations: [HistoryComponent, RegistrationComponent],
  exports: [HistoryComponent, RegistrationComponent]
})
export class RegistrationsModule {}
