import { tap, map, catchError } from 'rxjs/operators';
import { BaseService } from './../../core/services/base-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../../core/services/message.service';
import { Observable } from 'rxjs';
import { UserScoresheetElement } from '../models/user-scoresheet-element';
import { ScoresheetModel, ScoreMetricElementModel, ScoreMetricModel, ScoreCategoryModel, ParentCategoryModel } from '../models/scoresheet-model';
import { Stat } from '../models/stat';
import { nextTick } from 'q';

@Injectable()
export class ScoresheetService extends BaseService {
  private scoresheeUrl = 'api/scoresheets';
  OTHERS = 'Others';
  GLOBAL_TOTAL = 'Total';
  private scoreSheet: ScoresheetModel;
  constructor(private http: HttpClient, messageService: MessageService) {
    super(messageService);
  }

  private createNewElement(ssElement: UserScoresheetElement): ParentCategoryModel {
    return {
      id: ssElement.scoreCategory.parentScoreCategory.id,
      name: ssElement.scoreCategory.parentScoreCategory.name,
      scoreCategories: [this.createCategory(ssElement)]
    };
  }

  private updateElement(parent: any, ssElement: UserScoresheetElement): ParentCategoryModel {
    if (this.categoryExist(parent, ssElement)) {
      const element = this.createMetric(ssElement);
      parent.scoreCategories
        .find(category => category.id === ssElement.scoreCategory.id)
        .scoreMetrics.push(element);
    } else {
      const category = this.createCategory(ssElement);
      parent.scoreCategories.push(category);
    }
    return parent;
  }

  private createElement(ssElement: UserScoresheetElement): ScoreMetricElementModel {
    return {
      id: ssElement.id,
      minScore: ssElement.minScore,
      maxScore: ssElement.maxScore,
      value: ssElement.value
    };
  }

  private createMetric(ssElement: UserScoresheetElement): ScoreMetricModel {
    return {
      id: ssElement.scoreMetric.id,
      name: ssElement.scoreMetric.name,
      element: this.createElement(ssElement)
    };
  }

  private createCategory(ssElement: UserScoresheetElement): ScoreCategoryModel {
    return {
      id: ssElement.scoreCategory.id,
      name: ssElement.scoreCategory.name,
      scoreMetrics: [this.createMetric(ssElement)]
    };
  }

  private categoryExist(parent: any, ssElement: UserScoresheetElement): true {
    return parent.scoreCategories.some(
      category => category.id === ssElement.scoreCategory.id
    );
  }

  getScoresheet(): Observable<ScoresheetModel> {
    return this.http.get<UserScoresheetElement[]>(this.scoresheeUrl).pipe(
      tap(_ => this.log('Getting scoresheet data')),
      map(rawScoreSheet => {
        this.scoreSheet = new ScoresheetModel();


        for (const ssElement of rawScoreSheet) {
          const parentId = ssElement.scoreCategory.parentScoreCategory.id;
          let parent = this.scoreSheet.parentCategory.find((parent) => parent.id === parentId);
          if (!parent) {
            parent = this.createNewElement(ssElement);
            this.scoreSheet.parentCategory.push(parent);
          } else {
            const index = this.scoreSheet.parentCategory.findIndex((element) => element.id === parent.id);
            parent = this.updateElement(parent, ssElement);
            this.scoreSheet.parentCategory[index] = parent;
          }


        }
        return this.scoreSheet;
      }),
      tap(_ => this.log('Scoresheet processed')),
      catchError(this.handleError('getScoresheet', new ScoresheetModel()))
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

  getTotal(): Stat[] {

    const last = this.scoreSheet.parentCategory.length - 1;
    let index = 0;
    let statIndex = 0;
    let finalTotal = 0;
    let finalSubTotal = 0;
    const result: Stat[] = [];

    this.scoreSheet.parentCategory.forEach((val, key) => {
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

      finalTotal += globalTotal;
      finalSubTotal += globalSubTotal;

      if (parentName !== this.OTHERS) {
        stat.total = globalTotal;
        stat.subTotal = globalSubTotal;
        result[statIndex] = stat;
        statIndex++;
      }
      if (last === index) {
        const finalStats: Stat = {
          id: 'total',
          name: this.GLOBAL_TOTAL,
          total: finalTotal,
          subTotal: finalSubTotal
        };
        result[statIndex] = finalStats;
      }

      index++;
    });

    return result;

  }

}
