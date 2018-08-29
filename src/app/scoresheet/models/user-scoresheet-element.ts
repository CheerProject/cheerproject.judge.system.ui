import { ScoreCategory } from './score-category';
import { ScoreMetric } from './score-metric';

export class UserScoresheetElement {
  id: number;
  value: string;
  minScore: number;
  maxScore: number;
  scoreMetric: ScoreMetric;
  scoreCategory: ScoreCategory;
}
