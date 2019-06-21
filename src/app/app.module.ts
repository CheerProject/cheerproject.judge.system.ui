import { NgModule } from '@angular/core';
import { NgxsModule, NGXS_PLUGINS } from '@ngxs/store';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { ScoresheetModule } from './scoresheet/scoresheet.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/services/in-memory-data.service';
import {
    HAMMER_GESTURE_CONFIG,
    BrowserModule
} from '@angular/platform-browser';
import { GestureConfig } from '@angular/material';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
    TokenInterceptor,
    ErrorInterceptor
} from './auth/interceptors/token.interceptor';
import { AuthGuardService as AuthGuard } from './auth/guards/auth-guard.service';
import { AuthState } from './auth/store/state/auth.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { logoutPlugin } from './auth/plugins/logout.plugin';
import { ResultsModule } from './results/results.module';
import { ConfirmDeactivateGuard } from './scoresheet/guards/spreadsheet-deactivate-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeactivateDialogComponent } from './scoresheet/components/deactivate-dialog/deactivate-dialog.component';

@NgModule({
    declarations: [AppComponent, DeactivateDialogComponent],
    imports: [
        SharedModule,
        CoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([AuthState]),
        NgxsStoragePluginModule.forRoot({
            key: ['auth', 'divisions', 'registrations', 'scoresheets', 'stats']
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        // AuthModule,
        // DashboardModule,
        // RegistrationsModule,
        // ScoresheetModule,
        // ResultsModule,
        // HttpClientModule,
        HttpClientModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
            dataEncapsulation: false
        }),
        AppRoutingModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        ConfirmDeactivateGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        ,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        {
            provide: NGXS_PLUGINS,
            useValue: logoutPlugin,
            multi: true
        },
        { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
    ],
    entryComponents: [DeactivateDialogComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
