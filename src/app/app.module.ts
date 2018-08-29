import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { ScoresheetModule } from './scoresheet/scoresheet.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    DashboardModule,
    RegistrationsModule,
    ScoresheetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
