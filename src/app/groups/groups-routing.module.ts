import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './components/groups/groups.component';
import { AuthGuardService as AuthGuard } from '../auth/guards/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: GroupsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: ':divisionId',
                loadChildren: '../registrations/registrations.module#RegistrationsModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupsRoutingModule { }
