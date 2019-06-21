import { DeductionsModule } from './deductions/deductions.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { RegistrationsModule } from './registrations/registrations.module';
import { ResultsModule } from './results/results.module';
import { ScoresheetModule } from './scoresheet/scoresheet.module';
import { MainWrapperComponent } from './main-wrapper/main-wrapper.component';

const routes: Routes = [
    {
        path: '',
        component: MainWrapperComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'registrations/:divisionId',
                loadChildren: './registrations/registrations.module#RegistrationsModule'
            },
            {
                path: 'results',
                loadChildren: './results/results.module#ResultsModule'
            },
            {
                path: 'scoresheets/:registrationId',
                loadChildren: './scoresheet/scoresheet.module#ScoresheetModule'
            },
            {
                path: 'deductions/:registrationId',
                loadChildren: './deductions/deductions.module#DeductionsModule'
            },
            { path: '', redirectTo: '/results', pathMatch: 'full' }
        ]
    },
    {
        path: 'login',
        loadChildren: './auth/auth.module#AuthModule'
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
