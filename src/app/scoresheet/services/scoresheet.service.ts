import { UserScoreSheetPayload } from './../models/user-scoresheet-payload';
import { tap, map, catchError } from 'rxjs/operators';
import { BaseService } from './../../core/services/base-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../../core/services/message.service';
import { Observable } from 'rxjs';
import { UserScoresheetElement } from '../models/user-scoresheet-element';
import {
  ScoresheetModel,
  ScoreMetricElementModel,
  ScoreMetricModel,
  ScoreCategoryModel,
  ParentCategoryModel
} from '../models/scoresheet-model';
import { Stat } from '../models/stat';

@Injectable()
export class ScoresheetService extends BaseService {
  private scoresheeUrl = 'api/scoresheets';
  private saveScoresheeUrl = 'api/save';
  OTHERS = 'Others';
  GLOBAL_TOTAL = 'Total';
  private scoreSheet: ScoresheetModel = new ScoresheetModel();
  private result: Stat[] = [];

  constructor(private http: HttpClient, messageService: MessageService) {
    super(messageService);
  }

  private createNewElement(
    ssElement: UserScoresheetElement
  ): ParentCategoryModel {
    return {
      id: ssElement.scoresheetElement.scoreCategory.parentScoreCategory.id,
      name: ssElement.scoresheetElement.scoreCategory.parentScoreCategory.name,
      scoreCategories: [this.createCategory(ssElement)]
    };
  }

  private updateElement(
    parent: any,
    ssElement: UserScoresheetElement
  ): ParentCategoryModel {
    if (this.categoryExist(parent, ssElement)) {
      const element = this.createMetric(ssElement);
      parent.scoreCategories
        .find(category => category.id === ssElement.scoresheetElement.scoreCategory.id)
        .scoreMetrics.push(element);
    } else {
      const category = this.createCategory(ssElement);
      parent.scoreCategories.push(category);
    }
    return parent;
  }

  private createElement(
    ssElement: UserScoresheetElement
  ): ScoreMetricElementModel {
    return {
      id: ssElement.id,
      minScore: ssElement.scoresheetElement.minScore,
      maxScore: ssElement.scoresheetElement.maxScore,
      value: ssElement.value
    };
  }

  private createMetric(ssElement: UserScoresheetElement): ScoreMetricModel {
    return {
      id: ssElement.scoresheetElement.scoreMetric.id,
      name: ssElement.scoresheetElement.scoreMetric.name,
      element: this.createElement(ssElement)
    };
  }

  private createCategory(ssElement: UserScoresheetElement): ScoreCategoryModel {
    return {
      id: ssElement.scoresheetElement.scoreCategory.id,
      name: ssElement.scoresheetElement.scoreCategory.name,
      scoreMetrics: [this.createMetric(ssElement)]
    };
  }

  private categoryExist(parent: any, ssElement: UserScoresheetElement): true {
    return parent.scoreCategories.some(
      category => category.id === ssElement.scoresheetElement.scoreCategory.id
    );
  }

  getScoresheet(): Observable<ScoresheetModel> {
    return this.http.get<UserScoresheetElement[]>(this.scoresheeUrl).pipe(
      tap(_ => this.log('Getting scoresheet data')),
      map(rawScoreSheet => {
        this.scoreSheet = new ScoresheetModel();
        for (const ssElement of rawScoreSheet) {
          const parentId = ssElement.scoresheetElement.scoreCategory.parentScoreCategory.id;
          let parent = this.scoreSheet.parentCategory.find(
            item => item.id === parentId
          );
          if (!parent) {
            parent = this.createNewElement(ssElement);
            this.scoreSheet.parentCategory.push(parent);
          } else {
            const index = this.scoreSheet.parentCategory.findIndex(
              element => element.id === parent.id
            );
            parent = this.updateElement(parent, ssElement);
            this.scoreSheet.parentCategory[index] = parent;
          }
        }
        return this.scoreSheet;
      }),
      tap(_ => this.log('Scoresheet processed'))
    );
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

  getTotal(scoreSheet: ScoresheetModel): Stat[] {
    const last = scoreSheet.parentCategory.length - 1;
    let index = 0;
    let statIndex = 0;
    let finalTotal = 0;
    let finalSubTotal = 0;
    this.result = [];

    scoreSheet.parentCategory.forEach((val, key) => {
      let globalSubTotal = 0;
      let globalTotal = 0;
      const parentName = val.name;
      let categoryTotal = 0;
      let categorySubTotal = 0;

      if (parentName !== this.OTHERS) {
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

        finalTotal += globalTotal;
        finalSubTotal += globalSubTotal;

        stat.total = globalTotal;
        stat.subTotal = globalSubTotal;
        this.result[statIndex] = stat;
        statIndex++;
      }
      if (last === index) {
        const finalStats: Stat = {
          id: 'total',
          name: this.GLOBAL_TOTAL,
          total: finalTotal,
          subTotal: finalSubTotal
        };
        this.result[statIndex] = finalStats;
      }

      index++;
    });
    return this.result;
  }

  private buildUserScoresheetPayload(scoreSheet: ScoresheetModel) {
    const payload: UserScoreSheetPayload[] = [];
    scoreSheet.parentCategory.forEach(parentCategory => {
      parentCategory.scoreCategories.forEach(scoreCategorie => {
        scoreCategorie.scoreMetrics.forEach(scoreMetric => {
          payload.push({
            registration: scoreSheet.registrationId,
            scoresheetelement: scoreMetric.element.id,
            value: scoreMetric.element.value
          });
        });
      });
    });
    return payload;
  }

  saveScoresheet(scoreSheet: ScoresheetModel): Observable<any> {
    const payload = this.buildUserScoresheetPayload(scoreSheet);
    console.log(payload);
    return this.http
      .post(this.saveScoresheeUrl, payload, this.httpOptions);
  }
}
