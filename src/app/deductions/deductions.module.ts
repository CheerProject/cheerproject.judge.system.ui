import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeductionsRoutingModule } from './deductions-routing.module';

import { DeductionsComponent } from './components/deductions/deductions.component';
import { SharedModule } from '../shared/shared.module';
import { StopWatchService } from './components/deductions/services/stopwatch.service';
import { RecordingService } from './components/deductions/services/recording.service';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  imports: [SharedModule, DeductionsRoutingModule, MatSelectModule],
  exports: [DeductionsComponent],
  declarations: [DeductionsComponent],
  providers: [StopWatchService, RecordingService]
})
export class DeductionsModule {}
