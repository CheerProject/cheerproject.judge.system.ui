import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from '../groups/components/groups/groups.component';
import { AuthGuardService as AuthGuard } from '../auth/guards/auth-guard.service';

const routes: Routes = [
    { path: '', component: GroupsComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainWrapperRoutingModule { }
