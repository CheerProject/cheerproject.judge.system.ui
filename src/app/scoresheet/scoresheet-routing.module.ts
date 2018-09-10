import { ScoresheetComponent } from './components/scoresheet/scoresheet.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'registrations/:id/scoresheets', component: ScoresheetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoresheetRoutingModule {}
