import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

@NgModule({
  imports: [
    CommonModule,
    ResultsRoutingModule,
    SharedModule
  ],
  declarations: [LeaderboardComponent],
  exports: [LeaderboardComponent]
})
export class ResultsModule { }
