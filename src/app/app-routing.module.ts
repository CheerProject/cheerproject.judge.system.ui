import { DeductionsModule } from './deductions/deductions.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { MainWrapperComponent } from './shared/components/main-wrapper/main-wrapper.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationsModule } from './registrations/registrations.module';
import { ResultsModule } from './results/results.module';
import { ScoresheetModule } from './scoresheet/scoresheet.module';

const routes: Routes = [
  {
    path: '',
    component: MainWrapperComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => DashboardModule
      },
      {
        path: 'registrations/:divisionId',
        loadChildren: () => RegistrationsModule
      },
      {
        path: 'results',
        loadChildren: () => ResultsModule
      },
      {
        path: 'scoresheets/:registrationId',
        loadChildren: () => ScoresheetModule
      },
      {
        path: 'deductions/:registrationId',
        loadChildren: () => DeductionsModule
      },
      { path: '', redirectTo: '/results', pathMatch: 'full' }
    ]
  },
  {
    path: 'login',
    loadChildren: () => AuthModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
