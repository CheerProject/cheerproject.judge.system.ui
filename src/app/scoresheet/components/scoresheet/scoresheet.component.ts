import { SCORESHEETS } from './../../models/mock-scoresheet';
import { UserScoresheetElement } from './../../models/user-scoresheet-element';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-scoresheet',
  templateUrl: './scoresheet.component.html',
  styleUrls: ['./scoresheet.component.css']
})
export class ScoresheetComponent implements OnInit {
  rawScoreSheet: UserScoresheetElement[] = SCORESHEETS;
  scoreSheet = new Map();
  TEXT_SCORE_METRIC = 'text';

  // numberFormControl = new FormControl(0, [
  //   Validators.min(0),
  //   Validators.max(10)
  // ]);

  // matcher = new CustomErrorStateMatcher();

  constructor() {}

  ngOnInit() {
    this.processScoreSheet();
    console.log(this.scoreSheet);
  }

  processScoreSheet(): void {
    for (const ssElement of this.rawScoreSheet) {
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
  }

  createNewElement(ssElement: UserScoresheetElement): any {
    return {
      id: ssElement.scoreCategory.parentScoreCategory.id,
      name: ssElement.scoreCategory.parentScoreCategory.name,
      scoreCategories: [this.createCategory(ssElement)]
    };
  }

  updateElement(parent: any, ssElement: UserScoresheetElement): any {
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

  createElement(ssElement: UserScoresheetElement): any {
    return {
      id: ssElement.id,
      minScore: ssElement.minScore,
      maxScore: ssElement.maxScore,
      value: ssElement.value
    };
  }

  createMetric(ssElement: UserScoresheetElement): any {
    return {
      id: ssElement.scoreMetric.id,
      name: ssElement.scoreMetric.name,
      element: this.createElement(ssElement)
    };
  }

  createCategory(ssElement: UserScoresheetElement): any {
    return {
      id: ssElement.scoreCategory.id,
      name: ssElement.scoreCategory.name,
      scoreMetrics: [this.createMetric(ssElement)]
    };
  }

  categoryExist(parent: any, ssElement: UserScoresheetElement): true {
    return parent.scoreCategories.some(
      category => category.id === ssElement.scoreCategory.id
    );
  }
}
