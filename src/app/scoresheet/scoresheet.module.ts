import { NgModule } from '@angular/core';

import { ScoresheetRoutingModule } from './scoresheet-routing.module';
import { ScoresheetComponent } from './components/scoresheet/scoresheet.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ScoresheetService } from './services/scoresheet.service';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import { NgxsModule } from '@ngxs/store';
import { ScoresheetState } from './store/state/scoresheet.state';
import { StatState } from './store/state/stats.state';

@NgModule({
  imports: [
    ScoresheetRoutingModule,
    SharedModule,
    MatTableModule,
    MatInputModule,
    MatStepperModule,
    MatExpansionModule,
    MatSliderModule,
    NgxsModule.forFeature([StatState,ScoresheetState])
  ],
  declarations: [ScoresheetComponent],
  exports: [ScoresheetComponent],
  providers: [ScoresheetService]
})
export class ScoresheetModule {}
