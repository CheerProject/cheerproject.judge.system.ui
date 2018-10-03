import { ScoresheetComponent } from './components/scoresheet/scoresheet.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/guards/auth-guard.service';
import { ConfirmDeactivateGuard } from './guards/spreadsheet-deactivate-guard.service';
const routes: Routes = [
  {
    path: '',
    component: ScoresheetComponent,
    canActivate: [AuthGuard],
    canDeactivate: [ConfirmDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoresheetRoutingModule {}
