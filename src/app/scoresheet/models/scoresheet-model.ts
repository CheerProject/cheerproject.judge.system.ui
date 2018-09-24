import { ScoreCategory } from './score-category';

export class ScoresheetModel {
  registrationId?: number;
  parentCategory: ParentCategoryModel[] = [];
}

export class ParentCategoryModel {
  id: number;
  name: string;
  scoreCategories: ScoreCategoryModel[] = [];
}

export class ScoreCategoryModel {
  id: number;
  name: string;
  scoreMetrics: ScoreMetricModel[] = [];
}

export class ScoreMetricModel {
  id: number;
  name: string;
  element: ScoreMetricElementModel;
}

export class ScoreMetricElementModel {
  id: number;
  value: string;
  minScore: number;
  maxScore: number;
  round: number;
}
