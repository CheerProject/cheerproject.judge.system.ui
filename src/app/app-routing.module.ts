import { DeductionsModule } from './deductions/deductions.module';
import { MainWrapper } from './main-wrapper/main-wrapper.module';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { RegistrationsModule } from './registrations/registrations.module';
import { ResultsModule } from './results/results.module';
import { ScoresheetModule } from './scoresheet/scoresheet.module';
import { MainWrapperComponent } from './main-wrapper/components/main/main-wrapper.component';

const routes: Routes = [
    {
        path: '',
        component: MainWrapperComponent,
        children: [
            {
                path: 'results',
                loadChildren: () => import('./results/results.module').then(m => m.ResultsModule)
            },
            {
                path: 'scoresheets/:registrationId',
                loadChildren: () => import('./scoresheet/scoresheet.module').then(m => m.ScoresheetModule)
            },
            {
                path: 'deductions/:registrationId',
                loadChildren: () => import('./deductions/deductions.module').then(m => m.DeductionsModule)
            },
            {
                path: 'groups',
                loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)
            },
            { path: '', redirectTo: '/groups', pathMatch: 'full' }
        ]
    },
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    }
];

const config: ExtraOptions = {
    useHash: true,
    enableTracing: false // Turn this on to log routing events to the console
    // ,preloadingStrategy: PreloadAllModules
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
