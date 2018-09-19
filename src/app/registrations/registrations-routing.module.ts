import { HistoryComponent } from './components/history/history.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/guards/auth-guard.service';

const routes: Routes = [
  { path: 'registrations/:divisionId', component: HistoryComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationsRoutingModule {}
