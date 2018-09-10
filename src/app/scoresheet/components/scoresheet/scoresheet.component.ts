import { SCORESHEETS } from './../../models/mock-scoresheet';
import { UserScoresheetElement } from './../../models/user-scoresheet-element';
import { Component, OnInit } from '@angular/core';
import { ScoresheetService } from '../../services/scoresheet.service';
@Component({
  selector: 'app-scoresheet',
  templateUrl: './scoresheet.component.html',
  styleUrls: ['./scoresheet.component.css']
})
export class ScoresheetComponent implements OnInit {
  scoreSheet = new Map();
  TEXT_SCORE_METRIC = 'text';
  constructor(private scoresheetService: ScoresheetService) {}

  ngOnInit() {
    this.processScoreSheet();
  }

  processScoreSheet(): void {
    this.scoresheetService
      .getScoresheet()
      .subscribe(scoreSheet => (this.scoreSheet = scoreSheet));
  }
}
