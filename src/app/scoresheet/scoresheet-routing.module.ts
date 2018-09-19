import { ScoresheetComponent } from './components/scoresheet/scoresheet.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/guards/auth-guard.service';
const routes: Routes = [
  { path: 'scoresheets/:registrationId', component: ScoresheetComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoresheetRoutingModule {}
