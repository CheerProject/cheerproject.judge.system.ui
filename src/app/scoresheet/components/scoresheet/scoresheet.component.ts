import { Component, OnInit } from '@angular/core';
import { ScoresheetService } from '../../services/scoresheet.service';
import { tap } from 'rxjs/operators';
import { Stat } from '../../models/stat';

@Component({
  selector: 'app-scoresheet',
  templateUrl: './scoresheet.component.html',
  styleUrls: ['./scoresheet.component.css']
})
export class ScoresheetComponent implements OnInit {
  scoreSheet = new Map();
  TEXT_SCORE_METRIC = 'text';
  OTHERS = 'Others';
  GLOBAL_TOTAL = 'Total';
  FINALIZAR = 'Finalizar';
  constructor(private scoresheetService: ScoresheetService) {}
  parentAccordion: number[] = [];
  result: Stat[] = [];

  ngOnInit() {
    this.processScoreSheet();
  }

  processScoreSheet(): void {
    this.scoresheetService
      .getScoresheet()
      .pipe(tap(data => this.initSteps(data.size)))
      .subscribe(scoreSheet => {
        this.scoreSheet = scoreSheet;
        this.getTotal();
      });
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

  getSubTotal(scoreCategory): Stat {
    let subTotal = 0;
    let total = 0;

    for (const scoreMetric of scoreCategory.scoreMetrics) {
      subTotal +=
        scoreMetric.element.value === ''
          ? 0
          : Number(scoreMetric.element.value);

      total +=
        scoreMetric.element.maxScore === ''
          ? 0
          : Number(scoreMetric.element.maxScore);
    }

    if (subTotal > total) {
      subTotal = 0;
    }

    const stat: Stat = {
      id: scoreCategory.id,
      name: scoreCategory.name,
      total: total,
      subTotal: subTotal
    };

    return stat;
  }

  getTotal() {

    const last = this.scoreSheet.size - 1;
    let index = 0;
    this.scoreSheet.forEach((val, key) => {
      let globalSubTotal = 0;
      let globalTotal = 0;
      const parentName = val.name;
      let categoryTotal = 0;
      let categorySubTotal = 0;

      const stat: Stat = {
        id: val.id,
        name: parentName,
        total: 0,
        subTotal: 0,
        childStat: []
      };

      for (const scoreCategory of val.scoreCategories) {
        const childStat = this.getSubTotal(scoreCategory);
        categoryTotal += childStat.total;
        categorySubTotal += childStat.subTotal;
        stat.childStat.push(childStat);
      }

      globalSubTotal += categorySubTotal;
      globalTotal += categoryTotal;

      if (parentName !== this.OTHERS) {
        stat.total = globalTotal;
        stat.subTotal = globalSubTotal;
        this.result[stat.id] = stat;
      }
      if (last === index) {
        // execute last item logic
        const finalStats: Stat = {
          id: -1,
          name: this.GLOBAL_TOTAL,
          total: globalTotal,
          subTotal: globalSubTotal
        };
        this.result[finalStats.id] = finalStats;
      }
      index++;
    });

    console.log(this.result);
  }
}
