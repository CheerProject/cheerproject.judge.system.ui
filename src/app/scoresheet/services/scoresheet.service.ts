import { tap, map, catchError } from 'rxjs/operators';
import { BaseService } from './../../core/services/base-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../../core/services/message.service';
import { Observable } from 'rxjs';
import { UserScoresheetElement } from '../models/user-scoresheet-element';

@Injectable()
export class ScoresheetService extends BaseService {
  private scoresheeUrl = 'api/scoresheets';
  private scoreSheet = new Map();
  constructor(private http: HttpClient, messageService: MessageService) {
    super(messageService);
  }

  private createNewElement(ssElement: UserScoresheetElement): any {
    return {
      id: ssElement.scoreCategory.parentScoreCategory.id,
      name: ssElement.scoreCategory.parentScoreCategory.name,
      scoreCategories: [this.createCategory(ssElement)]
    };
  }

  private updateElement(parent: any, ssElement: UserScoresheetElement): any {
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

  private createElement(ssElement: UserScoresheetElement): any {
    return {
      id: ssElement.id,
      minScore: ssElement.minScore,
      maxScore: ssElement.maxScore,
      value: ssElement.value
    };
  }

  private createMetric(ssElement: UserScoresheetElement): any {
    return {
      id: ssElement.scoreMetric.id,
      name: ssElement.scoreMetric.name,
      element: this.createElement(ssElement)
    };
  }

  private createCategory(ssElement: UserScoresheetElement): any {
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

  getScoresheet(): Observable<Map<number, any>> {
    return this.http.get<UserScoresheetElement[]>(this.scoresheeUrl).pipe(
      tap(_ => this.log('Getting scoresheet data')),
      map(rawScoreSheet => {
        this.scoreSheet = new Map();
        for (const ssElement of rawScoreSheet) {
          const parentId = ssElement.scoreCategory.parentScoreCategory.id;
          let parent = this.scoreSheet.get(parentId);
          if (!parent) {
            parent = this.createNewElement(ssElement);
            this.scoreSheet.set(parentId, parent);
          } else {
            parent = this.updateElement(parent, ssElement);
            this.scoreSheet.set(parentId, parent);
          }
        }
        return this.scoreSheet;
      }),
      tap(_ => this.log('Scoresheet processed')),
      catchError(this.handleError('getScoresheet', new Map()))
    );
  }
}
