import { ScoreCategory } from './score-category';
import { ScoreMetric } from './score-metric';

export class UserScoresheetElement {
  id: number;
  value?: string;
  round: number;
  minScore: number;
  maxScore: number;
  scoreMetric: ScoreMetric;
  scoreCategory: ScoreCategory;
}
