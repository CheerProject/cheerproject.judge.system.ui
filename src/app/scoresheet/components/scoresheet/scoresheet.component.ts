import { Component, OnInit, Inject } from '@angular/core';
import { ScoresheetService } from '../../services/scoresheet.service';
import { tap, map } from 'rxjs/operators';
import { Stat } from '../../models/stat';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoresheetModel } from '../../models/scoresheet-model';
import {
  GetScoresheet,
  AddScoresheet
} from '../../store/actions/scoresheet.actions';
import { Registration } from '../../../registrations/models/registration';
import {
  AddCompleted,
  AddPending
} from '../../../registrations/store/actions/registration.actions';
import { AddStats } from '../../store/actions/stats.actions';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material';
import { ScoresheetDialog } from '../dialogs/scoresheet.dialog';

@Component({
  selector: 'app-scoresheet',
  templateUrl: './scoresheet.component.html',
  styleUrls: ['./scoresheet.component.css']
})
export class ScoresheetComponent implements OnInit {
  TEXT_SCORE_METRIC = 'text';
  OTHERS = 'Others';
  GLOBAL_TOTAL = 'Total';
  FINALIZAR = 'Finalizar';
  PENDING = 'PENDING';
  CANCEL = 'CANCEL';
  QUIT = 'QUIT';
  id: any;

  parentAccordion: number[] = [];
  result: Stat[];

  scoreSheet: ScoresheetModel;
  registration: Registration;

  constructor(
    private scoresheetService: ScoresheetService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.id = this.route.snapshot.paramMap.get('registrationId');

    this.processScoreSheet();

    this.store
      .select(state => state.registrations.registrations)
      .pipe(map(result => this.findRegistration(result)))
      .subscribe(reg => {
        this.registration = reg;
      });

    this.store
      .select(state => state.scoresheets.scoresheets)
      .pipe(map(result => this.findScoresheet(result)))
      .subscribe(score => {
        this.scoreSheet = score;
        this.getTotal(this.scoreSheet);
      });
  }

  ngOnInit() {}

  processScoreSheet(): void {
    this.store.dispatch(new GetScoresheet(this.id));
  }

  getTotal(scoreSheet: ScoresheetModel) {
    this.result = this.scoresheetService.getTotal(scoreSheet);
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

  findScoresheet(scoresheets: ScoresheetModel[]): ScoresheetModel {
    for (const scoresheet of scoresheets) {
      if (scoresheet.registrationId === this.id) {
        this.initSteps(scoresheet.parentCategory.length);
        return scoresheet;
      }
    }
    return new ScoresheetModel();
  }

  findRegistration(result: any): Registration {
    for (const registrations of Object.values<Registration[]>(result)) {
      const found = registrations.find(element => element.id === +this.id);
      if (found) {
        return found;
      }
    }
    return new Registration();
  }

  save(scoreSheet: ScoresheetModel) {
    if (this.verify(this.result)) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '400px';
      dialogConfig.data = this.result;

      const dialogRef = this.dialog.open(ScoresheetDialog, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          this.store
            .dispatch([
              new AddScoresheet(scoreSheet),
              new AddCompleted(this.registration),
              new AddStats({ registrationId: this.id, stats: this.result })
            ])
            .subscribe(() =>
              this.router.navigate([
                '/registrations',
                this.registration.divisionGroup.division.id
              ])
            );
        } else {
          console.log('no se guardo');
        }
      });
    }
  }

  pending(scoreSheet: ScoresheetModel) {
    this.store
      .dispatch([
        new AddScoresheet(scoreSheet),
        new AddStats({ registrationId: this.id, stats: this.result }),
        new AddPending(this.registration)
      ])
      .subscribe(() =>
        this.router.navigate([
          '/registrations',
          this.registration.divisionGroup.division.id
        ])
      );
  }

  public verify(result: Stat[]) {
    let category = 0;
    for (const item of result) {
      if (item.subTotal === 0) {
        category++;
      }
    }

    if (category === result.length) {
      return true;
    }

    return category > 0 ? false : true;
  }

  public reset(scoreSheet: ScoresheetModel) {
    this.scoreSheet.parentCategory.forEach((element, index) => {
      element.scoreCategories.forEach(category => {
        category.scoreMetrics.forEach(metric => {
          metric.element.value = '';
        });
      });
    });
  }
}
