import { ConfirmDeactivateGuard } from './guards/spreadsheet-deactivate-guard.service';
import { NgModule } from '@angular/core';

import { ScoresheetRoutingModule } from './scoresheet-routing.module';
import { ScoresheetComponent } from './components/scoresheet/scoresheet.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ScoresheetService } from './services/scoresheet.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { NgxsModule } from '@ngxs/store';
import { ScoresheetState } from './store/state/scoresheet.state';
import { StatState } from './store/state/stats.state';
import { ScoresheetDialogComponent } from './components/dialogs/scoresheet.dialog';
import { DeactivateDialogComponent } from './components/deactivate-dialog/deactivate-dialog.component';
import { ReviewDialogComponent } from './components/review-dialog/review.dialog';

@NgModule({
    imports: [
        ScoresheetRoutingModule,
        SharedModule,
        MatTableModule,
        MatInputModule,
        MatStepperModule,
        MatExpansionModule,
        MatSliderModule,
        MatFormFieldModule,
        NgxsModule.forFeature([StatState, ScoresheetState])
    ],
    declarations: [
        ScoresheetComponent,
        ScoresheetDialogComponent,
        ReviewDialogComponent
    ],
    exports: [ScoresheetComponent],
    providers: [ScoresheetService],
    entryComponents: [
        ScoresheetDialogComponent,
        ReviewDialogComponent
    ]
})
export class ScoresheetModule { }
