import { Component, OnInit } from '@angular/core';
import { ScoresheetService } from '../../services/scoresheet.service';
import { tap, map } from 'rxjs/operators';
import { Stat } from '../../models/stat';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { ScoresheetModel } from '../../models/scoresheet-model';

@Component({
  selector: 'app-scoresheet',
  templateUrl: './scoresheet.component.html',
  styleUrls: ['./scoresheet.component.css']
})
export class ScoresheetComponent implements OnInit {
  scoreSheet = new ScoresheetModel();
  TEXT_SCORE_METRIC = 'text';
  OTHERS = 'Others';
  GLOBAL_TOTAL = 'Total';
  FINALIZAR = 'Finalizar';
  id;


  parentAccordion: number[] = [];
  result: Stat[];
  registration$: Observable<Object>;


  constructor(
    private scoresheetService: ScoresheetService,
    private store: Store,
    private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('registrationId');
    this.registration$ = this.store.select((state) => state.registrations.registrations).pipe(
      map(result => {
        {
          for (const registrations of Object.values<any[]>(result)) {
            const found = registrations.find((element) => element.id === +this.id);
            if (found) {
              return found;
            }
          }
          return {};
        }
      })
    )
  }

  ngOnInit() {
    this.processScoreSheet();
  }



  processScoreSheet(): void {
    this.scoresheetService
      .getScoresheet()
      .pipe(tap(data => this.initSteps(data.parentCategory.length)))
      .subscribe(scoreSheet => {
        this.scoreSheet = scoreSheet;
        this.getTotal();
      });
  }

  getTotal(){
    this.result = this.scoresheetService.getTotal();
  }

  initSteps(size: number) {
    for (let x = 0; x < size; x++) {
      this.setStep(x, 0);
    }
  }

  setStep(parent: number, index: number) {
    this.parentAccordion[parent] = index;
  }

  nextStep(parent: number) {
    this.parentAccordion[parent]++;
  }

  prevStep(parent: number, index: number) {
    this.parentAccordion[parent]--;
  }


}
